import { boolean, int, mysqlEnum, mysqlTable, timestamp, uniqueIndex, varchar, text } from "drizzle-orm/mysql-core";

/** Core user table backing the starter's OAuth flow. */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const licenseKeys = mysqlTable("license_keys", {
  id: int("id").autoincrement().primaryKey(),
  keyHash: varchar("keyHash", { length: 64 }).notNull().unique(),
  prefix: mysqlEnum("prefix", ["ACUSADO", "POCOYO7X"]).notNull(),
  lastFour: varchar("lastFour", { length: 4 }).notNull(),
  durationDays: int("durationDays").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  maxUsers: int("maxUsers").notNull(),
  paused: boolean("paused").default(false).notNull(),
  deletedAt: timestamp("deletedAt"),
});

export type LicenseKey = typeof licenseKeys.$inferSelect;

export const licenseDevices = mysqlTable(
  "license_devices",
  {
    id: int("id").autoincrement().primaryKey(),
    licenseId: int("licenseId").notNull().references(() => licenseKeys.id, { onDelete: "cascade" }),
    deviceHash: varchar("deviceHash", { length: 64 }).notNull(),
    firstSeen: timestamp("firstSeen").defaultNow().notNull(),
    lastSeen: timestamp("lastSeen").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    licenseDeviceUnique: uniqueIndex("license_device_unique").on(table.licenseId, table.deviceHash),
  }),
);
