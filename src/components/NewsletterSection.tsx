import { useState } from "react";
import { submitSubscribeForm } from "@/lib/submitForm";

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
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          Health Tips, Straight to Your Inbox
        </h2>
        <p className="text-gray-500 mb-8 text-sm max-w-lg mx-auto">
          Subscribe to our newsletter and stay updated with the latest health tips, diagnostic insights, and exclusive offers from Aarvak Diagnostics.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your Email"
            className="flex-1 border border-gray-300 rounded-full px-5 py-3 text-sm outline-none focus:border-cyan-600 bg-white text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="text-white font-semibold px-8 py-3 rounded-full text-sm transition hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#0891b2' }}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
