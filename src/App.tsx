import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SocialSidebar from "./components/SocialSidebar";
import SocialProofNotification from "./components/SocialProofNotification";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Corporate from "./pages/Corporate";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";
import Pathology from "./pages/Pathology";
import Radiology from "./pages/Radiology";
import HealthCheckups from "./pages/HealthCheckups";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import BlogPost from "./pages/BlogPost";
import HyperrevampReporting from "./pages/HyperrevampReporting";
import GeoDiagnosticCentreGurugram from "./pages/GeoDiagnosticCentreGurugram";
import GeoDiagnosticLabSohnaRoad from "./pages/GeoDiagnosticLabSohnaRoad";
import GeoLocationPage from "./pages/GeoLocationPage";
import AeoFaqDiagnosticTests from "./pages/AeoFaqDiagnosticTests";
import AeoFaqHealthCheckups from "./pages/AeoFaqHealthCheckups";
import BiochemistryTests from "./pages/BiochemistryTests";
import HematologyTests from "./pages/HematologyTests";
import Microbiology from "./pages/Microbiology";
import Histopathology from "./pages/Histopathology";
import Immunology from "./pages/Immunology";
import MolecularDiagnostics from "./pages/MolecularDiagnostics";
import XRayServices from "./pages/XRayServices";
import PFTTest from "./pages/PFTTest";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminBlogs from "./pages/admin/AdminBlogs";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCatalog from "./pages/admin/AdminCatalog";
import AdminCatalogDetail from "./pages/admin/AdminCatalogDetail";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import AdminAbandonedCarts from "./pages/admin/AdminAbandonedCarts";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminRewards from "./pages/admin/AdminRewards";
import AdminPromoCodes from "./pages/admin/AdminPromoCodes";

import AdminGuard from "./components/AdminGuard";
import AutoCanonical from "./components/AutoCanonical";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const isReportPage = location.pathname === "/hyperrevamp-reporting";
  const isAdmin = location.pathname.startsWith("/admin");
  const hideChrome = isReportPage || isAdmin;

  return (
    <>
      <AutoCanonical />
      {!hideChrome && <Navbar />}
      {!hideChrome && <SocialSidebar />}
      {!hideChrome && <SocialProofNotification />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/pathology" element={<Navigate to="/departments/pathology" replace />} />
        <Route path="/departments/pathology" element={<Pathology />} />
        <Route path="/radiology" element={<Navigate to="/departments/radiology" replace />} />
        <Route path="/departments/radiology" element={<Radiology />} />
        <Route path="/departments/radiology/x-ray-services" element={<XRayServices />} />
        <Route path="/departments/radiology/pft-test" element={<PFTTest />} />
        <Route path="/health-checkups" element={<Navigate to="/departments/health-checkups" replace />} />
        <Route path="/departments/health-checkups" element={<HealthCheckups />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<BlogPost />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/diagnostic-centre-gurugram" element={<GeoDiagnosticCentreGurugram />} />
        <Route path="/diagnostic-lab-sohna-road-gurugram" element={<GeoDiagnosticLabSohnaRoad />} />
        <Route path="/diagnostic-centre-gurugram/:slug" element={<GeoLocationPage />} />
        <Route path="/faq-diagnostic-tests" element={<AeoFaqDiagnosticTests />} />
        <Route path="/faq-health-checkups" element={<AeoFaqHealthCheckups />} />
        <Route path="/departments/pathology/biochemistry-tests" element={<BiochemistryTests />} />
        <Route path="/departments/pathology/hematology-tests" element={<HematologyTests />} />
        <Route path="/departments/pathology/Microbiology" element={<Microbiology />} />
        <Route path="/departments/pathology/microbiology" element={<Navigate to="/departments/pathology/Microbiology" replace />} />
        <Route path="/departments/pathology/histopathology-tests" element={<Histopathology />} />
        <Route path="/pathology/histopathology-tests" element={<Navigate to="/departments/pathology/histopathology-tests" replace />} />
        <Route path="/departments/pathology/immunology-tests" element={<Immunology />} />
        <Route path="/departments/pathology/molecular-diagnostics" element={<MolecularDiagnostics />} />
        <Route path="/hyperrevamp-reporting" element={<HyperrevampReporting />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/seo/*" element={<Navigate to="/admin/dashboard" replace />} />

        <Route path="/admin" element={<AdminGuard />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="catalog" element={<AdminCatalog />} />
            <Route path="catalog/:id" element={<AdminCatalogDetail />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="orders/:id" element={<AdminOrderDetail />} />
            <Route path="abandoned-carts" element={<AdminAbandonedCarts />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="rewards" element={<AdminRewards />} />
            <Route path="promo-codes" element={<AdminPromoCodes />} />
          </Route>
        </Route>

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideChrome && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
