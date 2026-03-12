import { useState } from "react";
import { submitSubscribeForm } from "@/lib/submitForm";
import { ChevronRight } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const success = await submitSubscribeForm(email);
    if (success) setEmail("");
    setLoading(false);
  };

  return (
    <section
      className="relative py-20 md:py-28 px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/blogbanner.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="backdrop-blur-xl bg-white/15 border border-white/20 rounded-2xl px-8 py-10 md:px-12 md:py-12">
          <h2
            className="text-2xl md:text-3xl font-bold text-primary-foreground mb-8 text-center"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Health Tips, Straight to Your Inbox
          </h2>
          <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-transparent border-b border-white/40 text-primary-foreground placeholder:text-white/70 py-3 pr-12 text-sm outline-none focus:border-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-primary-foreground hover:opacity-80 transition disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
