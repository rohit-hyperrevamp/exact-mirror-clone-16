import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Droplets,
  ShieldCheck,
  Layers,
  Clock,
  Download,
  CheckCircle2,
  Plus,
  Minus,
} from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import useSEO from "@/hooks/useSEO";

const whyChoose = [
  {
    icon: ShieldCheck,
    title: "Accurate Blood Analysis",
    desc: "Our hematology CBC tests provide precise insights into your blood health.",
  },
  {
    icon: Layers,
    title: "Comprehensive Test Coverage",
    desc: "Access a complete hematology tests list for routine and advanced diagnostics.",
  },
  {
    icon: Clock,
    title: "Fast & Reliable Reports",
    desc: "Quick turnaround for timely diagnosis and treatment decisions.",
  },
];

const testCategories = [
  {
    title: "Basic Blood Tests (CBC & Routine)",
    tests: [
      "CBC Test (Complete Blood Count)",
      "Haemoglobin (Hb)",
      "Hemoglobin & Hematocrit",
      "Total Leukocyte Count (TLC)",
      "TLC",
      "Platelet Count",
      "Absolute Eosinophil Count",
      "Erythrocyte Sedimentation Rate (ESR)",
      "Covestro Periodic Health Checkups Main Package B",
    ],
  },
  {
    title: "Infection & Disease Screening",
    tests: [
      "Malaria Antigen Detection, Blood",
      "Smear Examination for Malaria Parasite",
      "Malaria Antigen (Smear) Quantitative Buffy Coat",
      "Infection Panel 1",
      "Infection Panel 2",
      "Mono Test (Infectious Mononucleosis)",
      "Brucella Antibodies – IgM Antibody",
      "Brucella Antibodies – Total Antibodies",
      "WEIL Felix Test",
      "Treponema Pallidum Hemagglutination (TPHA)",
    ],
  },
  {
    title: "Clotting & Coagulation Tests",
    tests: [
      "Bleeding Time & Clotting Time",
      "Prothrombin Time Studies",
      "APTT (Activated Partial Thromboplastin Time)",
      "Thrombin Time (TT)",
      "Fibrinogen Level Factor I Citrated Plasma",
      "Fibrinogen, Clotting Activity",
      "Fibrinogen Degradation Products (FDP)",
    ],
  },
  {
    title: "Specialized Hematology Tests",
    tests: [
      "Lupus Anticoagulant Panel",
      "Coombs Test, Direct",
      "Coombs Test, Indirect",
      "Cold Agglutinin",
      "HAM Test; Paroxysmal Nocturnal Hemoglobinuria (PNH) Screening Test",
      "Reticulocyte Count",
      "RETIC Stain (Tissue)",
      "Peripheral Smear Review",
      "Dysmorphic RBC",
    ],
  },
  {
    title: "Factor & Advanced Blood Studies",
    tests: [
      "Factor VII Functional",
      "Factor VIII Functional",
      "Factor IX Functional",
    ],
  },
  {
    title: "Fluid & Additional Tests",
    tests: [
      "TLC & DLC Fluid",
      "PCV (Packed Cell Volume), Body Fluid",
    ],
  },
];

const processSteps = [
  "Blood sample collection",
  "Laboratory analysis using advanced equipment",
  "Expert validation by specialists",
  "Quick report delivery",
];

const faqs = [
  {
    q: "What are hematology tests?",
    a: "Hematology tests analyze blood components to diagnose infections, anemia, and clotting disorders.",
  },
  {
    q: "What is a CBC test?",
    a: "A CBC test measures red blood cells, white blood cells, hemoglobin, and platelets.",
  },
  {
    q: "What is included in a hematology tests list?",
    a: "It includes CBC, clotting tests, infection screening, and specialized blood tests.",
  },
  {
    q: "What is the hematology test price?",
    a: "Prices vary depending on the type of test and panel.",
  },
];

const measureItems = [
  "Red blood cells (RBCs)",
  "White blood cells (WBCs)",
  "Platelets",
  "Hemoglobin levels",
  "Blood clotting factors",
];

