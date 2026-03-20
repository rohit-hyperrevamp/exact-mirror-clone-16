import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";

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
  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: '420px' }}>
          <img
            src="/images/arvkbg.png"
            alt="Health Checkups"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="flex items-center gap-6">
              <div className="text-right text-white">
                <p className="text-sm uppercase tracking-[0.25em] mb-1 font-medium">About</p>
                <h1 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: "Georgia, serif" }}>Health Packages</h1>
              </div>
              <div className="w-px bg-white/40" style={{ height: '100px' }} />
              <div className="text-white">
                <h2 className="text-2xl md:text-[32px] font-bold leading-tight">Trusted Health Checkups</h2>
                <p className="mt-3 text-[15px] opacity-80 max-w-md">Structured health packages to help you stay ahead of illness and monitor your wellness.</p>
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
              At Aarvak Diagnostics, we understand the importance of corporate health checkups.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              We provide comprehensive testing and diagnostic services to ensure that your organization is running in top condition.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              Our health checkups are tailored to meet the needs of your business and help you identify any potential issues before they become a problem.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Health Packages */}
      <section className="py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-[42px] font-bold text-foreground text-center mb-12">Featured Health Packages</h2>
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

      <NewsletterSection />
    </div>
  );
};

export default HealthCheckups;
