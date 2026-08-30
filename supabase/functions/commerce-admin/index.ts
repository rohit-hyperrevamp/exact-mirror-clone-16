// Aarvak Diagnostics commerce backend for the admin dashboard.
// Single POST endpoint: { action, adminToken, ...payload }
// All DB access happens here with the service role — the tables are locked to the public.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders, getAdminTokenFromRequest, jsonResponse, verifyAdminToken } from "../_shared/adminAuth.ts";
import { TEST_CATALOG } from "../_shared/testCatalog.ts";

const admin = () =>
  createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });

type Body = Record<string, unknown>;

function rangeStart(range: string, from?: string): string | null {
  if (from) return new Date(from).toISOString();
  const days: Record<string, number> = { today: 1, "7d": 7, "30d": 30, "90d": 90 };
  if (range === "all") return null;
  if (range === "month") {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), 1).toISOString();
  }
  const d = days[range] ?? 30;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (d - 1));
  return start.toISOString();
}

const num = (v: unknown) => Number(v ?? 0) || 0;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "method_not_allowed" }, 405);

  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return jsonResponse({ error: "bad_json" }, 400);
  }

  const auth = await verifyAdminToken(getAdminTokenFromRequest(req, body));
  if (!auth.ok) return jsonResponse({ error: "unauthorized", reason: auth.reason }, 401);

  const db = admin();
  const action = String(body.action ?? "");

  try {
    switch (action) {
      // ---------------- Dashboard ----------------
      case "dashboard": {
        const start = rangeStart(String(body.range ?? "30d"), body.from as string | undefined);
        const end = body.to ? new Date(String(body.to)).toISOString() : null;

        let oq = db.from("test_orders").select("*").order("created_at", { ascending: false });
        if (start) oq = oq.gte("created_at", start);
        if (end) oq = oq.lte("created_at", end);
        const { data: orders = [] } = await oq;

        const ids = (orders ?? []).map((o: Record<string, unknown>) => o.id);
        const { data: items = [] } = ids.length
          ? await db.from("test_order_items").select("order_id, qty, test_name").in("order_id", ids)
          : { data: [] as Record<string, unknown>[] };

        const [{ count: customers }, { count: activeTests }, { data: carts = [] }] = await Promise.all([
          db.from("customers").select("id", { count: "exact", head: true }),
          db.from("lab_tests").select("id", { count: "exact", head: true }).eq("status", "live"),
          db.from("abandoned_carts").select("subtotal, recovered"),
        ]);

        const paid = (orders ?? []).filter((o: Record<string, unknown>) => o.payment_status === "paid");
        const revenue = (orders ?? []).reduce((s: number, o: Record<string, unknown>) => s + num(o.total), 0);
        const paidRevenue = paid.reduce((s: number, o: Record<string, unknown>) => s + num(o.total), 0);
        const payAtLabPending = (orders ?? [])
          .filter((o: Record<string, unknown>) => o.payment_method === "pay_at_lab" && o.payment_status !== "paid")
          .reduce((s: number, o: Record<string, unknown>) => s + num(o.total), 0);
        const pendingOrders = (orders ?? []).filter((o: Record<string, unknown>) => o.status === "pending").length;

        // daily revenue trend
        const buckets = new Map<string, { date: string; revenue: number; orders: number }>();
        for (const o of orders ?? []) {
          const key = String(o.created_at).slice(0, 10);
          const b = buckets.get(key) ?? { date: key, revenue: 0, orders: 0 };
          b.revenue += num(o.total);
          b.orders += 1;
          buckets.set(key, b);
        }
        const trend = [...buckets.values()].sort((a, b) => a.date.localeCompare(b.date));

        // top tests
        const tally = new Map<string, number>();
        for (const it of items ?? []) {
          const name = String(it.test_name ?? "");
          tally.set(name, (tally.get(name) ?? 0) + Number(it.qty ?? 1));
        }
        const topTests = [...tally.entries()]
          .map(([name, qty]) => ({ name, qty }))
          .sort((a, b) => b.qty - a.qty)
          .slice(0, 8);

        return jsonResponse({
          revenue,
          paidRevenue,
          payAtLabPending,
          paidOrders: paid.length,
          totalOrders: (orders ?? []).length,
          tests: (items ?? []).reduce((s: number, i: Record<string, unknown>) => s + Number(i.qty ?? 1), 0),
          aov: paid.length ? paidRevenue / paid.length : 0,
          customers: customers ?? 0,
          activeTests: activeTests ?? 0,
          pendingOrders,
          openCarts: (carts ?? []).filter((c: Record<string, unknown>) => !c.recovered).length,
          cartValue: (carts ?? [])
            .filter((c: Record<string, unknown>) => !c.recovered)
            .reduce((s: number, c: Record<string, unknown>) => s + num(c.subtotal), 0),
          trend,
          topTests,
          recentOrders: (orders ?? []).slice(0, 8),
        });
      }

      // ---------------- Catalog ----------------
      case "list_tests": {
        const { data, error } = await db
          .from("lab_tests")
          .select("*")
          .order("sort_order", { ascending: true })
          .limit(2000);
        if (error) throw error;
        return jsonResponse({ rows: data ?? [] });
      }
      case "get_test": {
        const { data, error } = await db.from("lab_tests").select("*").eq("id", body.id).maybeSingle();
        if (error) throw error;
        return jsonResponse({ row: data });
      }
      case "create_test": {
        const { data, error } = await db
          .from("lab_tests")
          .insert({ slug: body.slug, name: body.name, category: body.category ?? "Pathology" })
          .select()
          .single();
        if (error) throw error;
        return jsonResponse({ row: data });
      }
      case "update_test": {
        const patch = (body.patch ?? {}) as Body;
        const { data, error } = await db.from("lab_tests").update(patch).eq("id", body.id).select().single();
        if (error) throw error;
        return jsonResponse({ row: data });
      }
      case "delete_test": {
        const { error } = await db.from("lab_tests").delete().eq("id", body.id);
        if (error) throw error;
        return jsonResponse({ ok: true });
      }
      case "seed_catalog": {
        let inserted = 0;
        let skipped = 0;
        const { data: existing = [] } = await db.from("lab_tests").select("slug").limit(2000);
        const have = new Set((existing ?? []).map((r: Record<string, unknown>) => String(r.slug)));
        const pending = TEST_CATALOG.filter((t) => !have.has(t.slug));
        skipped = TEST_CATALOG.length - pending.length;
        for (let i = 0; i < pending.length; i += 100) {
          const chunk = pending.slice(i, i + 100);
          const { error } = await db.from("lab_tests").insert(chunk);
          if (error) throw error;
          inserted += chunk.length;
        }
        const { count } = await db.from("lab_tests").select("id", { count: "exact", head: true });
        return jsonResponse({ inserted, skipped, total: count ?? 0 });
      }

      // ---------------- Orders ----------------
      case "list_orders": {
        let q = db.from("test_orders").select("*").order("created_at", { ascending: false }).limit(1000);
        if (body.status && body.status !== "all") q = q.eq("status", body.status);
        const { data, error } = await q;
        if (error) throw error;
        const ids = (data ?? []).map((o: Record<string, unknown>) => o.id);
        const { data: items = [] } = ids.length
          ? await db.from("test_order_items").select("*").in("order_id", ids)
          : { data: [] as Record<string, unknown>[] };
        const byOrder = new Map<string, Record<string, unknown>[]>();
        for (const it of items ?? []) {
          const k = String(it.order_id);
          byOrder.set(k, [...(byOrder.get(k) ?? []), it]);
        }
        return jsonResponse({
          rows: (data ?? []).map((o: Record<string, unknown>) => ({ ...o, items: byOrder.get(String(o.id)) ?? [] })),
        });
      }
      case "get_order": {
        const { data: order, error } = await db.from("test_orders").select("*").eq("id", body.id).maybeSingle();
        if (error) throw error;
        if (!order) return jsonResponse({ error: "not_found" }, 404);
        const [{ data: items = [] }, { data: payments = [] }] = await Promise.all([
          db.from("test_order_items").select("*").eq("order_id", body.id),
          db.from("payments").select("*").eq("order_id", body.id).order("created_at", { ascending: false }),
        ]);
        return jsonResponse({ order, items: items ?? [], payments: payments ?? [] });
      }
      case "update_order": {
        const patch = (body.patch ?? {}) as Body;
        const { data, error } = await db.from("test_orders").update(patch).eq("id", body.id).select().single();
        if (error) throw error;
        return jsonResponse({ row: data });
      }
      case "mark_order_paid": {
        const { data: order, error } = await db
          .from("test_orders")
          .update({ payment_status: "paid", paid_at: new Date().toISOString() })
          .eq("id", body.id)
          .select()
          .single();
        if (error) throw error;
        await db.from("payments").insert({
          order_id: order.id,
          order_no: order.order_no,
          customer_name: order.customer_name,
          customer_phone: order.customer_phone,
          provider: String(body.provider ?? "manual"),
          method: String(body.method ?? order.payment_method ?? "manual"),
          reference: (body.reference as string) ?? null,
          amount: order.total,
          status: "paid",
          paid_at: new Date().toISOString(),
        });
        return jsonResponse({ row: order });
      }

      // ---------------- Abandoned carts ----------------
      case "list_carts": {
        const { data, error } = await db
          .from("abandoned_carts")
          .select("*")
          .order("updated_at", { ascending: false })
          .limit(1000);
        if (error) throw error;
        return jsonResponse({ rows: data ?? [] });
      }
      case "update_cart": {
        const { error } = await db.from("abandoned_carts").update((body.patch ?? {}) as Body).eq("id", body.id);
        if (error) throw error;
        return jsonResponse({ ok: true });
      }

      // ---------------- Payments ----------------
      case "list_payments": {
        let q = db.from("payments").select("*").order("created_at", { ascending: false }).limit(1000);
        if (body.status && body.status !== "all") q = q.eq("status", body.status);
        const { data, error } = await q;
        if (error) throw error;
        return jsonResponse({ rows: data ?? [] });
      }
      case "record_payment": {
        const { data, error } = await db
          .from("payments")
          .insert({
            order_id: (body.order_id as string) ?? null,
            order_no: (body.order_no as string) ?? null,
            customer_name: (body.customer_name as string) ?? null,
            customer_phone: (body.customer_phone as string) ?? null,
            provider: String(body.provider ?? "manual"),
            method: (body.method as string) ?? null,
            reference: (body.reference as string) ?? null,
            amount: num(body.amount),
            status: String(body.status ?? "created"),
            paid_at: body.status === "paid" ? new Date().toISOString() : null,
          })
          .select()
          .single();
        if (error) throw error;
        return jsonResponse({ row: data });
      }
      case "update_payment": {
        const patch = { ...((body.patch ?? {}) as Body) };
        if (patch.status === "paid" && !patch.paid_at) patch.paid_at = new Date().toISOString();
        const { error } = await db.from("payments").update(patch).eq("id", body.id);
        if (error) throw error;
        return jsonResponse({ ok: true });
      }

      // ---------------- Customers ----------------
      case "list_customers": {
        const { data: rows = [], error } = await db
          .from("customers")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(2000);
        if (error) throw error;
        const { data: orders = [] } = await db
          .from("test_orders")
          .select("customer_phone, total, payment_status, created_at");
        const stats = new Map<string, { orders: number; spend: number; last: string | null }>();
        for (const o of orders ?? []) {
          const k = String(o.customer_phone ?? "");
          const s = stats.get(k) ?? { orders: 0, spend: 0, last: null };
          s.orders += 1;
          if (o.payment_status === "paid") s.spend += num(o.total);
          if (!s.last || String(o.created_at) > s.last) s.last = String(o.created_at);
          stats.set(k, s);
        }
        const { data: members = [] } = await db.from("loyalty_members").select("phone, points_balance, tier");
        const memberBy = new Map((members ?? []).map((m: Record<string, unknown>) => [String(m.phone), m]));
        return jsonResponse({
          rows: (rows ?? []).map((c: Record<string, unknown>) => {
            const s = stats.get(String(c.phone)) ?? { orders: 0, spend: 0, last: null };
            const m = memberBy.get(String(c.phone));
            return { ...c, orders: s.orders, spend: s.spend, last_order_at: s.last, points: m?.points_balance ?? 0, tier: m?.tier ?? null };
          }),
        });
      }
      case "upsert_customer": {
        const row = (body.row ?? {}) as Body;
        const { data, error } = await db.from("customers").upsert(row, { onConflict: "phone" }).select().single();
        if (error) throw error;
        return jsonResponse({ row: data });
      }

      // ---------------- Collection centers ----------------
      case "list_centers": {
        const { data, error } = await db
          .from("collection_centers")
          .select("*")
          .order("sort_order", { ascending: true })
          .order("name", { ascending: true });
        if (error) throw error;
        return jsonResponse({ rows: data ?? [] });
      }
      case "upsert_center": {
        const row = { ...((body.row ?? {}) as Body) };
        const { data, error } = row.id
          ? await db.from("collection_centers").update(row).eq("id", row.id).select().single()
          : await db.from("collection_centers").insert(row).select().single();
        if (error) throw error;
        return jsonResponse({ row: data });
      }
      case "delete_center": {
        const { error } = await db.from("collection_centers").delete().eq("id", body.id);
        if (error) throw error;
        return jsonResponse({ ok: true });
      }

      // ---------------- Booking & cancellation policy ----------------
      case "get_booking_policy": {
        const { data, error } = await db.from("booking_settings").select("*").limit(1).maybeSingle();
        if (error) throw error;
        if (!data) {
          const { data: created, error: e2 } = await db
            .from("booking_settings")
            .insert({ id: true })
            .select()
            .single();
          if (e2) throw e2;
          return jsonResponse({ policy: created });
        }
        return jsonResponse({ policy: data });
      }
      case "update_booking_policy": {
        const row = (body.row ?? {}) as Body;
        const patch = {
          no_refund_hours: Math.max(0, num(row.no_refund_hours)),
          partial_refund_hours: Math.max(0, num(row.partial_refund_hours)),
          partial_refund_percent: Math.min(100, Math.max(0, num(row.partial_refund_percent))),
          reschedule_allowed: Boolean(row.reschedule_allowed),
          reschedule_min_hours: Math.max(0, num(row.reschedule_min_hours)),
          policy_text: String(row.policy_text ?? "").slice(0, 4000),
        };
        const { data, error } = await db
          .from("booking_settings")
          .upsert({ id: true, ...patch })
          .select()
          .single();
        if (error) throw error;
        return jsonResponse({ policy: data });
      }


      // ---------------- Promo codes ----------------
      case "list_promos": {
        const { data, error } = await db.from("promo_codes").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        return jsonResponse({ rows: data ?? [] });
      }
      case "upsert_promo": {
        const row = { ...((body.row ?? {}) as Body) };
        if (typeof row.code === "string") row.code = row.code.toUpperCase().trim();
        const { data, error } = row.id
          ? await db.from("promo_codes").update(row).eq("id", row.id).select().single()
          : await db.from("promo_codes").insert(row).select().single();
        if (error) throw error;
        return jsonResponse({ row: data });
      }
      case "delete_promo": {
        const { error } = await db.from("promo_codes").delete().eq("id", body.id);
        if (error) throw error;
        return jsonResponse({ ok: true });
      }

      // ---------------- Rewards & loyalty ----------------
      case "get_loyalty": {
        const [{ data: config }, { data: members = [] }, { data: campaigns = [] }] = await Promise.all([
          db.from("loyalty_settings").select("*").limit(1).maybeSingle(),
          db.from("loyalty_members").select("*").order("points_balance", { ascending: false }).limit(500),
          db.from("loyalty_campaigns").select("*").order("created_at", { ascending: false }),
        ]);
        const list = members ?? [];
        return jsonResponse({
          config,
          campaigns: campaigns ?? [],
          members: list,
          stats: {
            members: list.length,
            points: list.reduce((s: number, m: Record<string, unknown>) => s + Number(m.points_balance ?? 0), 0),
            lifetime: list.reduce((s: number, m: Record<string, unknown>) => s + Number(m.lifetime_points ?? 0), 0),
          },
        });
      }
      case "update_loyalty": {
        const patch = { ...((body.patch ?? {}) as Body), id: true, updated_at: new Date().toISOString() };
        const { error } = await db.from("loyalty_settings").upsert(patch, { onConflict: "id" });
        if (error) throw error;
        return jsonResponse({ ok: true });
      }
      case "upsert_campaign": {
        const row = { ...((body.row ?? {}) as Body) };
        if (typeof row.code === "string") row.code = row.code.toUpperCase().trim();
        const { error } = row.id
          ? await db.from("loyalty_campaigns").update(row).eq("id", row.id)
          : await db.from("loyalty_campaigns").insert(row);
        if (error) throw error;
        return jsonResponse({ ok: true });
      }
      case "delete_campaign": {
        const { error } = await db.from("loyalty_campaigns").delete().eq("id", body.id);
        if (error) throw error;
        return jsonResponse({ ok: true });
      }
      case "upsert_member": {
        const row = (body.row ?? {}) as Body;
        const { error } = await db.from("loyalty_members").upsert(row, { onConflict: "phone" });
        if (error) throw error;
        return jsonResponse({ ok: true });
      }

      default:
        return jsonResponse({ error: "unknown_action", action }, 400);
    }
  } catch (e) {
    return jsonResponse({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});
