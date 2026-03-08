import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-background">
      <PageHero
        label="ABOUT"
        title="Aarvak"
        heading={"Built on Trust.\nDriven by Accuracy."}
        description="Making quality diagnostic care accessible, reliable, and patient-first."
        ctaText="Book a Test"
        ctaLink="/contact-us#contact"
      />

      {/* Tagline Banner */}
      <section className="bg-background py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-aarvak-blue">
            Health Is Personal. Your Diagnostics Should Be, Too.
          </h2>
          <p className="mt-2 text-sm text-aarvak-gray-600">
            30 Years Of Global Wisdom. Right Next Door.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-aarvak-gray-900 mb-2">Who We Are</h2>
              <p className="text-aarvak-blue font-medium mb-6">
                Reliable Diagnostics With A Patient-First Approach.
              </p>
              <p className="text-aarvak-gray-600 leading-relaxed">
                <strong>World-Class Standards. Neighborhood Accessibility.</strong> Since 2015, Aarvak Has Been Gurgaon's "Neighborhood Lab With A Global Brain." We bridge the gap between high-precision diagnostics and the personalised care of a local clinic. Operating From <strong>Sector 67 (JMD Suburbia - 2) And Badshahpur</strong>, We Don't Just Process Samples, We Provide The Clarity Families Need To Make Informed Health Decisions.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src="/images/who-we-are.png"
                alt="Laboratory professionals working"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="bg-aarvak-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-aarvak-gray-900 mb-2">What We Stand For</h2>
              <p className="text-aarvak-blue font-medium mb-6">
                Quality, Care, And Consistency in Every Test.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Clinical Integrity", desc: "100% Accurate, NABL-Standard Results You And Your Doctor Can Bank On." },
                  { title: "Painless Collection", desc: "Specialized Techniques For Kids And Seniors To Ensure Every Test Is Stress-Free." },
                  { title: "Absolute Ethics", desc: "No Hidden Costs, No Unnecessary Tests, And No Corporate Sales Targets." },
                  { title: "Global Standards", desc: "Bringing 30 Years Of International Healthcare Expertise To Your Local Community." },
                ].map((item) => (
                  <div key={item.title}>
                    <h3 className="font-semibold text-aarvak-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-aarvak-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src="/images/what-we-stand-for.png"
                alt="Lab professional examining sample"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* People Behind Aarvak */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-aarvak-gray-900">The People Behind Aarvak</h2>
            <p className="mt-2 text-aarvak-gray-600">Guided By Experience. Driven By Care.</p>
          </div>
          <div className="space-y-16">
            {/* Ravinder */}
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-aarvak-gray-900 mb-1">Ravinder Yadav</h3>
                <p className="text-aarvak-blue font-medium mb-4">Director, Aarvak Diagnostics</p>
                <p className="text-aarvak-gray-600 leading-relaxed text-sm">
                  Operational Excellence & Growth Leader Ravinder Is The Driving Force Behind Aarvak's Seamless 24/7 Operations. With A Deep Understanding Of The Healthcare Landscape And A Focus On Patient-Centric Growth, He Ensures That Our "Neighborhood Lab" Promise Is Met With World-Class Efficiency. Ravinder's Mission Is Simple: Making High-End Diagnostics Accessible, Ethical, And Stress-Free For Every Family In Gurgaon.
                </p>
              </div>
              <div className="lg:w-1/2">
                <img
                  src="/images/ravinder-11.jpeg"
                  alt="Ravinder Yadav"
                  className="rounded-2xl shadow-lg w-full max-w-md mx-auto"
                />
              </div>
            </div>
            {/* Raj */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-aarvak-gray-900 mb-1">Raj Sehgal</h3>
                <p className="text-aarvak-blue font-medium mb-4">Business Advisor, Aarvak Diagnostics</p>
                <p className="text-aarvak-gray-600 leading-relaxed text-sm">
                  Alumnus, IIM Ahmedabad | Former VP, Dr. Lal PathLabs With over 30 years of experience across 25+ countries, Raj is a global heavyweight in the diagnostic industry. Having led international business for India's largest lab chains, he founded Aarvak to bring that same "big lab" clinical precision to a local, human level. For Raj, diagnostics isn't about volume—it's about the integrity of every single report.
                </p>
              </div>
              <div className="lg:w-1/2">
                <img
                  src="/images/raj-12.jpeg"
                  alt="Raj Sehgal"
                  className="rounded-2xl shadow-lg w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
