// Tiny client for the SEO admin dashboard. Wraps Supabase edge functions and
// injects the admin HMAC token on every call.
import { supabase } from "@/integrations/supabase/client";

const TOKEN_KEY = "aarvak_admin_token";

export function getAdminToken(): string | null {
  return typeof window !== "undefined" ? sessionStorage.getItem(TOKEN_KEY) : null;
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

export async function adminLogin(loginId: string, password: string): Promise<{ token: string }> {
  const { data, error } = await supabase.functions.invoke("admin-auth-login", {
    body: { login_id: loginId, password },
  });
  if (error) throw new Error(error.message || "Login failed");
  if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
  return data as { token: string };
}

export async function callAdmin<T = unknown>(fn: string, body: Record<string, unknown> = {}): Promise<T> {
  const token = getAdminToken();
  if (!token) throw new Error("not_logged_in");
  const { data, error } = await supabase.functions.invoke(fn, {
    body: { ...body, adminToken: token },
  });
  if (error) throw new Error(error.message || "Request failed");
  if ((data as { error?: string })?.error === "unauthorized") {
    clearAdminToken();
    throw new Error("unauthorized");
  }
  return data as T;
}
