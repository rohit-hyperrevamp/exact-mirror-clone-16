// Fetches GSC + GA4 metrics using the stored Google refresh token. Admin-only.
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
  if (!res.ok) { console.error("refresh failed", await res.text()); return null; }
  return await res.json() as { access_token: string; expires_in: number };
}

async function gscQuery(accessToken: string, siteUrl: string, body: unknown) {
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) { console.error("gsc error", res.status, await res.text()); return { rows: [] }; }
  return await res.json();
}

async function ga4(accessToken: string, propertyId: string, body: unknown) {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) { console.error("ga4 error", res.status, await res.text()); return { rows: [] }; }
  return await res.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const tok = getAdminTokenFromRequest(req, body);
    const v = await verifyAdminToken(tok);
    if (!v.ok) return jsonResponse({ error: "unauthorized" }, 401);

    const startDate = body.startDate as string;
    const endDate = body.endDate as string;
    const compareStart = (body.compareStart as string) ?? null;
    const compareEnd = (body.compareEnd as string) ?? null;
    if (!startDate || !endDate) return jsonResponse({ error: "startDate/endDate required" }, 400);

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: integ } = await admin.from("seo_integrations").select("*").eq("provider", "google").maybeSingle();
    if (!integ?.refresh_token) return jsonResponse({ error: "not_connected" }, 400);

    let accessToken = integ.access_token as string | null;
    const exp = integ.token_expires_at ? new Date(integ.token_expires_at).getTime() : 0;
    if (!accessToken || exp - Date.now() < 60_000) {
      const r = await refreshAccessToken(integ.refresh_token);
      if (!r) {
        await admin.from("seo_integrations").update({ last_error: "refresh_failed" }).eq("id", integ.id);
        return jsonResponse({ error: "refresh_failed" }, 502);
      }
      accessToken = r.access_token;
      await admin.from("seo_integrations").update({
        access_token: accessToken,
        token_expires_at: new Date(Date.now() + r.expires_in * 1000).toISOString(),
        last_refreshed_at: new Date().toISOString(),
        last_error: null,
      }).eq("id", integ.id);
    }

    const siteUrl = integ.property_url ?? "https://www.aarvakdiagnostics.com/";
    const ga4PropId = Deno.env.get("GA4_PROPERTY_ID");

    const [gscTotals, gscQueries, gscPages, gscDevice, gscCountry, gscTotalsPrev] = await Promise.all([
      gscQuery(accessToken!, siteUrl, { startDate, endDate, dimensions: [] }),
      gscQuery(accessToken!, siteUrl, { startDate, endDate, dimensions: ["query"], rowLimit: 25 }),
      gscQuery(accessToken!, siteUrl, { startDate, endDate, dimensions: ["page"], rowLimit: 25 }),
      gscQuery(accessToken!, siteUrl, { startDate, endDate, dimensions: ["device"] }),
      gscQuery(accessToken!, siteUrl, { startDate, endDate, dimensions: ["country"], rowLimit: 10 }),
      compareStart && compareEnd
        ? gscQuery(accessToken!, siteUrl, { startDate: compareStart, endDate: compareEnd, dimensions: [] })
        : Promise.resolve(null),
    ]);

    let ga4Out: Record<string, unknown> | null = null;
    if (ga4PropId) {
      const metrics = [
        { name: "totalUsers" }, { name: "newUsers" }, { name: "sessions" },
        { name: "screenPageViews" }, { name: "averageSessionDuration" },
        { name: "engagementRate" }, { name: "bounceRate" },
      ];
      const [tot, prev, dev, src, pgs] = await Promise.all([
        ga4(accessToken!, ga4PropId, { dateRanges: [{ startDate, endDate }], metrics }),
        compareStart && compareEnd ? ga4(accessToken!, ga4PropId, { dateRanges: [{ startDate: compareStart, endDate: compareEnd }], metrics }) : Promise.resolve(null),
        ga4(accessToken!, ga4PropId, { dateRanges: [{ startDate, endDate }], dimensions: [{ name: "deviceCategory" }], metrics: [{ name: "totalUsers" }, { name: "sessions" }] }),
        ga4(accessToken!, ga4PropId, { dateRanges: [{ startDate, endDate }], dimensions: [{ name: "sessionDefaultChannelGroup" }], metrics: [{ name: "sessions" }, { name: "totalUsers" }], orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 10 }),
        ga4(accessToken!, ga4PropId, { dateRanges: [{ startDate, endDate }], dimensions: [{ name: "pagePath" }], metrics: [{ name: "screenPageViews" }, { name: "totalUsers" }], orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }], limit: 15 }),
      ]);
      ga4Out = {
        totals: tot.rows?.[0] ?? null,
        totalsPrev: prev?.rows?.[0] ?? null,
        device: dev.rows ?? [],
        sources: src.rows ?? [],
        pages: pgs.rows ?? [],
      };
    }

    return jsonResponse({
      connection: { siteUrl, ga4PropertyId: ga4PropId ?? null, connectedAt: integ.connected_at },
      range: { startDate, endDate, compareStart, compareEnd },
      gsc: {
        totals: gscTotals.rows?.[0] ?? null,
        totalsPrev: gscTotalsPrev?.rows?.[0] ?? null,
        queries: gscQueries.rows ?? [],
        pages: gscPages.rows ?? [],
        device: gscDevice.rows ?? [],
        country: gscCountry.rows ?? [],
      },
      ga4: ga4Out,
    });
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: String(e) }, 500);
  }
});
