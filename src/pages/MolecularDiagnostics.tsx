import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Dna,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Plus,
  Minus,
  FlaskConical,
} from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import useSEO from "@/hooks/useSEO";

const whyChoose = [
  {
    icon: Dna,
    title: "Advanced PCR Technology",
    desc: "Our molecular diagnostics laboratory uses advanced PCR and molecular analysis systems for highly accurate and sensitive testing.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Infection Detection",
    desc: "We provide molecular diagnostic tests for infection screening, viral analysis, and advanced laboratory investigations with dependable reporting.",
  },
  {
    icon: Clock,
    title: "Fast & Accurate Reports",
    desc: "Quick turnaround times help support faster diagnosis, isolation decisions, and treatment planning.",
  },
];

const testCategories = [
  {
    title: "Molecular & PCR Tests",
    tests: [
      "SARS-CoV-2 Total Antibody Test",
      "SARS-CoV-2 Total Antigen Test",
      "DNA/RNA Extraction",
    ],
  },
];

const detectItems = [
  "Viral and bacterial infections",
  "Genetic material (DNA/RNA)",
  "Infectious disease markers",
  "Early-stage infections",
  "Immune response indicators",
  "Pathogen-specific molecular changes",
];

const processSteps = [
  "Sample collection by trained laboratory professionals",
  "DNA/RNA extraction and molecular analysis",
  "Advanced PCR processing and validation",
  "Quick and secure report delivery",
];

const faqs = [
  {
    q: "What is molecular diagnostics?",
    a: "Molecular diagnostics is a specialised laboratory method used to detect genetic material, infections, and disease-related molecular changes using advanced testing techniques.",
  },
  {
    q: "What are molecular diagnostic tests?",
    a: "Molecular diagnostic tests help identify viruses, bacteria, and genetic markers through PCR analysis and DNA/RNA-based laboratory methods.",
  },
  {
    q: "What is a DNA RNA extraction test?",
    a: "A DNA RNA extraction test isolates genetic material from a sample for advanced molecular analysis and diagnostic evaluation.",
  },
  {
    q: "Do you provide PCR test services in Gurgaon?",
    a: "Yes. We offer reliable PCR test services in Gurgaon with advanced molecular diagnostics and accurate laboratory reporting.",
  },
];

