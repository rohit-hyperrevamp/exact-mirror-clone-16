
## Goal

Add a private `/admin/seo` dashboard to aarvakdiagnostics.com that mirrors the Atman99 SEO/AEO/GEO dashboard — task tracker, blog pipeline, Google Search Console + GA4 analytics, keyword rankings, and Google Indexing API logs. Fully isolated from the public site (no nav/footer changes, no impact on existing pages).

Login: hardcoded `8373914073` / `98765` (single admin, gated client-side + by a server-side check on the dashboard route).

## Scope

### 1. Routing & isolation
- New route `/admin/seo/*` in `src/App.tsx`, rendered WITHOUT `Navbar`, `Footer`, `SocialSidebar`, `SocialProofNotification` (same treatment as `/hyperrevamp-reporting`).
- `noindex` on all admin pages.
- Add `Disallow: /admin/` to `public/robots.txt`.

### 2. Auth (simple, hardcoded)
- `/admin/login` page with id + password fields.
- On success, store a flag in `sessionStorage` and a hashed token; `AdminGuard` wraps `/admin/seo/*` and redirects to login if missing.
- This is a soft gate (client-side). Sensitive data is protected by RLS on the Supabase tables (admin-only via a `is_admin` flag on a `seo_admins` table seeded with the one user).

### 3. Database (new tables, separate from existing `form_submissions`)
- `seo_admins` — id + login_id + password_hash, RLS read-only via service role.
- `seo_tasks` — full task plan (section SEO/AEO/GEO, category, target_url, target_keyword, content_brief, status, scheduled_date, completed_at, notes…).
- `seo_blog_posts` — blog pipeline (slug, title, meta, status draft→deployed, approval flow).
- `seo_settings` — single row (blog_approval_required, auto_execute, last_auto_run_at).
- `seo_integrations` — stores Google OAuth refresh token, property URL, etc.
- `seo_indexing_log` — last N Google Indexing API pings.
- All tables: RLS enabled, service-role only (edge functions act on behalf of the admin).

### 4. Dashboard UI (copied & adapted from Atman99)
Files under `src/pages/admin/`:
- `AdminLayout.tsx` — sidebar shell (just "SEO" + sub-tabs).
- `AdminSeo.tsx` — main tab with KPI tiles, day-by-day task list, blog pipeline, filters, drill-in sheet.
- `AdminSeoAnalytics.tsx` — GA4 + GSC KPIs, device split, top queries/pages/countries.
- `AdminSeoKeywords.tsx` — keyword rank table from GSC.
- `AdminSeoIndexing.tsx` — Indexing API log + manual ping.
- Branded with Aarvak colors (navy `#001260`, blue `#0172B6`, yellow `#FFC107`) instead of Atman violet/emerald.
- Replaces atman99.in references with aarvakdiagnostics.com everywhere.

### 5. Edge functions (cloned & adapted)
- `seo-google-oauth-start` — kicks off Google OAuth.
- `seo-google-oauth-callback` — stores refresh token in `seo_integrations`.
- `seo-google-analytics-fetch` — pulls GA4 + GSC metrics.
- `seo-keywords-status` — pulls keyword positions from GSC for tracked keywords.
- `seo-indexing-ping` — calls Google Indexing API.
- `seo-auto-execute` — runs due tasks (stub initially — the task auto-execution logic is Atman99-specific; we'll keep it as a "mark done + log" runner so the UI works, without auto-editing aarvak's content).

### 6. Secrets the user will need to provide later (won't block UI from rendering)
- `GOOGLE_OAUTH_CLIENT_ID`
- `GOOGLE_OAUTH_CLIENT_SECRET`
- `GA4_PROPERTY_ID` (for aarvak's GA4 property)

The dashboard will render and the task tracker will work without these; the Analytics / Keywords / Indexing tabs will show "Connect Google" until OAuth is set up.

### 7. What WILL NOT change
- No edits to any existing public page (Index, Pathology, Hematology, blogs, etc.).
- No edits to `src/components/Navbar`, `Footer`, `Insights`, `BlogPost`, `useSEO`, etc.
- No edits to existing `form_submissions` table or `send-email` edge function.
- No edits to sitemap, existing routes, or SEO of public pages.

## Deliverables (file list)

Created:
- `src/pages/AdminLogin.tsx`
- `src/pages/admin/AdminLayout.tsx`
- `src/pages/admin/AdminSeo.tsx`
- `src/pages/admin/AdminSeoAnalytics.tsx`
- `src/pages/admin/AdminSeoKeywords.tsx`
- `src/pages/admin/AdminSeoIndexing.tsx`
- `src/components/AdminGuard.tsx`
- `supabase/functions/seo-google-oauth-start/index.ts`
- `supabase/functions/seo-google-oauth-callback/index.ts`
- `supabase/functions/seo-google-analytics-fetch/index.ts`
- `supabase/functions/seo-keywords-status/index.ts`
- `supabase/functions/seo-indexing-ping/index.ts`
- `supabase/functions/seo-auto-execute/index.ts`
- Migration creating 5 new `seo_*` tables + RLS + seed admin row.

Edited:
- `src/App.tsx` — add `/admin/login` and `/admin/seo/*` routes, exclude them from chrome.
- `public/robots.txt` — add `Disallow: /admin/`.

## Confirm before I start

1. **Empty task plan** — Atman99's dashboard ships with ~30 days of pre-filled SEO/AEO/GEO tasks specific to that brand. For Aarvak, do you want me to (a) start with an empty task tracker you populate yourself, or (b) seed a similar 30-day plan tailored to Aarvak (hematology, pathology, radiology pages, Gurugram GEO, etc.)? **Default: (b)** — seeded plan.

2. **Google OAuth secrets** — Analytics/Keywords/Indexing tabs require Google OAuth credentials + your GA4 property ID. I'll build the UI and edge functions; you'll add the secrets afterwards via Cloud settings when you're ready. OK to proceed and you'll wire creds later?

Reply "go" (or with answers) and I'll build it.
