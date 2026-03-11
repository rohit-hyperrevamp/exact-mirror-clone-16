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

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes("Sender domain is not authorized")) {
      return "Email delivery is temporarily unavailable. Please try again shortly.";
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
    const { error } = await supabase.functions.invoke("send-email", {
      body: payload,
    });

    if (error) throw error;

    toast.success(successMessage);
    return true;
  } catch (err) {
    console.error("Form submission error:", err);
    toast.error(getErrorMessage(err));
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

  if (!EMAIL_REGEX.test(sanitized.email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  return invokeSendEmail(
    { type: "contact", data: sanitized },
    "Your message has been sent successfully!"
  );
}

export async function submitSubscribeForm(email: string) {
  const normalizedEmail = email.trim();

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  return invokeSendEmail(
    { type: "subscribe", data: { email: normalizedEmail } },
    "You have been subscribed successfully!"
  );
}
