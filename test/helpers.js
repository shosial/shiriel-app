// Starts the app on a free port for a test file and gives back its address.
import { createApp } from "../src/app.js";

export async function startApp() {
  const app = createApp();
  const server = await new Promise(r => { const s = app.listen(0, () => r(s)); });
  const base = `http://127.0.0.1:${server.address().port}`;
  return { app, base, close: () => new Promise(r => server.close(r)) };
}
