// Client for the Aarvak commerce backend (edge function `commerce-admin`).
// Every call carries the admin session token from adminApi.
import { callAdmin } from "@/lib/adminApi";

export type CommerceAction =
  | "dashboard"
  | "list_tests"
  | "get_test"
  | "create_test"
  | "update_test"
  | "delete_test"
  | "seed_catalog"
  | "list_orders"
  | "get_order"
  | "update_order"
  | "mark_order_paid"
  | "list_carts"
  | "update_cart"
  | "list_payments"
  | "record_payment"
  | "update_payment"
  | "list_customers"
  | "upsert_customer"
  | "list_promos"
  | "upsert_promo"
  | "delete_promo"
  | "get_loyalty"
  | "update_loyalty"
  | "upsert_campaign"
  | "delete_campaign"
  | "upsert_member";

export function commerce<T = unknown>(action: CommerceAction, payload: Record<string, unknown> = {}) {
  return callAdmin<T>("commerce-admin", { action, ...payload });
}

export type LabTest = {
  id: string;
  slug: string;
  name: string;
  category: string;
  department: string | null;
  sub: string | null;
  sample_type: string | null;
  price: number;
  mrp: number | null;
  fasting_required: boolean;
  turnaround: string | null;
  parameters: string[] | null;
  description: string | null;
  prep_instructions: string | null;
  home_collection: boolean;
  image_url: string | null;
  status: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type TestOrderItem = {
  id: string;
  order_id: string;
  test_name: string;
  test_slug: string | null;
  qty: number;
  price: number;
};

export type TestOrder = {
  id: string;
  order_no: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  collection_type: string;
  address: string | null;
  pincode: string | null;
  scheduled_at: string | null;
  subtotal: number;
  discount: number;
  total: number;
  promo_code: string | null;
  payment_method: string;
  payment_status: string;
  status: string;
  notes: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  items?: TestOrderItem[];
};

export type Payment = {
  id: string;
  order_id: string | null;
  order_no: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  provider: string;
  method: string | null;
  reference: string | null;
  amount: number;
  status: string;
  paid_at: string | null;
  created_at: string;
};

export type AbandonedCart = {
  id: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  items: { name?: string; qty?: number; price?: number }[];
  subtotal: number;
  recovered: boolean;
  source: string | null;
  created_at: string;
  updated_at: string;
};

export type Customer = {
  id: string;
  name: string | null;
  phone: string;
  email: string | null;
  city: string | null;
  notes: string | null;
  created_at: string;
  orders: number;
  spend: number;
  last_order_at: string | null;
  points: number;
  tier: string | null;
};

export type PromoCode = {
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

export type LoyaltyConfig = {
  earn_percent: number;
  point_to_rupee: number;
  max_redeem_percent: number;
  min_order_amount: number;
  expiry_days: number;
  max_earn_per_order: number;
};

export type LoyaltyMember = {
  id: string;
  phone: string;
  name: string | null;
  points_balance: number;
  lifetime_points: number;
  tier: string;
};

export type LoyaltyCampaign = {
  id: string;
  code: string;
  name: string;
  kind: string;
  value: number;
  audience: string | null;
  active: boolean;
};

export type DashboardData = {
  revenue: number;
  paidRevenue: number;
  payAtLabPending: number;
  paidOrders: number;
  totalOrders: number;
  tests: number;
  aov: number;
  customers: number;
  activeTests: number;
  pendingOrders: number;
  openCarts: number;
  cartValue: number;
  trend: { date: string; revenue: number; orders: number }[];
  topTests: { name: string; qty: number }[];
  recentOrders: TestOrder[];
};

/** Order fulfilment states — lab flow, no shipping. */
export const ORDER_STATES = [
  "pending",
  "confirmed",
  "sample_collected",
  "in_lab",
  "report_ready",
  "completed",
  "cancelled",
] as const;

export const PAYMENT_METHODS = ["online", "pay_at_lab"] as const;
export const PAYMENT_STATES = ["pending", "paid", "refunded", "failed"] as const;
export const COLLECTION_TYPES = ["home_collection", "walk_in"] as const;

export function methodLabel(m: string) {
  if (m === "pay_at_lab") return "Pay at lab";
  if (m === "online") return "Paid online";
  return m;
}

export function collectionLabel(c: string) {
  if (c === "home_collection") return "Home collection";
  if (c === "walk_in") return "Walk-in at centre";
  return c;
}
