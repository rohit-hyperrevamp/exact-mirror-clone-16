import { Link } from "react-router-dom";
import { CheckCircle, Zap, Wind } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";

const taglineItems = [
  { bold: "Modern", sub: "Imaging Equipment" },
  { bold: "Experienced", sub: "Radiology Team" },
  { bold: "Safe &", sub: "Comfortable Procedure" },
];

const whyChoose = [
  "State-of-the-art imaging equipment",
  "Experienced radiologists and technicians",
  "Fast turnaround time for results",
  "Comprehensive network of partner facilities",
];

const services = [
  {
    icon: Zap,
    title: "X-Ray",
    desc: "Digital radiography for bone fractures, chest exams, and more.",
  },
  {
    icon: Wind,
    title: "PFT",
    desc: "Assessment of lung health and breathing function",
  },
];

const Radiology = () => {
  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden px-2 md:px-3">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: '420px' }}>
          <img
            src="/images/menu-2.png"
            alt="Radiology"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="flex items-center gap-6">
              <div className="text-right text-white">
                <p className="text-sm uppercase tracking-[0.25em] mb-1 font-medium">About</p>
                <h1 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: "Georgia, serif" }}>Our Radiology</h1>
              </div>
              <div className="w-px bg-white/40" style={{ height: '100px' }} />
              <div className="text-white">
                <h2 className="text-2xl md:text-[32px] font-bold leading-tight">Trusted Medical Imaging</h2>
                <p className="mt-3 text-[15px] opacity-80 max-w-md">State-of-the-art imaging technology and expert interpretation to support your healthcare needs.</p>
                <Link
                  to="/contact-us#contact"
                  className="inline-block mt-5 text-white font-semibold px-7 py-3 rounded-full text-sm bg-secondary hover:bg-secondary/90 transition"
                >
                  Book Imaging Test
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

      {/* Advanced Radiology & Diagnostic Imaging */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-5/12">
            <img
              src="/images/diagnostic.png"
              alt="Radiology Imaging"
              className="w-full rounded-2xl object-cover"
              style={{ height: '450px' }}
            />
          </div>
          <div className="lg:w-7/12 pt-4">
            <h2 className="text-3xl md:text-[38px] font-bold text-foreground leading-tight mb-6">
              Advanced Radiology &<br />Diagnostic Imaging
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
              We offer a variety of diagnostic radiography services, including X-rays, mammography, and fluoroscopy, among others.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-8">
              We also provide allied diagnostic services like TMT, ECHO, Ultrasound etc. through our channel partners.
            </p>

            <h3 className="text-xl font-bold text-foreground mb-5">Why Choose Our Radiology Services</h3>
            <ul className="space-y-3">
              {whyChoose.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[15px] text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Our Radiology Services */}
      <section className="py-20 px-4 md:px-8 bg-muted">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-[38px] font-bold text-foreground">Our Radiology Services</h2>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-background rounded-2xl p-8 text-center shadow-sm">
              <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-5" style={{ backgroundColor: 'hsl(145, 60%, 90%)' }}>
                <service.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default Radiology;
