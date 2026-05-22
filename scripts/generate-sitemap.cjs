// This script generates a static sitemap.xml in public/
// Run: node scripts/generate-sitemap.js

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.aarvakdiagnostics.com';
const TODAY = new Date().toISOString().split('T')[0];

// Static pages with priorities
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about-us', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact-us', priority: '0.8', changefreq: 'monthly' },
  { path: '/corporate', priority: '0.7', changefreq: 'monthly' },
  { path: '/departments/pathology', priority: '0.9', changefreq: 'monthly' },
  { path: '/radiology', priority: '0.9', changefreq: 'monthly' },
  { path: '/health-checkups', priority: '0.9', changefreq: 'monthly' },
  { path: '/insights', priority: '0.8', changefreq: 'weekly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-use', priority: '0.3', changefreq: 'yearly' },
];

// Read blog slugs from blogPosts.ts
const blogFile = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'blogPosts.ts'), 'utf-8');
const slugMatches = [...blogFile.matchAll(/slug:\s*"([^"]+)"/g)];
const blogPages = slugMatches.map(m => ({
  path: `/insights/${m[1]}`,
  priority: '0.7',
  changefreq: 'monthly',
}));

const allPages = [...staticPages, ...blogPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${BASE_URL}${p.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), xml);
console.log(`✅ Sitemap generated with ${allPages.length} URLs`);
