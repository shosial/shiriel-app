// All settings come from environment variables (see .env.example). Nothing secret lives in the code.
// In production a missing required value stops the server at start, so a bad deploy fails loudly.
const env = process.env;
const isProd = env.NODE_ENV === "production";

function required(name, devFallback = "") {
  const v = env[name];
  if (v) return v;
  if (isProd) throw new Error(`Missing environment variable ${name}. See .env.example`);
  return devFallback;
}

export const config = {
  isProd,
  port: Number(env.PORT || 3000),
  publicUrl: (env.PUBLIC_URL || "").replace(/\/$/, ""),
  // signs the login cookie and derives the key that encrypts saved secrets (Render generates it)
  sessionSecret: required("SESSION_SECRET", "dev-only-secret-change-me"),
  // Postgres (Supabase, Session pooler). Empty in local dev = the site runs without a database.
  databaseUrl: required("DATABASE_URL"),
  adminEmails: (env.ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean),
  // "Lax" by default. The app is opened in its own window (PWA), never inside another site's iframe.
  cookieSameSite: env.COOKIE_SAMESITE || "Lax",
};
