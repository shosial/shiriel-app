// Runs every file in src/db/schema/ in name order. Each file is idempotent
// ("create table if not exists", "add column if not exists"), so this runs safely before every deploy.
// One file per area (000-base, 010-auth, 020-student-data, ...). 999-lockdown.sql must stay last.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPool, closePool } from "./pool.js";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "schema");

export function schemaFiles() {
  return fs.readdirSync(dir).filter(f => f.endsWith(".sql")).sort();
}

export async function migrate() {
  const pool = getPool();
  if (!pool) throw new Error("DATABASE_URL is not set");
  for (const f of schemaFiles()) {
    await pool.query(fs.readFileSync(path.join(dir, f), "utf8"));
    console.log(`  ✓ ${f}`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await migrate();
    console.log("Database is ready.");
  } finally {
    await closePool();
  }
}
