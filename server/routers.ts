import { z } from "zod";
import { deleteLicense, listLicenses, setLicensePaused, createLicense, ALLOWED_DURATIONS } from "./license-service";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  keys: router({
    list: adminProcedure.query(() => listLicenses()),
    create: adminProcedure.input(z.object({
      prefix: z.enum(["ACUSADO", "POCOYO7X"]),
      durationDays: z.number().int().refine(value => ALLOWED_DURATIONS.includes(value as (typeof ALLOWED_DURATIONS)[number])),
      maxUsers: z.number().int().min(1).max(100000),
    })).mutation(({ input }) => createLicense(input as {
      prefix: "ACUSADO" | "POCOYO7X";
      durationDays: (typeof ALLOWED_DURATIONS)[number];
      maxUsers: number;
    })),
    setPaused: adminProcedure.input(z.object({
      id: z.number().int().positive(),
      paused: z.boolean(),
    })).mutation(({ input }) => setLicensePaused(input.id, input.paused)),
    delete: adminProcedure.input(z.object({ id: z.number().int().positive() }))
      .mutation(({ input }) => deleteLicense(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
