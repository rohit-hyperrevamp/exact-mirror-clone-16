import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ShieldCheck,
  Layers,
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
    icon: ShieldCheck,
    title: "Advanced Diagnostic Accuracy",
    desc: "Our immunology tests are processed using modern laboratory systems and validated diagnostic protocols for reliable clinical reporting.",
  },
  {
    icon: Layers,
    title: "Comprehensive Test Coverage",
    desc: "Access a complete immunology tests list covering autoimmune screening, hormone analysis, infection markers, allergy testing, and specialised serology investigations.",
  },
  {
    icon: Clock,
    title: "Fast & Reliable Reports",
    desc: "Timely reporting supports faster diagnosis, preventive healthcare planning, and better treatment decisions.",
  },
];

const testCategories = [
  {
    title: "Autoimmune & Immunology Tests",
    tests: [
      "Anti Nuclear Antibody/Factor (ANA/ANF), IFA (HEP-2)",
      "Anti-dsDNA Antibody",
      "Anti Neutrophil Cytoplasmic Antibody (ANCA) Panel",
      "ASKA-Skeletal (Striated) Muscle Antibody",
      "Antinuclear Antibodies (ANA)",
      "SS-A/Ro Antibody",
      "SS-B/La Antibody",
      "Sm Smith Antibody-IgG",
      "U1RNP Antibodies",
      "Centomere Antibody",
      "Glomerular Basement Membrane Antibody (GBM Antibody)",
      "Intrinsic Factor Antibody",
      "Endomysial Antibody, IgA",
      "Beta-2 Glycoprotein Panel",
      "BETA 2 GLYCOPROTEIN 1, IgA",
      "BETA 2 GLYCOPROTEIN 1, IgM",
      "BETA 2 GLYCOPROTEIN 1, IgG",
      "Cardiolipin Antibodies -IgG",
      "Cardiolipin Antibodies -IgM",
      "Anti-Cardiolipin Antibodies -IgG & IgM",
      "Cardiolipin Antibody Panel",
      "Cardiolipin Antibody, IgA",
      "CH-50 Complement, Total Serum",
      "Rheumatoid Factor (RA)",
    ],
  },
  {
    title: "Hormone & Endocrine Tests",
    tests: [
      "Anti Mullerian Hormone (AMH)",
      "AMH (Anti-Mullerian Hormone)",
      "Testosterone, Free",
      "Follicle Stimulating Hormone (FSH)",
      "Follicle Stimulating Hormone (FSH) & Luteinizing Hormone (LH)",
      "FSH",
      "Lutenizing Hormone (LH)",
      "Progesterone",
      "Prolactin (PRL)",
      "Estradiol (E2)",
      "DHEA; Dehydroepiandrosterone",
      "ACTH Levels",
      "Growth Hormone",
      "Cortisol, Serum (Morning Sample)",
      "Cortisol, Serum (Evening Sample)",
      "Cortisol Serum: Morning & Evening",
      "Cortisol Serum / Dexamethasone Suppression",
      "Cortisol-Free Urine 24hr",
      "Aldosterone",
      "Androstenedione",
      "Sex Hormone Binding Globulin, SHBG",
      "Placental Growth Factor (PlGF)",
      "Inhibin A, Pregnancy",
      "Inhibin A, Reproductive Marker",
      "Maternal Serum Screen 2; Dual Test",
      "Maternal Serum Screen 3; Triple Test",
      "Maternal Serum Screen 4; Quadruple Test",
      "Beta-HCG, Total Quantitative",
      "HCG-Beta Total Quantitative, Tumor Marker",
      "HCG Beta Subunit, Spot Urine",
    ],
  },
  {
    title: "Thyroid & Vitamin Tests",
    tests: [
      "T3, Free",
      "T3, Total",
      "T4, Free",
      "T4, Total",
      "Thyroid Profile, Free",
      "Thyroid Profile, Total",
      "Thyroid Stimulating Hormone (TSH)",
      "Thyroglobulin",
      "Vitamin B12, Cyanocobalamin",
      "Vitamin D 25 Hydroxy",
      "Vitamin C Ascorbic Acid",
      "Folate (Folic Acid)",
      "Ferritin",
    ],
  },
  {
    title: "Infection, Serology & Viral Marker Tests",
    tests: [
      "TORCH Panel, IgM",
      "HIV-1&2 Ag/Ab CLIA",
      "Hepatitis-B Surface Antigen (HbsAg) Quantitative",
      "Anti SARS-CoV-2 IgG",
      "SARS-CoV-2 (COVID-19) Anti-Spike IgG Antibody Quantitative",
      "Quantiferon TB Gold",
      "Widal Test",
      "Brucella Antibody-IgG",
      "Mycoplasma Pneumoniae IgG Antibody",
      "Mycoplasma Pneumoniae IgM Antibody",
      "Cryptococcus Antigen",
      "Cryptococcal Antigen- LA",
      "Legionella Antigen",
      "Leptospira, IgG",
      "Leptospira, IgM",
      "Lyme Borrelia Burgdorferi IgG Antibody",
      "Lyme Borrelia Burgdorferi IgM Antibody",
      "Scrub Typhus-IgM",
      "Scrub Typhus Profile Weil Felix and Scrub Typhus-IgM",
      "Coxsackie Antibody-IgG",
      "Coxsackie Antibody-IgM",
      "Chicken Pox/Varicella IgG",
      "Chicken Pox/Varicella IgM",
      "Measles (Rubeola) Antibody-IgG",
      "Measles (Rubeola) Antibody-IgM",
      "Mumps, IgG",
      "Mumps, IgM",
      "HSV-1 & 2 Antibody, IgG",
      "HSV-1 & 2 Antibody, IgM",
      "HSV-1, IgG",
      "HSV-1, IgM",
      "HSV-1+2, IgM & IgG",
      "HSV-2, IgG",
      "HSV-2, IgM",
      "Influenza-A Virus Antibody, IgG",
      "Influenza-A Virus Antibody, IgM",
      "Echinococcus Hydatid Serology, IgG",
      "Entamoeba Histolytica Antibodies",
      "Leishmania (Kala Azar) Antibody, IgG",
      "Leishmania (Kala Azar) rK-39 Antibody",
      "Cysticercosis (Taenia Solium) Antibody, IgG",
      "Filaria Antibody",
      "Clostridium Difficile GDH Reflex Toxin A/B",
    ],
  },
  {
    title: "Allergy & Immunoglobulin Tests",
    tests: [
      "Allergy Screening (Tryptase)",
      "Aspergillus IgE (A. Fumigatus)",
      "Aspergillus Antibody IgG",
      "Specific IGE & IGG For Aspergillus Fumigatus",
      "ALLERGY SPECIFIC IgG: ALTERNARIA ALTERNATA",
      "ALLERGY SPECIFIC IgG: CLADOSPORIUM HERBARUM",
      "ALLERGY SPECIFIC IgG: MUCOR RACEMOSUS",
      "ALLERGY SPECIFIC IgG: PENICILLIUM CHRYSOGENUM",
      "ALLERGY SPECIFIC IgG: PIGEON Serum PROTEINS, FEATHERS & DROPPINGS",
    ],
  },
  {
    title: "Cardiac & Inflammatory Marker Tests",
    tests: [
      "Troponin-I, High Sensitive",
      "Troponin-T, High Sensitive",
      "Cardio C-Reactive Protein (hsCRP)",
      "D-Dimer Quantitative",
      "NT-PRO BNP",
      "Creatine Kinase-MB (CPK-MB)",
      "Lipoprotein A",
      "Apolipoprotein A1",
      "Apolipoprotein B",
      "Lipid Profile - Extended",
      "Haptoglobin",
      "Alpha-Hydroxybutyrate Dehydrogenase",
    ],
  },
  {
    title: "Tumor Marker & Cancer Screening Tests",
    tests: [
      "AFP (Dako)",
      "AFP-Alpha Feto Protein(CSF)",
      "CA 125",
      "CA 15.3",
      "CA 19.9",
      "CA 72.4",
      "Carcinoembryonic Antigen (CEA)",
      "Calcitonin",
      "Prostate Specific Antigen (PSA), Total",
      "Beta-2-Microglobulin Urine Spot",
    ],
  },
  {
    title: "Diabetes & Metabolic Tests",
    tests: [
      "Glycosylated Hemoglobin, Blood (HbA1C)",
      "Insulin, Fasting",
      "Insulin, Post Prandial",
      "Insulin, Random",
      "C-Peptide",
      "C-Peptide Fasting Serum",
      "C-Peptide Post Prandial Serum",
      "Adiponectin",
      "Microalbumin Urine 24H",
      "Hepcidine",
    ],
  },
  {
    title: "Drug Monitoring & Toxicology Tests",
    tests: [
      "Drugs of Abuse 4 + Alcohol",
      "Drugs of Abuse 7",
      "Drugs Of Abuse, 6 Drugs",
      "Amphetamine",
      "Cannabinoids Screen, Marijuana",
      "Carbamazepine",
      "Phenytoin",
      "Serum Digoxin Level",
      "Nicotine Metabolic Quantitative Cotinine",
    ],
  },
  {
    title: "Specialized Diagnostic Tests",
    tests: [
      "Neurofilament",
      "Gaucher Disease, Quantitative, Blood",
      "Niemann Pick Disease, Quantitative, Blood",
      "Pompe Disease, Quantitative, Blood",
      "Protein Electrophoresis",
      "Protein Electrophoresis Reflex Immunofixation (Qualitative)",
      "Hemoglobin Electrophoresis",
      "Albumin",
      "Albumin:Globulin Ratio - A:G Ratio",
      "Alkaline Phosphatase (ALP)",
      "Serum Gastrin",
      "Interlukin-6 (IL-6)",
      "Myoglobin",
      "DPD Deoxypyridinoline (Pyrilinks D) Urine",
      "Angiotensin Converting Enzyme (ACE)",
    ],
  },
];

