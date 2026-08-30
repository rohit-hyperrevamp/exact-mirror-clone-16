import { Link } from "react-router-dom";
import { CheckCircle, Zap, Activity, ScanLine, ShieldCheck } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import useSEO from "@/hooks/useSEO";

const taglineItems = [
  { bold: "Advanced", sub: "Digital Imaging" },
  { bold: "Accurate", sub: "& Reliable Reports" },
  { bold: "Fast &", sub: "Comfortable Experience" },
];

const detectList = [
  "Hip joint conditions and injuries",
  "Knee joint conditions and injuries",
  "Ankle joint conditions and injuries",
  "Chest and lung conditions",
  "Respiratory infections (chest)",
  "Pre-operative and routine chest screening",
];

const services = [
  { icon: Activity, title: "Chest X-Ray", desc: "Chest X-Ray imaging for evaluating lungs, respiratory infections, chest pain and other pulmonary conditions." },
  { icon: Zap, title: "Hip Joint X-Ray", desc: "Digital X-Ray of the hip joint for evaluating joint pain, injury, arthritis and pre-operative assessment." },
  { icon: ScanLine, title: "Knee Joint X-Ray", desc: "Digital X-Ray of the knee joint for injury, arthritis, joint alignment and orthopaedic review." },
  { icon: ShieldCheck, title: "Ankle Joint X-Ray", desc: "Digital X-Ray of the ankle joint for sprains, fractures and joint evaluation." },
];

const steps = [
  "Patient positioning by trained radiography professionals",
  "Digital X-Ray imaging of the requested joint or chest",
  "Expert radiologist review and validation",
  "Quick and secure report delivery",
];

const faqs = [
  { q: "Which X-Rays does Aarvak Diagnostics offer?", a: "We offer digital X-Ray for four body areas only: Hip Joint, Knee Joint, Ankle Joint and Chest. We do not currently offer other X-Ray body parts, MRI, CT, ultrasound, ECHO or TMT." },
  { q: "What is a chest X-Ray used for?", a: "A chest X-Ray helps evaluate lungs, chest infections, breathing conditions and other respiratory abnormalities." },
  { q: "Do you offer full-body or spine/abdominal X-Ray?", a: "No. Our in-house X-Ray service is limited to Hip Joint, Knee Joint, Ankle Joint and Chest X-Rays only." },
  { q: "What is the X-Ray test price?", a: "The X-Ray test price depends on which of the four areas is being examined. Please contact us for current pricing." },
];

const XRayServices = () => {
  useSEO({
    title: "X-Ray in Gurgaon (Hip, Knee, Ankle & Chest) | Aarvak",
    description: "Book digital X-Ray in Gurgaon at Aarvak Diagnostics. Available only for Hip Joint, Knee Joint, Ankle Joint and Chest — accurate imaging, fast reports.",
    canonical: "/departments/radiology/x-ray-services",
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
          <img src="/images/xray-banner.jpg" alt="Digital X Ray Services in Gurgaon" className="absolute inset-0 w-full h-full object-cover" width={1600} height={576} />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="flex items-center gap-6">
              <div className="text-right text-white">
                <p className="text-sm uppercase tracking-[0.25em] mb-1 font-medium">Radiology</p>
                <h2 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: "Georgia, serif" }}>X-Ray Services</h2>
              </div>
              <div className="w-px bg-white/40" style={{ height: '100px' }} />
              <div className="text-white max-w-md">
                <h1 className="text-2xl md:text-[30px] font-bold leading-tight">Digital X Ray Services in Gurgaon</h1>
                <p className="mt-3 text-[15px] opacity-80">Advanced digital X ray and diagnostic radiography services for accurate imaging, faster diagnosis, and reliable medical evaluation.</p>
                <Link to="/contact-us#contact" className="inline-block mt-5 text-white font-semibold px-7 py-3 rounded-full text-sm bg-secondary hover:bg-secondary/90 transition">
                  Book X Ray Test
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

      {/* Intro section */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-3">Precision Imaging. Trusted Reports.</p>
          <p className="text-muted-foreground text-[15px]">Modern digital radiography technology with expert interpretation for accurate and timely healthcare decisions.</p>
        </div>
      </section>

      {/* Advanced Imaging */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-5/12">
            <img src="/images/xray-service.jpg" alt="Advanced X Ray Imaging" className="w-full rounded-2xl object-cover" style={{ height: '450px' }} width={1200} height={900} loading="lazy" />
          </div>
          <div className="lg:w-7/12 pt-4">
            <p className="text-secondary font-semibold uppercase tracking-wider text-xs mb-3">Advanced Digital Radiography</p>
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">
              Advanced X Ray &<br />Diagnostic Imaging Services
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">Our radiology centre offers digital X-Ray imaging designed to support accurate diagnosis for joint injuries and chest conditions. Please note: our X-Ray service is available only for the Hip Joint, Knee Joint, Ankle Joint and Chest.</p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">We do not currently offer X-Ray for other body parts, and we do not offer MRI, CT, ultrasound, ECHO or TMT.</p>
            <p className="text-muted-foreground leading-relaxed text-[15px]">Using digital radiography systems and strict imaging protocols, we ensure high-quality scans with reliable reporting and patient safety.</p>
          </div>
        </div>
      </section>

      {/* What Does X Ray Help Detect */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-[34px] font-bold text-foreground mb-4 text-center">What Does an X Ray Help Detect?</h2>
          <p className="text-muted-foreground text-center mb-8">X ray imaging helps evaluate:</p>
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

      {/* Why Choose */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground">Why Choose Our X Ray Services?</h2>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: "Advanced Digital Imaging", desc: "Our digital X ray systems provide clear imaging with faster processing and improved diagnostic accuracy." },
            { title: "Accurate & Reliable Reports", desc: "Every X ray scan is reviewed using advanced radiology standards to support confident medical decisions." },
            { title: "Fast & Comfortable Experience", desc: "Quick appointments, minimal waiting time, and patient-friendly imaging procedures ensure a smooth experience." },
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

      {/* Our X Ray Services */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground">Our X Ray Services</h2>
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

      {/* Digital Radiography + Pricing */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Digital Radiography Services</h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-3">Our digital radiography technology delivers faster image processing, improved clarity, reduced radiation exposure, and efficient report generation for better patient care and diagnostic accuracy.</p>
            <p className="text-muted-foreground leading-relaxed text-[15px]">Whether you are searching for an X ray near me or advanced imaging support in Gurgaon, Aarvak Diagnostics offers reliable radiology services with expert supervision.</p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">X Ray Test Price & Packages</h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-3">The X ray test price depends on the type of imaging, body area being examined, and diagnostic evaluation required. We provide transparent pricing with high-quality radiology standards and dependable reporting.</p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-6">Contact us or book online to get detailed pricing information for digital X ray services in Gurgaon.</p>
            <Link to="/contact-us#contact" className="inline-block bg-secondary text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-secondary/90 transition">Get Pricing Details</Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-[34px] font-bold text-foreground mb-10 text-center">How Digital X Ray Tests Work</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Book Your X Ray Today</h2>
          <p className="text-muted-foreground text-[15px] mb-6">Accurate imaging. Fast reports. Better healthcare decisions.</p>
          <Link to="/contact-us#contact" className="inline-block bg-secondary text-white font-semibold px-8 py-3 rounded-full text-sm hover:bg-secondary/90 transition">Book Now</Link>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default XRayServices;
