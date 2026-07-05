import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import useSEO from "@/hooks/useSEO";

const AboutUs = () => {
  useSEO({
    title: "About Aarvak Diagnostics – Our Mission & Team",
    description: "Learn about Aarvak Diagnostics, our mission to deliver accurate diagnostics, and the experienced leadership team behind trusted healthcare in India.",
    canonical: "/about-us",
  });
  return (
    <div className="bg-background">
      {/* Hero Banner - full width with rounded corners and side padding */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden min-h-[420px] md:h-[420px]">
          <img
            src="/images/about-banner.png"
            alt="About Aarvak"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex items-center justify-center min-h-[420px] md:h-full px-4 py-10 md:py-0">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full max-w-4xl">
              <div className="text-center md:text-right text-white">
                <p className="text-xs md:text-sm uppercase tracking-[0.25em] mb-2 font-medium">ABOUT</p>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: "Georgia, serif" }}>About Aarvak Diagnostics</h1>
                <p className="text-sm md:text-base opacity-80 mt-1">Our Mission and Team</p>
              </div>
              <div className="hidden md:block w-px bg-white/40" style={{ height: '100px' }} />
              <div className="text-center md:text-left text-white">
                <h2 className="text-xl md:text-[32px] font-bold leading-tight">Built on Trust.<br />Driven by Accuracy.</h2>
                <p className="mt-3 text-sm md:text-[15px] opacity-80 max-w-md">Making quality diagnostic care accessible, reliable, and patient-first.</p>
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
        <div className="bg-background rounded-tr-[40px] -mt-10 md:-mt-16 relative pt-8 md:pt-10 pb-6 md:pb-8 px-6 md:px-12 w-full md:max-w-[52%]">
          <h2 className="text-lg md:text-[26px] font-bold leading-snug text-secondary">
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
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Ravinder */}
          <div className="rounded-2xl overflow-hidden flex flex-col lg:flex-row" style={{ background: 'linear-gradient(135deg, hsl(204, 100%, 16%), hsl(201, 97%, 36%))' }}>
            <div className="lg:w-3/5 p-8 md:p-12 text-white flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold">Ravinder Yadav</h3>
              <p className="text-sm font-semibold mt-1 opacity-90">Director, Aarvak Diagnostics</p>
              <a href="#" className="mt-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 transition">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <p className="mt-6 text-white/80 leading-relaxed text-[15px]">
                <strong className="text-white">Operational Excellence & Growth Leader</strong> Ravinder Is The Driving Force Behind Aarvak's Seamless 24/7 Operations. With A Deep Understanding Of The Healthcare Landscape And A Focus On Patient-Centric Growth, He Ensures That Our "Neighborhood Lab" Promise Is Met With World-Class Efficiency. Ravinder's Mission Is Simple: Making High-End Diagnostics Accessible, Ethical, And Stress-Free For Every Family In Gurgaon.
              </p>
            </div>
            <div className="lg:w-2/5 flex items-end justify-end p-6">
              <img src="/images/ravinder-11.jpeg" alt="Ravinder Yadav" className="rounded-xl object-cover bg-white" style={{ width: '320px', height: '360px' }} />
            </div>
          </div>

          {/* Raj */}
          <div className="rounded-2xl overflow-hidden flex flex-col lg:flex-row-reverse" style={{ background: 'linear-gradient(135deg, hsl(204, 100%, 16%), hsl(201, 97%, 36%))' }}>
            <div className="lg:w-3/5 p-8 md:p-12 text-white flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold">Raj Sehgal</h3>
              <p className="text-sm font-semibold mt-1 opacity-90">Business Advisor, Aarvak Diagnostics</p>
              <a href="#" className="mt-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 transition">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <p className="mt-6 text-white/80 leading-relaxed text-[15px]">
                <strong className="text-white">Alumnus, IIM Ahmedabad | Former VP, Dr. Lal PathLabs</strong> With over 30 years of experience across 25+ countries, Raj is a global heavyweight in the diagnostic industry. Having led international business for India's largest lab chains, he founded Aarvak to bring that same "big lab" clinical precision to a local, human level. For Raj, diagnostics isn't about volume—it's about the integrity of every single report.
              </p>
            </div>
            <div className="lg:w-2/5 flex items-end justify-start p-6">
              <img src="/images/raj-12.jpeg" alt="Raj Sehgal" className="rounded-xl object-cover bg-white" style={{ width: '320px', height: '360px' }} />
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default AboutUs;
