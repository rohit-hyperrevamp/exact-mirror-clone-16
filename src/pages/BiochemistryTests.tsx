import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FlaskConical,
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
    title: "Accuracy You Can Trust",
    desc: "Our biochemistry blood tests ensure high precision with advanced diagnostic systems.",
  },
  {
    icon: Layers,
    title: "Wide Test Coverage",
    desc: "Access a complete biochemistry test list for comprehensive health evaluation.",
  },
  {
    icon: Clock,
    title: "Fast & Reliable Reports",
    desc: "Quick turnaround times to support faster diagnosis and treatment.",
  },
];

const testCategories = [
  {
    title: "Liver Function Tests",
    tests: [
      "ALT (SGPT)",
      "AST (SGOT)",
      "Bilirubin (Total, Direct, Indirect)",
      "Gamma-Glutamyl Transferase (GGT)",
      "Bile Acid, Total",
      "Cholinesterase",
    ],
  },
  {
    title: "Kidney Function Tests",
    tests: [
      "Creatinine",
      "Creatinine with GFR",
      "Creatinine Clearance Test",
      "Blood Urea Nitrogen (BUN)",
      "Urea Nitrogen",
      "Kidney Function Test",
      "Kidney Dialysis Panel",
      "Protein-Creatinine Ratio",
      "Peritoneal Equilibrium & Adequacy Test",
      "Peritoneal Equilibrium Test",
      "Kidney Panel (KFT) with Urine",
      "Bicarbonate",
    ],
  },
  {
    title: "Diabetes & Glucose Tests",
    tests: [
      "Glucose (Fasting)",
      "Glucose (Random)",
      "Glucose (Post-Prandial)",
      "Glucose Challenge Test",
      "Glucose Tolerance Test (GTT)",
      "Gestational Glucose Tolerance",
      "Diabetes Check-up",
      "Glucose 1 hr",
      "Glucose (Fasting), Urine",
      "Glucose (PP), Urine",
      "Gestational Glucose Tolerance 3",
    ],
  },
  {
    title: "Lipid Profile & Cholesterol",
    tests: [
      "Cholesterol",
      "HDL Cholesterol",
      "LDL Cholesterol",
      "LDL Cholesterol, Direct",
      "Triglycerides",
      "Lipid Profile",
    ],
  },
  {
    title: "Electrolytes & Minerals",
    tests: [
      "Sodium",
      "Potassium",
      "Calcium",
      "Calcium Ionized",
      "Magnesium",
      "Chloride",
      "Phosphorus",
      "Electrolytes",
      "Bicarbonate",
      "Phosphorus Levels",
    ],
  },
  {
    title: "Enzymes & Proteins",
    tests: [
      "Total Protein",
      "Albumin, Globulin",
      "Lactate Dehydrogenase (LDH)",
      "Creatinine Kinase",
      "Amylase",
      "Lipase",
      "Serum Amylase",
      "Total Protein, Albumin, Globulin, Serum",
    ],
  },
  {
    title: "Iron & Special Tests",
    tests: [
      "Iron Levels",
      "Iron Studies",
      "Iron Monitoring Panel",
      "Iron Studies Monitoring Panel",
      "Transferrin",
      "Unsaturated Iron Binding Capacity",
      "Uric Acid",
      "Uric Acid (24-Hour)",
      "C-Reactive Protein (CRP)",
      "Ammonia",
      "Lithium",
    ],
  },
  {
    title: "Fluid & Specialized Tests",
    tests: [
      "CSF Examination Routine",
      "Fluid Examination for Biochemistry",
      "Lipase, Fluid",
      "Triglycerides (Fluid)",
    ],
  },
];

const processSteps = [
  "Sample collection by trained professionals",
  "Advanced laboratory analysis",
  "Expert validation of results",
  "Quick report delivery",
];

const faqs = [
  {
    q: "What are biochemistry lab tests?",
    a: "Biochemistry lab tests analyze blood and fluids to assess organ function and detect diseases.",
  },
  {
    q: "What is included in a biochemistry test list?",
    a: "It includes liver, kidney, glucose, lipid, enzyme, and electrolyte tests.",
  },
  {
    q: "What is the biochemistry test price?",
    a: "Prices vary depending on individual tests and diagnostic panels.",
  },
  {
    q: "Are biochemistry blood tests accurate?",
    a: "Yes, when conducted in a certified lab with proper quality control.",
  },
];

const measureItems = [
  "Liver and kidney function",
  "Blood sugar levels",
  "Lipid profile and cholesterol",
  "Electrolytes and minerals",
  "Enzymes and proteins",
];

const BiochemistryTests = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSEO({
    title: "Biochemistry Blood Test | Aarvak Diagnostics",
    description:
      "Book accurate biochemistry blood test services with advanced clinical biochemistry tests, complete biochemistry test list & fast reports.",
    canonical: "/departments/pathology/biochemistry-tests",
  });

  return (
    <div className="bg-background">
      {/* Section 1: Hero */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "420px" }}>
          <img
            src="/images/pathology-banner.png"
            alt="Biochemistry Lab Tests"
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
                  Biochemistry
                </h2>
              </div>
              <div className="w-px bg-white/40" style={{ height: "100px" }} />
              <div className="text-white max-w-md">
                <h1 className="text-2xl md:text-[32px] font-bold leading-tight">
                  Biochemistry Blood Test & Lab Tests for Accurate Diagnosis
                </h1>
                <p className="mt-3 text-[15px] opacity-85">
                  Advanced biochemistry blood test services with precise analysis, modern technology, and expert validation for reliable health insights.
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
            Precision Biochemistry. Trusted Results.
          </h2>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Comprehensive blood chemistry analysis and clinical biochemistry tests for confident clinical decisions.
          </p>
        </div>
      </section>

      {/* Section 2: Advanced Clinical Biochemistry */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-5/12">
            <img
              src="/images/diagnostics-service.png"
              alt="Advanced Clinical Biochemistry"
              className="w-full rounded-2xl object-cover"
              style={{ height: "480px" }}
            />
          </div>
          <div className="lg:w-7/12 pt-2">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">
              Advanced Clinical Biochemistry<br />Tests & Diagnostic Services
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              Our diagnostic center offers a wide range of biochemistry lab tests designed to evaluate organ function, detect diseases early, and monitor overall health.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              From routine screenings to specialised clinical biochemistry tests, our services help doctors make accurate and timely medical decisions using advanced laboratory diagnostics.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-8">
              We use advanced equipment and strict quality protocols to ensure every biochemistry blood test delivers dependable results.
            </p>

            <h3 className="text-xl font-bold text-foreground mb-5">
              What Do Biochemistry Tests Measure?
            </h3>
            <p className="text-muted-foreground text-[15px] mb-4">
              Biochemistry tests analyse blood and body fluids to assess the following:
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
            Why Choose Our Biochemistry Testing Services?
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
              Complete Biochemistry Test List
            </h2>
            <p className="text-muted-foreground text-[15px] max-w-3xl mx-auto">
              Explore our comprehensive biochemistry test list, covering essential diagnostic tests for liver, kidney, metabolic, and overall health assessment.
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
            Biochemistry Test Price & Packages
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-4">
            The biochemistry test price depends on the type of test and panel selected. We offer affordable and transparent pricing without compromising on quality.
          </p>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
            Contact us or book online to get detailed pricing information.
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
              How Biochemistry Blood Tests Work
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
            Book Your Biochemistry Lab Tests Today
          </h2>
          <p className="text-base md:text-lg opacity-90 mb-8">
            Accurate diagnostics. Faster results. Better health decisions.
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

export default BiochemistryTests;
