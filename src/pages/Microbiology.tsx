import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Microscope,
  ShieldCheck,
  Layers,
  Clock,
  CheckCircle2,
  Plus,
  Minus,
} from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import useSEO from "@/hooks/useSEO";

const whyChoose = [
  {
    icon: ShieldCheck,
    title: "Accurate Infection Diagnosis",
    desc: "Our microbiology laboratory tests are performed using advanced technology and validated laboratory protocols for precise results.",
  },
  {
    icon: Layers,
    title: "Wide Test Coverage",
    desc: "Access a comprehensive range of microbiology lab tests including viral markers, bacterial cultures, fungal analysis, and rapid screening panels.",
  },
  {
    icon: Clock,
    title: "Fast & Reliable Reports",
    desc: "Timely reporting helps support faster diagnosis, appropriate treatment planning, and better patient outcomes.",
  },
];

const testCategories = [
  {
    title: "Viral & Infectious Disease Tests",
    tests: [
      "Hepatitis B Surface Antibody, Anti-HBs",
      "Hepatitis C Virus (Anti HCV)",
      "Hepatitis E Antibody (Anti-HEV), IgM",
      "HBsAg Rapid Qualitative",
      "HCV Rapid Qualitative",
      "Hepatits-C Antibody (Anti-HCV)",
      "Hepatitis-B Surface Antigen (HBsAg) Quantitative",
      "Hepatitis Delta Virus (HDV) Antibody IgM",
      "Hepatitis E Antibody (Anti-HEV), IgG",
      "HCV-IgM Antibody",
      "Viral Marker Panel, Quantitative",
      "HIV-1&2 Antibody",
      "Dengue Antibody, IgG",
      "Dengue Antibody, IgM",
      "Dengue Duo Rapid Screening Test",
      "Dengue Fever NS1 Antigen",
      "Dengue Panel (IgG/IgM)",
      "VDRL (RPR)",
      "TYPHI IgG & IgM (dOT)",
      "Typhidot IgM",
      "Rota Virus Antigen",
    ],
  },
  {
    title: "Culture & Sensitivity Tests",
    tests: [
      "Stool Culture",
      "Culture Aerobic, Miscellaneous with Gram Stain",
      "Culture, AFB (Mycobacterium), Rapid",
      "Culture & Sensitivity Aerobic, Cerebrospinal Fluid (CSF)",
      "Culture & Sensitivity Aerobic, Urine",
      "Culture Anaerobic",
      "Bone Marrow, Culture & Sensitivity",
      "Culture & Sensitivity Aerobic Vaginal Swab",
      "Culture & Sensitivity Aerobic Semen",
      "Culture & Sensitivity Aerobic Pus",
      "Culture & Sensitivity Aerobic, Respiratory Specimens",
      "Culture & Sensitivity Aerobic, Tissue",
      "Culture & Sensitivity Aerobic, Tip",
      "Culture & Sensitivity Aerobic, Semen",
      "Culture & Sensitivity Aerobic, Throat Swab",
      "Culture & Sensitivity Aerobic Body Fluids, Rapid",
      "Culture & Sensitivity Aerobic, Body Fluids",
      "Culture, Anaerobic, Blood, Rapid",
    ],
  },
  {
    title: "Stains & Microscopy Tests",
    tests: [
      "AFB Stain",
      "AFB Stain (Miscellaneous)",
      "Gram Staining",
      "Copper Stain",
      "Fontana Stain for Melanin",
      "Sudan IV Stain Fecal Fat",
      "Albert Stain",
      "Fungal stain (KOH Preparation)",
      "Hemosiderin",
    ],
  },
  {
    title: "Fungal & Respiratory Infection Tests",
    tests: ["Fungal Culture", "Sputum Examination, AFB"],
  },
  {
    title: "Routine & Special Microbiology Tests",
    tests: [
      "Pregnancy Test, Urine",
      "Rheumatoid Factor (RA)",
      "Blood Group ABO and RH Factor",
      "C. Diphtheria Culture",
    ],
  },
];

const processSteps = [
  "Sample collection by trained laboratory professionals",
  "Advanced microbiological analysis and culture processing",
  "Expert review and validation of reports",
  "Quick and secure report delivery",
];

const faqs = [
  {
    q: "What are microbiology laboratory tests?",
    a: "Microbiology laboratory tests help detect bacterial, viral, fungal, and parasitic infections using advanced laboratory analysis techniques.",
  },
  {
    q: "What is a culture and sensitivity test?",
    a: "A culture and sensitivity test identifies infection-causing microorganisms and determines which antibiotics may be effective for treatment.",
  },
  {
    q: "How long do microbiology lab test reports take?",
    a: "Report timing depends on the type of test and culture growth requirements. Some rapid tests are available within hours, while cultures may take longer.",
  },
  {
    q: "Are microbiology lab tests accurate?",
    a: "Yes. Our clinical microbiology tests follow strict quality protocols and advanced diagnostic procedures to ensure reliable and accurate results.",
  },
];

const detectItems = [
  "Bacterial infections",
  "Viral infections",
  "Fungal infections",
  "Antibiotic resistance patterns",
  "Respiratory and gastrointestinal infections",
  "Blood-borne infectious diseases",
  "Urinary tract infections",
  "Sexually transmitted infections",
];

