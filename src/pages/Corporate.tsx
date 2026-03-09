import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const campImages = Array.from({ length: 12 }, (_, i) => `/images/camp${i + 1}.png`);

const Corporate = () => {
  const [campSlide, setCampSlide] = useState(0);
  const maxCampSlide = Math.max(0, campImages.length - 3);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative w-full h-[400px] md:h-[480px] overflow-hidden">
        <img
          src="/images/cop-first.jpeg"
          alt="Corporate Health Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="flex items-center gap-6">
            <div className="text-right text-white">
              <p className="text-lg">Corporate</p>
              <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">HEALTH SERVICES</h1>
            </div>
            <div className="w-px h-24 bg-white/50" />
            <div className="text-white">
              <h2 className="text-2xl md:text-3xl font-bold">Corporate Wellness</h2>
              <p className="mt-2 text-sm opacity-80 max-w-md">Tailored employee health checks, pre-employment screening, and onsite diagnostics for a healthier workforce.</p>
              <Link
                to="/contact-us#contact"
                className="inline-block mt-5 text-white font-semibold px-6 py-2.5 rounded-full text-sm"
                style={{ backgroundColor: '#0891b2' }}
              >
                Get a Corporate Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline overlay */}
      <section className="relative">
        <div className="bg-white rounded-t-3xl -mt-12 relative z-20 pt-8 pb-6 px-4 md:px-16 max-w-2xl">
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-lg font-bold" style={{ color: '#0891b2' }}>Tailored</p>
              <p className="text-xs text-gray-500">For All Ages</p>
            </div>
            <div className="w-px bg-gray-300" />
            <div className="text-center">
              <p className="text-lg font-bold" style={{ color: '#0891b2' }}>Expert</p>
              <p className="text-xs text-gray-500">Medical Team</p>
            </div>
            <div className="w-px bg-gray-300" />
            <div className="text-center">
              <p className="text-lg font-bold" style={{ color: '#0891b2' }}>Quick &</p>
              <p className="text-xs text-gray-500">Easy Booking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Health Solutions */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <img src="/images/ServiceslLeft.png" alt="Corporate Wellness" className="w-full rounded-2xl" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Corporate Health Solutions: Because Your People are Your Greatest Asset
            </h2>
            <p className="text-gray-600 leading-relaxed">
              In the high-stakes world of business, <strong>staying ahead of the curve</strong> isn't just about strategy, it's about the well-being of your workforce. At <strong>Aarvak Diagnostic Centre</strong>, we don't just run tests; we serve as your dedicated <strong>Partner in Health</strong>. From Gurugram to Delhi/NCR, we provide high-end preventive check-ups that ensure your team is always at the top of their game.
            </p>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Why Partner with Aarvak?</h2>
          <p className="text-gray-600 mb-6">We know that in corporate life, <strong>time is of the essence</strong>. We've stripped away the complexity to provide an unparalleled diagnostic experience that combines innovation with efficiency.</p>
          <ul className="space-y-4 text-gray-600 list-disc pl-5">
            <li><strong>Total Quality Management:</strong> Our success is built on a cornerstone of efficiency and total quality management, ensuring you get results you can bank on.</li>
            <li><strong>Zero Manual Errors:</strong> To keep things <strong>above board</strong>, all our systems are barcoded and interfaced from sample collection to the final report, eliminating manual entry errors entirely.</li>
            <li><strong>Maximum Value:</strong> We offer a specialized <strong>25% Corporate Discount</strong> on all lab tests, making high-end health affordable for your organization.</li>
            <li><strong>Expert Oversight:</strong> While our operations team keeps the wheels turning, our specialized doctors focus solely on delivering precise diagnoses.</li>
          </ul>
        </div>
      </section>

      {/* Service Portfolio */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Corporate Service Portfolio</h2>
            <p className="text-gray-600 mb-6">Our laboratory provides a comprehensive range of routine and specialized diagnostics, offering a seamless and cost-effective solution for all. By combining advanced technology with rigorous standards, our specialists ensure every result is accurate, reliable, and delivered within a clinically relevant timeframe.</p>
            <ul className="space-y-2 text-gray-600 list-disc pl-5">
              <li>Diagnostic Services</li>
              <li>On-Site Corporate Health Check-ups</li>
              <li>Complete Family Care</li>
              <li>Special Health Packages</li>
              <li>Pre-Employment & Annual Health Check-Ups</li>
              <li>Health Screening Programs</li>
              <li>Lab Investigations • Consultation • X-Ray • PFT • ECG</li>
              <li>Audiometry • Medical Certificates</li>
            </ul>
            <p className="mt-6 font-bold text-lg" style={{ color: '#0891b2' }}>Up to 25% Corporate Discount on All Lab Tests</p>
          </div>
          <div className="lg:w-1/2">
            <img src="/images/cop-sec.jpeg" alt="Corporate Services" className="w-full rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Tech Behind the Truth */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The Tech Behind the Truth</h2>
          <p className="text-gray-600 mb-6">We believe in <strong>precision in diagnosis</strong>. To achieve this, we utilize a checklist of cutting-edge technology:</p>
          <ul className="space-y-3 text-gray-600 list-disc pl-5">
            <li><strong>Chemistry & Electrolytes:</strong> Erba EM 200 Fully Automated Analyzer and Erba EC 90 Next-Gen Electrolyte Analyzer.</li>
            <li><strong>Hematology & Urine:</strong> Sysmex XP-100 Automatic Cell Counter and Erba Laura Urine Chemistry Strip Reader.</li>
            <li><strong>Advanced Imaging:</strong> SkanMobile Mobile X-Ray Radiography and Fuji CR System Prima T.</li>
          </ul>
        </div>
      </section>

      {/* Portfolio of Excellence */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">A Portfolio of Excellence</h2>
            <p className="text-gray-600 mb-6">We are proud to be the trusted health partner for industry leaders who demand nothing but the best:</p>
            <ul className="space-y-2 text-gray-600 list-disc pl-5">
              <li><strong>Hospitality:</strong> The Westin Gurgaon and The Gateway Resort.</li>
              <li><strong>Automotive & Engineering:</strong> Suzuki, SKH Group, and AtMa Autotech.</li>
              <li><strong>Food & Retail:</strong> Haldiram's and Bikanervala.</li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <img src="/images/cop-four.jpeg" alt="Portfolio of Excellence" className="w-full rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Certified Peace of Mind */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Certified Peace of Mind</h2>
          <p className="text-gray-600 leading-relaxed">
            Trust is earned, not given. <strong>Government Haryana Clinical Establishments</strong> registration ensures we adhere to the highest ethical practices and safety standards in the industry. Your team's health is our top priority.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <div className="text-gray-600 space-y-2">
            <p><strong>Phone:</strong> <a href="tel:+919810063340" className="hover:underline">+91 9810063340</a> | <a href="tel:+919311245957" className="hover:underline">+91 9311245957</a></p>
            <p><strong>Email:</strong> <a href="mailto:aarvakdiagnostic@gmail.com" className="hover:underline">aarvakdiagnostic@gmail.com</a></p>
            <p><strong>Visit Us:</strong> 1310, Behind SBI Bank, Badshahpur, Sohna Road, Sector - 66, Gurugram</p>
          </div>
          <Link
            to="/contact-us#contact"
            className="inline-block mt-6 text-white font-semibold px-8 py-3 rounded-full text-sm"
            style={{ backgroundColor: '#0891b2' }}
          >
            Get a Free Consultation
          </Link>
          <p className="mt-3 text-sm text-gray-500">Reach out today to discuss your corporate health solutions.</p>
        </div>
      </section>

      {/* Glimpse Of Check Up Camps */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Glimpse Of Some Check Up Camps</h2>
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
              className="w-10 h-10 bg-white rounded-full text-gray-900 flex items-center justify-center shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCampSlide(Math.min(maxCampSlide, campSlide + 1))}
              className="w-10 h-10 bg-white rounded-full text-gray-900 flex items-center justify-center shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Corporate;