import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, ChevronDown, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Corporate", href: "/corporate" },
  {
    label: "Departments",
    href: "#",
    children: [
      { label: "Pathology", href: "/contact-us#contact", image: "/images/dept-pathology.jpg" },
      { label: "Radiology", href: "/contact-us#contact", image: "/images/dept-radiology.jpg" },
      { label: "Health Checkups", href: "/contact-us#contact", image: "/images/dept-health-checkups.jpg" },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact-us" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-2">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src="/images/aarvak-logo.webp" alt="Aarvak Diagnostic Centre" className="h-14 md:h-16" />
        </Link>

        {/* Desktop Nav - centered */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <button className="flex items-center gap-1 text-[15px] font-medium text-aarvak-blue hover:text-aarvak-blue transition py-5">
                  {link.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 bg-background rounded-2xl shadow-xl border border-border p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 flex gap-4" style={{ width: '580px' }}>
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="relative block rounded-xl overflow-hidden flex-1 group/card"
                      style={{ height: '180px' }}
                    >
                      <img
                        src={child.image}
                        alt={child.label}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-3 left-4 text-sm font-semibold text-white">
                        {child.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={`text-[15px] font-medium transition py-5 ${
                  location.pathname === link.href
                    ? "text-green-700"
                    : "text-gray-700 hover:text-green-700"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Right side - phone + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:9810063340"
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
          >
            <Phone className="w-4 h-4 text-green-700" />
          </a>
          <Link
            to="/contact-us#contact"
            className="text-white px-7 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: '#4A7FC1' }}
          >
            Book Lab test
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t px-4 py-4 space-y-3">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  onClick={() => setDeptOpen(!deptOpen)}
                  className="flex items-center justify-between w-full text-sm font-medium text-gray-700 py-2"
                >
                  {link.label}
                  <ChevronDown className={`w-4 h-4 transition ${deptOpen ? "rotate-180" : ""}`} />
                </button>
                {deptOpen && (
                  <div className="pl-4 space-y-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block text-sm text-gray-600 py-1"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="block text-sm font-medium text-gray-700 py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            to="/contact-us#contact"
            className="block text-center bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold"
            onClick={() => setMobileOpen(false)}
          >
            Book Lab test
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
