
# Fix the P0 canonical & metadata bug (audit §2a)

## The problem the audit found

Every page on `aarvakdiagnostics.com` currently serves this in the raw HTML that Google crawls:

- `<link rel="canonical" href="https://www.aarvakdiagnostics.com/" />`
- `<title>Aarvak Diagnostics – Trusted Diagnostic Centre in India</title>`
- Same meta description

That's because the site is a client-side React SPA. `index.html` ships one hardcoded set of tags, and `useSEO.ts` only rewrites them **after** JavaScript runs. Google's indexer often reads the pre-JS HTML (and honors that canonical), so every URL — sector pages, insights posts, service pages — tells Google "the real page is the homepage." Result: ~71 pages stuck at "Discovered/Crawled – currently not indexed."

## The fix

Pre-render every known route into its own static `.html` file at build time, so the raw HTML Google fetches already has the right `<title>`, `<meta description>`, canonical, OG tags, and JSON-LD for that specific URL. The client-side `useSEO` hook keeps working unchanged for hydration.

### Approach

1. **Add a build-time prerender step.** After `vite build`, run a Node script that:
   - Boots the built app inside `jsdom` (or `puppeteer` if needed for React 18).
   - Iterates every route (10 core pages + 78 GEO pages + all blog slugs + department subpages + FAQ pages — same list `scripts/generate-sitemap.cjs` already enumerates).
   - Renders each route, waits for `useSEO` to mutate `<head>`, then serializes and writes `dist/<route>/index.html`.
   - Copies the correct canonical, title, description, OG tags, and JSON-LD into each file.

2. **Neutralize the fallback in `index.html`.** Remove the hard-coded homepage canonical and generic title/description from `index.html` (or make them the homepage-only defaults that get overwritten during prerender). Keep viewport, charset, GA, favicon.

3. **Fix `useSEO.ts` cleanup bug.** On unmount it resets `document.title` back to the generic homepage title, which briefly writes the wrong title on route change. Remove that reset.

4. **Vercel routing.** `vercel.json` currently rewrites everything to `/index.html`. Change to serve `dist/<route>/index.html` for that path when it exists, and fall back to the SPA index for unknown routes.

5. **Sitemap & robots.** No change needed to the URL list, but verify `sitemap.xml` and `/favicon.ico` aren't accidentally listed as content URLs (audit §2c).

### Files to change

```text
package.json                 add "prerender" script + puppeteer/jsdom dep
scripts/prerender.mjs        NEW – renders each route to dist/<route>/index.html
scripts/routes.cjs           NEW – single source of truth for the URL list
                             (reused by generate-sitemap.cjs + prerender.mjs)
scripts/generate-sitemap.cjs consume shared routes.cjs
vercel.json                  serve prerendered HTML per route, SPA fallback
index.html                   remove hardcoded canonical / homepage-only title
src/hooks/useSEO.ts          drop the title-reset on unmount
```

### Technical detail

- **Prerender engine:** `puppeteer` (headless Chromium) is more reliable than `jsdom` for React 18 + client routing, and the sandbox already has Chromium available. Alternative: `vite-plugin-ssr` / `vike`, but that's a much bigger refactor — a post-build puppeteer walk is the minimal-risk fix.
- **Wait condition:** after `page.goto(route)`, wait for `document.querySelector('link[rel="canonical"]').href` to differ from the homepage before serialization, so we know `useSEO` has run.
- **Output structure:** for `/insights/thyroid-…`, write `dist/insights/thyroid-…/index.html`. Vercel serves directory `index.html` automatically.
- **Rebuild frequency:** prerender runs on every deploy (`vite build && node scripts/prerender.mjs`), so any new blog post or geo location is picked up automatically.

### What this fixes from the audit

- §2a canonical bug (primary root cause) — resolved.
- §2b "Discovered/Crawled – not indexed" – will unblock over 4–8 weeks as Google recrawls.
- Homepage title/meta upgrade from §5 recommendation can be applied in the same pass to `src/pages/Index.tsx`'s `useSEO` call.

### Not in scope for this change

Anything unrelated to the canonical/metadata bug:
- GBP Bookings/Chat setup (§3a) – client action, not code.
- NAP corrections on `report.aarvakdiagnostics.com` footer (§8) – separate subdomain.
- Form-submission debugging (§3b) – separate task; happy to tackle next.
- `MedicalOrganization` schema expansion (§10 medium-term).

Confirm and I'll implement.
