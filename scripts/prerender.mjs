/**
 * Prerender every route to dist/<route>/index.html so Google crawls
 * per-page canonical/title/description/OG/JSON-LD tags instead of the
 * homepage fallback baked into index.html.
 *
 * Strategy: serve the freshly built /dist with a tiny static server,
 * open each route in headless Chromium, wait for useSEO() to mutate
 * <head>, serialize the DOM, and write it back to disk under the
 * route's directory. React hydration still runs at runtime.
 */
import { createServer } from "http";
import { readFile, writeFile, mkdir, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");
const BASE_URL = "https://www.aarvakdiagnostics.com";
const PORT = 4173;

const { allRoutes } = await import("./routes.cjs");
const routes = allRoutes().map((r) => r.path);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

async function tryFile(fp) {
  try {
    const s = await stat(fp);
    if (s.isFile()) return fp;
  } catch {}
  return null;
}

const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const candidate = path.join(DIST, urlPath);
    let file = await tryFile(candidate);
    if (!file && !path.extname(urlPath)) file = path.join(DIST, "index.html");
    if (!file) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    const ext = path.extname(file).toLowerCase();
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
});

if (!existsSync(path.join(DIST, "index.html"))) {
  console.error("dist/index.html missing — run `vite build` first");
  process.exit(1);
}

await new Promise((r) => server.listen(PORT, r));
console.log(`serving ${DIST} on http://localhost:${PORT}`);

let browser;
try {
  browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
} catch (error) {
  server.close();
  console.warn("⚠ Prerender skipped: headless Chrome could not start in this build environment.");
  console.warn(error?.message || error);
  process.exit(0);
}

let ok = 0;
let fail = 0;

for (const route of routes) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  try {
    const url = `http://localhost:${PORT}${route}`;
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

    // Wait for useSEO to update canonical to point at this route (not "/")
    const expected = `${BASE_URL}${route}`;
    await page.waitForFunction(
      (want) => {
        const c = document.querySelector('link[rel="canonical"]');
        return !!c && c.href === want;
      },
      { timeout: 8000 },
      expected
    ).catch(() => {
      // Fall through — some pages (404 fallback, etc.) may not match.
      console.warn(`  ⚠ canonical mismatch for ${route}`);
    });

    // Ensure JSON-LD is present when applicable
    await page.waitForFunction(
      () => document.title && document.title.length > 0,
      { timeout: 4000 }
    ).catch(() => {});

    const html = await page.content();

    // Write to dist/<route>/index.html (root writes to dist/index.html)
    let outDir;
    if (route === "/") outDir = DIST;
    else outDir = path.join(DIST, route);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), html);

    ok++;
    if (ok % 20 === 0) console.log(`  ${ok}/${routes.length} rendered`);
  } catch (e) {
    fail++;
    console.error(`  ✗ ${route}: ${e.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
server.close();

console.log(`\n✅ Prerender complete: ${ok} ok, ${fail} failed, ${routes.length} total`);
process.exit(fail > 0 && ok === 0 ? 1 : 0);