const Microbiology = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSEO({
    title: "Microbiology Laboratory Tests | Aarvak Diagnostics",
    description:
      "Advanced microbiology laboratory tests, culture and sensitivity test services, viral screening & infection diagnostics with accurate reports.",
    canonical: "/departments/pathology/Microbiology",
  });

  return (
    <div className="bg-background">
      {/* Section 1: Hero */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "420px" }}>
          <img
            src="/images/microbiology-banner.jpg"
            alt="Microbiology Laboratory Tests"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="flex items-center gap-6">
              <div className="text-right text-white">
                <p className="text-sm uppercase tracking-[0.25em] mb-1 font-medium">
                  Pathology
                </p>
                <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
                  Microbiology
                </h2>
              </div>
              <div className="w-px bg-white/40" style={{ height: "100px" }} />
              <div className="text-white max-w-md">
                <h1 className="text-2xl md:text-[32px] font-bold leading-tight">
                  Microbiology Laboratory Tests for Accurate Infection Diagnosis
                </h1>
                <p className="mt-3 text-[15px] opacity-85">
                  Advanced microbiology lab tests with precise analysis, modern diagnostic technology, and expert validation for reliable infection detection and disease monitoring.
                </p>
                <Link
                  to="/packages"
                  className="inline-block mt-5 text-white font-semibold px-7 py-3 rounded-full text-sm bg-secondary hover:bg-secondary/90 transition"
                >
                  Book a Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline overlay */}
      <section className="relative z-20">
        <div
          className="bg-background rounded-tr-[40px] -mt-16 relative pt-10 pb-8 px-6 md:px-12"
          style={{ maxWidth: "52%" }}
        >
          <h2 className="text-xl md:text-[26px] font-bold leading-snug text-secondary">
            Precision Microbiology. Trusted Results.
          </h2>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Comprehensive microbiology laboratory tests and culture analysis for accurate clinical diagnosis and effective treatment decisions.
          </p>
        </div>
      </section>

      {/* Section 2: Advanced Clinical Microbiology */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-5/12">
            <img
              src="/images/microbiology-service.jpg"
              alt="Advanced Clinical Microbiology"
              className="w-full rounded-2xl object-cover"
              style={{ height: "480px" }}
              loading="lazy"
            />
          </div>
          <div className="lg:w-7/12 pt-2">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">
              Advanced Clinical Microbiology<br />Tests & Diagnostic Services
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              Our diagnostic center offers a wide range of microbiology laboratory tests designed to identify bacterial, viral, fungal, and parasitic infections with accuracy and speed.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              From routine infection screening to specialised clinical microbiology tests, our laboratory services support doctors in diagnosing infectious diseases, monitoring treatment response, and preventing complications.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-8">
              We follow strict quality standards and use advanced diagnostic systems to ensure every culture and sensitivity test delivers dependable and clinically relevant results.
            </p>

            <h3 className="text-xl font-bold text-foreground mb-5">
              What Do Microbiology Lab Tests Detect?
            </h3>
            <p className="text-muted-foreground text-[15px] mb-4">
              Microbiology lab tests help identify and evaluate:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {detectItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-border p-3"
                >
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

      {/* Section 3: Why Choose */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground">
            Why Choose Our Microbiology Testing Services?
          </h2>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {whyChoose.map((item) => (
            <div
              key={item.title}
              className="bg-background rounded-2xl p-8 text-center shadow-sm"
            >
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

      {/* Section 4: Complete Test List */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-4">
              Complete Microbiology Test List
            </h2>
            <p className="text-muted-foreground text-[15px] max-w-3xl mx-auto">
              Explore our comprehensive microbiology test list covering viral screening, infection diagnosis, culture and sensitivity test services, fungal studies, and specialised microbiological investigations.
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
                    <Microscope className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{cat.title}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.tests.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
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

      {/* Section 5: Pricing */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-6">
            Culture and Sensitivity Test Price & Packages
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-4">
            The culture and sensitivity test price depends on the type of sample, infection screening panel, and diagnostic investigation required. We provide transparent and affordable pricing while maintaining strict laboratory quality standards.
          </p>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
            Contact us or book online to get detailed pricing information for microbiology laboratory tests.
          </p>
          <Link
            to="/contact-us#contact"
            className="inline-block bg-secondary text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-secondary/90 transition"
          >
            Get Pricing Details
          </Link>
        </div>
      </section>

      {/* Section 6: Process */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground">
              How Microbiology Laboratory Tests Work
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

      {/* Section 7: FAQ */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-muted">
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

      {/* Section 8: CTA */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div
          className="max-w-5xl mx-auto rounded-3xl p-10 md:p-14 text-center text-white"
          style={{
            background:
              "linear-gradient(135deg, hsl(228, 100%, 19%) 0%, hsl(202, 99%, 36%) 100%)",
          }}
        >
          <h2 className="text-3xl md:text-[38px] font-bold mb-4">
            Book Your Microbiology Lab Tests Today
          </h2>
          <p className="text-base md:text-lg opacity-90 mb-8">
            Accurate infection diagnosis. Faster reports. Better treatment decisions.
          </p>
          <Link
            to="/packages"
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

export default Microbiology;
