import pg from "pg";
import { config } from "../config.js";

// One shared pool, created on first use, so the site (and the tests) can start without a database.
let pool = null;
export function getPool() {
  if (!config.databaseUrl) return null;
  if (!pool) {
    const local = /@(localhost|127\.0\.0\.1)[:/]/.test(config.databaseUrl);
    pool = new pg.Pool({
      connectionString: config.databaseUrl,
      ssl: local ? false : { rejectUnauthorized: false },
      max: 5,
    });
  }
  return pool;
}

export async function q(text, params) {
  const p = getPool();
  if (!p) throw new Error("No database configured (DATABASE_URL)");
  return (await p.query(text, params)).rows;
}

export async function one(text, params) {
  return (await q(text, params))[0] || null;
}

export async function closePool() {
  if (pool) { await pool.end(); pool = null; }
}
