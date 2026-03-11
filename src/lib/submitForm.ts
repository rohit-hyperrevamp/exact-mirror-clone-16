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

export async function submitContactForm(data: ContactData) {
  try {
    const { data: result, error } = await supabase.functions.invoke("send-email", {
      body: { type: "contact", data },
    });

    if (error) throw error;

    toast.success("Your message has been sent successfully!");
    return true;
  } catch (err) {
    console.error("Form submission error:", err);
    toast.error("Failed to send message. Please try again.");
    return false;
  }
}

export async function submitSubscribeForm(email: string) {
  try {
    const { data: result, error } = await supabase.functions.invoke("send-email", {
      body: { type: "subscribe", data: { email } },
    });

    if (error) throw error;

    toast.success("You have been subscribed successfully!");
    return true;
  } catch (err) {
    console.error("Subscribe error:", err);
    toast.error("Failed to subscribe. Please try again.");
    return false;
  }
}
