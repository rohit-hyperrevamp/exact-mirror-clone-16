import { Link } from "react-router-dom";
import { CheckCircle, Zap, Wind, Activity } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import useSEO from "@/hooks/useSEO";

const taglineItems = [
  { bold: "Modern", sub: "Imaging Equipment" },
  { bold: "Experienced", sub: "Radiology Team" },
  { bold: "Safe &", sub: "Comfortable Procedure" },
];

const whyChoose = [
  "Modern digital X-Ray imaging equipment",
  "Experienced radiographers and technicians",
  "Fast turnaround time for reports",
  "Digital radiography for Hip, Knee, Ankle & Chest",
  "ECG and PFT services on-site",
  "Safe and patient-friendly imaging procedures",
];

const detectList = [
  "Hip joint conditions and injuries",
  "Knee joint conditions and injuries",
  "Ankle joint conditions and injuries",
  "Chest and lung abnormalities",
  "Respiratory health conditions (via PFT)",
  "Cardiac rhythm assessment (via ECG)",
];

const services = [
  {
    icon: Zap,
    title: "X-Ray",
    desc: "Digital X-Ray imaging — available only for Hip Joint, Knee Joint, Ankle Joint and Chest.",
  },
  {
    icon: Wind,
    title: "PFT",
    desc: "Pulmonary Function Testing (PFT) for assessing lung health, breathing capacity, and respiratory performance.",
  },
  {
    icon: Activity,
    title: "ECG",
    desc: "Electrocardiogram (ECG) for assessing cardiac rhythm and basic heart function.",
  },
];

const faqs = [
  {
    q: "What is diagnostic radiology?",
    a: "Diagnostic radiology uses imaging technologies such as X-Ray to diagnose and monitor medical conditions. At Aarvak Diagnostics we offer X-Ray for Hip Joint, Knee Joint, Ankle Joint and Chest only.",
  },
  {
    q: "Do you provide digital radiography services?",
    a: "Yes. We offer advanced digital radiography services for accurate and efficient diagnostic imaging.",
  },
  {
    q: "What is included in radiology diagnostic services?",
    a: "Our radiology diagnostic services include X-Ray (Hip Joint, Knee Joint, Ankle Joint and Chest only), ECG, and PFT (Pulmonary Function Test).",
  },
  {
    q: "What is the radiology test price?",
    a: "The radiology test price depends on the imaging procedure and diagnostic evaluation required.",
  },
];

