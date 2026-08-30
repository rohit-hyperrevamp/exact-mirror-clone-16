// Client for the patient booking portal (edge function `patient-portal`).
import { supabase } from "@/integrations/supabase/client";

const TOKEN_KEY = "aarvak_patient_token";
const PROFILE_KEY = "aarvak_patient_profile";

export type PatientProfile = { id: string; name: string | null; phone: string; email?: string | null };

export function getPatientToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
}

export function setPatientSession(token: string, profile: PatientProfile) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event("aarvak-patient-auth"));
}

export function getPatientProfile(): PatientProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as PatientProfile) : null;
  } catch {
    return null;
  }
}

export function clearPatientSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PROFILE_KEY);
  window.dispatchEvent(new Event("aarvak-patient-auth"));
}

export async function portal<T = unknown>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  const token = getPatientToken();
  const { data, error } = await supabase.functions.invoke("patient-portal", {
    body: { action, ...payload, ...(token ? { patientToken: token } : {}) },
  });
  if (error) throw new Error(error.message || "Request failed");
  const res = data as { error?: string; reason?: string };
  if (res?.error) {
    if (res.error === "unauthorized") clearPatientSession();
    throw new Error(res.error);
  }
  return data as T;
}

export type PortalTest = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  mrp: number | null;
  fasting_required: boolean;
  turnaround: string | null;
  parameters: string[] | null;
  description: string | null;
  prep_instructions: string | null;
  home_collection: boolean;
  sample_type: string | null;
};

export type BookingPolicy = {
  no_refund_hours: number;
  partial_refund_hours: number;
  partial_refund_percent: number;
  reschedule_allowed: boolean;
  reschedule_min_hours: number;
  policy_text: string;
};

export type PortalOrder = {
  id: string;
  order_no: string;
  status: string;
  payment_status: string;
  total: number;
  subtotal?: number;
  discount?: number;
  promo_code?: string | null;
  collection_type: string;
  address: string | null;
  pincode: string | null;
  scheduled_at: string | null;
  created_at: string;
  cancelled_at: string | null;
  refund_percent: number;
  refund_amount: number;
  reschedule_count: number;
  refund_preview_percent?: number;
  items: {
    test_name: string;
    test_slug: string | null;
    qty: number;
    price: number;
    test?: Partial<PortalTest> | null;
  }[];
};

export const ERROR_MESSAGES: Record<string, string> = {
  invalid_phone: "Please enter a valid 10-digit Indian mobile number.",
  invalid_otp: "That OTP is incorrect. Please try again.",
  address_required: "Please enter the full address for home collection.",
  invalid_schedule: "Please choose a valid appointment date and time.",
  schedule_in_past: "Please choose a future date and time.",
  reschedule_disabled: "Rescheduling is currently unavailable. Please call us.",
  not_reschedulable: "This booking can no longer be rescheduled.",
  already_cancelled: "This booking is already cancelled.",
  not_cancellable: "This booking can no longer be cancelled.",
  unauthorized: "Your session expired. Please verify your mobile number again.",
  center_required: "Please choose a collection centre for your visit.",
  center_not_found: "That collection centre is no longer available. Please pick another one.",
  promo_invalid: "That promo code is not valid or has expired.",
  promo_min_order: "This promo code needs a higher order value.",
};

export const friendlyError = (e: unknown) => {
  const key = e instanceof Error ? e.message : String(e);
  return ERROR_MESSAGES[key] ?? "Something went wrong. Please try again.";
};

export type PortalPromo = {
  code: string;
  description: string | null;
  discount_type: string;
  discount_value: number;
  min_order: number;
  discount: number | null;
};

export type PortalRewards = {
  member: { points_balance: number; lifetime_points: number; tier: string } | null;
  config: { earn_percent: number; point_to_rupee: number; max_redeem_percent: number; min_order_amount: number } | null;
};

export type PortalCenter = {
  id: string;
  name: string;
  location: string | null;
  address: string | null;
  city: string | null;
  pincode: string | null;
  phone: string | null;
  timings: string | null;
  map_url: string | null;
  home_collection: boolean;
  latitude: number | null;
  longitude: number | null;
};

/** Straight-line distance in km between two coordinates (haversine). */
export const distanceKm = (
  aLat: number,
  aLng: number,
  bLat: number,
  bLng: number,
): number => {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(h)));
};
