import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { MessageSquare, Search, CheckCircle2, Heart } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";

const faqs = [
  { q: "What is a preventive health checkup?", a: "A preventive health checkup is a comprehensive set of diagnostic tests designed to assess your overall health and detect potential issues before symptoms appear. It typically includes blood tests, organ function panels, and vital markers like cholesterol, sugar, thyroid, and vitamins." },
  { q: "How often should I get a health checkup?", a: "Adults should get a full health checkup at least once a year. If you are over 40, have a family history of chronic diseases, or lead a sedentary lifestyle, consider getting checked every 6 months. Regular screening helps catch conditions like diabetes, heart disease, and thyroid disorders early." },
  { q: "What tests are included in a full body checkup?", a: "A full body checkup at Aarvak Diagnostics typically includes CBC, blood sugar, HbA1c, lipid profile, liver function test (LFT), kidney function test (KFT), thyroid profile, Vitamin D, Vitamin B12, iron studies, urine examination, and more depending on the package selected." },
  { q: "What is the cost of a health checkup at Aarvak Diagnostics?", a: "Health checkup packages at Aarvak Diagnostics start from ₹599 for the ADC Basic Panel with essential tests. Our ADC Essential Panel is ₹999, Essential Plus is ₹1,499, Advanced is ₹1,999, and the comprehensive Supreme Panel is ₹2,999. All packages include digital report delivery." },
  { q: "Do I need to fast before a health checkup?", a: "Yes, most health checkup packages require 10-12 hours of fasting for accurate results on tests like fasting blood sugar and lipid profile. You can drink plain water during the fasting period. Our team will inform you about specific fasting requirements when you book." },
  { q: "Can I get a health checkup done at home?", a: "Yes, Aarvak Diagnostics offers home sample collection for all health checkup packages across Gurugram. A trained phlebotomist visits your home at your preferred time, collects the samples following strict safety protocols, and your reports are delivered digitally within hours." },
  { q: "What health checkup is recommended for people over 40?", a: "For people over 40, we recommend the ADC Advanced or Supreme Panel which includes comprehensive cardiac markers, organ function tests, diabetes screening (HbA1c), thyroid panel, vitamin levels, and inflammatory markers like CRP and RA Factor for early detection of age-related conditions." },
  { q: "Which health checkup package is best for women?", a: "Women should consider packages that include thyroid profile, iron studies, Vitamin D, Vitamin B12, CBC, and hormonal markers. Our ADC Essential Plus and Advanced packages cover these key areas. Women over 30 should add bone health screening as well." },
  { q: "What is the difference between ADC Basic and ADC Supreme packages?", a: "ADC Basic (₹599) covers 6 essential tests including CBC, blood sugar, and lipid profile. ADC Supreme (₹2,999) is our most comprehensive package with tests covering blood sugar, HbA1c, vitamins D & B12, CRP, cancer markers (CA/PSA), thyroid, iron, lipid, liver, kidney function, and more." },
  { q: "How quickly will I get my health checkup reports?", a: "Most health checkup reports from Aarvak Diagnostics are delivered within 6-12 hours via WhatsApp and email. Some specialised tests within comprehensive packages may take up to 24-48 hours. Digital reports are easy to share with your doctor for consultation." },
  { q: "Is a health checkup covered by insurance?", a: "Many health insurance plans in India cover preventive health checkups. Check with your insurance provider about your policy's preventive care benefits. Aarvak Diagnostics can provide proper billing and documentation required for insurance claims." },
  { q: "What should I do after getting my health checkup results?", a: "After receiving your results, review them with your doctor for proper interpretation. Abnormal values are flagged in the report. Aarvak Diagnostics also offers post-report doctor consultations to help you understand your results and plan any follow-up tests or lifestyle changes." },
];

const AeoFaqHealthCheckups = () => {
  useSEO({
    title: "Health Checkup FAQs – Packages & Pricing | Aarvak",
    description: "Get answers about health checkup packages, pricing, fasting requirements & more. Aarvak Diagnostics offers checkups from ₹599 with home collection in Gurugram.",
    canonical: "/faq-health-checkups",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  });

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 py-20 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6" />
            <span className="text-sm font-medium opacity-90 uppercase tracking-wider">Health Checkup Guide</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Health Checkup FAQs</h1>
          <p className="text-lg text-green-100">Everything you need to know about preventive health checkups, packages, costs, and what to expect.</p>
        </div>
      </section>

      {/* Package Quick Info */}
      <section className="max-w-4xl mx-auto -mt-8 px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { name: "Basic", price: "₹599" },
            { name: "Essential", price: "₹999" },
            { name: "Essential+", price: "₹1,499" },
            { name: "Advanced", price: "₹1,999" },
            { name: "Supreme", price: "₹2,999" },
          ].map((pkg) => (
            <div key={pkg.name} className="bg-white rounded-xl shadow-lg p-4 text-center">
              <p className="text-xs font-semibold text-gray-500 uppercase">ADC {pkg.name}</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{pkg.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto py-16 px-4">
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare className="w-5 h-5 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">{faqs.length} Questions Answered</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden" open={i === 0}>
              <summary className="cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50 transition list-none flex justify-between items-center gap-4">
                <span className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-sm mt-0.5">Q{i + 1}</span>
                  <span>{faq.q}</span>
                </span>
                <span className="text-green-600 group-open:rotate-45 transition-transform text-xl flex-shrink-0">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 leading-relaxed ml-10">{faq.a}</div>
            </details>
          ))}
        </div>

        {/* Related */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Explore Our Services</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "View All Packages", desc: "Compare health checkup packages", link: "/health-checkups" },
              { title: "Home Sample Collection", desc: "Get tested from your doorstep", link: "/insights/home-sample-collection-benefits-safety-how-it-works" },
              { title: "Corporate Wellness", desc: "Health programs for companies", link: "/corporate" },
              { title: "Book Now", desc: "Schedule your health checkup today", link: "/contact-us#contact" },
            ].map((r) => (
              <Link key={r.title} to={r.link} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-400 transition">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{r.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Ready to take charge of your health?</p>
          <Link to="/contact-us#contact" className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition">
            Book Health Checkup
          </Link>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default AeoFaqHealthCheckups;
