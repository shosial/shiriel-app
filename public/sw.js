// Service worker: keeps the app shell on the phone so it opens fast and works without a connection.
// Never caches /api or any personal data: those always come from the server.
// Raise VERSION whenever a file in SHELL changes, so phones pick up the new version.
const VERSION = "v1";
const CACHE = `shell-${VERSION}`;
const SHELL = [
  "/", "/app.css", "/app.js", "/logo.png", "/manifest.webmanifest",
  "/icons/icon-192.png", "/icons/icon-512.png",
  "/fonts/heebo-hebrew-400-normal.woff2", "/fonts/heebo-hebrew-500-normal.woff2", "/fonts/heebo-hebrew-700-normal.woff2",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("shell-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.startsWith("/api/") || url.pathname === "/healthz") return; // always live

  // Pages: network first (always the newest version), the saved shell when offline.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).catch(() => caches.match("/")));
    return;
  }
  // Files: from the phone when saved, otherwise from the network.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
