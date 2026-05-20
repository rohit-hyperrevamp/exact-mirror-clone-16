// Keyword ranking status across our SEO plan (tasks + blog posts).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders, getAdminTokenFromRequest, jsonResponse, verifyAdminToken } from "../_shared/adminAuth.ts";

async function refreshAccessToken(refreshToken: string) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: Deno.env.get("GOOGLE_OAUTH_CLIENT_ID")!,
      client_secret: Deno.env.get("GOOGLE_OAUTH_CLIENT_SECRET")!,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) return null;
  return await res.json() as { access_token: string; expires_in: number };
}

async function gscQuery(accessToken: string, siteUrl: string, body: unknown) {
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) return { rows: [] as Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }> };
  return await res.json() as { rows?: Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }> };
}

function ymd(d: Date) { return d.toISOString().slice(0, 10); }

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const v = await verifyAdminToken(getAdminTokenFromRequest(req, body));
    if (!v.ok) return jsonResponse({ error: "unauthorized" }, 401);

    const days = Math.max(1, Math.min(90, Number(body.days ?? 28)));
    const end = new Date(); end.setUTCDate(end.getUTCDate() - 1);
    const start = new Date(); start.setUTCDate(start.getUTCDate() - days);
    const startDate = ymd(start), endDate = ymd(end);

    type Src = { kind: "task" | "blog"; id: string; title: string; role: "primary" | "secondary"; url: string | null };
    const map = new Map<string, { keyword: string; sources: Src[] }>();
    const add = (raw: string | null | undefined, src: Src) => {
      if (!raw) return;
      const k = raw.trim(); if (!k) return;
      const key = k.toLowerCase();
      if (!map.has(key)) map.set(key, { keyword: k, sources: [] });
      map.get(key)!.sources.push(src);
    };

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const [tasksRes, postsRes] = await Promise.all([
      admin.from("seo_tasks").select("id,title,target_keyword,secondary_keywords,target_url"),
      admin.from("seo_blog_posts").select("id,title,primary_keyword,secondary_keywords,url"),
    ]);
    for (const t of (tasksRes.data ?? [])) {
      add(t.target_keyword, { kind: "task", id: t.id, title: t.title, role: "primary", url: t.target_url });
      for (const s of (t.secondary_keywords ?? [])) add(s, { kind: "task", id: t.id, title: t.title, role: "secondary", url: t.target_url });
    }
    for (const p of (postsRes.data ?? [])) {
      add(p.primary_keyword, { kind: "blog", id: p.id, title: p.title, role: "primary", url: p.url });
      for (const s of (p.secondary_keywords ?? [])) add(s, { kind: "blog", id: p.id, title: p.title, role: "secondary", url: p.url });
    }

    const { data: integ } = await admin.from("seo_integrations").select("*").eq("provider", "google").maybeSingle();
    if (!integ?.refresh_token) {
      return jsonResponse({
        error: "not_connected",
        keywords: Array.from(map.values()).map((v) => ({ ...v, status: "not_connected", clicks: 0, impressions: 0, ctr: 0, position: null })),
        range: { startDate, endDate, days },
        total: map.size, ranking: 0,
      });
    }

    let accessToken = integ.access_token as string | null;
    const exp = integ.token_expires_at ? new Date(integ.token_expires_at).getTime() : 0;
    if (!accessToken || exp - Date.now() < 60_000) {
      const r = await refreshAccessToken(integ.refresh_token);
      if (!r) return jsonResponse({ error: "refresh_failed" }, 502);
      accessToken = r.access_token;
      await admin.from("seo_integrations").update({
        access_token: accessToken,
        token_expires_at: new Date(Date.now() + r.expires_in * 1000).toISOString(),
        last_refreshed_at: new Date().toISOString(),
      }).eq("id", integ.id);
    }

    const siteUrl = integ.property_url ?? "https://www.aarvakdiagnostics.com/";
    const gsc = await gscQuery(accessToken!, siteUrl, { startDate, endDate, dimensions: ["query"], rowLimit: 25000 });
    const byQuery = new Map<string, { clicks: number; impressions: number; ctr: number; position: number }>();
    for (const r of (gsc.rows ?? [])) {
      const q = (r.keys?.[0] ?? "").toLowerCase();
      if (q) byQuery.set(q, { clicks: r.clicks ?? 0, impressions: r.impressions ?? 0, ctr: r.ctr ?? 0, position: r.position ?? 0 });
    }

    const keywords = Array.from(map.values()).map((e) => {
      const m = byQuery.get(e.keyword.toLowerCase());
      if (!m || m.impressions === 0) return { ...e, status: "na" as const, clicks: 0, impressions: 0, ctr: 0, position: null };
      return { ...e, status: "ranking" as const, clicks: m.clicks, impressions: m.impressions, ctr: m.ctr, position: m.position };
    }).sort((a, b) => {
      if (a.position == null && b.position != null) return 1;
      if (b.position == null && a.position != null) return -1;
      if (a.position != null && b.position != null) return a.position - b.position;
      return a.keyword.localeCompare(b.keyword);
    });

    return jsonResponse({
      range: { startDate, endDate, days },
      siteUrl,
      generatedAt: new Date().toISOString(),
      total: keywords.length,
      ranking: keywords.filter((k) => k.status === "ranking").length,
      keywords,
    });
  } catch (e) {
    return jsonResponse({ error: String(e) }, 500);
  }
});
