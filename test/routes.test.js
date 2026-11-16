// Guards against routes disappearing. In the previous project, a branch built from an old copy of the server
// silently deleted routes another PR had added. Here every route is listed in test/routes.json:
//   - a route that disappears fails this test;
//   - a new route also fails until it is added on purpose: npm run routes:update
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createApp } from "../src/app.js";
import { listRoutes } from "../src/http/list-routes.js";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "routes.json");

test("the app has exactly the routes listed in test/routes.json", () => {
  const now = listRoutes(createApp());
  if (process.env.UPDATE_ROUTES) {
    fs.writeFileSync(file, JSON.stringify(now, null, 2) + "\n");
    return;
  }
  const saved = JSON.parse(fs.readFileSync(file, "utf8"));
  const missing = saved.filter(r => !now.includes(r));
  const added = now.filter(r => !saved.includes(r));
  assert.deepEqual(missing, [], `Routes that disappeared: ${missing.join(", ")}`);
  assert.deepEqual(added, [], `New routes not yet listed (run npm run routes:update): ${added.join(", ")}`);
});
