// Every area of the app has its own routes file. Add a new area here, never inside another area's file.
// Planned: auth.js, me.js (student data), calls.js, posts.js, leads.js, agenda.js, contracts.js, clients.js,
// campaigns.js, invoices.js, admin.js, payments.js, public pages (sign, book, quote, approval, portal).
import { healthRoutes } from "./health.js";

export function addRoutes(app) {
  app.use(healthRoutes);
}
