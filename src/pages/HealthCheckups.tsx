import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import useSEO from "@/hooks/useSEO";

const taglineItems = [
  { bold: "Tailored", sub: "For All Ages" },
  { bold: "Expert", sub: "Medical Team" },
  { bold: "Quick &", sub: "Easy Booking" },
];

const packages = [
  {
    name: "ADC Basic Swasthya Panel",
    items: [
      "Complete Blood Count",
      "Urine Routine",
      "Lipid Profile",
      "Blood Sugar (Fasting)",
      "HbA1c",
    ],
    price: "1000",
    badge: "Value for money",
  },
  {
    name: "ADC Mini Swasthya Panel",
    items: [
      "Complete Blood Count",
      "Lipid Profile",
      "Urine Routine & ESR",
      "HbA1c + Fasting Blood Sugar",
      "(LFT + KFT)",
      "Thyroid Function Test (TFT)",
      "(Sodium + Potassium)",
    ],
    price: "2000",
    badge: null,
  },
  {
    name: "ADC Advance Swasthya Panel",
    items: [
      "Complete Blood Count",
      "Urine Routine & ESR",
      "HbA1c + Fasting Sugar",
      "Vitamin B12 + Vitamin D",
      "(LFT + KFT)",
      "(Sodium + Potassium + Calcium)",
      "Thyroid Function Test (TFT)",
      "Iron Studies",
      "Lipid Profile",
    ],
    price: "3000",
    badge: null,
  },
];

const HealthCheckups = () => {
  useSEO({
    title: "Full Body Health Checkup | Aarvak Diagnostics",
    description: "Book full body health checkup and preventive health checkup packages in Gurgaon with accurate diagnostic testing and expert care.",
    canonical: "/departments/health-checkups",
  });
  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden min-h-[440px] md:h-[420px]">
          <img
            src="/images/arvkbg.png"
            alt="Full body health checkup services"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex items-center justify-center min-h-[440px] md:h-full px-4 py-10 md:py-0">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full max-w-4xl">
              <div className="text-center md:text-right text-white">
                <p className="text-xs md:text-sm uppercase tracking-[0.25em] mb-2 font-medium">About</p>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: "Georgia, serif" }}>Full Body Health Checkup in Gurgaon</h1>
              </div>
              <div className="hidden md:block w-px bg-white/40" style={{ height: '100px' }} />
              <div className="text-center md:text-left text-white">
                <h2 className="text-xl md:text-[32px] font-bold leading-tight">Trusted Health Checkups</h2>
                <p className="mt-3 text-sm md:text-[15px] opacity-80 max-w-md">Preventive wellness monitoring and accurate diagnostics to help you stay ahead of illness.</p>
                <Link
                  to="/contact-us#contact"
                  className="inline-block mt-5 text-white font-semibold px-7 py-3 rounded-full text-sm bg-secondary hover:bg-secondary/90 transition"
                >
                  Book a Checkup
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

      {/* Comprehensive Health Assessment */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-5/12">
            <img
              src="/images/healthside.png"
              alt="Health Assessment"
              className="w-full rounded-2xl object-cover"
              style={{ height: '450px' }}
            />
          </div>
          <div className="lg:w-7/12 pt-4">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">
              Comprehensive Health<br />Assessment Packages
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              At Aarvak Diagnostics, we understand the importance of preventive and routine medical health checkup services for individuals and organizations.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              We provide comprehensive testing and diagnostic health checkup services to support preventive healthcare and overall wellness management.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              Our health checkup plans are tailored for individuals, families, and businesses to help identify potential health concerns before they become serious problems.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Our Health Checkup Centre */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground text-center mb-10">Why Choose Our Health Checkup Centre?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              "Comprehensive preventive health checkup services",
              "Affordable full body health checkup packages",
              "Accurate laboratory and diagnostic testing",
              "Experienced medical and diagnostic professionals",
              "Fast report delivery and easy booking",
              "Advanced preventive healthcare screening",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-background rounded-xl p-5 shadow-sm">
                <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-[15px] text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Health Packages */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-[42px] font-bold text-foreground text-center mb-4">Featured Full Body Health Checkup Packages</h2>
          <p className="text-center text-muted-foreground text-[15px] max-w-3xl mx-auto mb-12">
            Explore our preventive health checkup and full body health checkup packages designed for routine wellness screening, lifestyle monitoring, and early disease detection.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`rounded-2xl p-7 relative overflow-hidden text-white ${i === 2 ? 'md:col-span-2' : ''}`}
                style={{ background: 'linear-gradient(135deg, #1b75a6, #0c3f5d)' }}
              >
                {pkg.badge && (
                  <div className="absolute top-4 right-4 bg-white text-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    % {pkg.badge}
                  </div>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <img src="/icons/heart-package.png" alt="" className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                </div>
                <div className={`grid gap-x-8 gap-y-4 mb-8 ${i === 2 ? 'grid-cols-2 md:grid-cols-5' : 'grid-cols-2 md:grid-cols-3'}`}>
                  {pkg.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <img src="/icons/check.png" alt="" className="w-5 h-5 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="inline-flex items-center gap-2 border border-white/40 rounded-lg px-4 py-2">
                    <span className="text-sm font-medium">Price</span>
                    <span className="text-2xl font-bold">₹ {pkg.price}</span>
                  </div>
                  <Link
                    to="/contact-us#contact"
                    className="inline-block px-6 py-2.5 rounded-lg font-semibold text-sm text-foreground"
                    style={{ backgroundColor: '#f5b800' }}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preventive Health Checkup */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-[36px] font-bold text-foreground mb-4">Preventive Health Checkup for Better Wellness</h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-6">
            Regular preventive health checkup services help monitor vital health markers, identify lifestyle-related risks, and support long-term wellness management.
          </p>
          <p className="text-foreground font-semibold mb-3">Our health checkup packages are suitable for:</p>
          <ul className="grid md:grid-cols-2 gap-3">
            {[
              "Working professionals",
              "Senior citizens",
              "Corporate employees",
              "Preventive annual health screening",
              "Routine diagnostic evaluation",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[15px] text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Local SEO */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-[36px] font-bold text-foreground mb-4">Full Body Checkup in Gurgaon</h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Looking for a trusted health checkup centre in Gurgaon? Aarvak Diagnostics offers reliable full body health checkup packages, preventive screening, and diagnostic health checkup services with accurate reporting and expert care.
          </p>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default HealthCheckups;
