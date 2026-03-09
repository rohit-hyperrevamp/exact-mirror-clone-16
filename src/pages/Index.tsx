import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

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
  const maxPkgSlide = Math.max(0, healthPackages.length - 2);

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
      <section className="w-full relative">
        <div className="hidden lg:block relative w-full h-[700px]">
          <img
            alt="Desktop Banner"
            src="/images/aarvakbanner.jpeg"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <Link
              to="/contact-us#contact"
              className="inline-block text-white font-semibold tracking-wider uppercase px-14 py-5 text-lg rounded-full shadow-xl transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: '#0A1551' }}
            >
              Book Your Health Checkup
            </Link>
          </div>
        </div>
        <div className="block lg:hidden relative w-full h-[600px]">
          <img
            alt="Mobile Banner"
            src="/images/mobileaarvakbanner.jpeg"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <Link
              to="/contact-us#contact"
              className="block text-center text-white font-semibold tracking-wider uppercase px-10 py-4 text-base rounded-full shadow-xl transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: '#0A1551' }}
            >
              Book Your Health Checkup
            </Link>
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
      <section className="bg-background py-16">
        <div className="text-center pb-8 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-semibold text-aarvak-gray-900">
            Health Checkup Packages
          </h2>
          <p className="mt-3 text-lg sm:text-base text-aarvak-gray-600">
            Preventive health checkups designed to help you stay informed and proactive.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-2">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${pkgSlide * 50}%)` }}
            >
              {healthPackages.map((pkg) => (
                <div key={pkg.name} className="w-full sm:w-1/2 px-3 flex-shrink-0">
                  <div className="h-full rounded-2xl text-white shadow-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A1551 0%, #1565C0 100%)' }}>
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                            <img alt="" src="/images/health-care.png" className="w-7 h-7" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{pkg.name}</h3>
                            <p className="text-sm opacity-70 mt-0.5">{pkg.desc}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="line-through text-sm opacity-60">{pkg.originalPrice}</span>
                            <span className="text-2xl font-bold">{pkg.price}</span>
                          </div>
                          <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-md mt-1">
                            {pkg.discount}
                          </span>
                        </div>
                      </div>

                      {/* Report time */}
                      <p className="mt-4 text-sm">
                        Report Time: <span className="font-bold">6–8 Hours</span>
                      </p>

                      {/* Includes */}
                      <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full mt-4 mb-4">
                        Includes
                      </span>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                        {pkg.tests.map((t) => (
                          <div key={t} className="flex items-start gap-2 text-sm">
                            <span className="mt-1.5 w-2 h-2 bg-white rounded-full flex-shrink-0" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Book Now button */}
                    <Link to="/contact-us#contact" className="block">
                      <div className="bg-white text-gray-900 font-bold text-center py-4 text-lg hover:bg-gray-100 transition cursor-pointer rounded-b-2xl">
                        Book Now
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center gap-6 mt-10">
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
      <section className="bg-aarvak-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-semibold text-aarvak-gray-900">
              Care You Can Trust
            </h2>
            <p className="mt-3 text-base text-aarvak-gray-600 max-w-2xl mx-auto">
              Reliable diagnostics focused on accuracy, safety, and patient comfort.
            </p>
            <p className="mt-4 text-sm text-aarvak-gray-600 max-w-3xl mx-auto leading-relaxed">
              Aarvak Diagnostics is a trusted diagnostic center offering blood tests, imaging, and preventive health services. We use modern technology and follow strict quality standards to ensure accurate results, while keeping patient care and comfort at the center of everything we do.
            </p>
            <Link
              to="/about-us"
              className="inline-block mt-6 text-aarvak-blue font-semibold hover:underline"
            >
              Learn More About Us →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: "/images/testing.png", title: "Accurate & Reliable Testing", desc: "Advanced equipment and quality-controlled processes for dependable results." },
              { img: "/images/patient.png", title: "Patient-First Approach", desc: "Comfortable testing experience with clear communication at every step." },
              { img: "/images/professional.png", title: "Experienced Professionals", desc: "Advanced equipment and quality-controlled processes for dependable results." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <img src={item.img} alt={item.title} className="w-16 h-16 mx-auto mb-4" />
                <h3 className="font-semibold text-aarvak-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-aarvak-gray-600">{item.desc}</p>
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
            {[
              { img: "/images/blog-4.jpg", date: "2026-01-21", title: "Why Home Collection is the Future of Healthcare", desc: "Skip traffic and waiting rooms. Get professional blood collection at home....", category: "Preventive Care" },
              { img: "/images/blog-33.jpg", date: "2026-01-20", title: "Why Your Liver and Kidneys Need a 'Service' More Than Your Car Does", desc: "Your organs don't complain until it's late. Check your LFT...", category: "Organ Health" },
              { img: "/images/blog-1.jpg", date: "2025-10-20", title: "The Corporate Athlete's Guide to Preventive Health", desc: "Early tests help detect health issues before symptoms appear....", category: "Health" },
            ].map((blog) => (
              <Link key={blog.title} to="/insights" className="group">
                <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
                  <img src={blog.img} alt={blog.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <p className="text-xs text-aarvak-gray-600 mb-2">{blog.date}</p>
                    <h3 className="font-semibold text-aarvak-gray-900 mb-2 group-hover:text-aarvak-blue transition line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-aarvak-gray-600 line-clamp-2">{blog.desc}</p>
                    <p className="text-xs text-aarvak-gray-600 mt-3">
                      By Aarvak Diagnostics · Category: {blog.category}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
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
      <section className="bg-background py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-aarvak-gray-900">FAQ's</h2>
            <p className="mt-2 text-aarvak-gray-600">Everything You Need To Know</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between text-sm font-medium text-aarvak-gray-900"
                >
                  {faq.q}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${openFaq === i ? "rotate-90" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-aarvak-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
