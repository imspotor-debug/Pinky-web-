import { createHash, randomInt } from "node:crypto";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { getDb } from "./db";
import { licenseDevices, licenseKeys } from "../drizzle/schema";

export const ALLOWED_DURATIONS = [1, 3, 7, 30] as const;
export type LicensePrefix = "ACUSADO" | "POCOYO7X";

const KEY_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const KEY_SUFFIX_LENGTH = 16;

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeKey(value: string) {
  return value.trim().toUpperCase();
}

function createSuffix() {
  const chars = Array.from({ length: KEY_SUFFIX_LENGTH }, () => KEY_ALPHABET[randomInt(KEY_ALPHABET.length)]);
  return [chars.slice(0, 4), chars.slice(4, 8), chars.slice(8, 12), chars.slice(12, 16)]
    .map(group => group.join(""))
    .join("-");
}

export async function createLicense(input: {
  prefix: LicensePrefix;
  durationDays: (typeof ALLOWED_DURATIONS)[number];
  maxUsers: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const suffix = createSuffix();
    const key = `${input.prefix}-${suffix}`;
    const expiresAt = new Date(Date.now() + input.durationDays * 24 * 60 * 60 * 1000);
    try {
      const inserted = await db.insert(licenseKeys).values({
        keyHash: hash(normalizeKey(key)),
        prefix: input.prefix,
        lastFour: suffix.slice(-4),
        durationDays: input.durationDays,
        expiresAt,
        maxUsers: input.maxUsers,
        paused: false,
      });
      return {
        id: Number(inserted[0].insertId),
        key,
        prefix: input.prefix,
        durationDays: input.durationDays,
        expiresAt,
        maxUsers: input.maxUsers,
        usedUsers: 0,
      };
    } catch (error) {
      const code = (error as { code?: string }).code;
      if (code !== "ER_DUP_ENTRY" || attempt === 4) throw error;
    }
  }
  throw new Error("Could not generate a unique license key");
}

export async function listLicenses() {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");

  const rows = await db
    .select()
    .from(licenseKeys)
    .where(isNull(licenseKeys.deletedAt))
    .orderBy(desc(licenseKeys.createdAt))
    .limit(250);

  return Promise.all(rows.map(async row => {
    const [countRow] = await db
      .select({ total: sql<number>`count(*)` })
      .from(licenseDevices)
      .where(eq(licenseDevices.licenseId, row.id));
    return {
      id: row.id,
      prefix: row.prefix,
      lastFour: row.lastFour,
      durationDays: row.durationDays,
      createdAt: row.createdAt,
      expiresAt: row.expiresAt,
      maxUsers: row.maxUsers,
      paused: row.paused,
      usedUsers: Number(countRow?.total ?? 0),
    };
  }));
}

export async function setLicensePaused(id: number, paused: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(licenseKeys)
    .set({ paused })
    .where(and(eq(licenseKeys.id, id), isNull(licenseKeys.deletedAt)));
  const [row] = await db.select({ id: licenseKeys.id }).from(licenseKeys)
    .where(and(eq(licenseKeys.id, id), isNull(licenseKeys.deletedAt))).limit(1);
  if (!row) throw new Error("License key not found");
  return { id, paused };
}

export async function deleteLicense(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const deletedAt = new Date();
  await db.update(licenseKeys)
    .set({ deletedAt })
    .where(and(eq(licenseKeys.id, id), isNull(licenseKeys.deletedAt)));
  return { id, deleted: true };
}

export async function validateLicense(input: { key: string; deviceId: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");

  const normalized = normalizeKey(input.key);
  const keyPattern = /^(ACUSADO|POCOYO7X)-[A-Z0-9]{4}(?:-[A-Z0-9]{4}){3}$/;
  if (!keyPattern.test(normalized)) return { valid: false, reason: "invalid_key" as const };

  const keyHash = hash(normalized);
  const deviceHash = hash(input.deviceId.trim());
  return db.transaction(async tx => {
    const [license] = await tx.select().from(licenseKeys)
      .where(eq(licenseKeys.keyHash, keyHash)).limit(1).for("update");

    if (!license || license.deletedAt) return { valid: false, reason: "invalid_key" as const };
    if (license.paused) return { valid: false, reason: "paused" as const };
    if (license.expiresAt.getTime() <= Date.now()) return { valid: false, reason: "expired" as const };

    const [existingDevice] = await tx.select({ id: licenseDevices.id })
      .from(licenseDevices)
      .where(and(
        eq(licenseDevices.licenseId, license.id),
        eq(licenseDevices.deviceHash, deviceHash),
      ))
      .limit(1);

    if (!existingDevice) {
      const [countRow] = await tx.select({ total: sql<number>`count(*)` })
        .from(licenseDevices)
        .where(eq(licenseDevices.licenseId, license.id));
      const usedUsers = Number(countRow?.total ?? 0);
      if (usedUsers >= license.maxUsers) {
        return {
          valid: false,
          reason: "user_limit_reached" as const,
          expiresAt: license.expiresAt.toISOString(),
          usedUsers,
          maxUsers: license.maxUsers,
        };
      }
      await tx.insert(licenseDevices).values({ licenseId: license.id, deviceHash });
    } else {
      await tx.update(licenseDevices).set({ lastSeen: new Date() })
        .where(eq(licenseDevices.id, existingDevice.id));
    }

    const [countRow] = await tx.select({ total: sql<number>`count(*)` })
      .from(licenseDevices)
      .where(eq(licenseDevices.licenseId, license.id));
    return {
      valid: true,
      reason: "active" as const,
      expiresAt: license.expiresAt.toISOString(),
      usedUsers: Number(countRow?.total ?? 0),
      maxUsers: license.maxUsers,
    };
  });
}
