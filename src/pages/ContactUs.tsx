import { useState } from "react";
import PageHero from "@/components/PageHero";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

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
    const whatsappMsg = `Name: ${form.name}%0AEmail: ${form.email}%0APhone: ${form.phone}%0ADOB: ${form.dob}%0ASubject: ${form.subject}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/919810063340?text=${whatsappMsg}`, "_blank");
  };

  return (
    <div className="bg-background">
      <PageHero
        label="Contact"
        title="Aarvak"
        heading="We're here to help."
        description="We're here to help you with your diagnostic needs. Reach out to us for appointments, reports, or general inquiries."
        ctaText="Book a Test"
        ctaLink="#contact"
      />

      {/* Tagline */}
      <section className="bg-background py-10">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-aarvak-blue">We're Here for You</h2>
          <p className="mt-2 text-sm text-aarvak-gray-600">
            Reach out for bookings, or any assistance — our team is always ready to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-aarvak-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contact Info */}
            <div className="lg:w-1/2 bg-aarvak-navy text-primary-foreground rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-8">Contact info</h2>
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5" />
                    <h4 className="font-semibold">Visit Us</h4>
                  </div>
                  <p className="text-sm opacity-80 pl-7">
                    Shop No 23, Ground Floor, Block B, JMD Suburbio-2,<br />
                    Sector 67, Sohna Road, Gurgaon
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-5 h-5" />
                    <h4 className="font-semibold">Call Us</h4>
                  </div>
                  <a href="tel:9810063340" className="text-sm opacity-80 pl-7 hover:opacity-100">
                    +91 9810063340
                  </a>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5" />
                    <h4 className="font-semibold">Email Us</h4>
                  </div>
                  <a href="mailto:marketing@aarvakdiagnostics.com" className="text-sm opacity-80 pl-7 hover:opacity-100">
                    marketing@aarvakdiagnostics.com
                  </a>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5" />
                    <h4 className="font-semibold">Working Hours</h4>
                  </div>
                  <p className="text-sm opacity-80 pl-7">8:00 AM – 8:00 PM</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:w-1/2 bg-background rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-aarvak-gray-900 mb-6 text-center">
                Your Details
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-aarvak-blue"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-aarvak-blue"
                  required
                />
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-aarvak-blue"
                  required
                />
                <div className="flex gap-3">
                  <input
                    type="date"
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    className="w-1/2 border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-aarvak-blue"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-1/2 border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-aarvak-blue"
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-aarvak-blue resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-aarvak-blue text-primary-foreground py-3 rounded-lg font-semibold hover:bg-aarvak-blue-hover transition"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-background py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-aarvak-gray-900 mb-4">
            Health Tips, Straight to Your Inbox
          </h2>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-aarvak-blue"
            />
            <button className="bg-aarvak-blue text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-aarvak-blue-hover transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
