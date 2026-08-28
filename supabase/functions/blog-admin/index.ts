// Admin API for the automated blog publishing system.
// Auth: the same HMAC admin token used by the rest of the SEO dashboard.
import { createClient } from "npm:@supabase/supabase-js@2";
import {
  corsHeaders,
  getAdminTokenFromRequest,
  jsonResponse,
  verifyAdminToken,
} from "../_shared/adminAuth.ts";
import { blogCalendar } from "../_shared/blogCalendar.ts";

const admin = () =>
  createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/** Scheduled date+time interpreted in Asia/Kolkata, as a UTC instant. */
function scheduledInstant(date: string, time: string): number {
  const [h, m] = (time || "00:00").split(":").map(Number);
  return Date.parse(`${date}T00:00:00Z`) + (h || 0) * 3600_000 + (m || 0) * 60_000 - IST_OFFSET_MS;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  const db = admin();

  // One-time bootstrap: allowed without a token ONLY while the table is empty.
  // It imports calendar content and publishes nothing.
  let bootstrap = false;
  if (String(body.action ?? "") === "bootstrap_import") {
    const { count } = await db.from("blog_posts").select("id", { count: "exact", head: true });
    if ((count ?? 0) === 0) bootstrap = true;
    else return jsonResponse({ error: "already_imported" }, 409);
  }

  if (!bootstrap) {
    const auth = await verifyAdminToken(getAdminTokenFromRequest(req, body));
    if (!auth.ok) return jsonResponse({ error: "unauthorized" }, 401);
  }

  const action = String(body.action ?? "list");

  try {
    switch (action) {
      case "list": {
        const [{ data: posts, error }, { data: settings }, { data: logs }] = await Promise.all([
          db.from("blog_posts").select("*").order("scheduled_date", { ascending: false }),
          db.from("blog_settings").select("*").eq("id", true).maybeSingle(),
          db.from("blog_publish_log").select("*").order("created_at", { ascending: false }).limit(50),
        ]);
        if (error) throw error;
        return jsonResponse({
          posts: posts ?? [],
          settings: settings ?? null,
          logs: logs ?? [],
          server_time: new Date().toISOString(),
        });
      }

      case "import_calendar": {
        // Idempotent: upsert by slug, never downgrade an already-published post.
        const { data: existing } = await db.from("blog_posts").select("slug, status");
        const bySlug = new Map((existing ?? []).map((r) => [r.slug, r.status as string]));
        const now = Date.now();
        let inserted = 0;
        let updated = 0;
        let skipped = 0;

        for (const p of blogCalendar) {
          const current = bySlug.get(p.slug);
          if (current === "published") {
            skipped++;
            continue;
          }
          const due = scheduledInstant(p.scheduled_date, "00:00") <= now;
          const row = {
            title: p.title,
            slug: p.slug,
            category: p.category,
            h1: p.h1,
            meta_title: p.meta_title,
            meta_description: p.meta_description,
            primary_keyword: p.primary_keyword,
            secondary_keywords: p.secondary_keywords,
            excerpt: p.excerpt,
            content: p.content,
            featured_image: p.featured_image,
            read_minutes: p.read_minutes,
            tags: p.tags,
            scheduled_date: p.scheduled_date,
            scheduled_time: "00:00:00",
            timezone: "Asia/Kolkata",
            // Past-dated posts are NEVER auto back-published: they land as drafts
            // flagged for admin review. Future posts are scheduled.
            status: due ? "draft" : "scheduled",
            needs_review: due,
            last_error: due
              ? "Scheduled date already passed at import time — requires admin review before publishing."
              : null,
            source: "calendar-pdf",
          };
          const { error } = await db.from("blog_posts").upsert(row, { onConflict: "slug" });
          if (error) throw error;
          if (current) updated++;
          else inserted++;
        }
        await db.from("blog_publish_log").insert({
          action: "import_calendar",
          ok: true,
          message: `Imported calendar: ${inserted} new, ${updated} updated, ${skipped} already published`,
        });
        return jsonResponse({ inserted, updated, skipped, total: blogCalendar.length });
      }

      case "run_scheduler": {
        const { data, error } = await db.rpc("publish_due_blog_posts");
        if (error) throw error;
        return jsonResponse({ result: Array.isArray(data) ? data[0] : data });
      }

      case "publish_overdue": {
        // Explicit admin action for an overdue / failed article.
        const id = String(body.id ?? "");
        if (!id) return jsonResponse({ error: "id_required" }, 400);
        const { data: post, error: e1 } = await db
          .from("blog_posts")
          .select("id, slug, status")
          .eq("id", id)
          .maybeSingle();
        if (e1) throw e1;
        if (!post) return jsonResponse({ error: "not_found" }, 404);
        if (post.status === "published") return jsonResponse({ ok: true, already: true });

        const { error } = await db
          .from("blog_posts")
          .update({
            status: "published",
            published_at: new Date().toISOString(),
            needs_review: false,
            last_error: null,
          })
          .eq("id", id)
          .neq("status", "published");
        if (error) throw error;
        await db.from("blog_publish_log").insert({
          post_id: id,
          slug: post.slug,
          action: "publish_overdue",
          ok: true,
          message: "Published manually by admin (overdue review)",
        });
        return jsonResponse({ ok: true });
      }

      case "set_status": {
        const id = String(body.id ?? "");
        const status = String(body.status ?? "");
        if (!id || !["draft", "scheduled", "failed"].includes(status)) {
          return jsonResponse({ error: "bad_request" }, 400);
        }
        const { error } = await db
          .from("blog_posts")
          .update({ status, needs_review: false, last_error: null })
          .eq("id", id)
          .neq("status", "published");
        if (error) throw error;
        await db.from("blog_publish_log").insert({
          post_id: id,
          action: "set_status",
          ok: true,
          message: `Status changed to ${status}`,
        });
        return jsonResponse({ ok: true });
      }

      case "unpublish": {
        const id = String(body.id ?? "");
        if (!id) return jsonResponse({ error: "id_required" }, 400);
        const { error } = await db
          .from("blog_posts")
          .update({ status: "draft", published_at: null })
          .eq("id", id);
        if (error) throw error;
        await db.from("blog_publish_log").insert({
          post_id: id,
          action: "unpublish",
          ok: true,
          message: "Unpublished by admin",
        });
        return jsonResponse({ ok: true });
      }

      case "reschedule": {
        const id = String(body.id ?? "");
        const date = String(body.scheduled_date ?? "");
        const time = String(body.scheduled_time ?? "00:00");
        if (!id || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return jsonResponse({ error: "bad_request" }, 400);
        const { error } = await db
          .from("blog_posts")
          .update({
            scheduled_date: date,
            scheduled_time: time.length === 5 ? `${time}:00` : time,
            status: "scheduled",
            needs_review: false,
            last_error: null,
          })
          .eq("id", id)
          .neq("status", "published");
        if (error) throw error;
        return jsonResponse({ ok: true });
      }

      case "update_settings": {
        const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
        if (typeof body.default_publish_time === "string") {
          const t = body.default_publish_time;
          patch.default_publish_time = t.length === 5 ? `${t}:00` : t;
        }
        if (typeof body.auto_publish_enabled === "boolean") {
          patch.auto_publish_enabled = body.auto_publish_enabled;
        }
        if (typeof body.overdue_grace_days === "number") {
          patch.overdue_grace_days = Math.max(0, Math.min(60, Math.round(body.overdue_grace_days)));
        }
        const { error } = await db.from("blog_settings").update(patch).eq("id", true);
        if (error) throw error;

        // Apply the default publish time to every still-unpublished scheduled post.
        if (patch.default_publish_time && body.apply_to_scheduled !== false) {
          await db
            .from("blog_posts")
            .update({ scheduled_time: patch.default_publish_time })
            .eq("status", "scheduled");
        }
        return jsonResponse({ ok: true });
      }

      default:
        return jsonResponse({ error: "unknown_action" }, 400);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await db.from("blog_publish_log").insert({ action, ok: false, message });
    return jsonResponse({ error: message }, 500);
  }
});
