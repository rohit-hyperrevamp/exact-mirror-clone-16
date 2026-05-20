// Admin login for the SEO dashboard.
// POST { login_id, password } -> { token } (HMAC, 7d TTL)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders, jsonResponse, sha256Hex, signAdminToken } from "../_shared/adminAuth.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "method_not_allowed" }, 405);
  try {
    const { login_id, password } = await req.json().catch(() => ({} as Record<string, string>));
    if (!login_id || !password) return jsonResponse({ error: "missing_credentials" }, 400);
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data, error } = await admin.from("seo_admins").select("id, password_hash").eq("login_id", login_id).maybeSingle();
    if (error) return jsonResponse({ error: "lookup_failed" }, 500);
    if (!data) return jsonResponse({ error: "invalid_credentials" }, 401);
    const hash = await sha256Hex(password);
    if (hash !== data.password_hash) return jsonResponse({ error: "invalid_credentials" }, 401);
    const token = await signAdminToken(data.id);
    return jsonResponse({ token, expiresIn: 60 * 60 * 24 * 7 });
  } catch (e) {
    return jsonResponse({ error: String(e) }, 500);
  }
});