const processSteps = [
  "Sample collection by trained laboratory professionals",
  "Advanced serology and immunology laboratory analysis",
  "Expert validation and clinical interpretation",
  "Quick and secure report delivery",
];

const faqs = [
  {
    q: "What are immunology tests?",
    a: "Immunology tests evaluate immune system function, autoimmune disorders, infections, allergies, and hormone-related conditions through blood and serology analysis.",
  },
  {
    q: "What is a serology immunology test?",
    a: "A serology immunology test detects antibodies, antigens, and immune responses related to infections and autoimmune conditions.",
  },
  {
    q: "What is included in an immunology tests list?",
    a: "An immunology tests list may include autoimmune panels, hormone profiles, allergy screening, infection markers, thyroid tests, and tumor marker evaluations.",
  },
  {
    q: "Do you provide hormone test services in Gurgaon?",
    a: "Yes. We offer comprehensive hormone test services in Gurgaon, including thyroid, fertility, reproductive, adrenal, and endocrine hormone evaluations.",
  },
];

const measureItems = [
  "Immune system response",
  "Autoimmune disorders",
  "Hormonal balance",
  "Allergy-related conditions",
  "Infectious disease markers",
  "Inflammatory conditions",
  "Tumor markers",
  "Thyroid and reproductive hormones",
];