const HematologyTests = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSEO({
    title: "Hematology Tests & CBC Test | Aarvak Diagnostics",
    description:
      "Advanced hematology tests including CBC, clotting, infection screening & blood analysis with accurate reports and affordable pricing.",
    canonical: "/departments/pathology/hematology-tests",
  });

  return (
    <div className="bg-background">
      {/* Section 1: Hero */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "420px" }}>
          <img
            src="/images/hematology-banner.jpg"
            alt="Hematology Tests for Accurate Blood Analysis"
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
                  Hematology
                </h2>
              </div>
              <div className="w-px bg-white/40" style={{ height: "100px" }} />
              <div className="text-white max-w-md">
                <h1 className="text-2xl md:text-[32px] font-bold leading-tight">
                  Hematology Tests for Accurate Blood Analysis
                </h1>
                <p className="mt-3 text-[15px] opacity-85">
                  Comprehensive hematology lab tests including CBC and advanced blood analysis to detect infections, anemia, and clotting disorders with precision.
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

      {/* Tagline overlay */}
      <section className="relative z-20">
        <div
          className="bg-background rounded-tr-[40px] -mt-16 relative pt-10 pb-8 px-6 md:px-12"
          style={{ maxWidth: "52%" }}
        >
          <h2 className="text-xl md:text-[26px] font-bold leading-snug text-secondary">
            Precise Blood Diagnostics. Trusted Reports.
          </h2>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Comprehensive hematology lab tests and blood analysis for confident clinical decisions.
          </p>
        </div>
      </section>

      {/* Section 2: Advanced Hematology */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-5/12">
            <img
              src="/images/hematology-service.jpg"
              alt="Advanced Hematology Tests & Blood Diagnostics"
              className="w-full rounded-2xl object-cover"
              style={{ height: "480px" }}
              loading="lazy"
            />
          </div>
          <div className="lg:w-7/12 pt-2">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">
              Advanced Hematology Tests List<br />& Blood Diagnostics
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              Our laboratory offers a wide range of hematology tests and advanced blood diagnostics to evaluate blood health, diagnose disorders, and monitor overall well-being.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              We provide a comprehensive hematology tests list including CBC, platelet studies, coagulation profiles, malaria screening, ESR, haemoglobin analysis, clotting tests, and specialised blood investigations at competitive hematology test prices in Gurugram.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              From routine hematology CBC test services to specialized hematology investigations, our diagnostic services help identify infections, anemia, clotting disorders, and immune-related conditions.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-8">
              Using advanced technology and expert analysis, we ensure accurate and reliable results for every patient.
            </p>

            <h3 className="text-xl font-bold text-foreground mb-5">
              What Do Hematology Tests Measure?
            </h3>
            <p className="text-muted-foreground text-[15px] mb-4">
              Hematology testing focuses on analyzing blood components such as:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {measureItems.map((item) => (
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
            Why Choose Our Hematology Testing Services?
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
              Complete Hematology Tests List
            </h2>
            <p className="text-muted-foreground text-[15px] max-w-3xl mx-auto">
              Explore our comprehensive hematology tests list, covering essential blood tests for diagnosing infections, anemia, clotting disorders, and immune conditions.
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
                    <Droplets className="w-5 h-5 text-secondary" />
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

          <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact-us#contact"
              className="inline-flex items-center gap-2 bg-secondary text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-secondary/90 transition"
            >
              View Full Hematology Test List
            </Link>
            <Link
              to="/contact-us#contact"
              className="inline-flex items-center gap-2 border border-secondary text-secondary font-semibold px-7 py-3 rounded-full text-sm hover:bg-secondary/10 transition"
            >
              <Download className="w-4 h-4" />
              Download Complete Hematology Test List (PDF)
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Pricing */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-6">
            Hematology Test Price & Packages
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
            The hematology test price depends on the type of test and diagnostic panel selected. We offer affordable pricing with high-quality standards. Contact us or book online for detailed pricing.
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
              How Hematology Tests Work
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
            Book Your Hematology Tests Today
          </h2>
          <p className="text-base md:text-lg opacity-90 mb-8">
            Accurate blood analysis. Faster reports. Better health decisions.
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

export default HematologyTests;
