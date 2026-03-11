import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const serviceCards = [
  {
    img: "/images/health.png",
    icon: "/images/blood-icon.png",
    title: "Book A Lab Test",
    desc: "Find And Book Individual Diagnostic Tests Easily",
    btnText: "Book Test",
    link: "/contact-us#contact",
  },
  {
    img: "/images/package.png",
    icon: "/images/heart-icon.png",
    title: "Health Packages",
    desc: "Preventive Checkups Designed For Different Health Needs",
    btnText: "Explore Packages",
    link: "/#package",
  },
  {
    img: "/images/healthtest.png",
    icon: "/images/home-icon.png",
    title: "Home Samples",
    desc: "Safe And Convenient Sample Collection At Your Doorstep",
    btnText: "Book Home Collection",
    link: "/contact-us#contact",
  },
];

const diagnosticTests = [
  {
    name: "ADC - Basic",
    desc: "Essential Tests For Daily Health Monitoring",
    price: "₹ 599",
    tests: ["Complete Blood Count", "Kidney Function Test", "Blood Sugar (Fasting)", "Lipid Profile", "Liver Function Test", "Urine Examination"],
  },
  {
    name: "ADC - Essential",
    desc: "Preventive Screening For Better Lifestyle Health",
    price: "₹ 999",
    tests: ["Complete Blood Count", "Liver & Kidney Function", "Blood Sugar (Fasting)", "HbA1c", "Thyroid, Lipid Profile", "Urine Examination"],
  },
  {
    name: "ADC - Essential Plus",
    desc: "Advanced Preventive Care For Overall Wellness",
    price: "₹ 1,499",
    tests: ["CBC & Blood Sugar", "Liver & Kidney Health", "Lipid Profile & HbA1c", "Thyroid Profile & Iron Profile", "CRP & RA Factor", "Urine Examination"],
  },
  {
    name: "ADC - Advanced",
    desc: "Comprehensive Health Screening Made Easy",
    price: "₹ 1,999",
    tests: ["Blood Sugar & HbA1c", "Vitamin B12 & RA Factor", "CBC & ESR", "Thyroid Profile & Iron Profile", "Liver, Kidney & Lipid Profile", "Urine Examination"],
  },
  {
    name: "ADC - Supreme",
    desc: "The Highest Level Of Complete Health Screening",
    price: "₹ 2,999",
    tests: ["Blood Sugar & HbA1c", "Vit. D, B12, CRP & CA/PSA", "CBC & ESR & RA Factor", "Thyroid Profile & Iron Profile", "Liver, Kidney & Lipid Profile", "Amylase, Lipase & Urine"],
  },
];

const healthPackages = [
  {
    name: "Pollution Health Check Package",
    desc: "Preventive Pollution Health Tests",
    originalPrice: "₹ 4150",
    price: "₹ 950",
    discount: "40% Off",
    tests: ["Fasting Blood Sugar", "CBC & ESR", "Liver Function Test (LFT)", "Vitamin D", "Kidney Function Test (KFT)", "IgE (Allergy Marker)"],
  },
  {
    name: "Heart Health Check Package",
    desc: "Essential Tests For Heart Monitoring",
    originalPrice: "₹ 2360",
    price: "₹ 1,199",
    discount: "40% Off",
    tests: ["Lipid Profile", "Complete Blood Count", "Blood Sugar", "CPK-MB", "T3 (Triiodothyronine)", "T4 & TSH"],
  },
  {
    name: "Pre-Marriage Health Package",
    desc: "Essential Health Tests Before Marriage",
    originalPrice: "₹ 3400",
    price: "₹ 2,100",
    discount: "40% Off",
    tests: ["HCV (Hepatitis C Virus)", "HbA1c (Glycated Hemoglobin)", "HBsAg", "STD Screening", "HIV Test", "TSH Test"],
  },
  {
    name: "Complete Wellness Package",
    desc: "Preventive Tests For Overall Health",
    originalPrice: "₹ 4300",
    price: "₹ 1,499",
    discount: "40% Off",
    tests: ["Lipid Profile", "Complete Blood Count", "Blood Sugar", "Thyroid (TSH)", "Liver & Kidney Function", "Vitamin D"],
  },
  {
    name: "Diabetes Screening Package",
    desc: "Essential Tests For Blood Sugar Monitoring",
    originalPrice: "₹ 2050",
    price: "₹ 999",
    discount: "40% Off",
    tests: ["Fasting Blood Sugar", "Kidney Function Test (KFT)", "HbA1c", "Lipid Profile"],
  },
];

