// The app shell: tabs, install hint and the service worker. Each area of the app will get its own module
// under /js/ (overview.js, posts.js, calls.js...), imported from here, instead of one huge file.

const views = [...document.querySelectorAll(".view")];
const tabs = [...document.querySelectorAll(".tabbar a")];

function show(name) {
  if (!views.some(v => v.dataset.view === name)) name = "overview";
  for (const v of views) v.hidden = v.dataset.view !== name;
  for (const t of tabs) {
    if (t.dataset.tab === name) t.setAttribute("aria-current", "page");
    else t.removeAttribute("aria-current");
  }
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", () => show(location.hash.slice(1)));
show(location.hash.slice(1));

// ---- system status ----
const status = document.getElementById("status");
fetch("/healthz", { cache: "no-store" })
  .then(r => r.json())
  .then(h => {
    status.textContent = h.ok
      ? (h.db === "ok" ? "השרת והמסד פעילים." : "השרת פעיל. המסד עדיין לא מחובר.")
      : "יש בעיה בחיבור למסד.";
  })
  .catch(() => { status.textContent = "אין חיבור כרגע. נסי שוב בעוד רגע."; });

// ---- install as an app ----
const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const card = document.getElementById("install-card");
const btn = document.getElementById("install-btn");
let deferred = null;

if (!standalone) {
  if (isIos) {
    card.hidden = false;
    document.getElementById("install-ios").hidden = false;
  }
  // Android / Chrome: the browser offers its own install prompt; we show it from our button.
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferred = e;
    card.hidden = false;
    document.getElementById("install-other").hidden = false;
    btn.hidden = false;
  });
  btn.addEventListener("click", async () => {
    if (!deferred) return;
    deferred.prompt();
    await deferred.userChoice;
    deferred = null;
    card.hidden = true;
  });
  window.addEventListener("appinstalled", () => { card.hidden = true; });
}

// ---- service worker (offline shell, lets the app be installed) ----
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {});
}
