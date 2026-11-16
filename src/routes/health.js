// /healthz: Render calls it before sending traffic to a new version. With a database configured,
// it also checks that the database answers.
import express from "express";
import { getPool } from "../db/pool.js";
import { wrap } from "../http/wrap.js";

export const healthRoutes = express.Router();

healthRoutes.get("/healthz", wrap(async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const pool = getPool();
  if (!pool) return res.json({ ok: true, db: "not_configured" });
  try {
    await pool.query("select 1");
    res.json({ ok: true, db: "ok" });
  } catch {
    res.status(503).json({ ok: false, db: "down" });
  }
}));
