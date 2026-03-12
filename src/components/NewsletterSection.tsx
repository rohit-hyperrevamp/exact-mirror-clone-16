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
      className="relative py-24 md:py-32 px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/newsletter-bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl px-8 py-10 md:px-12 md:py-12">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-8 text-center"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Health Tips, Straight to Your Inbox
          </h2>
          <form onSubmit={handleSubmit} className="flex items-center gap-0 border-b border-white/50 pb-2">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 bg-transparent text-white placeholder-white/70 text-sm md:text-base outline-none py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="text-white p-2 hover:opacity-80 transition disabled:opacity-50"
              aria-label="Subscribe"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
