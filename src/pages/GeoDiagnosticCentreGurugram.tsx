import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { MapPin, Phone, Clock, CheckCircle2, Star } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";

const GeoDiagnosticCentreGurugram = () => {
  useSEO({
    title: "Best Diagnostic Centre in Gurugram – Aarvak Diagnostics",
    description: "Aarvak Diagnostics is a trusted diagnostic centre in Gurugram offering pathology, radiology, health checkups & home sample collection in Sector 67.",
    canonical: "/diagnostic-centre-gurugram",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Aarvak Diagnostics – Diagnostic Centre in Gurugram",
      "url": "https://www.aarvakdiagnostics.com/diagnostic-centre-gurugram",
      "logo": "https://www.aarvakdiagnostics.com/images/aarvak-logo.webp",
      "image": "https://www.aarvakdiagnostics.com/images/arvkbg.png",
      "description": "Trusted diagnostic centre in Gurugram offering pathology, radiology, health checkups and home sample collection services.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop No.23, Ground Floor, Office No.S06, 5th Floor, Block-B, JMD Suburbio-2, Sector 67",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122018",
        "addressCountry": "IN"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 28.413, "longitude": 77.0432 },
      "telephone": "+91-92663-33711",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "07:00",
        "closes": "21:00"
      },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "200" },
      "sameAs": [
        "https://www.instagram.com/aarvakdiagnostics/",
        "https://www.facebook.com/AarvakDiagnostics"
      ]
    },
  });

  const faqs = [
    { q: "Where is Aarvak Diagnostics located in Gurugram?", a: "Aarvak Diagnostics is located in JMD Suburbio-2, Sector 67, Gurugram, Haryana. We are easily accessible from Sohna Road, Golf Course Extension Road, and nearby sectors." },
    { q: "What services does Aarvak Diagnostics offer in Gurugram?", a: "We offer comprehensive pathology tests, radiology and imaging services, preventive health checkup packages, and convenient home sample collection across Gurugram." },
    { q: "Does Aarvak Diagnostics offer home sample collection in Gurugram?", a: "Yes, we offer home sample collection across all areas of Gurugram including Sector 67, Sohna Road, Golf Course Road, DLF, and surrounding localities." },
    { q: "What are the operating hours of Aarvak Diagnostics Gurugram?", a: "We are open Monday to Saturday from 7:00 AM to 9:00 PM. You can also book home collection at your preferred time slot." },
    { q: "Is Aarvak Diagnostics in Gurugram NABL certified?", a: "We follow NABL protocols and standards, and our NABL certification application has been submitted (accreditation currently in progress). We use advanced automated equipment to ensure accurate and reliable diagnostic reports." },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
        <img src="/images/arvkbg.png" alt="Diagnostic Centre in Gurugram" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Best Diagnostic Centre in Gurugram</h1>
            <p className="text-lg md:text-xl opacity-90">Trusted by 50,000+ patients for accurate pathology, radiology & health checkup services</p>
            <Link to="/packages" className="inline-block mt-6 bg-aarvak-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-aarvak-blue-hover transition">
              Book a Test Now
            </Link>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
            <MapPin className="w-8 h-8 text-cyan-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900">Our Location</h3>
              <p className="text-gray-600 text-sm mt-1">JMD Suburbio-2, Sector 67, Gurugram, Haryana 122018</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
            <Phone className="w-8 h-8 text-cyan-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900">Contact Us</h3>
              <p className="text-gray-600 text-sm mt-1">+91 92663 33711</p>
              <p className="text-gray-600 text-sm">+91 9810063340</p>
              <p className="text-gray-600 text-sm">marketing@aarvakdiagnostics.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
            <Clock className="w-8 h-8 text-cyan-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900">Operating Hours</h3>
              <p className="text-gray-600 text-sm mt-1">Mon–Sat: 7:00 AM – 9:00 PM</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Why Choose Aarvak Diagnostics in Gurugram?</h2>
        <div className="prose prose-gray max-w-none mb-12">
          <p className="text-gray-700 leading-relaxed">
            Aarvak Diagnostics is one of the most trusted diagnostic centres in Gurugram, serving patients across Sector 67, Sohna Road, Golf Course Extension Road, DLF Phase 1-5, and surrounding areas. With over 10 years of experience in diagnostic healthcare, we combine advanced laboratory technology with a patient-first approach.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Whether you need a routine <Link to="/pathology" className="text-cyan-700 underline">blood test</Link>, advanced <Link to="/radiology" className="text-cyan-700 underline">imaging services</Link>, or a comprehensive <Link to="/health-checkups" className="text-cyan-700 underline">health checkup package</Link>, we deliver accurate results with quick turnaround times. Our home sample collection service makes diagnostic testing accessible across all of Gurugram.
          </p>
        </div>

        {/* Services Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Diagnostic Services in Gurugram</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { title: "Pathology & Lab Tests", desc: "Complete blood count, lipid profile, thyroid panel, liver & kidney function tests, and more.", link: "/pathology" },
            { title: "Radiology & Imaging", desc: "Digital X-Ray (Hip Joint, Knee Joint, Ankle Joint & Chest), PFT and ECG with expert interpretation.", link: "/radiology" },
            { title: "Health Checkup Packages", desc: "Preventive screening packages from ₹599 to ₹2,999 for individuals and families.", link: "/health-checkups" },
            { title: "Home Sample Collection", desc: "Professional phlebotomists visit your home across Gurugram for convenient testing.", link: "/contact-us#contact" },
            { title: "Corporate Health Programs", desc: "Customised wellness programs for companies across Gurugram and NCR region.", link: "/corporate" },
            { title: "Specialist Consultations", desc: "Post-report doctor consultations to help you understand your results and next steps.", link: "/contact-us#contact" },
          ].map((s) => (
            <Link to={s.link} key={s.title} className="p-6 border border-gray-200 rounded-2xl hover:border-cyan-400 hover:shadow-md transition group">
              <CheckCircle2 className="w-6 h-6 text-cyan-600 mb-3" />
              <h3 className="font-bold text-gray-900 group-hover:text-cyan-700 transition">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
            </Link>
          ))}
        </div>

        {/* Local Hubs */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Gurugram Diagnostic Hubs</h2>
        <p className="text-gray-600 mb-6 text-sm">Two dedicated hub pages cover our full Gurugram service area. Pick the one nearest to you.</p>
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          <Link to="/diagnostic-centre-gurugram/sector-67" className="p-6 border border-gray-200 rounded-2xl hover:border-cyan-400 hover:shadow-md transition group">
            <h3 className="font-bold text-gray-900 group-hover:text-cyan-700 transition">Sector 67 Hub</h3>
            <p className="text-sm text-gray-600 mt-1.5">Our flagship lab at JMD Suburbio-2. Covers the Golf Course Extension Road corridor and neighbouring sectors.</p>
          </Link>
          <Link to="/diagnostic-centre-gurugram/sohna-road" className="p-6 border border-gray-200 rounded-2xl hover:border-cyan-400 hover:shadow-md transition group">
            <h3 className="font-bold text-gray-900 group-hover:text-cyan-700 transition">Sohna Road Hub</h3>
            <p className="text-sm text-gray-600 mt-1.5">Serves the Sohna Road belt including Nirvana Country, Malibu Town and South City 2.</p>
          </Link>
        </div>

        {/* Reviews */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            <span className="text-2xl font-bold text-gray-900">4.8/5</span>
            <span className="text-gray-500 text-sm">based on 200+ reviews</span>
          </div>
          <p className="text-gray-700">Trusted by thousands of families, corporate clients, and healthcare professionals across Gurugram for accurate and reliable diagnostic services.</p>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Book Your Diagnostic Test in Gurugram Today</h2>
          <p className="text-cyan-100 mb-6 max-w-2xl mx-auto">Get accurate reports, quick turnaround, and the convenience of home sample collection across Gurugram.</p>
          <Link to="/packages" className="inline-block bg-white text-cyan-700 px-8 py-3 rounded-full font-semibold hover:bg-cyan-50 transition">
            Book Now
          </Link>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default GeoDiagnosticCentreGurugram;
