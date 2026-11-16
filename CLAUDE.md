# Shiriel app – rules for working in this repo

The product: an app (PWA now, Capacitor wrapper for the stores later) for Shiriel Turgeman's own business,
built on the "recruitment app" of the academy (shosial/recruitment-app, which stays untouched and live).
Users get access after paying (Morning payment page → email added to the allowed list), then log in with email + one-time code.

## Must keep
- Hebrew, RTL, Israel time (Asia/Jerusalem), week = Sunday to Saturday. UI text addresses the user in the feminine form, simple and conversational.
- Split by area from day one: one routes file per area in `src/routes/`, one schema file per area in `src/db/schema/`
  (`999-lockdown.sql` stays last), one front-end module per area in `public/js/`. Never grow one giant file.
- Security from day one: `/api` closed by default (`src/http/security.js`), cross-site writes get 403,
  every write route has a closed field list (zod), every query is filtered by the session's user,
  RLS on every table, admin sees clients' data only through the privacy layer. Never put secrets or real client data in code, memory or docs.
- `test/routes.json` lists every route. A missing route fails the tests. Add new routes on purpose with `npm run routes:update`.
- Every new route gets tests (security + ownership).
- No inline scripts (CSP `script-src 'self'`). The service worker never caches `/api`.
- Few dependencies, on purpose.

## Commands
- `npm start` / `npm run dev`
- `npm test` (add `TEST_DATABASE_URL=...` to also test the schema; it WIPES that database)
- `npm run migrate`
- `npm run icons` redraws the app icons from the brand
