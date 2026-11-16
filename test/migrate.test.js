// The schema runs twice in a row without errors (it runs before every deploy), and the lockdown
// leaves every table with Row Level Security on. Needs an EMPTY test database, never production:
//   TEST_DATABASE_URL=postgres://user:pass@localhost/test_db npm test
import { test, after } from "node:test";
import assert from "node:assert/strict";

const DB = process.env.TEST_DATABASE_URL;

test("schema migrates twice and locks every table", { skip: !DB && "TEST_DATABASE_URL not set" }, async () => {
  process.env.DATABASE_URL = DB;
  const { migrate } = await import("../src/db/migrate.js");
  const { q, closePool } = await import("../src/db/pool.js");
  after(closePool);
  await q("drop schema public cascade; create schema public;");
  await migrate();
  await migrate();
  const open = await q(`select c.relname from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relkind in ('r','p') and not c.relrowsecurity`);
  assert.deepEqual(open, [], "tables without Row Level Security");
  const tables = await q(`select tablename from pg_tables where schemaname = 'public'`);
  assert.ok(tables.some(t => t.tablename === "settings"));
});
