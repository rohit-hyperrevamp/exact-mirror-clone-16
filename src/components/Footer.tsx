import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-aarvak-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold italic text-aarvak-navy" style={{ fontFamily: "Georgia, serif" }}>
              Aarvak
            </h3>
            <p className="text-xs text-aarvak-gray-600 mb-4">Diagnostic Centre</p>
            <p className="text-sm text-aarvak-gray-600 leading-relaxed">
              Trusted diagnostic center offering blood tests, imaging, and preventive health services in Gurgaon.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-aarvak-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about-us" },
                { label: "Corporate", href: "/corporate" },
                { label: "Insights", href: "/insights" },
                { label: "Contact Us", href: "/contact-us" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-aarvak-gray-600 hover:text-aarvak-blue transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-aarvak-gray-900 mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-aarvak-gray-600">
              <li>Blood Tests</li>
              <li>Health Packages</li>
              <li>Home Collection</li>
              <li>X-Ray & Imaging</li>
              <li>Corporate Health</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-aarvak-gray-900 mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-aarvak-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Shop No 23, Ground Floor, Block B, JMD Suburbio-2, Sector 67, Sohna Road, Gurgaon</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:9810063340" className="hover:text-aarvak-blue">+91 9810063340</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:marketing@aarvakdiagnostics.com" className="hover:text-aarvak-blue">
                  marketing@aarvakdiagnostics.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-aarvak-gray-600">
          © {new Date().getFullYear()} Aarvak Diagnostics. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
