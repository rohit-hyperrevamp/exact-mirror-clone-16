import { useState } from "react";
import { Link } from "react-router-dom";
import { submitContactForm, submitSubscribeForm } from "@/lib/submitForm";
import NewsletterSection from "@/components/NewsletterSection";
import useSEO from "@/hooks/useSEO";

const ContactUs = () => {
  useSEO({
    title: "Contact Aarvak Diagnostics – Book a Test Today",
    description: "Get in touch with Aarvak Diagnostics for lab test bookings, health checkup queries, or home sample collection. We are here to help you stay healthy.",
    canonical: "/contact-us",
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await submitContactForm(form);
    if (success) {
      setForm({ name: "", email: "", phone: "", dob: "", subject: "", message: "" });
    }
    setLoading(false);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubLoading(true);
    const success = await submitSubscribeForm(subscribeEmail);
    if (success) setSubscribeEmail("");
    setSubLoading(false);
  };

  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="relative mx-2 md:mx-4 h-[420px] md:h-[520px] rounded-none md:rounded-[14px] overflow-hidden">
        <img
          src="/images/contactusbg.png"
          alt="Contact Aarvak"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full md:px-18 px-4 text-primary-foreground">
          <div className="w-full md:w-1/2 text-center md:text-right pr-6">
            <p className="text-base font-semibold md:text-3xl mb-1">Contact</p>
            <h1 className="md:text-5xl text-2xl font-extrabold leading-tight">Contact Aarvak Diagnostics – Book a Test</h1>
          </div>
          <div className="hidden md:block w-[1px] h-[220px] bg-white/70 mx-6" />
          <div className="w-full md:w-1/3 text-center md:text-left mt-2 md:mt-0">
            <h2 className="text-2xl md:text-4xl font-semibold mb-3">We're here to help.</h2>
            <p className="text-sm md:text-base opacity-90 mb-6">We're here to help you with your diagnostic needs. Reach out to us for appointments, reports, or general inquiries.</p>
            <Link
              to="/contact-us#contact"
              className="inline-block bg-secondary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Book a Test
            </Link>
          </div>
        </div>
      </section>

      {/* Tagline overlap */}
      <section className="relative z-20">
        <div className="bg-background rounded-tr-[40px] -mt-16 relative pt-10 pb-8 px-6 md:px-12" style={{ maxWidth: '52%' }}>
          <h2 className="text-xl md:text-[26px] font-bold leading-snug text-secondary">
            We're Here for You
          </h2>
          <p className="text-sm text-muted-foreground mt-2">Reach out for bookings, or any assistance — our team is always ready to help.</p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 px-4" id="contact">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden flex flex-col lg:flex-row relative">
            <img
              src="/images/contactbg.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 rounded-3xl" />

            {/* Left - Contact Info */}
            <div className="lg:w-1/2 p-8 md:p-12 text-primary-foreground relative z-10">
              <h2 className="text-3xl font-bold mb-8">Contact info</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Visit Us</h4>
                   <p className="text-sm opacity-80">Shop No.23, Ground Floor, Office No.S06, 5th Floor,</p>
                   <p className="text-sm opacity-80">Block-B, JMD Suburbio-2, Sector-67, Gurugram</p>
                </div>
                <hr className="border-white/20" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Call Us</h4>
                  <a href="tel:9810063340" className="text-sm opacity-80 hover:opacity-100">+91 9810063340</a>
                </div>
                <hr className="border-white/20" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Email Us</h4>
                  <a href="mailto:marketing@aarvakdiagnostics.com" className="text-sm opacity-80 hover:opacity-100">marketing@aarvakdiagnostics.com</a>
                </div>
                <hr className="border-white/20" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Working Hours</h4>
                  <p className="text-sm opacity-80">8:00 AM – 8:00 PM</p>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="lg:w-1/2 relative z-10 p-4 md:p-8 flex items-center justify-center">
              <div className="bg-background rounded-2xl p-8 md:p-10 w-full max-w-md">
                <h3 className="text-xl font-bold text-foreground mb-6 text-center">Your Details</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    className="w-full border border-input rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary bg-background text-foreground"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    className="w-full border border-input rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary bg-background text-foreground"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone Number"
                    className="w-full border border-input rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary bg-background text-foreground"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                  <div className="flex gap-3">
                    <fieldset className="w-1/2 border border-input rounded-lg px-3 py-1">
                      <legend className="text-xs text-muted-foreground px-1">Date of Birth</legend>
                      <input
                        type="date"
                        className="w-full text-sm outline-none bg-background text-foreground py-1"
                        value={form.dob}
                        onChange={(e) => setForm({ ...form, dob: e.target.value })}
                      />
                    </fieldset>
                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-1/2 border border-input rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary bg-background text-foreground"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full border border-input rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary resize-none bg-background text-foreground"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-secondary text-primary-foreground font-semibold py-3 rounded-lg text-sm transition hover:opacity-90 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default ContactUs;
