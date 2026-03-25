import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { MessageSquare, Search, CheckCircle2 } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";

const faqs = [
  { q: "What is a Complete Blood Count (CBC) test?", a: "A CBC test measures red blood cells, white blood cells, haemoglobin, and platelets in your blood. It helps detect infections, anaemia, clotting disorders, and other conditions. At Aarvak Diagnostics, CBC results are typically available within 6 hours." },
  { q: "What is the difference between fasting and random blood sugar tests?", a: "A fasting blood sugar test measures glucose levels after 10-12 hours of fasting, while a random blood sugar test can be done at any time. Fasting sugar is more accurate for diagnosing diabetes and pre-diabetes. Both tests are available at Aarvak Diagnostics." },
  { q: "What does a thyroid profile test include?", a: "A thyroid profile typically includes T3 (triiodothyronine), T4 (thyroxine), and TSH (thyroid-stimulating hormone). These tests help detect hypothyroidism, hyperthyroidism, and other thyroid disorders. Early detection through regular testing helps manage thyroid conditions effectively." },
  { q: "What is HbA1c and why is it important?", a: "HbA1c measures your average blood sugar levels over the past 3 months. Unlike fasting sugar which shows a single point in time, HbA1c reveals the bigger picture of blood sugar control. An HbA1c above 6.5% typically indicates diabetes." },
  { q: "What is a lipid profile test?", a: "A lipid profile measures cholesterol levels in your blood, including total cholesterol, LDL (bad cholesterol), HDL (good cholesterol), and triglycerides. This test is essential for assessing heart disease risk, especially for adults over 30." },
  { q: "What does a liver function test (LFT) check?", a: "An LFT measures enzymes and proteins in your blood to assess liver health. It checks bilirubin, ALT, AST, alkaline phosphatase, and albumin levels. Regular LFT testing is important for people taking medications, consuming alcohol, or with fatty liver risk." },
  { q: "What is the purpose of a kidney function test (KFT)?", a: "A KFT evaluates how well your kidneys filter waste from blood. It measures creatinine, blood urea nitrogen (BUN), uric acid, and electrolytes. Early detection of kidney issues through KFT can prevent chronic kidney disease." },
  { q: "Why is Vitamin D testing important in India?", a: "Vitamin D deficiency is widespread in India despite abundant sunlight, affecting over 70% of urban populations. Low Vitamin D causes bone weakness, fatigue, muscle pain, and weakened immunity. A simple blood test at Aarvak Diagnostics can check your Vitamin D levels." },
  { q: "When should I get a health checkup done?", a: "Adults should get a comprehensive health checkup annually. If you have risk factors like diabetes in the family, high stress, sedentary lifestyle, or are over 40, more frequent testing is recommended. Aarvak Diagnostics offers preventive health packages starting at ₹599." },
  { q: "How long does it take to get diagnostic test reports?", a: "At Aarvak Diagnostics, most routine blood test reports are delivered within 6-12 hours via WhatsApp and email. Specialised tests like cultures may take 24-48 hours. Radiology reports are typically available within 2-4 hours." },
  { q: "Do I need to fast before blood tests?", a: "Fasting (10-12 hours) is required for tests like fasting blood sugar, lipid profile, and some liver function markers. You can drink plain water during fasting. Tests like CBC, thyroid profile, and Vitamin D do not require fasting." },
  { q: "What is the difference between pathology and radiology tests?", a: "Pathology tests analyse body fluids like blood and urine to detect diseases. Radiology tests use imaging technology like X-rays, ultrasound, and ECG to visualise internal organs and structures. Both are available at Aarvak Diagnostics in Gurugram." },
];

const AeoFaqDiagnosticTests = () => {
  useSEO({
    title: "Diagnostic Test FAQs – Blood Test Guide | Aarvak",
    description: "Get answers to common diagnostic test questions. Learn about CBC, thyroid, HbA1c, lipid profile, LFT, KFT & more from Aarvak Diagnostics Gurugram.",
    canonical: "/faq-diagnostic-tests",
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
      <section className="bg-gradient-to-br from-cyan-700 to-cyan-900 py-20 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6" />
            <span className="text-sm font-medium opacity-90 uppercase tracking-wider">Answer Engine Optimised</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Diagnostic Test FAQs</h1>
          <p className="text-lg text-cyan-100">Clear, expert answers to the most commonly asked questions about blood tests and diagnostic testing.</p>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto py-16 px-4">
        <div className="flex items-center gap-3 mb-8">
          <Search className="w-5 h-5 text-cyan-600" />
          <h2 className="text-2xl font-bold text-gray-900">{faqs.length} Questions Answered</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden" open={i === 0}>
              <summary className="cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50 transition list-none flex justify-between items-center gap-4">
                <span className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold text-sm mt-0.5">Q{i + 1}</span>
                  <span>{faq.q}</span>
                </span>
                <span className="text-cyan-600 group-open:rotate-45 transition-transform text-xl flex-shrink-0">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 leading-relaxed ml-10">{faq.a}</div>
            </details>
          ))}
        </div>

        {/* Related Content */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Pathology Services", desc: "Explore our complete range of lab tests", link: "/pathology" },
              { title: "Health Checkup Packages", desc: "Preventive screening packages from ₹599", link: "/health-checkups" },
              { title: "Radiology & Imaging", desc: "X-Ray, ultrasound, ECG services", link: "/radiology" },
              { title: "Book a Test", desc: "Schedule your diagnostic test today", link: "/contact-us#contact" },
            ].map((r) => (
              <Link key={r.title} to={r.link} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-cyan-400 transition">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
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
          <p className="text-gray-600 mb-4">Have more questions? We're here to help.</p>
          <Link to="/contact-us#contact" className="inline-block bg-aarvak-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-aarvak-blue-hover transition">
            Contact Aarvak Diagnostics
          </Link>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default AeoFaqDiagnosticTests;
