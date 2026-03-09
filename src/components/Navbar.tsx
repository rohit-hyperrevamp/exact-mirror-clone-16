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
    <nav className="sticky top-0 z-50 bg-background shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <img src="/images/aarvak-logo.webp" alt="Aarvak Diagnostic Centre" className="h-12 md:h-14" />
            <div className="hidden">
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-aarvak-gray-900 hover:text-aarvak-blue transition">
                  {link.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-1 bg-background rounded-lg shadow-lg border py-2 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="block px-4 py-2 text-sm text-aarvak-gray-600 hover:bg-aarvak-gray-50 hover:text-aarvak-blue"
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
                className={`text-sm font-medium transition ${
                  location.pathname === link.href
                    ? "text-aarvak-blue"
                    : "text-aarvak-gray-900 hover:text-aarvak-blue"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:9810063340" className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-aarvak-gray-50 transition">
            <Phone className="w-4 h-4 text-aarvak-gray-900" />
          </a>
          <Link
            to="/contact-us#contact"
            className="bg-aarvak-navy text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition"
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
        <div className="lg:hidden bg-background border-t px-4 py-4 space-y-3">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  onClick={() => setDeptOpen(!deptOpen)}
                  className="flex items-center justify-between w-full text-sm font-medium text-aarvak-gray-900 py-2"
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
                        className="block text-sm text-aarvak-gray-600 py-1"
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
                className="block text-sm font-medium text-aarvak-gray-900 py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            to="/contact-us#contact"
            className="block text-center bg-aarvak-navy text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold"
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
