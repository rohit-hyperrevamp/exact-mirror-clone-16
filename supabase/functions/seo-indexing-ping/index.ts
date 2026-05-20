// Pings Google Indexing API for a single URL. Admin-only.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders, getAdminTokenFromRequest, jsonResponse, verifyAdminToken } from "../_shared/adminAuth.ts";

async function mintAccessToken(refreshToken: string) {
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
  const data = await res.json();
  if (!res.ok) throw new Error(`token_refresh_failed: ${JSON.stringify(data)}`);
  return { accessToken: data.access_token as string, scope: (data.scope as string) ?? "" };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "method_not_allowed" }, 405);

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const v = await verifyAdminToken(getAdminTokenFromRequest(req, body));
  if (!v.ok) return jsonResponse({ error: "unauthorized" }, 401);

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const url = ((body.url as string) ?? "").trim();
  const action = ((body.action as string) ?? "URL_UPDATED").trim();
  const source = (body.source as string) ?? null;

  if (!url || !/^https?:\/\//i.test(url)) return jsonResponse({ error: "invalid_url" }, 400);
  if (action !== "URL_UPDATED" && action !== "URL_DELETED") return jsonResponse({ error: "invalid_action" }, 400);

  const { data: logRow } = await admin.from("seo_indexing_log").insert({ url, action, source, status: "pending" }).select("id").single();
  const logId = logRow?.id as string | undefined;
  async function finish(fields: Record<string, unknown>) {
    if (logId) await admin.from("seo_indexing_log").update(fields).eq("id", logId);
    return jsonResponse({ ok: fields.status === "success", ...fields });
  }

  try {
    const { data: integ } = await admin.from("seo_integrations").select("refresh_token").eq("provider", "google").maybeSingle();
    if (!integ?.refresh_token) return await finish({ status: "error", error: "no_google_connection" });
    const { accessToken, scope } = await mintAccessToken(integ.refresh_token);
    if (!scope.includes("https://www.googleapis.com/auth/indexing")) {
      return await finish({ status: "error", error: "missing_indexing_scope" });
    }
    const apiRes = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ url, type: action }),
    });
    const apiData = await apiRes.json().catch(() => ({}));
    return await finish({
      status: apiRes.ok ? "success" : "error",
      http_status: apiRes.status,
      error: apiRes.ok ? null : (apiData?.error?.message ?? `http_${apiRes.status}`),
    });
  } catch (e) {
    return await finish({ status: "error", error: String(e) });
  }
});
