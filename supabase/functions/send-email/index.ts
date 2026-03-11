import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_URL = "https://api.resend.com/emails";
const RECIPIENT_EMAIL = "marketing@aarvakdiagnostics.com";
// Use Resend's test sender until aarvakdiagnostics.com is verified in Resend dashboard
const DEFAULT_FROM = "Aarvak Diagnostics <onboarding@resend.dev>";

const jsonResponse = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse(405, { success: false, error: "Method not allowed" });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resendFrom = Deno.env.get("RESEND_FROM_EMAIL") || DEFAULT_FROM;

    const payload = await req.json();
    console.log("Received payload:", JSON.stringify(payload));
    const { type, data } = payload as {
      type?: "contact" | "subscribe";
      data?: Record<string, unknown>;
    };

    if (!type || !data) {
      console.error("Invalid payload: missing type or data");
      return jsonResponse(400, { success: false, error: "Invalid payload" });
    }

    let subject = "";
    let html = "";

    if (type === "contact") {
      const name = String(data.name ?? "").trim();
      const email = String(data.email ?? "").trim();
      const phone = String(data.phone ?? "").trim();
      const dob = String(data.dob ?? "").trim();
      const formSubject = String(data.subject ?? "").trim();
      const message = String(data.message ?? "").trim();

      if (!name || !email || !phone) {
        return jsonResponse(400, {
          success: false,
          error: "Name, email, and phone are required",
        });
      }

      subject = formSubject
        ? `Contact Form: ${escapeHtml(formSubject)}`
        : "New Contact Form Submission";

      html = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        ${dob ? `<p><strong>Date of Birth:</strong> ${escapeHtml(dob)}</p>` : ""}
        ${formSubject ? `<p><strong>Subject:</strong> ${escapeHtml(formSubject)}</p>` : ""}
        ${message ? `<p><strong>Message:</strong> ${escapeHtml(message)}</p>` : ""}
      `;
    } else if (type === "subscribe") {
      const email = String(data.email ?? "").trim();

      if (!email) {
        return jsonResponse(400, { success: false, error: "Email is required" });
      }

      subject = "New Newsletter Subscription";
      html = `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      `;
    } else {
      return jsonResponse(400, { success: false, error: "Invalid form type" });
    }

    console.log("Sending email via Resend:", { from: resendFrom, to: RECIPIENT_EMAIL, subject });
    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: resendFrom,
        to: [RECIPIENT_EMAIL],
        subject,
        html,
      }),
    });

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      const providerMessage = JSON.stringify(resendResult);

      if (resendResponse.status === 403) {
        return jsonResponse(500, {
          success: false,
          error:
            "Sender domain is not authorized. Verify the sender domain in Resend and set RESEND_FROM_EMAIL to that domain.",
          provider: providerMessage,
        });
      }

      if (resendResponse.status === 429) {
        return jsonResponse(429, {
          success: false,
          error: "rate_limit_exceeded",
          provider: providerMessage,
        });
      }

      throw new Error(`Resend API error [${resendResponse.status}]: ${providerMessage}`);
    }

    return jsonResponse(200, { success: true, result: resendResult });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse(500, { success: false, error: errorMessage });
  }
});
