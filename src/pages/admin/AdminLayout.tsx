import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAdminToken } from "@/lib/adminApi";
import { BarChart3, ListChecks, Search, Send, LogOut, ArrowLeft, ShieldCheck } from "lucide-react";

const NAV = [
  { to: "/admin/seo", label: "Plan", icon: ListChecks, end: true },
  { to: "/admin/seo/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/seo/keywords", label: "Keywords", icon: Search },
  { to: "/admin/seo/indexing", label: "Indexing", icon: Send },
];

export const AdminLayout = () => {
  const nav = useNavigate();
  const signOut = () => { clearAdminToken(); nav("/admin/login", { replace: true }); };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-[#001260] text-white min-h-screen sticky top-0">
        <div className="px-6 pt-6 pb-6">
          <a href="/" className="text-white/60 text-[11px] uppercase tracking-[0.16em] inline-flex items-center gap-2 hover:text-white">
            <ArrowLeft className="h-3 w-3" /> Back to site
          </a>
          <div className="mt-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#FFC107]" />
            <p className="font-bold text-[18px] tracking-wide">
              Aarvak <span className="text-[#FFC107]">SEO</span>
            </p>
          </div>
          <p className="text-white/50 text-[11px] mt-1">Command Center</p>
        </div>
        <nav className="px-3 flex-1 space-y-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            return (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition ${
                    isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <Icon className="h-4 w-4" /> {n.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-white/60 hover:text-white hover:bg-white/5">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 pt-6 md:pt-8 pb-16 px-4 md:px-10">
        <div className="md:hidden flex gap-2 overflow-x-auto pb-4 -mx-4 px-4">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `shrink-0 px-3 h-9 rounded-full inline-flex items-center text-[12px] ${
                  isActive ? "bg-[#001260] text-white" : "bg-white text-slate-700 border border-slate-200"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <button onClick={signOut} className="shrink-0 px-3 h-9 rounded-full inline-flex items-center text-[12px] bg-white text-slate-700 border border-slate-200">
            Sign out
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
