// Generates public/sitemap.xml from the shared route list plus any blog posts
// the backend has already published (future/scheduled posts are excluded).
const fs = require("fs");
const path = require("path");
const { allRoutes } = require("./routes.cjs");

const BASE_URL = "https://www.aarvakdiagnostics.com";
const TODAY = new Date().toISOString().split("T")[0];

function readEnv() {
  const out = {};
  try {
    const raw = fs.readFileSync(path.join(__dirname, "..", ".env"), "utf-8");
    raw.split("\n").forEach((line) => {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    });
  } catch {
    /* no .env in this environment */
  }
  return { ...out, ...process.env };
}

async function publishedBlogRoutes() {
  const env = readEnv();
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  try {
    // The anon role can only read published posts (RLS), so this can never
    // leak a scheduled post into the sitemap.
    const res = await fetch(
      `${url}/rest/v1/blog_posts?select=slug,published_at&status=eq.published&order=published_at.desc`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    );
    if (!res.ok) return [];
    const rows = await res.json();
    return rows.map((r) => ({
      path: `/insights/${r.slug}`,
      priority: "0.7",
      changefreq: "monthly",
      lastmod: (r.published_at || TODAY).slice(0, 10),
    }));
  } catch {
    return [];
  }
}

(async () => {
  const staticRoutes = allRoutes();
  const seen = new Set(staticRoutes.map((p) => p.path));
  const dbRoutes = (await publishedBlogRoutes()).filter((p) => !seen.has(p.path));
  const pages = [...staticRoutes, ...dbRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${BASE_URL}${p.path}</loc>
    <lastmod>${p.lastmod || TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, "..", "public", "sitemap.xml"), xml);
  console.log(`✅ Sitemap generated with ${pages.length} URLs (${dbRoutes.length} from the blog scheduler)`);
})();
