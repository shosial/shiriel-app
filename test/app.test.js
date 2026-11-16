// The skeleton: health check, the app page, security headers, and /api closed by default.
// Runs without a database. With TEST_DATABASE_URL set, migrate.test.js also checks the schema.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { startApp } from "./helpers.js";

delete process.env.DATABASE_URL;
let t;
before(async () => { t = await startApp(); });
after(async () => { await t.close(); });

test("healthz answers ok without a database", async () => {
  const r = await fetch(`${t.base}/healthz`);
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { ok: true, db: "not_configured" });
  assert.equal(r.headers.get("cache-control"), "no-store");
});

test("the app page is Hebrew, right to left, and installable", async () => {
  const r = await fetch(`${t.base}/`);
  assert.equal(r.status, 200);
  const html = await r.text();
  assert.match(html, /<html lang="he" dir="rtl">/);
  assert.match(html, /rel="manifest" href="\/manifest.webmanifest"/);
  assert.match(html, /rel="apple-touch-icon"/);
  // no inline scripts: the CSP allows only our own files
  assert.doesNotMatch(html, /<script(?![^>]*\bsrc=)[^>]*>/);
});

test("any other address opens the app page", async () => {
  const r = await fetch(`${t.base}/posts/somewhere`);
  assert.equal(r.status, 200);
  assert.match(await r.text(), /dir="rtl"/);
});

test("manifest and service worker are served correctly", async () => {
  const m = await fetch(`${t.base}/manifest.webmanifest`);
  assert.equal(m.status, 200);
  assert.match(m.headers.get("content-type"), /application\/manifest\+json/);
  const man = await m.json();
  assert.equal(man.dir, "rtl");
  assert.equal(man.display, "standalone");
  for (const icon of man.icons) assert.equal((await fetch(`${t.base}${icon.src}`)).status, 200, icon.src);

  const sw = await fetch(`${t.base}/sw.js`);
  assert.equal(sw.status, 200);
  assert.equal(sw.headers.get("cache-control"), "no-cache");
  assert.doesNotMatch(await sw.text(), /cache.*\/api\//i);
});

test("security headers on every response", async () => {
  for (const p of ["/", "/healthz", "/api/me"]) {
    const r = await fetch(`${t.base}${p}`);
    assert.equal(r.headers.get("x-content-type-options"), "nosniff", p);
    assert.equal(r.headers.get("x-frame-options"), "DENY", p);
    assert.match(r.headers.get("content-security-policy"), /script-src 'self'/, p);
    assert.match(r.headers.get("content-security-policy"), /frame-ancestors 'none'/, p);
    assert.equal(r.headers.get("x-powered-by"), null, p);
  }
});

test("/api is closed by default", async () => {
  for (const p of ["/api/me", "/api/admin/students", "/api/whatever"]) {
    const r = await fetch(`${t.base}${p}`);
    assert.equal(r.status, 401, p);
    assert.deepEqual(await r.json(), { code: "not_logged_in" });
  }
});

test("a write from another site is refused", async () => {
  const r = await fetch(`${t.base}/api/anything`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://evil.example", "Sec-Fetch-Site": "cross-site" },
    body: "{}",
  });
  assert.equal(r.status, 403);
  assert.deepEqual(await r.json(), { code: "cross_site" });
});

test("broken JSON gets 400, not a crash", async () => {
  const r = await fetch(`${t.base}/api/anything`, { method: "POST", headers: { "Content-Type": "application/json", "Sec-Fetch-Site": "same-origin" }, body: "{oops" });
  assert.equal(r.status, 400);
});
