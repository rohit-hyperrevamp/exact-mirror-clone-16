import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";

const Corporate = () => {
  return (
    <div className="bg-background">
      <PageHero
        label="Corporate"
        title="HEALTH SERVICES"
        heading="Corporate Wellness"
        description="Tailored employee health checks, pre-employment screening, and onsite diagnostics for a healthier workforce."
        ctaText="Get a Corporate Plan"
        ctaLink="/contact-us#contact"
      />

      {/* Stats Banner */}
      <section className="bg-background py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex flex-wrap justify-start gap-8">
            {[
              { title: "Tailored", sub: "For All Ages" },
              { title: "Expert", sub: "Medical Team" },
              { title: "Quick &", sub: "Easy Booking" },
            ].map((item, i) => (
              <div key={item.title} className="flex items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-aarvak-blue">{item.title}</h3>
                  <p className="text-sm text-aarvak-gray-600">{item.sub}</p>
                </div>
                {i < 2 && <div className="w-px h-10 bg-border ml-4" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Health Solutions */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="/images/ServiceslLeft.png"
                alt="Corporate Wellness"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-aarvak-gray-900 mb-4">
                Corporate Health Solutions: Because Your People are Your Greatest Asset
              </h2>
              <p className="text-aarvak-gray-600 leading-relaxed mb-4">
                In the high-stakes world of business, <strong>staying ahead of the curve</strong> isn't just about strategy, it's about the well-being of your workforce. At <strong>Aarvak Diagnostic Centre</strong>, we don't just run tests; we serve as your dedicated <strong>Partner in Health</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="bg-aarvak-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-aarvak-gray-900 mb-6">
            Why Partner with Aarvak?
          </h2>
          <p className="text-aarvak-gray-600 mb-6">
            We know that in corporate life, <strong>time is of the essence</strong>. We've stripped away the complexity to provide an unparalleled diagnostic experience.
          </p>
          <ul className="space-y-4 text-aarvak-gray-600">
            <li><strong>Total Quality Management:</strong> Our success is built on a cornerstone of efficiency and total quality management.</li>
            <li><strong>Zero Manual Errors:</strong> All our systems are barcoded and interfaced from sample collection to the final report.</li>
            <li><strong>Maximum Value:</strong> We offer a specialized <strong>25% Corporate Discount</strong> on all lab tests.</li>
            <li><strong>Expert Oversight:</strong> Specialized doctors focus solely on delivering precise diagnoses.</li>
          </ul>
          <div className="mt-8">
            <img
              src="/images/cop-first.jpeg"
              alt="Corporate Wellness & Screening"
              className="rounded-2xl shadow-lg w-full max-w-2xl"
            />
          </div>
        </div>
      </section>

      {/* Service Portfolio */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-aarvak-gray-900 mb-4">
                Our Corporate Service Portfolio
              </h2>
              <p className="text-aarvak-gray-600 mb-6 leading-relaxed">
                Our laboratory provides a comprehensive range of routine and specialized diagnostics, offering a seamless and cost-effective solution for all.
              </p>
              <ul className="space-y-2 text-aarvak-gray-600 text-sm">
                {[
                  "Diagnostic Services",
                  "On-Site Corporate Health Check-ups",
                  "Complete Family Care",
                  "Special Health Packages",
                  "Pre-Employment & Annual Health Check-Ups",
                  "Health Screening Programs",
                  "Lab Investigations • Consultation • X-Ray • PFT • ECG",
                  "Audiometry • Medical Certificates",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-aarvak-blue flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-aarvak-blue text-primary-foreground inline-block px-6 py-3 rounded-full font-semibold text-sm">
                Up to 25% Corporate Discount on All Lab Tests
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src="/images/cop-sec.jpeg"
                alt="Corporate Services"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Behind Truth */}
      <section className="bg-aarvak-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-aarvak-gray-900 mb-6">
            The Tech Behind the Truth
          </h2>
          <p className="text-aarvak-gray-600 mb-6">
            We believe in <strong>precision in diagnosis</strong>. We utilize cutting-edge technology:
          </p>
          <ul className="space-y-3 text-aarvak-gray-600 text-sm">
            <li><strong>Chemistry & Electrolytes:</strong> Erba EM 200 Fully Automated Analyzer and Erba EC 90 Next-Gen Electrolyte Analyzer.</li>
            <li><strong>Hematology & Urine:</strong> Sysmex XP-100 Automatic Cell Counter and Erba Laura Urine Chemistry Strip Reader.</li>
            <li><strong>Advanced Imaging:</strong> SkanMobile Mobile X-Ray Radiography and Fuji CR System Prima T.</li>
          </ul>
        </div>
      </section>

      {/* Portfolio of Excellence */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-aarvak-gray-900 mb-4">
                A Portfolio of Excellence
              </h2>
              <p className="text-aarvak-gray-600 mb-4">
                We are proud to be the trusted health partner for industry leaders:
              </p>
              <ul className="space-y-2 text-aarvak-gray-600 text-sm">
                <li><strong>Hospitality:</strong> The Westin Gurgaon and The Gateway Resort.</li>
                <li><strong>Automotive & Engineering:</strong> Suzuki, SKH Group, and AtMa Autotech.</li>
                <li><strong>Food & Retail:</strong> Haldiram's and Bikanervala.</li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <img
                src="/images/cop-four.jpeg"
                alt="Portfolio of Excellence"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-aarvak-navy text-primary-foreground py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="mb-2">
            <strong>Phone:</strong>{" "}
            <a href="tel:+919810063340" className="underline">+91 9810063340</a> |{" "}
            <a href="tel:+919311245957" className="underline">+91 9311245957</a>
          </p>
          <p className="mb-2">
            <strong>Email:</strong>{" "}
            <a href="mailto:aarvakdiagnostic@gmail.com" className="underline">aarvakdiagnostic@gmail.com</a>
          </p>
          <p className="mb-6">
            <strong>Visit Us:</strong> 1310, Behind SBI Bank, Badshahpur, Sohna Road, Sector - 66, Gurugram
          </p>
          <Link
            to="/contact-us#contact"
            className="inline-block bg-aarvak-blue text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-aarvak-blue-hover transition"
          >
            Get a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Corporate;
