// HMAC session tokens for the patient portal (phone + OTP login).
// A separate secret derivation from the admin tokens means a patient token can
// never validate as an admin token and vice versa.

const enc = new TextEncoder();

function patientSecret(): string {
  return `${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!}::patient-portal-v1`;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}

function b64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  return Uint8Array.from(b, (c) => c.charCodeAt(0));
}

export async function signPatientToken(
  customerId: string,
  phone: string,
  ttlSeconds = 60 * 60 * 24 * 30,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload = { sub: customerId, phone, typ: "patient", iat: now, exp: now + ttlSeconds };
  const payloadB64 = b64url(enc.encode(JSON.stringify(payload)));
  const key = await hmacKey(patientSecret());
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(payloadB64)));
  return `${payloadB64}.${b64url(sig)}`;
}

export async function verifyPatientToken(
  token: string | null | undefined,
): Promise<{ ok: boolean; sub?: string; phone?: string; reason?: string }> {
  if (!token) return { ok: false, reason: "missing_token" };
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false, reason: "bad_token" };
  const [payloadB64, sig] = parts;
  const key = await hmacKey(patientSecret());
  const expected = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(payloadB64)));
  if (b64url(expected) !== sig) return { ok: false, reason: "bad_signature" };
  try {
    const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(payloadB64))) as {
      sub: string;
      phone: string;
      typ?: string;
      exp: number;
    };
    if (payload.typ !== "patient") return { ok: false, reason: "wrong_token_type" };
    if (Date.now() / 1000 > payload.exp) return { ok: false, reason: "expired" };
    return { ok: true, sub: payload.sub, phone: payload.phone };
  } catch {
    return { ok: false, reason: "bad_payload" };
  }
}

export function getPatientTokenFromRequest(req: Request, body: Record<string, unknown> | null): string | null {
  const fromHeader = req.headers.get("x-patient-token");
  if (fromHeader) return fromHeader;
  if (body && typeof body.patientToken === "string") return body.patientToken;
  return null;
}
