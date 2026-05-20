// SEO data CRUD — proxies for seo_tasks, seo_blog_posts, seo_settings.
// Tables have RLS that blocks anon access; this function authenticates the
// admin via HMAC token then uses the service role to read/write.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders, getAdminTokenFromRequest, jsonResponse, verifyAdminToken } from "../_shared/adminAuth.ts";

type Action =
  | { op: "list_tasks" }
  | { op: "update_task"; id: string; patch: Record<string, unknown> }
  | { op: "create_task"; row: Record<string, unknown> }
  | { op: "delete_task"; id: string }
  | { op: "list_posts" }
  | { op: "update_post"; id: string; patch: Record<string, unknown> }
  | { op: "create_post"; row: Record<string, unknown> }
  | { op: "delete_post"; id: string }
  | { op: "get_settings" }
  | { op: "update_settings"; patch: Record<string, unknown> }
  | { op: "list_indexing" };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const token = getAdminTokenFromRequest(req, body);
    const v = await verifyAdminToken(token);
    if (!v.ok) return jsonResponse({ error: "unauthorized", reason: v.reason }, 401);
    const a = body as unknown as Action;
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    switch (a.op) {
      case "list_tasks": {
        const { data, error } = await admin.from("seo_tasks").select("*")
          .order("scheduled_date", { ascending: true, nullsFirst: false })
          .order("sort_order", { ascending: true });
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ rows: data ?? [] });
      }
      case "update_task": {
        const { data, error } = await admin.from("seo_tasks").update(a.patch).eq("id", a.id).select("*").maybeSingle();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ row: data });
      }
      case "create_task": {
        const { data, error } = await admin.from("seo_tasks").insert(a.row).select("*").maybeSingle();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ row: data });
      }
      case "delete_task": {
        const { error } = await admin.from("seo_tasks").delete().eq("id", a.id);
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ ok: true });
      }
      case "list_posts": {
        const { data, error } = await admin.from("seo_blog_posts").select("*").order("scheduled_date", { ascending: true, nullsFirst: false });
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ rows: data ?? [] });
      }
      case "update_post": {
        const { data, error } = await admin.from("seo_blog_posts").update(a.patch).eq("id", a.id).select("*").maybeSingle();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ row: data });
      }
      case "create_post": {
        const { data, error } = await admin.from("seo_blog_posts").insert(a.row).select("*").maybeSingle();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ row: data });
      }
      case "delete_post": {
        const { error } = await admin.from("seo_blog_posts").delete().eq("id", a.id);
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ ok: true });
      }
      case "get_settings": {
        const { data, error } = await admin.from("seo_settings").select("*").eq("id", 1).maybeSingle();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ row: data });
      }
      case "update_settings": {
        const { data, error } = await admin.from("seo_settings").update(a.patch).eq("id", 1).select("*").maybeSingle();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ row: data });
      }
      case "list_indexing": {
        const { data, error } = await admin.from("seo_indexing_log").select("*").order("pinged_at", { ascending: false }).limit(50);
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ rows: data ?? [] });
      }
      default:
        return jsonResponse({ error: "unknown_op" }, 400);
    }
  } catch (e) {
    return jsonResponse({ error: String(e) }, 500);
  }
});
