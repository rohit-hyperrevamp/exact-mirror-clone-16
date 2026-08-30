// Patient-facing booking + portal API for Aarvak Diagnostics.
// Single POST endpoint: { action, patientToken?, ...payload }
// All DB access happens here with the service role — the tables are locked down.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders, jsonResponse } from "../_shared/adminAuth.ts";
import { getPatientTokenFromRequest, signPatientToken, verifyPatientToken } from "../_shared/patientAuth.ts";

// Mock OTP for the demo flow — every phone number verifies with this code.
const MOCK_OTP = "111111";

const admin = () =>
  createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });

type Body = Record<string, unknown>;

const str = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const num = (v: unknown) => Number(v ?? 0) || 0;

function normalisePhone(raw: unknown): string | null {
  const digits = str(raw, 25).replace(/\D/g, "");
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  if (!/^[6-9]\d{9}$/.test(local)) return null;
  return local;
}

const PUBLIC_ACTIONS = new Set(["catalog", "test", "policy", "centers", "send_otp", "verify_otp", "promos", "quote_promo"]);

type Promo = {
  id: string;
  code: string;
  description: string | null;
  discount_type: string;
  discount_value: number;
  min_order: number;
  max_redemptions: number | null;
  times_used: number;
  starts_at: string | null;
  ends_at: string | null;
  status: string;
};

/** Promo codes a patient can currently use. */
// deno-lint-ignore no-explicit-any
async function activePromos(db: any): Promise<Promo[]> {
  const nowIso = new Date().toISOString();
  const { data = [] } = await db.from("promo_codes").select("*").eq("status", "active");
  return (data ?? []).filter((p: Promo) => {
    if (p.starts_at && p.starts_at > nowIso) return false;
    if (p.ends_at && p.ends_at < nowIso) return false;
    if (p.max_redemptions != null && Number(p.times_used ?? 0) >= Number(p.max_redemptions)) return false;
    return true;
  });
}

/** Rupee discount a promo gives on `subtotal`, capped at the subtotal. */
export function promoDiscount(promo: { discount_type: string; discount_value: number }, subtotal: number): number {
  const raw =
    promo.discount_type === "percent" ? (subtotal * Number(promo.discount_value ?? 0)) / 100 : Number(promo.discount_value ?? 0);
  return Math.min(subtotal, Math.max(0, Math.round(raw * 100) / 100));
}

type LoyaltyConfig = {
  earn_percent: number;
  point_to_rupee: number;
  min_order_amount: number;
  max_earn_per_order: number;
};

function tierFor(lifetime: number): string {
  if (lifetime >= 5000) return "platinum";
  if (lifetime >= 2000) return "gold";
  if (lifetime >= 500) return "silver";
  return "bronze";
}

/** Credit loyalty points for a paid booking. Never throws — rewards must not break a booking. */
// deno-lint-ignore no-explicit-any
async function awardLoyaltyPoints(db: any, opts: { customerId: string; phone: string | null; name: string | null; amount: number }) {
  try {
    const { data: cfg } = await db.from("loyalty_settings").select("*").limit(1).maybeSingle();
    const c = (cfg ?? { earn_percent: 5, point_to_rupee: 1, min_order_amount: 0, max_earn_per_order: 0 }) as LoyaltyConfig;
    if (opts.amount < Number(c.min_order_amount ?? 0)) return 0;
    let points = Math.floor((opts.amount * Number(c.earn_percent ?? 0)) / 100);
    const cap = Number(c.max_earn_per_order ?? 0);
    if (cap > 0) points = Math.min(points, cap);
    if (points <= 0) return 0;

    const { data: existing } = await db
      .from("loyalty_members")
      .select("*")
      .eq("customer_id", opts.customerId)
      .maybeSingle();

    if (existing) {
      const lifetime = Number(existing.lifetime_points ?? 0) + points;
      await db
        .from("loyalty_members")
        .update({
          points_balance: Number(existing.points_balance ?? 0) + points,
          lifetime_points: lifetime,
          tier: tierFor(lifetime),
          name: existing.name ?? opts.name,
        })
        .eq("id", existing.id);
    } else {
      await db.from("loyalty_members").insert({
        customer_id: opts.customerId,
        phone: opts.phone ?? "",
        name: opts.name,
        points_balance: points,
        lifetime_points: points,
        tier: tierFor(points),
      });
    }
    return points;
  } catch (e) {
    console.error("loyalty award failed", e);
    return 0;
  }
}

