// Builds the Express app without starting it, so the tests can use it directly.
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { securityHeaders, apiGate } from "./http/security.js";
import { addRoutes } from "./routes/index.js";

const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", 1); // behind Render's proxy: req.ip is the visitor's address
  app.use(securityHeaders);
  app.use(express.json({ limit: "2mb" }));

  // /api is closed by default (see http/security.js)
  app.use("/api", apiGate);

  addRoutes(app);

  // Unknown /api address: JSON 404, never the app page
  app.use("/api", (req, res) => res.status(404).json({ code: "not_found" }));

  // The service worker must always be fresh, or an old version of the app keeps running on phones.
  app.get("/sw.js", (req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Service-Worker-Allowed", "/");
    res.sendFile(path.join(publicDir, "sw.js"));
  });
  app.use(express.static(publicDir, {
    index: false,
    setHeaders(res, file) {
      if (file.endsWith(".webmanifest")) res.setHeader("Content-Type", "application/manifest+json");
      if (/\/(fonts|icons)\//.test(file)) res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    },
  }));
  // Every other address opens the app (it decides what to show)
  app.get("*", (req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(path.join(publicDir, "index.html"));
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err?.type === "entity.parse.failed") return res.status(400).json({ code: "bad_json" });
    if (err?.type === "entity.too.large") return res.status(413).json({ code: "too_large" });
    console.error(err);
    res.status(500).json({ code: "error", message: "משהו השתבש, נסי שוב" });
  });
  return app;
}
