import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_RECIPIENT_EMAIL = "marketing@aarvakdiagnostics.com";
const DEFAULT_FROM = "Aarvak Diagnostics <noreply@hyperrevamp.com>";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9()\-\s]{7,20}$/;
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

type FormType = "contact" | "subscribe" | "booking";

interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  dob: string | null;
  subject: string | null;
  message: string | null;
}

interface SubscribeSubmission {
  email: string;
}

type ValidatedPayload =
  | { type: "contact" | "booking"; data: ContactSubmission; rawData: Record<string, unknown> }
  | { type: "subscribe"; data: SubscribeSubmission; rawData: Record<string, unknown> };

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

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeText = (value: unknown) => String(value ?? "").trim();

const validatePayload = (payload: unknown): { valid?: ValidatedPayload; error?: string } => {
  if (!isRecord(payload)) {
    return { error: "Invalid payload" };
  }

  const type = normalizeText(payload.type) as FormType;
  const data = payload.data;

  if (!type || !isRecord(data)) {
    return { error: "Invalid payload" };
  }

  if (type === "contact" || type === "booking") {
    const name = normalizeText(data.name);
    const email = normalizeText(data.email).toLowerCase();
    const phone = normalizeText(data.phone);
    const dob = normalizeText(data.dob);
    const subject = normalizeText(data.subject);
    const message = normalizeText(data.message);

    if (!name || !email || !phone) {
      return { error: "Name, email, and phone are required" };
    }

    if (name.length > 100) {
      return { error: "Name must be 100 characters or fewer" };
    }

    if (!EMAIL_REGEX.test(email)) {
      return { error: "Invalid email address" };
    }

    if (!PHONE_REGEX.test(phone)) {
      return { error: "Invalid phone number" };
    }

    if (dob && !ISO_DATE_REGEX.test(dob)) {
      return { error: "Date of birth must be in YYYY-MM-DD format" };
    }

    if (subject.length > 150) {
      return { error: "Subject must be 150 characters or fewer" };
    }

    if (message.length > 2000) {
      return { error: "Message must be 2000 characters or fewer" };
    }

    return {
      valid: {
        type,
        data: {
          name,
          email,
          phone,
          dob: dob || null,
          subject: subject || null,
          message: message || null,
        },
        rawData: data,
      },
    };
  }

  if (type === "subscribe") {
    const email = normalizeText(data.email).toLowerCase();

    if (!email) {
      return { error: "Email is required" };
    }

    if (!EMAIL_REGEX.test(email) || email.length > 255) {
      return { error: "Invalid email address" };
    }

    return {
      valid: {
        type,
        data: { email },
        rawData: data,
      },
    };
  }

  return { error: "Invalid form type" };
};