const bodySystemIcons = [
  { name: "Lungs", icon: "/icons/Lungs.png" },
  { name: "Kidney", icon: "/icons/Kidney.png" },
  { name: "Bone", icon: "/icons/Bone.png" },
  { name: "Thyroid", icon: "/icons/Thyroid.png" },
  { name: "Brain", icon: "/icons/Brain.png" },
  { name: "Heart", icon: "/icons/Heart.png" },
  { name: "Blood", icon: "/icons/Blood.png" },
];

const testimonials = [
  { initials: "RS", name: "Rahul S.", stars: 4, quote: "Smooth and hassle-free experience.", detail: "Booking was easy, staff was polite, and reports were delivered on time." },
  { initials: "MP", name: "Meena P.", stars: 4, quote: "Professional and hygienic service.", detail: "Home sample collection was convenient and followed proper safety standards." },
  { initials: "AM", name: "Ankit M.", stars: 4, quote: "Clear reports and helpful staff.", detail: "The process was quick, and the team explained everything clearly." },
  { initials: "SK", name: "Sunita K.", stars: 5, quote: "Very reliable diagnostics center.", detail: "Accurate reports and friendly staff. I highly recommend their services." },
  { initials: "VP", name: "Vikas P.", stars: 4, quote: "Fast service and clean facility.", detail: "Minimal waiting time and well-maintained lab. Good overall experience." },
  { initials: "NT", name: "Neha T.", stars: 5, quote: "Excellent home collection service.", detail: "The technician arrived on time and followed all hygiene protocols." },
];

const faqs = [
  { q: "How do I book a Home Collection?", a: "You can book instantly via WhatsApp (+91 9810063340) or our website. Our trained phlebotomists arrive within 60–90 minutes across Gurgaon with a temperature-controlled box to ensure sample freshness." },
  { q: "Do you collect samples from home?", a: "Yes, we offer Home Sample Collection across Gurgaon. Just call or WhatsApp us at +91 9810063340 to book a slot." },
  { q: "When will I receive my reports?", a: "Most routine blood test reports are delivered via WhatsApp and Email within 6 to 12 hours." },
  { q: "Is Aarvak Diagnostics NABL/ISO compliant?", a: "We follow strict NABL-standard protocols and use automated, high-end machinery to ensure accurate and reliable reports accepted by all major doctors and hospitals." },
  { q: "Do I need to fast before my blood test?", a: "For most tests such as Sugar or Cholesterol, 10–12 hours of fasting is recommended. You may drink plain water but avoid tea, coffee, or snacks." },
];

