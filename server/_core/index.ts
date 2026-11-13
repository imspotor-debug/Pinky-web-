import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { z } from "zod";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { publicPlatformScript } from "./publicConfig";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { validateLicense } from "../license-service";
import { serveStatic, setupVite } from "./vite";

const validationInput = z.object({
  key: z.string().trim().min(1).max(80),
  deviceId: z.string().trim().min(8).max(200),
});

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/platform/config.js", (_req, res) => {
    res.set("Cache-Control", "no-store").type("application/javascript").send(publicPlatformScript());
  });

  // Public license validation endpoint used by the Android APK.
  app.post("/api/v1/keys/validate", async (req, res) => {
    res.set("Cache-Control", "no-store");
    const parsed = validationInput.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ valid: false, reason: "invalid_request" });
      return;
    }
    try {
      res.status(200).json(await validateLicense(parsed.data));
    } catch (error) {
      console.error("[Key validation] Request failed", error instanceof Error ? error.message : "unknown error");
      res.status(503).json({ valid: false, reason: "service_unavailable" });
    }
  });

  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({ router: appRouter, createContext })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = Number(process.env.PORT || "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
  server.on("error", error => { console.error("Server failed:", error.message); process.exit(1); });
  server.listen(port, "0.0.0.0", () => console.log(`Server listening on port ${port}`));
}

startServer().catch(error => { console.error(error); process.exit(1); });
