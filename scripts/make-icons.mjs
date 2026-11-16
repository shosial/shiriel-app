// Draws the app icons (public/icons/) from the brand: a black square with "ST" in Poppins,
// light S and bold T like the logo. Run again after a branding change: npm run icons
// Needs Playwright with Chromium on the machine that runs it (not needed on the server).
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const font = w => `data:font/woff2;base64,${fs.readFileSync(path.join(root, `public/fonts/poppins-latin-${w}-normal.woff2`)).toString("base64")}`;

const html = (size, scale) => `<!doctype html><html><head><style>
@font-face{font-family:P;font-weight:400;src:url(${font(400)})}
@font-face{font-family:P;font-weight:700;src:url(${font(700)})}
html,body{margin:0;width:${size}px;height:${size}px;background:#111}
div{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;
font-family:P;font-size:${Math.round(size * 0.42 * scale)}px;letter-spacing:${Math.round(size * 0.01)}px;line-height:1}
b{font-weight:700}span{font-weight:400}
</style></head><body><div><span>S</span><b>T</b></div></body></html>`;

const out = [
  ["icon-192.png", 192, 1],
  ["icon-512.png", 512, 1],
  ["icon-maskable-512.png", 512, 0.78], // Android crops maskable icons to a circle: keep the letters inside
  ["apple-touch-icon.png", 180, 1],
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const [name, size, scale] of out) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(html(size, scale));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, "public/icons", name), omitBackground: false });
  console.log("  ✓", name);
}
await browser.close();
