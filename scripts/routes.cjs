// Single source of truth for prerender + sitemap route lists.
const fs = require("fs");
const path = require("path");

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about-us", priority: "0.8", changefreq: "monthly" },
  { path: "/contact-us", priority: "0.8", changefreq: "monthly" },
  { path: "/corporate", priority: "0.7", changefreq: "monthly" },
  { path: "/departments/pathology", priority: "0.9", changefreq: "monthly" },
  { path: "/departments/radiology", priority: "0.9", changefreq: "monthly" },
  { path: "/departments/radiology/x-ray-services", priority: "0.8", changefreq: "monthly" },
  { path: "/departments/radiology/pft-test", priority: "0.8", changefreq: "monthly" },
  { path: "/departments/health-checkups", priority: "0.9", changefreq: "monthly" },
  { path: "/departments/pathology/biochemistry-tests", priority: "0.7", changefreq: "monthly" },
  { path: "/departments/pathology/hematology-tests", priority: "0.7", changefreq: "monthly" },
  { path: "/departments/pathology/Microbiology", priority: "0.7", changefreq: "monthly" },
  { path: "/departments/pathology/histopathology-tests", priority: "0.7", changefreq: "monthly" },
  { path: "/departments/pathology/immunology-tests", priority: "0.7", changefreq: "monthly" },
  { path: "/departments/pathology/molecular-diagnostics", priority: "0.7", changefreq: "monthly" },
  { path: "/insights", priority: "0.8", changefreq: "weekly" },
  { path: "/diagnostic-centre-gurugram", priority: "0.8", changefreq: "monthly" },
  { path: "/diagnostic-lab-sohna-road-gurugram", priority: "0.8", changefreq: "monthly" },
  { path: "/faq-diagnostic-tests", priority: "0.7", changefreq: "monthly" },
  { path: "/faq-health-checkups", priority: "0.7", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms-of-use", priority: "0.3", changefreq: "yearly" },
];

function readSlugs(relFile) {
  const raw = fs.readFileSync(path.join(__dirname, "..", relFile), "utf-8");
  return [...raw.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function allRoutes() {
  const blogSlugs = readSlugs("src/data/blogPosts.ts");
  const geoSlugs = readSlugs("src/data/geoLocations.ts");
  return [
    ...staticPages,
    ...blogSlugs.map((s) => ({ path: `/insights/${s}`, priority: "0.7", changefreq: "monthly" })),
    ...geoSlugs.map((s) => ({ path: `/diagnostic-centre-gurugram/${s}`, priority: "0.7", changefreq: "monthly" })),
  ];
}

module.exports = { staticPages, allRoutes, readSlugs };
