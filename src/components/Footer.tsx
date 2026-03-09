import { Link } from "react-router-dom";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Corporate", href: "/corporate" },
                { label: "Departments", href: "#" },
                { label: "About Us", href: "/about-us" },
                { label: "Contact", href: "/contact-us" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-gray-600 hover:text-gray-900 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5">Brand</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/insights" className="text-sm text-gray-600 hover:text-gray-900 transition">
                  Insights
                </Link>
              </li>
              <li>
                <span className="text-sm text-gray-600">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-gray-600">Terms of Use</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5">Contact</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <span className="font-bold text-gray-900">Email : </span>
                <a href="mailto:marketing@aarvakdiagnostics.com" className="hover:text-gray-900">
                  marketing@aarvakdiagnostics.com
                </a>
              </p>
              <p>
                <span className="font-bold text-gray-900">Phone : </span>
                <a href="tel:9810063340" className="hover:text-gray-900">+91 9810063340</a>
              </p>
              <p>
                <span className="font-bold text-gray-900">Location : </span>
                Shop No 23, Ground Floor, Block B, JMD Suburbio-2, Sector 67, Sohna Road, Gurgaon
              </p>
            </div>
          </div>

          {/* Follow */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5">Follow</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/aarvakdiagnostics" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/AarvakDiagnostics" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://wa.me/919810063340" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition">
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Aarvak Diagnostics. Designed and Developed by Hyperrevamp
        </div>
      </div>
    </footer>
  );
};

export default Footer;