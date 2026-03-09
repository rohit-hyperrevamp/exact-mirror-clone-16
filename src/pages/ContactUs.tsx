import { useState } from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Name: ${form.name}%0AEmail: ${form.email}%0APhone: ${form.phone}%0ADOB: ${form.dob}%0ASubject: ${form.subject}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/919810063340?text=${msg}`, "_blank");
  };

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative w-full h-[400px] md:h-[480px] overflow-hidden">
        <img
          src="/images/ServiceslLeft.png"
          alt="Contact Aarvak"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="flex items-center gap-6">
            <div className="text-right text-white">
              <p className="text-sm uppercase tracking-widest mb-1">Contact</p>
              <h1 className="text-4xl md:text-6xl font-bold italic" style={{ fontFamily: "Georgia, serif" }}>Aarvak</h1>
            </div>
            <div className="w-px h-24 bg-white/50" />
            <div className="text-white">
              <h2 className="text-2xl md:text-3xl font-bold">We're here to help.</h2>
              <p className="mt-2 text-sm opacity-80 max-w-md">We're here to help you with your diagnostic needs. Reach out to us for appointments, reports, or general inquiries.</p>
              <Link
                to="/contact-us#contact"
                className="inline-block mt-5 text-white font-semibold px-6 py-2.5 rounded-full text-sm"
                style={{ backgroundColor: '#0891b2' }}
              >
                Book a Test
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline overlay */}
      <section className="relative">
        <div className="bg-white rounded-t-3xl -mt-12 relative z-20 pt-10 pb-6 px-4 md:px-16 max-w-xl">
          <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#0891b2' }}>
            We're Here for You
          </h2>
          <p className="text-sm text-gray-500 mt-2">Reach out for bookings, or any assistance — our team is always ready to help.</p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 px-4" id="contact">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden flex flex-col lg:flex-row" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)' }}>
            {/* Left - Contact Info */}
            <div className="lg:w-1/2 p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-8">Contact info</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Visit Us</h4>
                  <p className="text-sm opacity-80">Shop No 23, Ground Floor, Block B, JMD Suburbio-2,</p>
                  <p className="text-sm opacity-80">Sector 67, Sohna Road, Gurgaon</p>
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
            <div className="lg:w-1/2 bg-white p-8 md:p-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Your Details</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
                <div className="flex gap-3">
                  <input
                    type="date"
                    className="w-1/2 border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500"
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-1/2 border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button
                  type="submit"
                  className="w-full text-white font-semibold py-3 rounded-lg text-sm transition hover:opacity-90"
                  style={{ backgroundColor: '#001260' }}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;