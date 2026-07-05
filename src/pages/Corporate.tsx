import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import useSEO from "@/hooks/useSEO";

const campImages = Array.from({ length: 12 }, (_, i) => `/images/camp${i + 1}.png`);

const taglineItems = [
  { bold: "Tailored", sub: "For All Ages" },
  { bold: "Expert", sub: "Medical Team" },
  { bold: "Quick &", sub: "Easy Booking" },
];

const Corporate = () => {
  useSEO({
    title: "Corporate Wellness Programs – Aarvak Diagnostics",
    description: "Explore corporate health checkup packages and employee wellness programs by Aarvak Diagnostics. Tailored health camps and preventive care for organisations.",
    canonical: "/corporate",
  });
  const [campSlide, setCampSlide] = useState(0);
  const maxCampSlide = Math.max(0, campImages.length - 3);

  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: '420px' }}>
          <img
            src="/images/cop-first.jpeg"
            alt="Corporate Health Services"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="flex items-center gap-6">
              <div className="text-right text-white">
                <p className="text-sm uppercase tracking-[0.25em] mb-1 font-medium">Corporate</p>
                <h1 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: "Georgia, serif" }}>HEALTH SERVICES</h1>
              </div>
              <div className="w-px bg-white/40" style={{ height: '100px' }} />
              <div className="text-white">
                <h2 className="text-2xl md:text-[32px] font-bold leading-tight">Corporate Wellness</h2>
                <p className="mt-3 text-[15px] opacity-80 max-w-md">Tailored employee health checks, pre-employment screening, and onsite diagnostics for a healthier workforce.</p>
                <Link
                  to="/contact-us#contact"
                  className="inline-block mt-5 text-white font-semibold px-7 py-3 rounded-full text-sm bg-secondary hover:bg-secondary/90 transition"
                >
                  Get a Corporate Plan
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
                {i < taglineItems.length - 1 && (
                  <div className="w-px h-10 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Health Solutions */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-5/12">
            <img
              src="/images/ServiceslLeft.png"
              alt="Corporate Wellness"
              className="w-full rounded-2xl object-cover"
              style={{ height: '450px' }}
            />
          </div>
          <div className="lg:w-7/12 pt-4">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">
              Corporate Health Solutions: Because Your People are Your Greatest Asset
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              In the high-stakes world of business, <strong className="text-foreground">staying ahead of the curve</strong> isn't just about strategy, it's about the well-being of your workforce. At <strong className="text-foreground">Aarvak Diagnostic Centre</strong>, we don't just run tests; we serve as your dedicated <strong className="text-foreground">Partner in Health</strong>. From Gurugram to Delhi/NCR, we provide high-end preventive check-ups that ensure your team is always at the top of their game.
            </p>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-6">Why Partner with Aarvak?</h2>
          <p className="text-muted-foreground mb-8 text-[15px] leading-relaxed">
            We know that in corporate life, <strong className="text-foreground">time is of the essence</strong>. We've stripped away the complexity to provide an unparalleled diagnostic experience that combines innovation with efficiency.
          </p>
          <ul className="space-y-4 text-muted-foreground text-[15px] leading-relaxed list-disc pl-5">
            <li><strong className="text-foreground">Total Quality Management:</strong> Our success is built on a cornerstone of efficiency and total quality management, ensuring you get results you can bank on.</li>
            <li><strong className="text-foreground">Zero Manual Errors:</strong> To keep things <strong className="text-foreground">above board</strong>, all our systems are barcoded and interfaced from sample collection to the final report, eliminating manual entry errors entirely.</li>
            <li><strong className="text-foreground">Maximum Value:</strong> We offer a specialized <strong className="text-foreground">25% Corporate Discount</strong> on all lab tests, making high-end health affordable for your organization.</li>
            <li><strong className="text-foreground">Expert Oversight:</strong> While our operations team keeps the wheels turning, our specialized doctors focus solely on delivering precise diagnoses.</li>
          </ul>
        </div>
      </section>

      {/* Service Portfolio */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-7/12 pt-4">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">Our Corporate Service Portfolio</h2>
            <p className="text-muted-foreground mb-6 text-[15px] leading-relaxed">
              Our laboratory provides a comprehensive range of routine and specialized diagnostics, offering a seamless and cost-effective solution for all. By combining advanced technology with rigorous standards, our specialists ensure every result is accurate, reliable, and delivered within a clinically relevant timeframe.
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc pl-5 text-[15px]">
              <li>Diagnostic Services</li>
              <li>On-Site Corporate Health Check-ups</li>
              <li>Complete Family Care</li>
              <li>Special Health Packages</li>
              <li>Pre-Employment & Annual Health Check-Ups</li>
              <li>Health Screening Programs</li>
              <li>Lab Investigations • Consultation • X-Ray • PFT • ECG</li>
              <li>Audiometry • Medical Certificates</li>
            </ul>
            <p className="mt-6 font-bold text-lg text-secondary">Up to 25% Corporate Discount on All Lab Tests</p>
          </div>
          <div className="lg:w-5/12">
            <img
              src="/images/cop-sec.jpeg"
              alt="Corporate Services"
              className="w-full rounded-2xl object-cover"
              style={{ height: '450px' }}
            />
          </div>
        </div>
      </section>

      {/* Tech Behind the Truth */}
      <section className="py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-6">The Tech Behind the Truth</h2>
          <p className="text-muted-foreground mb-8 text-[15px] leading-relaxed">
            We believe in <strong className="text-foreground">precision in diagnosis</strong>. To achieve this, we utilize a checklist of cutting-edge technology:
          </p>
          <ul className="space-y-3 text-muted-foreground list-disc pl-5 text-[15px] leading-relaxed">
            <li><strong className="text-foreground">Chemistry & Electrolytes:</strong> Erba EM 200 Fully Automated Analyzer and Erba EC 90 Next-Gen Electrolyte Analyzer.</li>
            <li><strong className="text-foreground">Hematology & Urine:</strong> Sysmex XP-100 Automatic Cell Counter and Erba Laura Urine Chemistry Strip Reader.</li>
            <li><strong className="text-foreground">Advanced Imaging:</strong> SkanMobile Mobile X-Ray Radiography and Fuji CR System Prima T.</li>
          </ul>
        </div>
      </section>

      {/* Portfolio of Excellence */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-7/12 pt-4">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">A Portfolio of Excellence</h2>
            <p className="text-muted-foreground mb-6 text-[15px] leading-relaxed">
              We are proud to be the trusted health partner for industry leaders who demand nothing but the best:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc pl-5 text-[15px]">
              <li><strong className="text-foreground">Hospitality:</strong> The Westin Gurgaon and The Gateway Resort.</li>
              <li><strong className="text-foreground">Automotive & Engineering:</strong> Suzuki, SKH Group, and AtMa Autotech.</li>
              <li><strong className="text-foreground">Food & Retail:</strong> Haldiram's and Bikanervala.</li>
            </ul>
          </div>
          <div className="lg:w-5/12">
            <img
              src="/images/cop-four.jpeg"
              alt="Portfolio of Excellence"
              className="w-full rounded-2xl object-cover"
              style={{ height: '450px' }}
            />
          </div>
        </div>
      </section>

      {/* Certified Peace of Mind */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-4xl mx-auto rounded-2xl px-10 py-12 text-center text-white" style={{ backgroundColor: '#0172B6' }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-5">Certified Peace of Mind</h2>
          <p className="leading-relaxed text-[15px] text-white/90">
            Trust is earned, not given. <strong className="text-white">Government Haryana Clinical Establishments</strong>registration ensures we adhere to the highest ethical practices and safety standards in the industry. Your team's health is our top priority.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Contact Us</h2>
          <div className="space-y-4 text-[15px]">
            <p><strong className="text-foreground">Phone:</strong>{" "}
              <a href="tel:+919810063340" className="text-secondary hover:underline">+91 9810063340</a>
              {" | "}
              <a href="tel:+919311245957" className="text-secondary hover:underline">+91 9311245957</a>
            </p>
            <p><strong className="text-foreground">Email:</strong>{" "}
              <a href="mailto:aarvakdiagnostic@gmail.com" className="text-secondary hover:underline">aarvakdiagnostic@gmail.com</a>
            </p>
            <p><strong className="text-foreground">Visit Us:</strong> 1310, Behind SBI Bank, Badshahpur, Sohna Road, Sector – 66, Gurugram</p>
          </div>
          <p className="mt-8 font-bold text-foreground text-lg">Get a Free Consultation</p>
          <p className="mt-2 text-sm text-muted-foreground">Reach out today to discuss your corporate health solutions.</p>
        </div>
      </section>

      {/* Glimpse Of Check Up Camps */}
      <section className="py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-10 text-center">Glimpse Of Some Check Up Camps</h2>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${campSlide * (100 / 3)}%)` }}
            >
              {campImages.map((img, i) => (
                <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-2 flex-shrink-0">
                  <img src={img} alt={`Checkup Camp ${i + 1}`} className="w-full h-64 object-cover rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={() => setCampSlide(Math.max(0, campSlide - 1))}
              aria-label="Previous camp photos"
              className="w-10 h-10 bg-background rounded-full text-foreground flex items-center justify-center shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCampSlide(Math.min(maxCampSlide, campSlide + 1))}
              aria-label="Next camp photos"
              className="w-10 h-10 bg-background rounded-full text-foreground flex items-center justify-center shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
};

export default Corporate;
