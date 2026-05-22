import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FileText,
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
    title: "Accurate Tissue Analysis",
    desc: "Our histopathology test procedures are performed using advanced laboratory methods and expert pathological review for precise diagnosis.",
  },
  {
    icon: Layers,
    title: "Specialised Biopsy & FNAC Evaluation",
    desc: "We provide reliable histopathology biopsy analysis and FNAC test services to support early detection and treatment planning.",
  },
  {
    icon: Clock,
    title: "Reliable & Timely Reporting",
    desc: "Fast report turnaround and clinically validated findings help doctors make confident medical decisions.",
  },
];

const testCategories = [
  {
    title: "Histopathology & Tissue Analysis Tests",
    tests: [
      "Bone Marrow, Iron stain",
      "Histopathology, Special Stain, Amyloid (Congo Red)",
      "Stone Analysis with Picture",
    ],
  },
  {
    title: "Histopathology Biopsy & FNAC Services",
    tests: [
      "Tissue biopsy evaluation",
      "FNAC (Fine Needle Aspiration Cytology)",
      "Lump and swelling examination",
      "Inflammatory condition assessment",
      "Tumour-related tissue analysis",
    ],
  },
];

const processSteps = [
  "Sample or biopsy collection by trained medical professionals",
  "Advanced tissue processing and microscopic examination",
  "Expert pathological interpretation and validation",
  "Accurate and timely report delivery",
];

const faqs = [
  {
    q: "What is a histopathology test?",
    a: "A histopathology test examines tissue samples under a microscope to identify abnormal cellular or tissue changes and support disease diagnosis.",
  },
  {
    q: "What is a histopathology biopsy?",
    a: "A histopathology biopsy involves collecting tissue samples for detailed pathological examination to detect infections, inflammation, or abnormal growths.",
  },
  {
    q: "What is an FNAC test?",
    a: "An FNAC test (Fine Needle Aspiration Cytology) is a minimally invasive diagnostic procedure used to collect cells from lumps or swellings for microscopic evaluation.",
  },
  {
    q: "What is the histopathology test price?",
    a: "The histopathology test price depends on the type of biopsy, staining technique, and laboratory evaluation required.",
  },
];

const detectItems = [
  "Tissue abnormalities",
  "Inflammatory conditions",
  "Benign and malignant growths",
  "Infection-related tissue changes",
  "Bone marrow disorders",
  "Cellular and structural abnormalities",
  "Tumor and biopsy evaluation",
];

const Histopathology = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSEO({
    title: "Histopathology Test | Aarvak Diagnostics Gurgaon",
    description:
      "Book histopathology test, FNAC test & biopsy test in Gurgaon with accurate tissue analysis, expert reporting & reliable diagnostics.",
    canonical: "/departments/pathology/histopathology-tests",
  });

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "420px" }}>
          <img
            src="/images/histopathology-banner.jpg"
            alt="Histopathology Test & Biopsy Diagnostics"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="flex items-center gap-6">
              <div className="text-right text-white">
                <p className="text-sm uppercase tracking-[0.25em] mb-1 font-medium">Pathology</p>
                <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
                  Histopathology
                </h2>
              </div>
              <div className="w-px bg-white/40" style={{ height: "100px" }} />
              <div className="text-white max-w-md">
                <h1 className="text-2xl md:text-[32px] font-bold leading-tight">
                  Histopathology Test & Biopsy Diagnostics
                </h1>
                <p className="mt-3 text-[15px] opacity-85">
                  Advanced histopathology test services with accurate tissue examination, expert pathological analysis, and modern diagnostic technology for reliable disease detection and clinical evaluation.
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
            Precision Histopathology. Trusted Results.
          </h2>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Comprehensive histopathology biopsy analysis and specialised tissue diagnostics for confident medical decisions.
          </p>
        </div>
      </section>

      {/* Advanced Histopathology */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-5/12">
            <img
              src="/images/histopathology-service.jpg"
              alt="Advanced Histopathology"
              className="w-full rounded-2xl object-cover"
              style={{ height: "480px" }}
              loading="lazy"
            />
          </div>
          <div className="lg:w-7/12 pt-2">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">
              Advanced Histopathology<br />Tests & Diagnostic Services
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              Our diagnostic center offers a wide range of histopathology test services designed to evaluate tissue samples, identify abnormal cell changes, and support accurate disease diagnosis.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              From routine histopathology biopsy procedures to specialised staining techniques and FNAC test evaluation, our laboratory services help doctors make timely and informed treatment decisions.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-8">
              We follow strict laboratory quality standards and use advanced pathology techniques to ensure accurate reporting and dependable diagnostic outcomes.
            </p>

            <h3 className="text-xl font-bold text-foreground mb-5">
              What Does a Histopathology Test Detect?
            </h3>
            <p className="text-muted-foreground text-[15px] mb-4">
              Histopathology tests help evaluate:
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

      {/* Why Choose */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground">
            Why Choose Our Histopathology Testing Services?
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
              Complete Histopathology Test List
            </h2>
            <p className="text-muted-foreground text-[15px] max-w-3xl mx-auto">
              Explore our specialised histopathology and biopsy diagnostics designed for accurate tissue analysis and disease evaluation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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
                    <FileText className="w-5 h-5 text-secondary" />
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

          <p className="text-muted-foreground text-[15px] mt-8 max-w-4xl mx-auto text-center">
            Our laboratory supports various histopathology biopsy investigations and FNAC test procedures for accurate tissue and cellular examination. These tests are commonly recommended for evaluating lumps, tissue abnormalities, infections, inflammatory conditions, and tumour-related changes.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-6">
            Histopathology Test Price & Packages
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-4">
            The histopathology test price depends on the type of biopsy, tissue analysis, staining procedure, and diagnostic evaluation required. We maintain transparent pricing while ensuring strict laboratory quality standards and expert pathological reporting.
          </p>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
            Contact us or book online to get detailed pricing information for histopathology biopsy and FNAC test services.
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
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground">
              How Histopathology Tests Work
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
            Book Your Histopathology Test Today
          </h2>
          <p className="text-base md:text-lg opacity-90 mb-8">
            Accurate tissue diagnosis. Expert pathology review. Reliable healthcare decisions.
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

export default Histopathology;
