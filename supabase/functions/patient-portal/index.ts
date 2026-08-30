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

const PUBLIC_ACTIONS = new Set(["catalog", "test", "policy", "centers", "send_otp", "verify_otp"]);

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

        const total = num(test.price);
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
            subtotal: total,
            discount: 0,
            total,
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

        return jsonResponse({ order: { ...order, items: [{ test_name: test.name, test_slug: test.slug, qty: 1, price: total }] } });
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