const Immunology = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSEO({
    title: "Immunology Tests | Aarvak Diagnostics Gurgaon",
    description:
      "Advanced immunology tests, hormone test in Gurgaon, autoimmune screening & immunology blood test services with accurate reports.",
    canonical: "/departments/pathology/immunology-tests",
  });

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "420px" }}>
          <img
            src="/images/immunology-banner.jpg"
            alt="Immunology Tests & Serology Diagnostics"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="flex items-center gap-6">
              <div className="text-right text-white">
                <p className="text-sm uppercase tracking-[0.25em] mb-1 font-medium">Pathology</p>
                <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
                  Immunology Tests
                </h2>
              </div>
              <div className="w-px bg-white/40" style={{ height: "100px" }} />
              <div className="text-white max-w-md">
                <h1 className="text-2xl md:text-[32px] font-bold leading-tight">
                  Immunology Tests & Serology Diagnostics
                </h1>
                <p className="mt-3 text-[15px] opacity-85">
                  Comprehensive immunology tests with advanced serology analysis, hormone profiling, autoimmune screening, and infection marker evaluation for accurate clinical diagnosis and preventive healthcare.
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
            Precision Immunology. Trusted Results.
          </h2>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Advanced immunology blood test services and serology diagnostics designed to support accurate disease detection, immune assessment, and hormone evaluation.
          </p>
        </div>
      </section>

      {/* Advanced Clinical Immunology */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-5/12">
            <img
              src="/images/immunology-service.jpg"
              alt="Advanced Clinical Immunology"
              className="w-full rounded-2xl object-cover"
              style={{ height: "480px" }}
              loading="lazy"
            />
          </div>
          <div className="lg:w-7/12 pt-2">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">
              Advanced Clinical Immunology<br />Tests & Diagnostic Services
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              Our diagnostic center offers a wide range of immunology tests designed to evaluate immune system function, detect autoimmune disorders, identify infections, and assess hormone imbalances.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              From routine serology immunology test panels to specialised autoimmune and endocrine investigations, our laboratory services support doctors in making timely and evidence-based medical decisions.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-8">
              Using advanced laboratory technology and strict quality standards, we ensure every immunology blood test delivers reliable and clinically accurate results.
            </p>

            <h3 className="text-xl font-bold text-foreground mb-5">What Do Immunology Tests Measure?</h3>
            <p className="text-muted-foreground text-[15px] mb-4">Immunology and serology tests help evaluate:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {measureItems.map((item) => (
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
            Why Choose Our Immunology Testing Services?
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
              Complete Immunology Tests List
            </h2>
            <p className="text-muted-foreground text-[15px] max-w-3xl mx-auto">
              Explore our comprehensive immunology tests list designed for autoimmune evaluation, hormone assessment, serology diagnostics, allergy screening, and infection marker testing.
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

      {/* Pricing */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-6">
            Immunology Test Price & Packages
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-4">
            The immunology test price depends on the type of serology panel, hormone profile, autoimmune screening, or specialised diagnostic investigation required. We provide transparent pricing with strict quality standards and expert laboratory reporting.
          </p>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
            Contact us or book online to get detailed pricing information for immunology blood test and hormone test services in Gurgaon.
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
              How Immunology Tests Work
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
            Book Your Immunology Tests Today
          </h2>
          <p className="text-base md:text-lg opacity-90 mb-8">
            Accurate immune analysis. Reliable hormone testing. Better healthcare decisions.
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

export default Immunology;
