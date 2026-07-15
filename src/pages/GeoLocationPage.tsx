import { useParams, Link, Navigate } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { MapPin, Phone, Clock, CheckCircle2, Star, Home, FlaskConical, ScanLine, Heart } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import { geoLocations, geoRedirectMap, geoLegacySlugs, type GeoLocation } from "@/data/geoLocations";
import NotFound from "@/pages/NotFound";

const buildFaqs = (loc: GeoLocation) => [
  {
    q: `Where is the nearest diagnostic centre to ${loc.name}?`,
    a: `Aarvak Diagnostics is the nearest diagnostic centre to ${loc.name} following NABL protocols (certification application in progress), located at JMD Suburbio-2, Sector 67, Gurugram — ${loc.distance}. We serve all of ${loc.name} with both walk-in testing and free home sample collection.`,
  },
  {
    q: `Do you offer home sample collection in ${loc.name}?`,
    a: `Yes. We offer free home sample collection across ${loc.name} and surrounding areas including ${loc.nearby.slice(0, 2).join(" and ")}. Book online or call +91-92663-33711 to schedule a slot.`,
  },
  {
    q: `What diagnostic tests are available for residents of ${loc.name}?`,
    a: `Residents of ${loc.name} can access our full menu — pathology (CBC, lipid, thyroid, HbA1c, vitamin D, B12), radiology (digital X-ray, PFT), and preventive health checkup packages starting from ₹599.`,
  },
  {
    q: `How quickly will I get my reports in ${loc.name}?`,
    a: `Most routine pathology reports are delivered within the same day. Specialised tests take 24-48 hours. Reports are sent digitally via WhatsApp and email to ${loc.name} patients.`,
  },
  {
    q: `Is Aarvak Diagnostics trusted by ${loc.name} families?`,
    a: `Yes — Aarvak Diagnostics has been serving Gurugram for over a decade with a 4.8/5 rating from 200+ patients, including many families across ${loc.name}.`,
  },
];

