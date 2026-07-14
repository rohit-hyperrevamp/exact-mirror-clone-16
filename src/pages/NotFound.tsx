import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import useSEO from "@/hooks/useSEO";

const NotFound = () => {
  const location = useLocation();

  useSEO({
    title: "Page Not Found (404) | Aarvak Diagnostics",
    description: "The page you're looking for doesn't exist. Explore our pathology, radiology and health checkup services in Gurugram.",
    canonical: location.pathname,
    noindex: true,
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="text-center max-w-lg">
        <h1 className="mb-4 text-5xl font-bold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Sorry, we couldn't find that page.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/" className="bg-aarvak-blue text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">Return Home</Link>
          <Link to="/departments/pathology" className="border border-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">Browse Services</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
