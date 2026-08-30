import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAdminToken } from "@/lib/adminApi";
import {
  LogOut,
  ArrowLeft,
  ShieldCheck,
  CalendarClock,
  LayoutDashboard,
  FlaskConical,
  ShoppingBag,
  ShoppingCart,
  IndianRupee,
  Users,
  Gift,
  Ticket,
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
    ],
  },
  {
    title: "Growth",
    items: [
      { to: "/admin/rewards", label: "Rewards & Loyalty", icon: Gift },
      { to: "/admin/promo-codes", label: "Promo Codes", icon: Ticket },
    ],
  },
  {
    title: "Content",
    items: [{ to: "/admin/blogs", label: "Blogs", icon: CalendarClock }],
  },
];


const NAV = GROUPS.flatMap((g) => g.items);



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
              Aarvak <span className="text-[#FFC107]">Admin</span>
            </p>
          </div>
          <p className="text-white/50 text-[11px] mt-1">Command Center</p>
        </div>
        <nav className="px-3 flex-1 space-y-5 overflow-y-auto pb-6">
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
