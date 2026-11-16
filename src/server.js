import { config } from "./config.js";
import { createApp } from "./app.js";

const app = createApp();
app.listen(config.port, () => {
  console.log(`Listening on :${config.port}${config.databaseUrl ? "" : " (no database configured)"}`);
});