const Radiology = () => {
  useSEO({
    title: "Radiology Centre in Gurgaon | Aarvak Diagnostics",
    description: "Trusted radiology centre in Gurgaon offering diagnostic radiology, digital radiography services & accurate imaging reports.",
    canonical: "/departments/radiology",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  });
  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden min-h-[440px] md:h-[420px]">
          <img
            src="/images/menu-2.png"
            alt="Radiology Centre in Gurgaon"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex items-center justify-center min-h-[440px] md:h-full px-4 py-10 md:py-0">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full max-w-4xl">
              <div className="text-center md:text-right text-white">
                <p className="text-xs md:text-sm uppercase tracking-[0.25em] mb-2 font-medium">About</p>
                <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: "Georgia, serif" }}>Radiology Centre in Gurgaon</h1>
              </div>
              <div className="hidden md:block w-px bg-white/40" style={{ height: '100px' }} />
              <div className="text-center md:text-left text-white max-w-md">
                <h2 className="text-xl md:text-[30px] font-bold leading-tight">Accurate Imaging & Diagnostic Radiology</h2>
                <p className="mt-3 text-sm md:text-[15px] opacity-80">Advanced diagnostic radiology services with modern imaging technology, experienced radiologists, and reliable reporting for accurate healthcare decisions.</p>
                <Link
                  to="/contact-us#contact"
                  className="inline-block mt-5 text-white font-semibold px-7 py-3 rounded-full text-sm bg-secondary hover:bg-secondary/90 transition"
                >
                  Book Imaging Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline overlay */}
      <section className="relative z-20">
        <div className="bg-background rounded-tr-[40px] -mt-10 md:-mt-16 relative pt-8 md:pt-10 pb-6 md:pb-8 px-4 md:px-12 w-full md:max-w-[52%]">
          <div className="flex flex-wrap items-center gap-3 md:gap-6">
            {taglineItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 md:gap-6">
                <div className="text-center">
                  <p className="text-sm md:text-xl font-bold text-secondary">{item.bold}</p>
                  <p className="text-[11px] md:text-sm text-muted-foreground font-medium">{item.sub}</p>
                </div>
                {i < taglineItems.length - 1 && (
                  <div className="w-px h-8 md:h-10 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Radiology & Diagnostic Imaging */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-5/12">
            <img
              src="/images/diagnostic.png"
              alt="Radiology Imaging"
              className="w-full rounded-2xl object-cover"
              style={{ height: '450px' }}
            />
          </div>
          <div className="lg:w-7/12 pt-4">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">
              Advanced Radiology &<br />Diagnostic Imaging
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              Our radiology centre offers digital X-Ray imaging along with ECG and PFT for accurate medical evaluation. Please note: our in-house X-Ray service covers only Hip Joint, Knee Joint, Ankle Joint and Chest X-Rays.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              From routine scans to advanced diagnostic radiology procedures, our imaging services help doctors diagnose conditions early and plan effective treatment.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-8">
              Our in-house X-Ray service is limited to Hip Joint, Knee Joint, Ankle Joint and Chest X-Rays only. Alongside this we offer ECG and PFT (Pulmonary Function Test). We do not currently offer MRI, CT, ultrasound, ECHO or TMT.
            </p>

            <h3 className="text-xl font-bold text-foreground mb-5">Why Choose Our Radiology Services</h3>
            <ul className="space-y-3">
              {whyChoose.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[15px] text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What Does Diagnostic Radiology Help Detect */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-[34px] font-bold text-foreground mb-4 text-center">
            What Does Diagnostic Radiology Help Detect?
          </h2>
          <p className="text-muted-foreground text-center mb-8">Diagnostic radiology helps evaluate:</p>
          <ul className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {detectList.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[15px] text-muted-foreground bg-background rounded-xl px-5 py-4 shadow-sm">
                <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Radiology Services */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground">Our Radiology Services</h2>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {services.map((service) => {
            const href = service.title === "X-Ray" ? "/departments/radiology/x-ray-services" : "/departments/radiology/pft-test";
            return (
              <Link key={service.title} to={href} className="bg-background rounded-2xl p-8 text-center shadow-sm border border-border hover:shadow-md hover:border-secondary/40 transition block">
                <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-5" style={{ backgroundColor: 'hsl(145, 60%, 90%)' }}>
                  <service.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Basic Radiology & Pricing */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Basic Radiology & Imaging Support</h2>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              We provide basic radiology and imaging support services designed for routine health screening, preventive care, and accurate medical diagnosis using modern diagnostic systems.
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Radiology Test Price & Packages</h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-3">
              The radiology test price depends on the type of imaging procedure, scan, and diagnostic evaluation required. We maintain transparent pricing with reliable reporting and quality-focused imaging services.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-6">
              Contact us or book online to get detailed pricing information for radiology diagnostic services in Gurgaon.
            </p>
            <Link
              to="/contact-us#contact"
              className="inline-block bg-secondary text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-secondary/90 transition"
            >
              Get Pricing Details
            </Link>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Why Patients Trust Our Radiology Center</h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-3">
              Our radiology center focuses on accurate imaging, patient comfort, timely reporting, and advanced technology to support better healthcare decisions. Every diagnostic scan is performed following strict quality and safety standards.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              Whether you are searching for a trusted radiology lab near me or advanced radiology diagnostic services in Gurgaon, Aarvak Diagnostics provides dependable imaging support tailored to patient needs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-muted rounded-xl p-6">
                <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{f.q}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Book Your Radiology Tests Today</h2>
          <p className="text-muted-foreground text-[15px] mb-6">Accurate imaging. Faster reports. Better healthcare decisions.</p>
          <Link
            to="/contact-us#contact"
            className="inline-block bg-secondary text-white font-semibold px-8 py-3 rounded-full text-sm hover:bg-secondary/90 transition"
          >
            Book Now
          </Link>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default Radiology;
