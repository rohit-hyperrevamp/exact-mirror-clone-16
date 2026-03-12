import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ContactData {
  name: string;
  email: string;
  phone: string;
  dob?: string;
  subject?: string;
  message?: string;
}

type EmailPayload =
  | { type: "contact"; data: ContactData }
  | { type: "subscribe"; data: { email: string } };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9()\-\s]{7,20}$/;
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const parseContextError = async (error: unknown): Promise<string | null> => {
  if (typeof error !== "object" || error === null || !("context" in error)) {
    return null;
  }

  const context = (error as { context?: Response }).context;
  if (!context || typeof context.text !== "function") {
    return null;
  }

  try {
    const raw = await context.text();
    if (!raw) return null;

    const parsed = JSON.parse(raw) as { error?: string; message?: string };
    return parsed.error || parsed.message || null;
  } catch {
    return null;
  }
};

async function getErrorMessage(error: unknown) {
  const contextError = await parseContextError(error);
  if (contextError) {
    if (contextError.includes("rate_limit_exceeded")) {
      return "Too many requests. Please wait a moment and try again.";
    }

    if (contextError.includes("Sender domain is not authorized")) {
      return "Your request was saved, but email delivery is temporarily unavailable.";
    }

    return contextError;
  }

  if (error instanceof Error) {
    if (error.message.includes("Edge Function returned a non-2xx status code")) {
      return "Submission failed. Please try again in a moment.";
    }

    if (error.message.includes("rate_limit_exceeded")) {
      return "Too many requests. Please wait a moment and try again.";
    }

    return error.message;
  }

  return "Unexpected error";
}

async function invokeSendEmail(payload: EmailPayload, successMessage: string) {
  try {
    const { data, error } = await supabase.functions.invoke("send-email", {
      body: payload,
    });

    if (error) {
      console.error("Edge function invocation error:", error);
      throw error;
    }

    if (data && data.success === false) {
      throw new Error(data.error || "Email delivery failed");
    }

    toast.success(successMessage);
    return true;
  } catch (err) {
    console.error("Form submission error:", err);
    toast.error(await getErrorMessage(err));
    return false;
  }
}

export async function submitContactForm(data: ContactData) {
  const sanitized: ContactData = {
    ...data,
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    dob: data.dob?.trim(),
    subject: data.subject?.trim(),
    message: data.message?.trim(),
  };

  if (!sanitized.name || !sanitized.email || !sanitized.phone) {
    toast.error("Please fill in name, email, and phone.");
    return false;
  }

  if (sanitized.name.length > 100) {
    toast.error("Name must be 100 characters or fewer.");
    return false;
  }

  if (!EMAIL_REGEX.test(sanitized.email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  if (!PHONE_REGEX.test(sanitized.phone)) {
    toast.error("Please enter a valid phone number.");
    return false;
  }

  if (sanitized.dob && !ISO_DATE_REGEX.test(sanitized.dob)) {
    toast.error("Please use a valid date format (YYYY-MM-DD).");
    return false;
  }

  if (sanitized.subject && sanitized.subject.length > 150) {
    toast.error("Subject must be 150 characters or fewer.");
    return false;
  }

  if (sanitized.message && sanitized.message.length > 2000) {
    toast.error("Message must be 2000 characters or fewer.");
    return false;
  }

  return invokeSendEmail(
    { type: "contact", data: sanitized },
    "Your details have been submitted successfully!"
  );
}

export async function submitSubscribeForm(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  if (normalizedEmail.length > 255) {
    toast.error("Email must be 255 characters or fewer.");
    return false;
  }

  return invokeSendEmail(
    { type: "subscribe", data: { email: normalizedEmail } },
    "You have been subscribed successfully!"
  );
}