const MolecularDiagnostics = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSEO({
    title: "Molecular Diagnostics | Aarvak Diagnostics Gurgaon",
    description:
      "Advanced molecular diagnostics, PCR test in Gurgaon, DNA RNA extraction test & infection screening with fast and accurate reports.",
    canonical: "/departments/pathology/molecular-diagnostics",
  });

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "420px" }}>
          <img
            src="/images/molecular-diagnostics-banner.jpg"
            alt="Molecular Diagnostics & PCR Testing Services"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="flex items-center gap-6">
              <div className="text-right text-white">
                <p className="text-sm uppercase tracking-[0.25em] mb-1 font-medium">Pathology</p>
                <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
                  Molecular Diagnostics
                </h2>
              </div>
              <div className="w-px bg-white/40" style={{ height: "100px" }} />
              <div className="text-white max-w-md">
                <h1 className="text-2xl md:text-[32px] font-bold leading-tight">
                  Molecular Diagnostics & PCR Testing Services
                </h1>
                <p className="mt-3 text-[15px] opacity-85">
                  Advanced molecular diagnostics with high-precision PCR testing, DNA and RNA analysis, and infection detection services designed for accurate and timely clinical diagnosis.
                </p>
                <Link
                  to="/contact-us#contact"
                  className="inline-block mt-5 text-white font-semibold px-7 py-3 rounded-full text-sm bg-secondary hover:bg-secondary/90 transition"
                >
                  Book a Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline */}
      <section className="relative z-20">
        <div
          className="bg-background rounded-tr-[40px] -mt-16 relative pt-10 pb-8 px-6 md:px-12"
          style={{ maxWidth: "52%" }}
        >
          <h2 className="text-xl md:text-[26px] font-bold leading-snug text-secondary">
            Precision Molecular Testing. Trusted Results.
          </h2>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Reliable molecular diagnostic tests using advanced laboratory technology for infection screening, genetic analysis, and disease monitoring.
          </p>
        </div>
      </section>

      {/* Advanced Molecular Diagnostics */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-5/12">
            <img
              src="/images/molecular-diagnostics-service.jpg"
              alt="Advanced Molecular Diagnostics"
              className="w-full rounded-2xl object-cover"
              style={{ height: "480px" }}
              loading="lazy"
            />
          </div>
          <div className="lg:w-7/12 pt-2">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">
              Advanced Molecular Diagnostics<br />Tests & Diagnostic Services
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              Our diagnostic center offers advanced molecular diagnostics services designed to identify infections, detect genetic material, and support accurate disease diagnosis through modern molecular testing techniques.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              From routine PCR test services to specialised DNA RNA extraction test procedures, our laboratory helps doctors make faster and more informed clinical decisions.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-8">
              Using advanced diagnostic platforms and strict quality standards, we ensure every molecular diagnostic test delivers reliable and clinically accurate results.
            </p>

            <h3 className="text-xl font-bold text-foreground mb-5">What Do Molecular Diagnostic Tests Detect?</h3>
            <p className="text-muted-foreground text-[15px] mb-4">Molecular diagnostic tests help identify:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {detectItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "hsl(145, 60%, 90%)" }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground">
            Why Choose Our Molecular Diagnostics Laboratory?
          </h2>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {whyChoose.map((item) => (
            <div key={item.title} className="bg-background rounded-2xl p-8 text-center shadow-sm">
              <div
                className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-5"
                style={{ backgroundColor: "hsl(145, 60%, 90%)" }}
              >
                <item.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Complete Test List */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-4">
              Complete Molecular Diagnostic Tests List
            </h2>
            <p className="text-muted-foreground text-[15px] max-w-3xl mx-auto">
              Explore our advanced molecular diagnostics laboratory services designed for infection screening, PCR analysis, and DNA/RNA testing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testCategories.map((cat) => (
              <div
                key={cat.title}
                className="rounded-2xl border border-border p-6 bg-background hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "hsl(145, 60%, 90%)" }}
                  >
                    <FlaskConical className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{cat.title}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.tests.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PCR & DNA/RNA info */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-5xl mx-auto space-y-10">
          <div>
            <h2 className="text-2xl md:text-[32px] font-bold text-foreground mb-4">PCR Test in Gurgaon</h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Our laboratory provides reliable PCR test services in Gurgaon using advanced molecular diagnostic technology. PCR testing helps detect infections with high sensitivity and is widely used for viral screening and molecular-level disease detection.
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-[32px] font-bold text-foreground mb-4">DNA RNA Extraction Test Services</h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              DNA and RNA extraction is an essential step in molecular diagnostics that helps isolate genetic material for advanced laboratory analysis. Our DNA RNA extraction test services follow strict laboratory quality standards for accurate and dependable results.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-6">
            Molecular Diagnostics Test Price & Packages
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-4">
            The molecular diagnostic test price depends on the type of PCR analysis, infection screening panel, and molecular investigation required. We provide transparent pricing while maintaining strict laboratory quality and reporting standards.
          </p>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
            Contact us or book online to get detailed pricing information for molecular diagnostics and PCR test services in Gurgaon.
          </p>
          <Link
            to="/contact-us#contact"
            className="inline-block bg-secondary text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-secondary/90 transition"
          >
            Get Pricing Details
          </Link>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground">
              How Molecular Diagnostic Tests Work
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={step}
                className="relative rounded-2xl border border-border p-6 bg-background text-center"
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4 text-white font-bold"
                  style={{ backgroundColor: "hsl(var(--secondary))" }}
                >
                  {idx + 1}
                </div>
                <p className="text-sm font-medium text-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="bg-gray-100 rounded-2xl">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="text-base md:text-lg font-semibold text-foreground pr-4">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-secondary flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-secondary flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-muted-foreground text-[15px] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div
          className="max-w-5xl mx-auto rounded-3xl p-10 md:p-14 text-center text-white"
          style={{
            background:
              "linear-gradient(135deg, hsl(228, 100%, 19%) 0%, hsl(202, 99%, 36%) 100%)",
          }}
        >
          <h2 className="text-3xl md:text-[38px] font-bold mb-4">
            Book Your Molecular Diagnostic Tests Today
          </h2>
          <p className="text-base md:text-lg opacity-90 mb-8">
            Advanced molecular analysis. Accurate PCR testing. Reliable healthcare decisions.
          </p>
          <Link
            to="/contact-us#contact"
            className="inline-block bg-white text-secondary font-semibold px-8 py-3 rounded-full text-sm hover:bg-white/90 transition"
          >
            Book Now
          </Link>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default MolecularDiagnostics;
