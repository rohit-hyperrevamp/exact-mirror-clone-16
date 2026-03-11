import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { type, data } = await req.json();

    let subject: string;
    let html: string;

    if (type === "contact") {
      subject = data.subject
        ? `Contact Form: ${data.subject}`
        : "New Contact Form Submission";
      html = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        ${data.dob ? `<p><strong>Date of Birth:</strong> ${data.dob}</p>` : ""}
        ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ""}
        ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ""}
      `;
    } else if (type === "subscribe") {
      subject = "New Newsletter Subscription";
      html = `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${data.email}</p>
      `;
    } else {
      throw new Error("Invalid form type");
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Aarvak Diagnostics <onboarding@resend.dev>",
        to: ["marketing@aarvakdiagnostics.com"],
        subject,
        html,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(result)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
