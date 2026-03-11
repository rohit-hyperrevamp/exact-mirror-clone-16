import { Link } from "react-router-dom";
import { FlaskConical, Microscope, Droplets, FileText, ShieldCheck, Dna, Home, UserCheck, Clock } from "lucide-react";

const labServices = [
  { icon: FlaskConical, label: "Biochemistry Tests" },
  { icon: Microscope, label: "Microbiology" },
  { icon: Droplets, label: "Hematology" },
  { icon: FileText, label: "Histopathology" },
  { icon: ShieldCheck, label: "Immunology Tests" },
  { icon: Dna, label: "Molecular Diagnostics" },
];

const homeCollectionItems = [
  {
    icon: Home,
    title: "Convenience",
    desc: "We offer convenient home collection services for our customers who are unable to visit our lab.",
  },
  {
    icon: UserCheck,
    title: "Professionalism",
    desc: "Our trained phlebotomists ensure samples are collected properly and transported securely.",
  },
  {
    icon: Clock,
    title: "Fast Results",
    desc: "Get your test results delivered electronically or physically as per your preference.",
  },
];

const Pathology = () => {
  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: '420px' }}>
          <img
            src="/images/pathology-banner.png"
            alt="Pathology"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="flex items-center gap-6">
              <div className="text-right text-white">
                <p className="text-sm uppercase tracking-[0.25em] mb-1 font-medium">About</p>
                <h1 className="text-4xl md:text-6xl font-bold italic" style={{ fontFamily: "Georgia, serif" }}>Our Pathology</h1>
              </div>
              <div className="w-px bg-white/40" style={{ height: '100px' }} />
              <div className="text-white">
                <h2 className="text-2xl md:text-[32px] font-bold leading-tight">Precise Pathology Care</h2>
                <p className="mt-3 text-[15px] opacity-80 max-w-md">Backed by modern technology and expert pathologists to ensure accurate test results you can trust.</p>
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

      {/* Tagline overlay */}
      <section className="relative z-20">
        <div className="bg-background rounded-tr-[40px] -mt-16 relative pt-10 pb-8 px-6 md:px-12" style={{ maxWidth: '52%' }}>
          <h2 className="text-xl md:text-[26px] font-bold leading-snug text-secondary">
            Accurate Testing. Reliable Results.
          </h2>
          <p className="text-sm text-muted-foreground mt-2 font-medium">Precise lab analysis for confident medical decisions.</p>
        </div>
      </section>

      {/* Advanced Pathology & Diagnostic Services */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-5/12">
            <img src="/images/diagnostics-service.png" alt="Advanced Pathology Services" className="w-full rounded-2xl object-cover" style={{ height: '450px' }} />
          </div>
          <div className="lg:w-7/12 pt-4">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">
              Advanced Pathology &<br />Diagnostic Services
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              Our pathology lab offers a wide range of diagnostic services to help healthcare providers accurately diagnose and treat various medical conditions.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-8">
              Our team of experienced pathologists and technicians utilize the latest technology and techniques to deliver timely and accurate results.
            </p>

            <h3 className="text-xl font-bold text-foreground mb-5">Our Laboratory Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {labServices.map((service) => (
                <div
                  key={service.label}
                  className="flex items-center gap-3 rounded-xl border border-border p-4 hover:shadow-md transition"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'hsl(145, 60%, 90%)' }}>
                    <service.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{service.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Home Collection Service */}
      <section className="py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground">Home Collection Service</h2>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {homeCollectionItems.map((item) => (
            <div key={item.title} className="bg-background rounded-2xl p-8 text-center shadow-sm">
              <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-5" style={{ backgroundColor: 'hsl(145, 60%, 90%)' }}>
                <item.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative w-full overflow-hidden" style={{ height: '420px' }}>
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/healthcta.png"
          alt="Health Tips Background"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div
            style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '20px',
              padding: '48px 52px',
              maxWidth: '480px',
              width: '100%',
            }}
          >
            <h2 className="text-white font-bold italic" style={{ fontSize: '28px', marginBottom: '36px', fontFamily: 'Georgia, serif' }}>
              Health Tips, Straight to Your Inbox
            </h2>
            <div className="flex items-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: '8px' }}>
              <input
                type="email"
                placeholder="Your Email"
                className="bg-transparent flex-1 outline-none text-white placeholder:text-white/60 text-sm"
              />
              <button className="text-white font-light" style={{ fontSize: '28px', lineHeight: 1 }}>›</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pathology;
