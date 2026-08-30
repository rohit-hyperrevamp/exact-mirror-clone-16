import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin, getAdminToken, setAdminToken } from "@/lib/adminApi";
import { Loader2, Lock, ShieldCheck } from "lucide-react";

const AdminLogin = () => {
  const nav = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Aarvak Admin — Control Center";
    let m = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!m) { m = document.createElement("meta"); m.name = "robots"; document.head.appendChild(m); }
    m.content = "noindex, nofollow";
    if (getAdminToken()) nav("/admin/dashboard", { replace: true });
  }, [nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token } = await adminLogin(loginId.trim(), password);
      setAdminToken(token);
      nav("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border p-8">
        <img src="/images/aarvak-logo.webp" alt="Aarvak Diagnostics logo" className="h-12 w-auto" />
        <div className="flex items-center gap-2 mt-5 text-[#0172B6]">
          <ShieldCheck className="h-5 w-5" />
          <span className="text-xs uppercase tracking-[0.18em] font-semibold">Aarvak Admin</span>
        </div>
        <h1 className="text-2xl font-bold text-[#001260] mt-1">Control Center</h1>
        <p className="text-sm text-slate-500 mt-1">Sign in to manage the catalog, orders, payments and patients.</p>


        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Login ID</label>
            <input
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
              autoComplete="username"
              className="w-full h-11 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0172B6]/30 focus:border-[#0172B6]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0172B6]/30 focus:border-[#0172B6]"
              />
            </div>
          </div>
          {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg bg-[#001260] text-white font-medium hover:bg-[#001260]/90 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
