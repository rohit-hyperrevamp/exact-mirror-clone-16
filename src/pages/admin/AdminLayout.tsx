import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAdminToken } from "@/lib/adminApi";
import {
  LogOut,
  LayoutDashboard,
  FlaskConical,
  ShoppingBag,
  ShoppingCart,
  IndianRupee,
  Users,
  Gift,
  Ticket,
  MapPin,
  CalendarX,
  type LucideIcon,
} from "lucide-react";


const GROUPS: { title: string; items: { to: string; label: string; icon: LucideIcon; end?: boolean }[] }[] = [
  {
    title: "Overview",
    items: [{ to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true }],
  },
  {
    title: "Commerce",
    items: [
      { to: "/admin/catalog", label: "Catalog", icon: FlaskConical },
      { to: "/admin/orders", label: "Test Orders", icon: ShoppingBag },
      { to: "/admin/abandoned-carts", label: "Abandoned Carts", icon: ShoppingCart },
      { to: "/admin/payments", label: "Payments", icon: IndianRupee },
      { to: "/admin/customers", label: "Patients", icon: Users },
      { to: "/admin/collection-centers", label: "Collection Centers", icon: MapPin },
      { to: "/admin/cancellation-policy", label: "Cancellation Policy", icon: CalendarX },
    ],
  },
  {
    title: "Growth",
    items: [
      { to: "/admin/rewards", label: "Rewards & Loyalty", icon: Gift },
      { to: "/admin/promo-codes", label: "Promo Codes", icon: Ticket },
    ],
  },
];


const NAV = GROUPS.flatMap((g) => g.items);



export const AdminLayout = () => {
  const nav = useNavigate();
  const signOut = () => { clearAdminToken(); nav("/admin/login", { replace: true }); };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-[#001260] text-white h-screen sticky top-0">
        <div className="px-6 pt-6 pb-5 shrink-0">
          <div className="inline-flex items-center rounded-lg bg-white px-3 py-2">
            <img src="/images/aarvak-logo.webp" alt="Aarvak Diagnostics logo" className="h-8 w-auto" />
          </div>
          <p className="text-white/50 text-[11px] mt-3 uppercase tracking-[0.16em]">Command Center</p>
        </div>

        <nav className="px-3 flex-1 space-y-5 overflow-y-auto pb-4">
          {GROUPS.map((g) => (
            <div key={g.title} className="space-y-1">
              <p className="px-3 pb-1 text-[10px] uppercase tracking-[0.2em] text-white/35">{g.title}</p>
              {g.items.map((n) => {
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
            </div>
          ))}
        </nav>

        <div className="px-3 pt-3 pb-5 shrink-0 border-t border-white/10">
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-[13px] font-medium bg-white/10 text-white hover:bg-white/20 transition"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

      </aside>

      <main className="flex-1 min-w-0 pt-0 md:pt-8 pb-16 px-4 md:px-10">
        <div className="md:hidden sticky top-0 z-40 -mx-4 mb-3 flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
          <img src="/images/aarvak-logo.webp" alt="Aarvak Diagnostics logo" className="h-7 w-auto" />
          <button
            onClick={signOut}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#001260] px-3 h-9 text-[12px] font-medium text-white"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
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
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
