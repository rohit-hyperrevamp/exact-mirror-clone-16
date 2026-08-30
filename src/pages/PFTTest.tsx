import { Link } from "react-router-dom";
import { CheckCircle, Wind, Activity, Stethoscope, ShieldCheck } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import useSEO from "@/hooks/useSEO";

const taglineItems = [
  { bold: "Accurate", sub: "Lung Function Analysis" },
  { bold: "Advanced", sub: "Spirometry Testing" },
  { bold: "Fast &", sub: "Reliable Reports" },
];

const measureList = [
  "Lung capacity and airflow",
  "Breathing efficiency",
  "Respiratory muscle strength",
  "Airway obstruction",
  "Chronic lung conditions",
  "Oxygen exchange and ventilation",
];

const whoList = [
  "Shortness of breath",
  "Chronic cough",
  "Wheezing",
  "Chest tightness",
  "Smoking-related lung concerns",
  "Asthma or COPD symptoms",
  "Occupational exposure to dust or pollutants",
];

const services = [
  { icon: Wind, title: "Spirometry Test", desc: "Spirometry testing helps measure airflow, lung capacity, and breathing efficiency for evaluating asthma, COPD, and other respiratory conditions." },
  { icon: Activity, title: "Lung Function Test", desc: "Comprehensive lung function test services designed to assess respiratory performance and overall pulmonary health." },
  { icon: Stethoscope, title: "Pulmonary Function Test", desc: "Advanced pulmonary function test procedures for detailed respiratory system evaluation and long-term lung health monitoring." },
  { icon: ShieldCheck, title: "Preventive Respiratory Screening", desc: "Routine respiratory screening and pulmonary assessment for preventive healthcare and early detection of breathing disorders." },
];

const steps = [
  "Breathing assessment by trained respiratory professionals",
  "Advanced spirometry and lung function analysis",
  "Expert review and report validation",
  "Quick and secure report delivery",
];

const faqs = [
  { q: "What is a PFT test?", a: "A PFT test (Pulmonary Function Test) evaluates how well the lungs are functioning by measuring airflow, lung capacity, and breathing efficiency." },
  { q: "What is a spirometry test?", a: "A spirometry test measures how much air you can inhale and exhale, along with how quickly you can breathe out." },
  { q: "Why is a lung function test done?", a: "A lung function test helps diagnose respiratory conditions such as asthma, COPD, and other breathing disorders." },
  { q: "What is the PFT test price?", a: "The PFT test price depends on the type of pulmonary evaluation and respiratory testing required." },
];