const updateDeliveryStatus = async (
  supabaseAdmin: ReturnType<typeof createClient>,
  submissionId: string,
  status: "sent" | "failed",
  errorMessage: string | null,
) => {
  const { error } = await supabaseAdmin
    .from("form_submissions")
    .update({
      email_delivery_status: status,
      email_delivery_error: errorMessage,
    })
    .eq("id", submissionId);

  if (error) {
    console.error("[send-email] Failed to update email delivery status", {
      submissionId,
      status,
      error: error.message,
    });
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse(405, { success: false, error: "Method not allowed" });
  }

  try {
    const payload = await req.json();
    const validation = validatePayload(payload);

    if (!validation.valid) {
      console.error("[send-email] Validation failed", { reason: validation.error });
      return jsonResponse(400, { success: false, error: validation.error || "Invalid payload" });
    }

    const validated = validation.valid;

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("[send-email] Missing backend environment variables");
      return jsonResponse(500, {
        success: false,
        error: "Backend configuration is incomplete",
      });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });

    const insertRow =
      validated.type === "subscribe"
        ? {
            form_type: validated.type,
            name: null,
            email: validated.data.email,
            phone: null,
            dob: null,
            subject: "Newsletter Subscription",
            message: null,
            payload: validated.rawData,
            email_delivery_status: "pending",
            email_delivery_error: null,
          }
        : {
            form_type: validated.type,
            name: validated.data.name,
            email: validated.data.email,
            phone: validated.data.phone,
            dob: validated.data.dob,
            subject: validated.data.subject,
            message: validated.data.message,
            payload: validated.rawData,
            email_delivery_status: "pending",
            email_delivery_error: null,
          };

    const { data: insertedSubmission, error: insertError } = await supabaseAdmin
      .from("form_submissions")
      .insert(insertRow)
      .select("id")
      .single();

    if (insertError || !insertedSubmission?.id) {
      console.error("[send-email] Failed to save form submission", {
        error: insertError?.message,
      });
      return jsonResponse(500, {
        success: false,
        error: "Failed to store submission. Please try again.",
      });
    }

    const submissionId = insertedSubmission.id as string;

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const resendFrom = Deno.env.get("RESEND_FROM_EMAIL") || DEFAULT_FROM;
    const recipientEmail = Deno.env.get("FORM_RECIPIENT_EMAIL") || DEFAULT_RECIPIENT_EMAIL;

    if (!resendApiKey) {
      const warning = "Submission saved, but email notifications are not configured.";
      await updateDeliveryStatus(supabaseAdmin, submissionId, "failed", warning);
      console.warn("[send-email] Missing RESEND_API_KEY; notification skipped", { submissionId });

      return jsonResponse(200, {
        success: true,
        stored: true,
        submissionId,
        emailDelivered: false,
        warning,
      });
    }

    let subject = "";
    let html = "";

    if (validated.type === "subscribe") {
      subject = "New Newsletter Subscription";
      html = `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${escapeHtml(validated.data.email)}</p>
      `;
    } else {
      const formLabel = validated.type === "booking" ? "Booking" : "Contact";

      subject = validated.data.subject
        ? `${formLabel} Form: ${escapeHtml(validated.data.subject)}`
        : `New ${formLabel} Form Submission`;

      html = `
        <h2>New ${formLabel} Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(validated.data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(validated.data.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(validated.data.phone)}</p>
        ${validated.data.dob ? `<p><strong>Date of Birth:</strong> ${escapeHtml(validated.data.dob)}</p>` : ""}
        ${validated.data.subject ? `<p><strong>Subject:</strong> ${escapeHtml(validated.data.subject)}</p>` : ""}
        ${validated.data.message ? `<p><strong>Message:</strong> ${escapeHtml(validated.data.message)}</p>` : ""}
      `;
    }

    console.log("[send-email] Sending email notification", {
      submissionId,
      type: validated.type,
      to: recipientEmail,
    });

    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: resendFrom,
        to: [recipientEmail],
        cc: ["lakshay@hyperrevamp.com"],
        subject,
        html,
      }),
    });

    const resendResponseText = await resendResponse.text();
    let resendResult: unknown = null;

    if (resendResponseText) {
      try {
        resendResult = JSON.parse(resendResponseText);
      } catch {
        resendResult = resendResponseText;
      }
    }

    if (!resendResponse.ok) {
      const providerMessage =
        typeof resendResult === "string" ? resendResult : JSON.stringify(resendResult ?? {});

      let responseMessage = `Email provider error [${resendResponse.status}]`;
      if (resendResponse.status === 403) {
        responseMessage =
          "Sender domain is not authorized. Verify the sender domain and update RESEND_FROM_EMAIL.";
      } else if (resendResponse.status === 429) {
        responseMessage = "rate_limit_exceeded";
      }

      await updateDeliveryStatus(supabaseAdmin, submissionId, "failed", responseMessage);
      console.error("[send-email] Email notification failed", {
        submissionId,
        status: resendResponse.status,
        providerMessage,
      });

      return jsonResponse(200, {
        success: true,
        stored: true,
        submissionId,
        emailDelivered: false,
        warning: responseMessage,
      });
    }

    await updateDeliveryStatus(supabaseAdmin, submissionId, "sent", null);

    return jsonResponse(200, {
      success: true,
      stored: true,
      submissionId,
      emailDelivered: true,
      result: resendResult,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[send-email] Unexpected error", { error: errorMessage });

    return jsonResponse(500, {
      success: false,
      error: "Failed to process request. Please try again.",
      details: errorMessage,
    });
  }
});