const Index = () => {
  const [testSlide, setTestSlide] = useState(0);
  const [pkgSlide, setPkgSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);

  const maxTestSlide = Math.max(0, diagnosticTests.length - 3);
  const maxPkgSlide = Math.max(0, healthPackages.length - 3);

  // Auto-scroll for body system icons
  useEffect(() => {
    const container = bodyScrollRef.current;
    if (!container) return;
    let scrollDirection = 1;
    const interval = setInterval(() => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll) scrollDirection = -1;
      if (container.scrollLeft <= 0) scrollDirection = 1;
      container.scrollBy({ left: scrollDirection * 2, behavior: 'smooth' });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="relative mx-2 md:mx-4 rounded-none md:rounded-[14px] overflow-hidden h-[420px] md:h-[540px] lg:h-[600px]">
        <img
          src="/images/arvkbg.png"
          alt="Aarvak Diagnostics Laboratory"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-center h-full px-6 md:px-16 lg:px-24">
          {/* Left: Title */}
          <div className="w-full md:w-auto text-center md:text-right md:pr-8">
            <p className="text-primary-foreground text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Aarvak
            </p>
            <p className="text-primary-foreground text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Diagnostics
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-[2px] h-[180px] lg:h-[220px] bg-primary-foreground/60 mx-6 lg:mx-10" />

          {/* Right: Heading + CTA */}
          <div className="w-full md:w-auto text-center md:text-left mt-4 md:mt-0 max-w-md">
            <h1 className="text-primary-foreground text-2xl md:text-3xl lg:text-[42px] font-bold leading-tight">
              Diagnostic Care You<br />Can Trust
            </h1>
            <p className="text-primary-foreground/90 text-sm md:text-base mt-3">
              Reliable tests and imaging, with care you can trust.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
              <Link
                to="/contact-us#contact"
                className="bg-aarvak-blue text-primary-foreground px-8 py-3 rounded-full font-semibold text-sm md:text-base hover:bg-aarvak-blue-hover transition-colors"
              >
                Book a Test
              </Link>
              <Link
                to="/#package"
                className="bg-primary-foreground text-foreground px-8 py-3 rounded-full font-semibold text-sm md:text-base hover:bg-primary-foreground/90 transition-colors"
              >
                Explore Packages
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Overlay - Bottom Left */}
        <div className="absolute bottom-0 left-0 z-20 bg-primary-foreground rounded-tr-3xl px-6 md:px-10 py-5 md:py-6">
          <div className="flex gap-6 md:gap-10">
            <div className="text-center">
              <p className="text-aarvak-green text-2xl md:text-4xl font-bold">10+</p>
              <p className="text-foreground text-xs md:text-sm mt-1">Years of Experience</p>
            </div>
            <div className="text-center">
              <p className="text-aarvak-green text-2xl md:text-4xl font-bold">50k+</p>
              <p className="text-foreground text-xs md:text-sm mt-1">Tests Conducted</p>
            </div>
            <div className="text-center">
              <p className="text-aarvak-green text-2xl md:text-4xl font-bold">99%</p>
              <p className="text-foreground text-xs md:text-sm mt-1">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Can We Help */}
      <main className="bg-background">
        <section className="text-center py-10 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-[40px] font-semibold text-aarvak-gray-900">
            How Can We Help You Today?
          </h1>
          <p className="mt-3 text-lg sm:text-base text-aarvak-gray-600">
            Choose What You&apos;re Looking For And Get Started In Seconds.
          </p>
        </section>

        {/* Service Cards */}
        <section className="bg-gradient-to-b from-muted to-background py-2">
          <div className="flex justify-center px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full max-w-[1320px]">
              {serviceCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-background rounded-2xl flex flex-col md:flex-row shadow-[0_12px_35px_rgba(0,0,0,0.08)] overflow-hidden"
                >
                  <div className="w-full md:w-1/2 h-[220px] sm:h-[260px] md:h-[280px] flex items-center justify-center">
                    <div className="relative w-full h-[160px] sm:h-[180px] md:h-[220px]">
                      <img
                        alt={card.title}
                        src={card.img}
                        className="absolute inset-0 w-full h-full object-contain object-center"
                      />
                    </div>
                  </div>
                  <div className="p-2 text-center md:w-1/2 flex flex-col justify-center items-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <img alt="" className="h-6 w-6" src={card.icon} />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-aarvak-gray-900">{card.title}</h3>
                    <p className="mt-2 text-sm text-aarvak-gray-600 leading-relaxed">{card.desc}</p>
                    <Link to={card.link}>
                      <button className="mt-5 sm:mt-6 rounded-full bg-aarvak-blue px-3 py-2.5 text-sm text-primary-foreground transition hover:bg-aarvak-blue-hover">
                        {card.btnText}
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Popular Diagnostic Tests */}
      <section className="bg-background py-16" id="package">
        <div className="text-center pb-8 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-semibold text-aarvak-gray-900">
            Popular Diagnostic Tests
          </h2>
          <p className="mt-3 text-lg sm:text-base text-aarvak-gray-600">
            Tests most commonly booked by our patients
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-2">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${testSlide * (100 / 3)}%)` }}
            >
              {diagnosticTests.map((test) => (
                <div key={test.name} className="w-full sm:w-1/2 lg:w-1/3 px-1 flex-shrink-0">
                  <div className="h-full rounded-2xl gradient-test-card p-5 text-primary-foreground shadow-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-1">
                        <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                          <img alt="" src="/images/monitoring.png" className="p-2" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{test.name}</h3>
                          <p className="text-xs opacity-70 mt-1 leading-snug">{test.desc}</p>
                        </div>
                      </div>
                      <div className="bg-aarvak-yellow text-foreground text-xs font-semibold px-3 py-1 rounded-md text-center leading-tight">
                        Price<br />
                        <span className="font-bold text-sm">{test.price}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs opacity-70">
                      Report Time: <span className="font-semibold">6–8 Hours</span>
                    </p>
                    <div className="mt-4">
                      <span className="inline-block bg-aarvak-yellow text-foreground text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        Includes
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 text-xs opacity-80">
                        {test.tests.map((t) => (
                          <li key={t} className="flex items-start gap-2">
                            <span className="mt-1 w-1.5 h-1.5 bg-background rounded-full flex-shrink-0" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link to="/contact-us#contact">
                      <button className="mt-6 w-full bg-background text-foreground font-semibold py-2.5 rounded-xl hover:opacity-90 transition">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={() => setTestSlide(Math.max(0, testSlide - 1))}
              className="w-10 h-10 bg-background rounded-full text-foreground flex items-center justify-center text-2xl shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-28 h-2 bg-muted-foreground/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-aarvak-blue transition-all"
                style={{ width: `${((testSlide + 1) / (maxTestSlide + 1)) * 100}%` }}
              />
            </div>
            <button
              onClick={() => setTestSlide(Math.min(maxTestSlide, testSlide + 1))}
              className="w-10 h-10 bg-background rounded-full text-foreground flex items-center justify-center text-2xl shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Tests By Body System */}
      <section className="bg-background py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
            <div className="w-full lg:w-1/3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-aarvak-gray-900">
                Tests By Body System
              </h2>
              <p className="mt-4 text-sm sm:text-base text-aarvak-gray-600 max-w-md">
                Choose An Organ System To View Commonly Recommended Diagnostic Tests.
              </p>
              <Link to="/#package">
                <button className="mt-6 rounded-full bg-aarvak-blue px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-aarvak-blue-hover">
                  Explore
                </button>
              </Link>
            </div>
            <div className="lg:w-2/3 w-full overflow-hidden">
              <div ref={bodyScrollRef} className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {bodySystemIcons.map((item) => (
                  <div
                    key={item.name}
                    className="min-w-[150px] sm:min-w-[170px] bg-aarvak-gray-50 rounded-2xl h-36 sm:h-40 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    <img alt={item.name} src={item.icon} className="w-[72px] h-[72px]" />
                    <p className="mt-3 text-xl font-semibold text-aarvak-green">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Radiology Services */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="/images/radiology.png"
          alt="Radiology Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-primary-foreground text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Radiology Services</h2>
          <p className="text-lg mb-6 max-w-xl">
            Accurate X-Ray Imaging With Modern Equipment And Expert Supervision.
          </p>
          <Link
            to="/contact-us#contact"
            className="bg-aarvak-blue text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-aarvak-blue-hover transition"
          >
            Book An X-Ray
          </Link>
        </div>
      </section>

      {/* Health Checkup Packages */}
      <section className="py-20" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="text-center pb-12 px-4">
          <h2 className="font-bold text-aarvak-gray-900" style={{ fontSize: '42px' }}>
            Health Checkup Packages
          </h2>
          <p className="mt-3 text-aarvak-gray-600" style={{ fontSize: '18px' }}>
            Preventive health checkups designed to help you stay informed and proactive.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${pkgSlide * (100 / 3)}%)`, gap: '32px' }}
            >
              {healthPackages.map((pkg) => (
                <div key={pkg.name} className="flex-shrink-0" style={{ width: 'calc(33.333% - 22px)' }}>
                  <div
                    className="h-full flex flex-col text-white overflow-hidden"
                    style={{
                      background: 'linear-gradient(180deg, #1b75a6 0%, #0c3f5d 100%)',
                      borderRadius: '20px',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
                    }}
                  >
                    <div style={{ padding: '28px', paddingBottom: '20px' }} className="flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className="flex items-center justify-center flex-shrink-0"
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '50%',
                              backgroundColor: '#FFFFFF',
                              padding: '10px',
                            }}
                          >
                            <img alt="" src="/images/health-care.png" className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold leading-tight" style={{ fontSize: '16px' }}>{pkg.name}</h3>
                            <p className="mt-1" style={{ fontSize: '13px', opacity: 0.7 }}>{pkg.desc}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3">
                          <div className="flex items-center gap-2">
                            <span className="line-through" style={{ fontSize: '14px', opacity: 0.6 }}>{pkg.originalPrice}</span>
                            <span className="font-bold" style={{ fontSize: '26px' }}>{pkg.price}</span>
                          </div>
                          <span
                            className="inline-block font-bold"
                            style={{
                              backgroundColor: '#FFC107',
                              color: '#1a1a1a',
                              fontSize: '11px',
                              padding: '2px 10px',
                              borderRadius: '4px',
                              marginTop: '4px',
                            }}
                          >
                            {pkg.discount}
                          </span>
                        </div>
                      </div>

                      {/* Report time */}
                      <p style={{ marginTop: '16px', fontSize: '13px' }}>
                        Report Time: <span className="font-bold">6–8 Hours</span>
                      </p>

                      {/* Includes */}
                      <span
                        className="inline-block font-bold"
                        style={{
                          backgroundColor: '#FFC107',
                          color: '#1a1a1a',
                          fontSize: '11px',
                          padding: '4px 14px',
                          borderRadius: '20px',
                          marginTop: '14px',
                          marginBottom: '14px',
                        }}
                      >
                        Includes
                      </span>
                      <div className="grid grid-cols-2" style={{ gap: '10px 24px' }}>
                        {pkg.tests.map((t) => (
                          <div key={t} className="flex items-start gap-2" style={{ fontSize: '13px' }}>
                            <span
                              className="flex-shrink-0"
                              style={{
                                marginTop: '6px',
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: 'white',
                              }}
                            />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Book Now button */}
                    <div style={{ padding: '0 28px 28px' }}>
                      <Link to="/contact-us#contact" className="block">
                        <div
                          className="font-bold text-center transition hover:opacity-90"
                          style={{
                            backgroundColor: '#e8e8e8',
                            color: '#1a1a1a',
                            borderRadius: '14px',
                            padding: '14px',
                            fontSize: '16px',
                          }}
                        >
                          Book Now
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={() => setPkgSlide(Math.max(0, pkgSlide - 1))}
              className="w-10 h-10 bg-background rounded-full text-foreground flex items-center justify-center text-2xl shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-28 h-2 bg-muted-foreground/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-aarvak-blue transition-all"
                style={{ width: `${((pkgSlide + 1) / (maxPkgSlide + 1)) * 100}%` }}
              />
            </div>
            <button
              onClick={() => setPkgSlide(Math.min(maxPkgSlide, pkgSlide + 1))}
              className="w-10 h-10 bg-background rounded-full text-foreground flex items-center justify-center text-2xl shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Care You Can Trust */}
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-[42px] font-bold text-aarvak-gray-900">
              Care You Can Trust
            </h2>
            <p className="mt-3 text-aarvak-gray-600" style={{ fontSize: '18px' }}>
              Reliable diagnostics focused on accuracy, safety, and patient comfort.
            </p>
          </div>

          {/* Image Banner with overlapping card */}
          <div className="relative mb-36 md:mb-44">
            <div
              className="w-full overflow-hidden"
              style={{ borderRadius: '20px', height: '420px' }}
            >
              <img
                src="/images/cop-first.jpeg"
                alt="Care You Can Trust - Diagnostics Lab"
                className="w-full h-full object-cover object-right"
              />
            </div>

            {/* Overlapping White Card */}
            <div
              className="absolute left-4 sm:left-8 md:left-10"
              style={{
                bottom: '-100px',
                maxWidth: '720px',
                width: 'calc(100% - 32px)',
              }}
            >
              <div
                className="bg-background"
                style={{
                  borderRadius: '20px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.10)',
                  padding: '32px 36px',
                }}
              >
                <p className="text-sm sm:text-base text-aarvak-gray-600 leading-relaxed">
                  Aarvak Diagnostics is a trusted diagnostic center offering blood tests, imaging, and preventive health services. We use modern technology and follow strict quality standards to ensure accurate results, while keeping patient care and comfort at the center of everything we do.
                </p>
                <Link
                  to="/about-us"
                  className="inline-block mt-5 bg-aarvak-blue text-primary-foreground px-6 py-2.5 font-semibold text-sm hover:bg-aarvak-blue-hover transition-colors"
                  style={{ borderRadius: '8px' }}
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Accurate & Reliable Testing", desc: "Advanced equipment and quality-controlled processes for dependable results.", icon: "✓" },
              { title: "Patient-First Approach", desc: "Comfortable testing experience with clear communication at every step.", icon: "👤" },
              { title: "Experienced Professionals", desc: "Advanced equipment and quality-controlled processes for dependable results.", icon: "👨‍⚕️" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-background text-center"
                style={{
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                  padding: '32px 24px',
                }}
              >
                <div
                  className="mx-auto flex items-center justify-center"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'hsl(145, 60%, 90%)',
                    marginBottom: '18px',
                    fontSize: '24px',
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-aarvak-gray-900 mb-2" style={{ fontSize: '17px' }}>
                  {item.title}
                </h3>
                <p className="text-sm text-aarvak-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Insights */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-aarvak-gray-900">Health Insights</h2>
            <p className="mt-2 text-aarvak-gray-600">Simple health information you can trust.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((blog) => (
              <Link key={blog.slug} to={`/insights/${blog.slug}`} className="group">
                <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
                  <img src={blog.img} alt={blog.title} className="w-full h-48 object-cover group-hover:scale-105 transition duration-300" />
                  <div className="p-4">
                    <span className="inline-block text-xs font-semibold text-white px-3 py-1 rounded-full mb-2" style={{ backgroundColor: '#0891b2' }}>
                      {blog.date}
                    </span>
                    <h3 className="font-semibold text-aarvak-gray-900 mb-2 group-hover:text-aarvak-blue transition line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-aarvak-gray-600 line-clamp-2">{blog.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/insights"
              className="inline-block px-8 py-3 rounded-full font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: '#001260' }}
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-aarvak-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-aarvak-gray-900">What Our Patients Say</h2>
            <p className="mt-2 text-aarvak-gray-600">Real experiences from people who trust Aarvak Diagnostics.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-background rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-aarvak-blue flex items-center justify-center text-primary-foreground font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-aarvak-gray-900">{t.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < t.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="font-semibold text-aarvak-gray-900 mb-1">"{t.quote}"</p>
                <p className="text-sm text-aarvak-gray-600">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">FAQ's</h2>
            <p className="mt-2 text-gray-600">Everything You Need To Know</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-8 py-5 flex items-center justify-between text-base font-medium text-gray-900"
                >
                  {faq.q}
                  <span className="text-2xl font-light text-gray-500">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-5 text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Health Tips */}
      <section className="relative w-full h-[500px] overflow-hidden">
        <img
          src="/images/ServiceslLeft.png"
          alt="Lab"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="w-full max-w-2xl rounded-2xl p-10 text-white" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <h2 className="text-2xl sm:text-3xl font-bold italic mb-8">
              Health Tips, Straight to Your Inbox
            </h2>
            <div className="flex items-center border-b border-white/50 pb-2">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-transparent flex-1 text-white placeholder-white/70 outline-none text-lg"
              />
              <button className="text-white text-2xl ml-4 hover:opacity-80 transition">›</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
