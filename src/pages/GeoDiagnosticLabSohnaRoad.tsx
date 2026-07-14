import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { MapPin, Phone, Clock, CheckCircle2, Star, Navigation } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";

const GeoDiagnosticLabSohnaRoad = () => {
  useSEO({
    title: "Diagnostic Lab Near Sohna Road Gurugram – Aarvak",
    description: "Looking for a diagnostic lab near Sohna Road? Aarvak Diagnostics offers pathology, radiology & home sample collection near Sohna Road, Gurugram.",
    canonical: "/diagnostic-lab-sohna-road-gurugram",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Aarvak Diagnostics – Near Sohna Road, Gurugram",
      "url": "https://www.aarvakdiagnostics.com/diagnostic-lab-sohna-road-gurugram",
      "logo": "https://www.aarvakdiagnostics.com/images/aarvak-logo.webp",
      "description": "Diagnostic lab near Sohna Road, Gurugram offering blood tests, health checkups, imaging, and home sample collection.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop No.23, Ground Floor, Office No.S06, 5th Floor, Block-B, JMD Suburbio-2, Sector 67, Near Sohna Road",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122018",
        "addressCountry": "IN"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 28.413, "longitude": 77.0432 },
      "telephone": "+91-92663-33711",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "200" },
      "sameAs": [
        "https://www.instagram.com/aarvakdiagnostics/",
        "https://www.facebook.com/AarvakDiagnostics"
      ]
    },
  });

  const faqs = [
    { q: "Where is the nearest diagnostic lab to Sohna Road in Gurugram?", a: "Aarvak Diagnostics is located in JMD Suburbio-2, Sector 67, just minutes from Sohna Road. We serve patients from Sohna Road, Sector 48-68, Nirvana Country, and surrounding areas." },
    { q: "Can I get home sample collection near Sohna Road?", a: "Yes, we provide home sample collection across all Sohna Road localities. Our trained phlebotomist visits your home at your chosen time for convenient blood sample collection." },
    { q: "What tests are available at Aarvak Diagnostics near Sohna Road?", a: "We offer a full range of pathology tests (CBC, thyroid, lipid profile, liver & kidney function), radiology services (X-ray, ultrasound, ECG), and preventive health checkup packages." },
    { q: "How quickly can I get my test reports?", a: "Most routine blood test reports are delivered within 6-12 hours via WhatsApp and email. Specialised tests may take 24-48 hours." },
    { q: "Do you offer health checkup packages near Sohna Road?", a: "Yes, we offer multiple health checkup packages starting from ₹599, covering essential blood tests, organ function panels, and comprehensive wellness screenings." },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
        <img src="/images/arvkbg.png" alt="Diagnostic Lab Near Sohna Road Gurugram" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
          <div className="text-white max-w-3xl">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Navigation className="w-5 h-5" />
              <span className="text-sm opacity-90">Near Sohna Road, Gurugram</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Diagnostic Lab Near Sohna Road</h1>
            <p className="text-lg md:text-xl opacity-90">Accurate pathology, radiology & home sample collection — just minutes from Sohna Road</p>
            <Link to="/contact-us#contact" className="inline-block mt-6 bg-aarvak-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-aarvak-blue-hover transition">
              Book Your Test
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
            <MapPin className="w-8 h-8 text-cyan-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900">Location</h3>
              <p className="text-gray-600 text-sm mt-1">JMD Suburbio-2, Sector 67, Near Sohna Road, Gurugram</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
            <Phone className="w-8 h-8 text-cyan-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900">Call / WhatsApp</h3>
              <p className="text-gray-600 text-sm mt-1">+91 92663 33711</p>
              <p className="text-gray-600 text-sm">+91 9810063340</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
            <Clock className="w-8 h-8 text-cyan-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900">Timings</h3>
              <p className="text-gray-600 text-sm mt-1">Mon–Sat: 7:00 AM – 9:00 PM</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Trusted Diagnostic Lab Near Sohna Road, Gurugram</h2>
        <div className="prose prose-gray max-w-none mb-12">
          <p className="text-gray-700 leading-relaxed">
            If you're looking for a reliable diagnostic lab near Sohna Road in Gurugram, Aarvak Diagnostics is your nearest trusted option. Located in Sector 67, we serve patients from Sohna Road, South City, Nirvana Country, Malibu Town, and all nearby residential and commercial areas.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Our centre offers a complete range of <Link to="/pathology" className="text-cyan-700 underline">pathology services</Link> including blood tests, urine analysis, and specialised panels. We also provide <Link to="/radiology" className="text-cyan-700 underline">radiology and imaging</Link> services including digital X-rays, ultrasound, and ECG.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            For those who prefer testing from home, our <Link to="/insights/home-sample-collection-benefits-safety-how-it-works" className="text-cyan-700 underline">home sample collection</Link> service covers all Sohna Road localities with trained phlebotomists and temperature-controlled transport.
          </p>
        </div>

        {/* Popular Tests */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Tests Booked Near Sohna Road</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {["Complete Blood Count", "Thyroid Profile", "Lipid Profile", "HbA1c", "Liver Function Test", "Kidney Function Test", "Vitamin D & B12", "Full Body Checkup"].map((test) => (
            <div key={test} className="flex items-center gap-2 p-4 bg-cyan-50 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0" />
              <span className="text-sm text-gray-800 font-medium">{test}</span>
            </div>
          ))}
        </div>

        {/* Nearby Areas */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Areas We Cover Near Sohna Road</h2>
        <div className="flex flex-wrap gap-3 mb-16">
          {["Sohna Road", "Sector 47", "Sector 48", "Sector 49", "Sector 56", "Sector 67", "Sector 68", "South City 1", "South City 2", "Nirvana Country", "Malibu Town", "Central Park", "Orchid Island", "Bestech Park View"].map((area) => (
            <span key={area} className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-full">{area}</span>
          ))}
        </div>

        {/* Reviews */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            <span className="text-2xl font-bold text-gray-900">4.8/5</span>
            <span className="text-gray-500 text-sm">rated by patients near Sohna Road</span>
          </div>
          <p className="text-gray-700">Families and professionals across Sohna Road trust Aarvak Diagnostics for fast, accurate, and affordable diagnostic services.</p>
        </div>

        {/* FAQs */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-16">
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Tested Near Sohna Road Today</h2>
          <p className="text-cyan-100 mb-6">Walk in or book home collection. Reports delivered digitally within hours.</p>
          <Link to="/contact-us#contact" className="inline-block bg-white text-cyan-700 px-8 py-3 rounded-full font-semibold hover:bg-cyan-50 transition">
            Book Now
          </Link>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default GeoDiagnosticLabSohnaRoad;
