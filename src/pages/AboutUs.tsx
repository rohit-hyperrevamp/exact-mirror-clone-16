import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative w-full h-[400px] md:h-[480px] overflow-hidden">
        <img
          src="/images/ServiceslLeft.png"
          alt="About Aarvak"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="flex items-center gap-6">
            <div className="text-right text-white">
              <p className="text-sm uppercase tracking-widest mb-1">ABOUT</p>
              <h1 className="text-4xl md:text-6xl font-bold italic" style={{ fontFamily: "Georgia, serif" }}>Aarvak</h1>
            </div>
            <div className="w-px h-24 bg-white/50" />
            <div className="text-white">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">Built on Trust.<br />Driven by Accuracy.</h2>
              <p className="mt-3 text-sm md:text-base opacity-80 max-w-md">Making quality diagnostic care accessible, reliable, and patient-first.</p>
              <Link
                to="/contact-us#contact"
                className="inline-block mt-5 text-white font-semibold px-6 py-2.5 rounded-full text-sm"
                style={{ backgroundColor: '#0891b2' }}
              >
                Book a Test
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline overlay */}
      <section className="relative">
        <div className="bg-white rounded-t-3xl -mt-12 relative z-20 pt-10 pb-6 px-4 max-w-xl ml-4 md:ml-16">
          <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#0891b2' }}>
            Health Is Personal. Your Diagnostics Should Be, Too.
          </h2>
          <p className="text-sm text-gray-500 mt-2">30 Years Of Global Wisdom. Right Next Door.</p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="mb-6" style={{ color: '#0891b2' }}>Reliable Diagnostics With A Patient-First Approach.</p>
            <p className="text-gray-600 leading-relaxed">
              <strong>World-Class Standards. Neighborhood Accessibility.</strong> Since 2015, Aarvak Has Been Gurgaon's "Neighborhood Lab With A Global Brain." We bridge the gap between high-precision diagnostics and the personalised care of a local clinic. Operating From <strong>Sector 67 (JMD Suburbia - 2) And Badshahpur</strong>, We Don't Just Process Samples, We Provide The Clarity Families Need To Make Informed Health Decisions.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img src="/images/who-we-are.png" alt="Laboratory professionals working" className="w-full rounded-2xl" />
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-12 items-start">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="mb-6" style={{ color: '#0891b2' }}>Quality, Care, And Consistency in Every Test.</p>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Clinical Integrity</h3>
                <p className="text-gray-600 text-sm">100% Accurate, NABL-Standard Results You And Your Doctor Can Bank On.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Painless Collection</h3>
                <p className="text-gray-600 text-sm">Specialized Techniques For Kids And Seniors To Ensure Every Test Is Stress-Free.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Absolute Ethics</h3>
                <p className="text-gray-600 text-sm">No Hidden Costs, No Unnecessary Tests, And No Corporate Sales Targets.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Global Standards</h3>
                <p className="text-gray-600 text-sm">Bringing 30 Years Of International Healthcare Expertise To Your Local Community.</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img src="/images/what-we-stand-for.png" alt="Lab professional examining sample" className="w-full rounded-2xl" />
          </div>
        </div>
      </section>

      {/* The People Behind Aarvak */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The People Behind Aarvak</h2>
          <p className="mt-2 text-gray-500">Guided By Experience. Driven By Care.</p>
        </div>
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Ravinder */}
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900">Ravinder Yadav</h3>
              <p className="text-sm text-gray-500 mb-4">Director, Aarvak Diagnostics</p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Operational Excellence & Growth Leader Ravinder Is The Driving Force Behind Aarvak's Seamless 24/7 Operations. With A Deep Understanding Of The Healthcare Landscape And A Focus On Patient-Centric Growth, He Ensures That Our "Neighborhood Lab" Promise Is Met With World-Class Efficiency. Ravinder's Mission Is Simple: Making High-End Diagnostics Accessible, Ethical, And Stress-Free For Every Family In Gurgaon.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img src="/images/ravinder-11.jpeg" alt="Ravinder Yadav" className="w-full max-w-md rounded-2xl mx-auto" />
            </div>
          </div>
          {/* Raj */}
          <div className="flex flex-col lg:flex-row-reverse gap-10 items-center">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900">Raj Sehgal</h3>
              <p className="text-sm text-gray-500 mb-4">Business Advisor, Aarvak Diagnostics</p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Alumnus, IIM Ahmedabad | Former VP, Dr. Lal PathLabs With over 30 years of experience across 25+ countries, Raj is a global heavyweight in the diagnostic industry. Having led international business for India's largest lab chains, he founded Aarvak to bring that same "big lab" clinical precision to a local, human level. For Raj, diagnostics isn't about volume—it's about the integrity of every single report.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img src="/images/raj-12.jpeg" alt="Raj Sehgal" className="w-full max-w-md rounded-2xl mx-auto" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;