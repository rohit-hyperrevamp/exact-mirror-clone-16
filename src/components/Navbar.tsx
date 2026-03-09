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
      { label: "Pathology", href: "/contact-us#contact" },
      { label: "Radiology", href: "/contact-us#contact" },
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
                <button className="flex items-center gap-1 text-[15px] font-medium text-gray-700 hover:text-green-700 transition py-5">
                  {link.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-0 bg-white rounded-lg shadow-lg border py-2 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-700"
                    >
                      {child.label}
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
            className="w-10 h-10 rounded-full border-2 border-green-600 flex items-center justify-center hover:bg-green-50 transition"
          >
            <Phone className="w-4 h-4 text-green-700" />
          </a>
          <Link
            to="/contact-us#contact"
            className="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-green-700 transition"
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