const PFTTest = () => {
  useSEO({
    title: "PFT Test in Gurgaon | Pulmonary Function Test",
    description: "Book PFT test in Gurgaon for accurate pulmonary function test, spirometry test & lung function test with fast and reliable reports.",
    canonical: "/departments/radiology/pft-test",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  });

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: '420px' }}>
          <img src="/images/pft-banner.jpg" alt="PFT Test in Gurgaon" className="absolute inset-0 w-full h-full object-cover" width={1600} height={576} />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="flex items-center gap-6">
              <div className="text-right text-white">
                <p className="text-sm uppercase tracking-[0.25em] mb-1 font-medium">Radiology</p>
                <h2 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: "Georgia, serif" }}>PFT Test</h2>
              </div>
              <div className="w-px bg-white/40" style={{ height: '100px' }} />
              <div className="text-white max-w-md">
                <h1 className="text-2xl md:text-[30px] font-bold leading-tight">PFT Test & Pulmonary Function Test Services</h1>
                <p className="mt-3 text-[15px] opacity-80">Advanced pulmonary function test services designed to assess lung capacity, breathing efficiency, and overall respiratory health with accurate and reliable reporting.</p>
                <Link to="/contact-us#contact" className="inline-block mt-5 text-white font-semibold px-7 py-3 rounded-full text-sm bg-secondary hover:bg-secondary/90 transition">
                  Book PFT Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline overlay */}
      <section className="relative z-20">
        <div className="bg-background rounded-tr-[40px] -mt-16 relative pt-10 pb-8 px-6 md:px-12" style={{ maxWidth: '52%' }}>
          <div className="flex items-center gap-6">
            {taglineItems.map((item, i) => (
              <div key={i} className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-lg md:text-xl font-bold text-secondary">{item.bold}</p>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">{item.sub}</p>
                </div>
                {i < taglineItems.length - 1 && <div className="w-px h-10 bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-3">Precision Lung Testing. Trusted Reports.</p>
          <p className="text-muted-foreground text-[15px]">Comprehensive lung function test and spirometry test services for accurate respiratory assessment and better clinical decision-making.</p>
        </div>
      </section>

      {/* Advanced Pulmonary */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-5/12">
            <img src="/images/pft-service.jpg" alt="Pulmonary Function Testing" className="w-full rounded-2xl object-cover" style={{ height: '450px' }} width={1200} height={900} loading="lazy" />
          </div>
          <div className="lg:w-7/12 pt-4">
            <p className="text-secondary font-semibold uppercase tracking-wider text-xs mb-3">Advanced Pulmonary Diagnostics</p>
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">
              Advanced Pulmonary Function<br />& Respiratory Testing
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">Our diagnostic center offers advanced PFT test services to evaluate lung performance, breathing patterns, and respiratory function using modern diagnostic technology.</p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">From routine spirometry test procedures to detailed pulmonary function test analysis, our services help doctors diagnose asthma, COPD, breathing disorders, and other respiratory conditions accurately.</p>
            <p className="text-muted-foreground leading-relaxed text-[15px]">Using advanced respiratory diagnostic systems and expert evaluation, we ensure reliable results and patient-focused care.</p>
          </div>
        </div>
      </section>

      {/* What PFT measures */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-[34px] font-bold text-foreground mb-4 text-center">What Does a Pulmonary Function Test Measure?</h2>
          <p className="text-muted-foreground text-center mb-8">A pulmonary function test helps assess:</p>
          <ul className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {measureList.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[15px] text-muted-foreground bg-background rounded-xl px-5 py-4 shadow-sm">
                <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground">Why Choose Our PFT Testing Services?</h2>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: "Accurate Lung Function Analysis", desc: "Our PFT test procedures use advanced respiratory diagnostic systems for precise lung performance evaluation." },
            { title: "Advanced Spirometry Testing", desc: "We provide spirometry test services to help assess breathing difficulties, asthma, and chronic respiratory disorders." },
            { title: "Fast & Reliable Reports", desc: "Timely reporting supports quicker diagnosis, treatment planning, and respiratory health monitoring." },
          ].map((c) => (
            <div key={c.title} className="bg-background rounded-2xl p-8 text-center shadow-sm border border-border">
              <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-5" style={{ backgroundColor: 'hsl(145, 60%, 90%)' }}>
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{c.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our PFT Services */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground">Our Pulmonary Function Testing Services</h2>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-background rounded-2xl p-8 shadow-sm border border-border">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: 'hsl(145, 60%, 90%)' }}>
                <s.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who should consider */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-[34px] font-bold text-foreground mb-4 text-center">Who Should Consider a PFT Test?</h2>
          <p className="text-muted-foreground text-center mb-8">A PFT test may be recommended for individuals experiencing:</p>
          <ul className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {whoList.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[15px] text-muted-foreground bg-muted rounded-xl px-5 py-4">
                <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">PFT Test Price & Packages</h2>
          <p className="text-muted-foreground leading-relaxed text-[15px] mb-3">The PFT test price depends on the type of pulmonary evaluation and respiratory assessment required. We provide transparent pricing with reliable testing standards and accurate reporting.</p>
          <p className="text-muted-foreground leading-relaxed text-[15px] mb-6">Contact us or book online to get detailed pricing information for pulmonary function test services in Gurgaon.</p>
          <Link to="/contact-us#contact" className="inline-block bg-secondary text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-secondary/90 transition">Get Pricing Details</Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-[34px] font-bold text-foreground mb-10 text-center">How Pulmonary Function Tests Work</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="bg-background rounded-2xl p-6 text-center shadow-sm border border-border">
                <div className="w-12 h-12 rounded-full bg-secondary text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">{i + 1}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-background rounded-xl p-6">
                <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{f.q}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Book Your PFT Test Today</h2>
          <p className="text-muted-foreground text-[15px] mb-6">Accurate respiratory assessment. Faster reports. Better lung health decisions.</p>
          <Link to="/packages" className="inline-block bg-secondary text-white font-semibold px-8 py-3 rounded-full text-sm hover:bg-secondary/90 transition">Book Now</Link>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default PFTTest;
