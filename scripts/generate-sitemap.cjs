// Generates public/sitemap.xml from the shared route list.
const fs = require("fs");
const path = require("path");
const { allRoutes } = require("./routes.cjs");

const BASE_URL = "https://www.aarvakdiagnostics.com";
const TODAY = new Date().toISOString().split("T")[0];

const pages = allRoutes();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${BASE_URL}${p.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

fs.writeFileSync(path.join(__dirname, "..", "public", "sitemap.xml"), xml);
console.log(`✅ Sitemap generated with ${pages.length} URLs`);