type Settings = {
  no_refund_hours: number;
  partial_refund_hours: number;
  partial_refund_percent: number;
  reschedule_allowed: boolean;
  reschedule_min_hours: number;
  policy_text: string;
};

const DEFAULT_SETTINGS: Settings = {
  no_refund_hours: 24,
  partial_refund_hours: 72,
  partial_refund_percent: 50,
  reschedule_allowed: true,
  reschedule_min_hours: 24,
  policy_text: "",
};

// deno-lint-ignore no-explicit-any
async function getSettings(db: any): Promise<Settings> {
  const { data } = await db.from("booking_settings").select("*").limit(1).maybeSingle();
  return { ...DEFAULT_SETTINGS, ...(data ?? {}) } as Settings;
}

/** Refund entitlement for cancelling a booking scheduled at `scheduledAt`. */
export function refundPercentFor(scheduledAt: string | null, s: Settings, now = new Date()): number {
  if (!scheduledAt) return s.partial_refund_percent;
  const hours = (new Date(scheduledAt).getTime() - now.getTime()) / 36e5;
  if (hours < s.no_refund_hours) return 0;
  return s.partial_refund_percent;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "method_not_allowed" }, 405);

  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return jsonResponse({ error: "bad_json" }, 400);
  }

  const action = String(body.action ?? "");
  const db = admin();

  let customerId: string | null = null;
  let sessionPhone: string | null = null;
  if (!PUBLIC_ACTIONS.has(action)) {
    const auth = await verifyPatientToken(getPatientTokenFromRequest(req, body));
    if (!auth.ok) return jsonResponse({ error: "unauthorized", reason: auth.reason }, 401);
    customerId = auth.sub!;
    sessionPhone = auth.phone ?? null;
  }

  try {
    switch (action) {
      // ---------------- Catalog ----------------
      case "catalog": {
        const { data = [] } = await db
          .from("lab_tests")
          .select("id, slug, name, category, price, mrp, fasting_required, turnaround, parameters, description, prep_instructions, home_collection, sample_type")
          .eq("status", "live")
          .order("sort_order", { ascending: true });
        return jsonResponse({ tests: data ?? [] });
      }

      case "test": {
        const slug = str(body.slug, 120);
        if (!slug) return jsonResponse({ error: "missing_slug" }, 400);
        const { data } = await db.from("lab_tests").select("*").eq("slug", slug).eq("status", "live").maybeSingle();
        if (!data) return jsonResponse({ error: "not_found" }, 404);
        return jsonResponse({ test: data });
      }

      case "centers": {
        const { data = [] } = await db
          .from("collection_centers")
          .select("id, name, location, address, city, pincode, phone, timings, home_collection, map_url, latitude, longitude")
          .eq("enabled", true)
          .order("sort_order", { ascending: true });
        return jsonResponse({ centers: data ?? [] });
      }

      case "promos": {
        const promos = await activePromos(db);
        const subtotal = num(body.subtotal);
        return jsonResponse({
          promos: promos
            .filter((p) => !subtotal || subtotal >= Number(p.min_order ?? 0))
            .map((p) => ({
              code: p.code,
              description: p.description,
              discount_type: p.discount_type,
              discount_value: Number(p.discount_value ?? 0),
              min_order: Number(p.min_order ?? 0),
              discount: subtotal ? promoDiscount(p, subtotal) : null,
            })),
          unavailable: promos
            .filter((p) => subtotal && subtotal < Number(p.min_order ?? 0))
            .map((p) => ({ code: p.code, min_order: Number(p.min_order ?? 0), description: p.description })),
        });
      }

      case "quote_promo": {
        const code = str(body.code, 40).toUpperCase();
        const subtotal = num(body.subtotal);
        if (!code || subtotal <= 0) return jsonResponse({ error: "invalid_input" }, 400);
        const promo = (await activePromos(db)).find((p) => p.code.toUpperCase() === code);
        if (!promo) return jsonResponse({ error: "promo_invalid" }, 400);
        if (subtotal < Number(promo.min_order ?? 0)) return jsonResponse({ error: "promo_min_order" }, 400);
        const discount = promoDiscount(promo, subtotal);
        return jsonResponse({
          promo: { code: promo.code, description: promo.description, discount_type: promo.discount_type, discount_value: Number(promo.discount_value ?? 0) },
          discount,
          total: Math.max(0, Math.round((subtotal - discount) * 100) / 100),
        });
      }

      case "policy": {
        const s = await getSettings(db);
        return jsonResponse({ policy: s });
      }

      // ---------------- Auth (mock OTP) ----------------
      case "send_otp": {
        const phone = normalisePhone(body.phone);
        if (!phone) return jsonResponse({ error: "invalid_phone" }, 400);
        // Mock gateway: no SMS is sent, the fixed demo code is always accepted.
        return jsonResponse({ ok: true, mock: true });
      }

      case "verify_otp": {
        const phone = normalisePhone(body.phone);
        if (!phone) return jsonResponse({ error: "invalid_phone" }, 400);
        if (str(body.code, 10) !== MOCK_OTP) return jsonResponse({ error: "invalid_otp" }, 400);

        const name = str(body.name, 120);
        const { data: existing } = await db.from("customers").select("*").eq("phone", phone).maybeSingle();
        let customer = existing;
        if (!customer) {
          const { data, error } = await db
            .from("customers")
            .insert({ phone, name: name || null, city: "Gurugram" })
            .select("*")
            .single();
          if (error) throw error;
          customer = data;
        } else if (name && !customer.name) {
          await db.from("customers").update({ name }).eq("id", customer.id);
          customer.name = name;
        }

        const token = await signPatientToken(customer.id, phone);
        return jsonResponse({
          token,
          customer: { id: customer.id, name: customer.name, phone: customer.phone, email: customer.email },
        });
      }

      case "me": {
        const { data } = await db.from("customers").select("id, name, phone, email, city").eq("id", customerId).maybeSingle();
        return jsonResponse({ customer: data ?? { id: customerId, phone: sessionPhone } });
      }

      case "update_profile": {
        const patch: Record<string, unknown> = {};
        const name = str(body.name, 120);
        const email = str(body.email, 160);
        if (name) patch.name = name;
        if (email) patch.email = email;
        if (Object.keys(patch).length) await db.from("customers").update(patch).eq("id", customerId);
        const { data } = await db.from("customers").select("id, name, phone, email, city").eq("id", customerId).maybeSingle();
        return jsonResponse({ customer: data });
      }

      // ---------------- Booking ----------------
      case "create_booking": {
        const slug = str(body.slug, 120);
        const { data: test } = await db.from("lab_tests").select("*").eq("slug", slug).eq("status", "live").maybeSingle();
        if (!test) return jsonResponse({ error: "test_not_found" }, 404);

        const collectionType = str(body.collection_type, 40) === "walk_in" ? "walk_in" : "home_collection";
        const address = str(body.address, 400);
        const pincode = str(body.pincode, 10);
        const scheduledAt = str(body.scheduled_at, 60);
        const name = str(body.name, 120);
        const email = str(body.email, 160);
        const notes = str(body.notes, 500);
        const centerId = str(body.center_id, 60);

        if (!scheduledAt || Number.isNaN(new Date(scheduledAt).getTime())) {
          return jsonResponse({ error: "invalid_schedule" }, 400);
        }
        if (new Date(scheduledAt).getTime() < Date.now() - 5 * 60 * 1000) {
          return jsonResponse({ error: "schedule_in_past" }, 400);
        }
        if (collectionType === "home_collection" && (!address || address.length < 8)) {
          return jsonResponse({ error: "address_required" }, 400);
        }

        let center: { id: string; name: string; address: string | null; location: string | null } | null = null;
        if (collectionType === "walk_in") {
          if (!centerId) return jsonResponse({ error: "center_required" }, 400);
          const { data: c } = await db
            .from("collection_centers")
            .select("id, name, address, location")
            .eq("id", centerId)
            .eq("enabled", true)
            .maybeSingle();
          if (!c) return jsonResponse({ error: "center_not_found" }, 404);
          center = c;
        }

        const { data: customer } = await db.from("customers").select("*").eq("id", customerId).maybeSingle();
        const patch: Record<string, unknown> = {};
        if (name && name !== customer?.name) patch.name = name;
        if (email && email !== customer?.email) patch.email = email;
        if (Object.keys(patch).length) await db.from("customers").update(patch).eq("id", customerId);

        const subtotal = num(test.price);
        const promoCodeIn = str(body.promo_code, 40).toUpperCase();
        let promo: Promo | null = null;
        let discount = 0;
        if (promoCodeIn) {
          promo = (await activePromos(db)).find((p) => p.code.toUpperCase() === promoCodeIn) ?? null;
          if (!promo) return jsonResponse({ error: "promo_invalid" }, 400);
          if (subtotal < Number(promo.min_order ?? 0)) return jsonResponse({ error: "promo_min_order" }, 400);
          discount = promoDiscount(promo, subtotal);
        }
        const total = Math.max(0, Math.round((subtotal - discount) * 100) / 100);

        const { data: order, error: orderErr } = await db
          .from("test_orders")
          .insert({
            customer_id: customerId,
            customer_name: name || customer?.name || null,
            customer_phone: customer?.phone ?? sessionPhone,
            customer_email: email || customer?.email || null,
            collection_type: collectionType,
            address: collectionType === "home_collection" ? address : center?.address ?? null,
            center_id: center?.id ?? null,
            center_name: center ? center.name : null,
            pincode: pincode || null,
            scheduled_at: new Date(scheduledAt).toISOString(),
            subtotal,
            discount,
            total,
            promo_code: promo?.code ?? null,
            payment_method: "online",
            payment_status: "paid",
            status: "confirmed",
            paid_at: new Date().toISOString(),
            notes: notes || null,
            booked_online: true,
          })
          .select("*")
          .single();
        if (orderErr) throw orderErr;

        await db.from("test_order_items").insert({
          order_id: order.id,
          test_id: test.id,
          test_name: test.name,
          test_slug: test.slug,
          qty: 1,
          price: total,
        });

        await db.from("payments").insert({
          order_id: order.id,
          order_no: order.order_no,
          customer_name: order.customer_name,
          customer_phone: order.customer_phone,
          provider: "mock",
          method: "mock_online",
          reference: `MOCK-${order.order_no}`,
          amount: total,
          status: "paid",
          paid_at: new Date().toISOString(),
          raw: { mock: true, source: "patient_portal" },
        });

        if (promo) {
          await db
            .from("promo_codes")
            .update({ times_used: Number(promo.times_used ?? 0) + 1 })
            .eq("id", promo.id);
        }

        const pointsEarned = await awardLoyaltyPoints(db, {
          customerId: customerId!,
          phone: (order.customer_phone as string) ?? sessionPhone,
          name: (order.customer_name as string) ?? null,
          amount: total,
        });

        return jsonResponse({
          order: { ...order, items: [{ test_name: test.name, test_slug: test.slug, qty: 1, price: subtotal }] },
          points_earned: pointsEarned,
        });
      }

      case "my_rewards": {
        const { data: member } = await db.from("loyalty_members").select("*").eq("customer_id", customerId).maybeSingle();
        const { data: cfg } = await db.from("loyalty_settings").select("*").limit(1).maybeSingle();
        return jsonResponse({
          member: member
            ? { points_balance: Number(member.points_balance ?? 0), lifetime_points: Number(member.lifetime_points ?? 0), tier: member.tier }
            : null,
          config: cfg
            ? {
                earn_percent: Number(cfg.earn_percent ?? 0),
                point_to_rupee: Number(cfg.point_to_rupee ?? 1),
                max_redeem_percent: Number(cfg.max_redeem_percent ?? 0),
                min_order_amount: Number(cfg.min_order_amount ?? 0),
              }
            : null,
        });
      }

      case "my_bookings": {
        const { data: orders = [] } = await db
          .from("test_orders")
          .select("*")
          .eq("customer_id", customerId)
          .order("created_at", { ascending: false });
        const ids = (orders ?? []).map((o: Record<string, unknown>) => o.id);
        const { data: items = [] } = ids.length
          ? await db.from("test_order_items").select("*").in("order_id", ids)
          : { data: [] as Record<string, unknown>[] };
        const slugs = [...new Set((items ?? []).map((i: Record<string, unknown>) => i.test_slug).filter(Boolean))];
        const { data: tests = [] } = slugs.length
          ? await db
              .from("lab_tests")
              .select("slug, name, parameters, fasting_required, turnaround, sample_type, prep_instructions, description, home_collection, price")
              .in("slug", slugs)
          : { data: [] as Record<string, unknown>[] };
        const bySlug = new Map((tests ?? []).map((t: Record<string, unknown>) => [t.slug, t]));

        const s = await getSettings(db);
        const enriched = (orders ?? []).map((o: Record<string, unknown>) => {
          const oi = (items ?? []).filter((i: Record<string, unknown>) => i.order_id === o.id);
          return {
            ...o,
            items: oi.map((i: Record<string, unknown>) => ({ ...i, test: bySlug.get(i.test_slug) ?? null })),
            refund_preview_percent: refundPercentFor(o.scheduled_at as string | null, s),
          };
        });
        return jsonResponse({ orders: enriched, policy: s });
      }

      case "reschedule": {
        const orderId = str(body.order_id, 60);
        const scheduledAt = str(body.scheduled_at, 60);
        if (!orderId || !scheduledAt || Number.isNaN(new Date(scheduledAt).getTime())) {
          return jsonResponse({ error: "invalid_input" }, 400);
        }
        if (new Date(scheduledAt).getTime() <= Date.now()) return jsonResponse({ error: "schedule_in_past" }, 400);

        const s = await getSettings(db);
        if (!s.reschedule_allowed) return jsonResponse({ error: "reschedule_disabled" }, 400);

        const { data: order } = await db
          .from("test_orders")
          .select("*")
          .eq("id", orderId)
          .eq("customer_id", customerId)
          .maybeSingle();
        if (!order) return jsonResponse({ error: "not_found" }, 404);
        if (["cancelled", "completed"].includes(String(order.status))) {
          return jsonResponse({ error: "not_reschedulable" }, 400);
        }

        const { data: updated, error } = await db
          .from("test_orders")
          .update({
            scheduled_at: new Date(scheduledAt).toISOString(),
            rescheduled_at: new Date().toISOString(),
            reschedule_count: Number(order.reschedule_count ?? 0) + 1,
            status: order.status === "pending" ? "pending" : "confirmed",
          })
          .eq("id", orderId)
          .select("*")
          .single();
        if (error) throw error;
        return jsonResponse({ order: updated });
      }

      case "cancel": {
        const orderId = str(body.order_id, 60);
        const reason = str(body.reason, 400);
        if (!orderId) return jsonResponse({ error: "invalid_input" }, 400);

        const { data: order } = await db
          .from("test_orders")
          .select("*")
          .eq("id", orderId)
          .eq("customer_id", customerId)
          .maybeSingle();
        if (!order) return jsonResponse({ error: "not_found" }, 404);
        if (String(order.status) === "cancelled") return jsonResponse({ error: "already_cancelled" }, 400);
        if (String(order.status) === "completed") return jsonResponse({ error: "not_cancellable" }, 400);

        const s = await getSettings(db);
        const percent = refundPercentFor(order.scheduled_at as string | null, s);
        const paid = String(order.payment_status) === "paid";
        const refundAmount = paid ? Math.round(num(order.total) * percent) / 100 : 0;

        const { data: updated, error } = await db
          .from("test_orders")
          .update({
            status: "cancelled",
            cancelled_at: new Date().toISOString(),
            cancel_reason: reason || "Cancelled by patient",
            refund_percent: paid ? percent : 0,
            refund_amount: refundAmount,
            payment_status: paid ? (refundAmount > 0 ? "refund_pending" : "paid") : order.payment_status,
          })
          .eq("id", orderId)
          .select("*")
          .single();
        if (error) throw error;

        return jsonResponse({ order: updated, refund: { percent: paid ? percent : 0, amount: refundAmount } });
      }

      case "cancellation_quote": {
        const orderId = str(body.order_id, 60);
        const { data: order } = await db
          .from("test_orders")
          .select("id, total, scheduled_at, payment_status")
          .eq("id", orderId)
          .eq("customer_id", customerId)
          .maybeSingle();
        if (!order) return jsonResponse({ error: "not_found" }, 404);
        const s = await getSettings(db);
        const percent = refundPercentFor(order.scheduled_at as string | null, s);
        const paid = String(order.payment_status) === "paid";
        return jsonResponse({
          percent: paid ? percent : 0,
          amount: paid ? Math.round(num(order.total) * percent) / 100 : 0,
          policy: s,
        });
      }

      default:
        return jsonResponse({ error: "unknown_action", action }, 400);
    }
  } catch (e) {
    console.error("patient-portal error", action, e);
    return jsonResponse({ error: "server_error", message: String((e as Error)?.message ?? e) }, 500);
  }
});
