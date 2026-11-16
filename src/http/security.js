// Security that wraps every request. Closed by default: a route added later without its own check stays closed.
import { config } from "../config.js";

// Content-Security-Policy for the app's own pages: only our own scripts, styles, fonts and images.
// No inline scripts and nothing loaded from other sites. Public pages (signing, client portal) get stricter ones later.
export const APP_CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "font-src 'self'",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "connect-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'none'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

export function securityHeaders(req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "same-origin");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Permissions-Policy", "camera=(), geolocation=(), payment=(), microphone=(self)");
  res.setHeader("Content-Security-Policy", APP_CSP);
  if (config.isProd) res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
}

// A write must come from the app's own pages. The browser says where a request came from
// (Sec-Fetch-Site, or Origin on older browsers); a form posted from another site gets 403.
const ownOrigin = () => { try { return config.publicUrl ? new URL(config.publicUrl).origin : ""; } catch { return ""; } };
export function fromOwnSite(req) {
  const site = req.get("sec-fetch-site");
  if (site) return site === "same-origin" || site === "none";
  const origin = req.get("origin");
  if (!origin) return true; // not a browser page on another site (browsers add Origin to cross-site writes)
  try { const o = new URL(origin); return o.origin === ownOrigin() || o.host === req.get("host"); } catch { return false; }
}

// The only /api addresses open without login. Everything else needs a logged-in user, and /api/admin/* an admin.
// Each later stage adds its public addresses here (login, signing page, booking page, payment notice...).
export const PUBLIC_API = [];
const isPublicApi = p => PUBLIC_API.some(r => r.test(p));

const READS = new Set(["GET", "HEAD", "OPTIONS"]);

// requireUser is filled in by the login stage. Until then nobody is logged in, so every closed address answers 401.
let requireUser = (req, res) => res.status(401).json({ code: "not_logged_in" });
export function setRequireUser(fn) { requireUser = fn; }

export function apiGate(req, res, next) {
  if (!READS.has(req.method) && !fromOwnSite(req)) return res.status(403).json({ code: "cross_site" });
  if (isPublicApi(req.path)) return next();
  return requireUser(req, res, next);
}
