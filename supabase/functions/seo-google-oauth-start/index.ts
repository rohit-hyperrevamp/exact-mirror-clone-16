// Starts Google OAuth (GSC + GA4 + Indexing). Admin-only.
import { corsHeaders, getAdminTokenFromRequest, jsonResponse, verifyAdminToken } from "../_shared/adminAuth.ts";

const SCOPES = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/indexing",
  "openid", "email",
].join(" ");

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=+$/, "");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const token = getAdminTokenFromRequest(req, body);
    const v = await verifyAdminToken(token);
    if (!v.ok) return jsonResponse({ error: "unauthorized" }, 401);

    const clientId = Deno.env.get("GOOGLE_OAUTH_CLIENT_ID");
    if (!clientId) return jsonResponse({ error: "GOOGLE_OAUTH_CLIENT_ID not configured. Add it in Cloud → Backend → Secrets." }, 500);

    const projectRef = (Deno.env.get("SUPABASE_URL") ?? "").match(/https:\/\/([^.]+)/)?.[1] ?? "";
    const redirectUri = `https://${projectRef}.supabase.co/functions/v1/seo-google-oauth-callback`;

    const returnTo = typeof body?.returnTo === "string" ? body.returnTo : "";
    const statePayload = btoa(JSON.stringify({ uid: v.sub, exp: Date.now() + 10 * 60_000, returnTo }));
    const sig = await sign(statePayload, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const state = `${statePayload}.${sig}`;

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: SCOPES,
      access_type: "offline",
      prompt: "consent",
      include_granted_scopes: "true",
      state,
    });
    return jsonResponse({ url: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}` });
  } catch (e) {
    return jsonResponse({ error: String(e) }, 500);
  }
});
