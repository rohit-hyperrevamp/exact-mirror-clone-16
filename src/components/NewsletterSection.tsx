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
    <section className="relative w-full overflow-hidden" style={{ height: '420px' }}>
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/healthcta.png"
        alt="Health Tips Background"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '20px',
            padding: '48px 52px',
            maxWidth: '480px',
            width: '100%',
          }}
        >
          <h2 className="text-white font-bold" style={{ fontSize: '28px', marginBottom: '36px', fontFamily: 'Georgia, serif' }}>
            Health Tips, Straight to Your Inbox
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: '8px' }}>
              <input
                type="email"
                placeholder="Your Email"
                className="bg-transparent flex-1 outline-none text-white placeholder:text-white/60 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="text-white font-light"
                style={{ fontSize: '28px', lineHeight: 1 }}
              >
                {loading ? "..." : "›"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
