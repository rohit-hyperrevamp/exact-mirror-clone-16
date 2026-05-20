// Shared HMAC token helpers for the SEO admin dashboard.
// We don't use Supabase Auth — login is a hard-coded id/password row in
// `seo_admins` and the edge function issues a signed token the frontend
// passes back on every call.

const enc = new TextEncoder();

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

function b64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  return Uint8Array.from(b, (c) => c.charCodeAt(0));
}

export async function signAdminToken(adminId: string, ttlSeconds = 60 * 60 * 24 * 7): Promise<string> {
  const secret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const payload = { sub: adminId, exp: Math.floor(Date.now() / 1000) + ttlSeconds, iat: Math.floor(Date.now() / 1000) };
  const payloadB64 = b64url(enc.encode(JSON.stringify(payload)));
  const key = await hmacKey(secret);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(payloadB64)));
  return `${payloadB64}.${b64url(sig)}`;
}

export async function verifyAdminToken(token: string | null | undefined): Promise<{ ok: boolean; sub?: string; reason?: string }> {
  if (!token) return { ok: false, reason: "missing_token" };
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false, reason: "bad_token" };
  const [payloadB64, sig] = parts;
  const secret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const key = await hmacKey(secret);
  const expected = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(payloadB64)));
  if (b64url(expected) !== sig) return { ok: false, reason: "bad_signature" };
  try {
    const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(payloadB64))) as { sub: string; exp: number };
    if (Date.now() / 1000 > payload.exp) return { ok: false, reason: "expired" };
    return { ok: true, sub: payload.sub };
  } catch {
    return { ok: false, reason: "bad_payload" };
  }
}

export async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function getAdminTokenFromRequest(req: Request, body: Record<string, unknown> | null): string | null {
  const fromHeader = req.headers.get("x-admin-token");
  if (fromHeader) return fromHeader;
  if (body && typeof body.adminToken === "string") return body.adminToken;
  return null;
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-token",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
