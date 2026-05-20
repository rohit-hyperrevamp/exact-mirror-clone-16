import { Navigate, Outlet } from "react-router-dom";
import { getAdminToken } from "@/lib/adminApi";
import { useEffect } from "react";

const AdminGuard = () => {
  useEffect(() => {
    // Tag admin pages with noindex meta
    let m = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!m) { m = document.createElement("meta"); m.name = "robots"; document.head.appendChild(m); }
    m.content = "noindex, nofollow";
  }, []);
  const token = getAdminToken();
  if (!token) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

export default AdminGuard;
