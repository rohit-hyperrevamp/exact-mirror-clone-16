import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="bg-background">
      {/* Hero Banner - full width with rounded corners and side padding */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: '420px' }}>
          <img
            src="/images/about-banner.png"
            alt="About Aarvak"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="flex items-center gap-6">
              <div className="text-right text-white">
                <p className="text-sm uppercase tracking-[0.25em] mb-1 font-medium">ABOUT</p>
                <h1 className="text-4xl md:text-6xl font-bold italic" style={{ fontFamily: "Georgia, serif" }}>Aarvak</h1>
              </div>
              <div className="w-px bg-white/40" style={{ height: '100px' }} />
              <div className="text-white">
                <h2 className="text-2xl md:text-[32px] font-bold leading-tight">Built on Trust.<br />Driven by Accuracy.</h2>
                <p className="mt-3 text-[15px] opacity-80 max-w-md">Making quality diagnostic care accessible, reliable, and patient-first.</p>
                <Link
                  to="/contact-us#contact"
                  className="inline-block mt-5 text-white font-semibold px-7 py-3 rounded-full text-sm bg-secondary hover:bg-secondary/90 transition"
                >
                  Book a Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline overlay - white card overlapping hero bottom */}
      <section className="relative z-20">
        <div className="bg-background rounded-tr-[40px] -mt-16 relative pt-10 pb-8 px-6 md:px-12" style={{ maxWidth: '52%' }}>
          <h2 className="text-xl md:text-[26px] font-bold leading-snug text-secondary">
            Health Is Personal. Your Diagnostics Should Be, Too.
          </h2>
          <p className="text-sm text-muted-foreground mt-2 font-medium">30 Years Of Global Wisdom. Right Next Door.</p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2 pt-4">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-4">Who We Are</h2>
            <p className="mb-6 text-secondary font-medium text-[15px]">Reliable Diagnostics With A Patient-First Approach.</p>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              <strong className="text-foreground">World-Class Standards. Neighborhood Accessibility.</strong> Since 2015, Aarvak Has Been Gurgaon's "Neighborhood Lab With A Global Brain." We bridge the gap between high-precision diagnostics and the personalised care of a local clinic. Operating From <strong className="text-foreground">Sector 67 (JMD Suburbia - 2) And Badshahpur</strong>, We Don't Just Process Samples, We Provide The Clarity Families Need To Make Informed Health Decisions.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img src="/images/who-we-are.png" alt="Laboratory professionals working" className="w-full rounded-2xl object-cover" style={{ height: '380px' }} />
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-12 items-start">
          <div className="lg:w-1/2 pt-4">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground mb-4">What We Stand For</h2>
            <p className="mb-8 text-secondary font-medium text-[15px]">Quality, Care, And Consistency in Every Test.</p>
            <div className="space-y-6">
              {[
                { title: "Clinical Integrity", desc: "100% Accurate, NABL-Standard Results You And Your Doctor Can Bank On." },
                { title: "Painless Collection", desc: "Specialized Techniques For Kids And Seniors To Ensure Every Test Is Stress-Free." },
                { title: "Absolute Ethics", desc: "No Hidden Costs, No Unnecessary Tests, And No Corporate Sales Targets." },
                { title: "Global Standards", desc: "Bringing 30 Years Of International Healthcare Expertise To Your Local Community." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="font-bold text-foreground text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <img src="/images/what-we-stand-for.png" alt="Lab professional examining sample" className="w-full rounded-2xl object-cover" style={{ height: '420px' }} />
          </div>
        </div>
      </section>

      {/* The People Behind Aarvak */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground">The People Behind Aarvak</h2>
          <p className="mt-3 text-muted-foreground">Guided By Experience. Driven By Care.</p>
        </div>
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Ravinder */}
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-foreground">Ravinder Yadav</h3>
              <p className="text-sm text-muted-foreground mb-5">Director, Aarvak Diagnostics</p>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                Operational Excellence & Growth Leader Ravinder Is The Driving Force Behind Aarvak's Seamless 24/7 Operations. With A Deep Understanding Of The Healthcare Landscape And A Focus On Patient-Centric Growth, He Ensures That Our "Neighborhood Lab" Promise Is Met With World-Class Efficiency. Ravinder's Mission Is Simple: Making High-End Diagnostics Accessible, Ethical, And Stress-Free For Every Family In Gurgaon.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img src="/images/ravinder-11.jpeg" alt="Ravinder Yadav" className="w-full max-w-md rounded-2xl mx-auto object-cover" style={{ height: '350px' }} />
            </div>
          </div>
          {/* Raj */}
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-foreground">Raj Sehgal</h3>
              <p className="text-sm text-muted-foreground mb-5">Business Advisor, Aarvak Diagnostics</p>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                Alumnus, IIM Ahmedabad | Former VP, Dr. Lal PathLabs With over 30 years of experience across 25+ countries, Raj is a global heavyweight in the diagnostic industry. Having led international business for India's largest lab chains, he founded Aarvak to bring that same "big lab" clinical precision to a local, human level. For Raj, diagnostics isn't about volume—it's about the integrity of every single report.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img src="/images/raj-12.jpeg" alt="Raj Sehgal" className="w-full max-w-md rounded-2xl mx-auto object-cover" style={{ height: '350px' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