const GeoLocationPage = () => {
  const { slug } = useParams<{ slug: string }>();

  // Redirect merged-away areas to their hub, or to the index if there's no hub match.
  if (slug && geoRedirectMap[slug]) {
    return <Navigate to={`/diagnostic-centre-gurugram/${geoRedirectMap[slug]}`} replace />;
  }

  const loc = geoLocations.find((l) => l.slug === slug);

  // Unknown slug → real 404 page, not a hub fallback.
  if (!loc) return <NotFound />;

  const title = `Diagnostic Centre in ${loc.name}, Gurugram | Aarvak Diagnostics`;
  const description = `Aarvak Diagnostics is a trusted diagnostic centre near ${loc.name}, Gurugram offering pathology, radiology, health checkups & free home sample collection. Book online or call +91-92663-33711.`;
  const canonical = `/diagnostic-centre-gurugram/${loc.slug}`;

  useSEO({
    title,
    description,
    canonical,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: `Aarvak Diagnostics – Diagnostic Centre near ${loc.name}, Gurugram`,
      url: `https://www.aarvakdiagnostics.com${canonical}`,
      logo: "https://www.aarvakdiagnostics.com/images/aarvak-logo.webp",
      image: "https://www.aarvakdiagnostics.com/images/arvkbg.png",
      description,
      areaServed: { "@type": "Place", name: `${loc.name}, Gurugram` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shop No.23, Ground Floor, Office No.S06, 5th Floor, Block-B, JMD Suburbio-2, Sector 67",
        addressLocality: "Gurugram",
        addressRegion: "Haryana",
        postalCode: "122018",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: 28.413, longitude: 77.0432 },
      telephone: "+91-92663-33711",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "21:00",
      },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "200" },
      mainEntity: {
        "@type": "FAQPage",
        mainEntity: buildFaqs(loc).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    },
  });

  const faqs = buildFaqs(loc);

  const services = [
    { title: "Pathology & Blood Tests", desc: `Full pathology menu for ${loc.shortName} — CBC, lipid, thyroid, HbA1c, vitamin & hormone panels.`, link: "/departments/pathology", icon: FlaskConical },
    { title: "Radiology & Imaging", desc: `Digital X-Ray and PFT testing for ${loc.shortName} residents at our Sector 67 lab.`, link: "/departments/radiology", icon: ScanLine },
    { title: "Health Checkup Packages", desc: `Preventive packages from ₹599 designed for working professionals and families in ${loc.shortName}.`, link: "/departments/health-checkups", icon: Heart },
    { title: "Free Home Sample Collection", desc: `Phlebotomists visit your home in ${loc.shortName} at your preferred time slot.`, link: "/contact-us#contact", icon: Home },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
        <img src="/images/arvkbg.png" alt={`Diagnostic Centre in ${loc.name}, Gurugram`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
          <div className="text-white max-w-3xl">
            <p className="text-sm uppercase tracking-widest opacity-80 mb-2">{loc.type === "sector" ? "Gurugram Sector" : "Gurugram"}</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Diagnostic Centre in {loc.name}, Gurugram</h1>
            <p className="text-base md:text-lg opacity-90 mb-6">Pathology, radiology & free home sample collection serving {loc.name}. NABL protocols followed (certification in progress).</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact-us#contact" className="bg-aarvak-blue text-white px-7 py-3 rounded-full font-semibold hover:bg-aarvak-blue-hover transition">Book a Test Now</Link>
              <a href="tel:+919266333711" className="bg-white text-gray-900 px-7 py-3 rounded-full font-semibold hover:bg-gray-100 transition">Call +91-92663 33711</a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-14 px-4">
        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
            <MapPin className="w-7 h-7 text-cyan-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900">Distance from {loc.shortName}</h3>
              <p className="text-gray-600 text-sm mt-1">{loc.distance}. Our lab is at JMD Suburbio-2, Sector 67, Gurugram 122018.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
            <Phone className="w-7 h-7 text-cyan-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900">Book from {loc.shortName}</h3>
              <p className="text-gray-600 text-sm mt-1">+91 92663 33711</p>
              <p className="text-gray-600 text-sm">+91 9810063340</p>
              <p className="text-gray-600 text-sm">marketing@aarvakdiagnostics.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
            <Clock className="w-7 h-7 text-cyan-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900">Hours</h3>
              <p className="text-gray-600 text-sm mt-1">Mon–Sat: 7:00 AM – 9:00 PM</p>
              <p className="text-gray-600 text-sm">Home collection: 6:30 AM – 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Intro */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">Trusted Diagnostic Lab for {loc.name} Residents</h2>
        <div className="prose prose-gray max-w-none mb-12">
          <p className="text-gray-700 leading-relaxed">{loc.blurb}</p>
          <p className="text-gray-700 leading-relaxed mt-4">
            We offer a complete diagnostic menu — routine{" "}
            <Link to="/departments/pathology" className="text-cyan-700 underline">pathology and blood tests</Link>, advanced{" "}
            <Link to="/departments/radiology" className="text-cyan-700 underline">radiology and imaging</Link>, and curated{" "}
            <Link to="/departments/health-checkups" className="text-cyan-700 underline">full body health checkup packages in Gurugram</Link>{" "}
            — following NABL protocols with same-day reports and digital delivery via WhatsApp and email.
          </p>
        </div>

        {/* Services */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Diagnostic Services Available for {loc.shortName}</h2>
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {services.map((s) => (
            <Link to={s.link} key={s.title} className="p-6 border border-gray-200 rounded-2xl hover:border-cyan-400 hover:shadow-md transition group flex gap-4">
              <s.icon className="w-8 h-8 text-cyan-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-cyan-700 transition">{s.title}</h3>
                <p className="text-sm text-gray-600 mt-1.5">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Covered areas served by this hub */}
        {loc.coveredAreas && loc.coveredAreas.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Areas Covered by Our {loc.shortName} Hub</h2>
            <p className="text-gray-600 mb-6 text-sm">Neighbourhoods and sectors served directly from this location with free home sample collection.</p>
            <div className="grid md:grid-cols-2 gap-4 mb-14">
              {loc.coveredAreas.map((area) => (
                <div key={area.slug} className="p-5 border border-gray-200 rounded-xl bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{area.name}</h3>
                    {area.pin && <span className="text-xs text-gray-500">PIN {area.pin}</span>}
                  </div>
                  <p className="text-xs text-cyan-700 mb-2">{area.distance}</p>
                  <p className="text-sm text-gray-700 mb-2">{area.blurb}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {area.nearby.map((n) => (
                      <span key={n} className="text-[11px] bg-white text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">{n}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Why Aarvak */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why {loc.shortName} Chooses Aarvak Diagnostics</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-14">
          {[
            `NABL protocols followed (certification in progress) with automated equipment for accurate results across ${loc.shortName}`,
            `Free home sample collection across ${loc.name} and nearby areas`,
            "Same-day reports for routine pathology; digital delivery on WhatsApp & email",
            "10+ years serving Gurugram with 4.8/5 patient rating from 200+ reviews",
            "Affordable health checkup packages from ₹599 onwards",
            "Doctor consultation available post-report at no extra cost",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>

        {/* Nearby landmarks */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Nearby Landmarks & Sub-Areas of {loc.name}</h2>
        <div className="flex flex-wrap gap-3 mb-14">
          {loc.nearby.map((area) => (
            <span key={area} className="text-sm bg-cyan-50 text-cyan-700 px-4 py-2 rounded-full border border-cyan-200">{area}</span>
          ))}
          {loc.pin && (
            <span className="text-sm bg-yellow-50 text-yellow-800 px-4 py-2 rounded-full border border-yellow-200">PIN {loc.pin}</span>
          )}
        </div>

        {/* Rating */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-14">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            <span className="text-2xl font-bold text-gray-900">4.8/5</span>
            <span className="text-gray-500 text-sm">from 200+ patient reviews</span>
          </div>
          <p className="text-gray-700 text-sm">Trusted by families, corporate clients, and healthcare professionals across {loc.name} and Gurugram for accurate, reliable diagnostic services.</p>
        </div>

        {/* FAQs */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQs – Diagnostic Services in {loc.name}</h2>
        <div className="space-y-3 mb-14">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
              <summary className="cursor-pointer p-5 font-semibold text-gray-900 hover:bg-gray-50 transition list-none flex justify-between items-center">
                {faq.q}
                <span className="text-cyan-600 group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Book Your Test from {loc.name} Today</h2>
          <p className="text-cyan-100 mb-6 max-w-2xl mx-auto">Accurate reports, quick turnaround, and free home sample collection across {loc.name} and Gurugram.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact-us#contact" className="bg-white text-cyan-700 px-8 py-3 rounded-full font-semibold hover:bg-cyan-50 transition">Book Now</Link>
            <a href="tel:+919266333711" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition">Call +91-92663 33711</a>
          </div>
        </div>

        {/* Other hubs */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Explore Our Other Gurugram Hub</h2>
          <div className="flex flex-wrap gap-2">
            {geoLocations.filter((l) => l.slug !== loc.slug).map((l) => (
              <Link key={l.slug} to={`/diagnostic-centre-gurugram/${l.slug}`} className="text-sm bg-gray-100 text-gray-700 hover:bg-cyan-100 hover:text-cyan-800 px-4 py-2 rounded-full transition">
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default GeoLocationPage;
