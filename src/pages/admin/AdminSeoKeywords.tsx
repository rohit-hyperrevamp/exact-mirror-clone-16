// Keyword ranking dashboard — pulls live GSC positions for every keyword in our plan.
import { useEffect, useMemo, useState } from "react";
import { callAdmin } from "@/lib/adminApi";
import { Loader2, RefreshCw, Search, AlertCircle, ExternalLink, TrendingUp } from "lucide-react";
import { toast } from "sonner";

type Row = {
  keyword: string;
  status: "ranking" | "na" | "not_connected";
  clicks: number; impressions: number; ctr: number; position: number | null;
  sources: Array<{ kind: "task" | "blog"; id: string; title: string; role: "primary" | "secondary"; url: string | null }>;
};
type Payload = { range: { startDate: string; endDate: string; days: number }; siteUrl?: string; generatedAt?: string; total: number; ranking: number; keywords: Row[]; error?: string };

const posTone = (p: number | null) => {
  if (p == null) return { label: "NA", cls: "bg-slate-100 text-slate-600 border-slate-200" };
  if (p <= 3) return { label: p.toFixed(1), cls: "bg-emerald-100 text-emerald-800 border-emerald-200" };
  if (p <= 10) return { label: p.toFixed(1), cls: "bg-blue-100 text-blue-800 border-blue-200" };
  if (p <= 20) return { label: p.toFixed(1), cls: "bg-amber-100 text-amber-800 border-amber-200" };
  return { label: p.toFixed(1), cls: "bg-orange-100 text-orange-800 border-orange-200" };
};
const pageBucket = (p: number | null) => p == null ? "Not ranking" : p <= 10 ? "Page 1" : p <= 20 ? "Page 2" : p <= 30 ? "Page 3" : "Page 4+";

const AdminSeoKeywords = () => {
  const [data, setData] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState("28");
  const [filter, setFilter] = useState<"all" | "ranking" | "na">("all");
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await callAdmin<Payload>("seo-keywords-status", { days: Number(days) });
      if (res?.error && res.error !== "not_connected") toast.error(res.error);
      setData(res);
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed to load"); }
    setLoading(false);
  }
  useEffect(() => { void load(); /* eslint-disable-next-line */ }, [days]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    return data.keywords.filter((k) => {
      if (filter === "ranking" && k.status !== "ranking") return false;
      if (filter === "na" && k.status === "ranking") return false;
      if (q && !k.keyword.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [data, filter, search]);

  const stats = useMemo(() => {
    if (!data) return { total: 0, ranking: 0, top3: 0, page1: 0, na: 0 };
    return {
      total: data.keywords.length,
      ranking: data.keywords.filter((k) => k.status === "ranking").length,
      top3: data.keywords.filter((k) => k.position != null && k.position <= 3).length,
      page1: data.keywords.filter((k) => k.position != null && k.position <= 10).length,
      na: data.keywords.filter((k) => k.status !== "ranking").length,
    };
  }, [data]);

  const notConnected = data?.error === "not_connected";

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border p-4 flex flex-wrap items-center gap-3 text-sm">
        {notConnected ? (
          <span className="flex items-center gap-1 text-amber-700">
            <AlertCircle className="h-4 w-4" /> Connect Google in the Analytics tab to see live rankings.
          </span>
        ) : (
          <>
            <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">Live from Search Console</span>
            <span className="text-slate-500">Window: <span className="text-slate-900 font-medium">last {data?.range.days ?? days} days</span></span>
          </>
        )}
        <div className="ml-auto flex items-center gap-2">
          <select value={days} onChange={(e) => setDays(e.target.value)} className="h-9 px-3 rounded-md border border-slate-200 text-sm bg-white">
            <option value="7">Last 7 days</option>
            <option value="28">Last 28 days</option>
            <option value="90">Last 90 days</option>
          </select>
          <button onClick={load} disabled={loading} className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-slate-200 bg-white">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Stat label="Tracked" value={stats.total} sub="In your plan" />
        <Stat label="Ranking" value={stats.ranking} sub="With impressions" tone="emerald" />
        <Stat label="Top 3" value={stats.top3} sub="Best positions" tone="emerald" />
        <Stat label="Page 1" value={stats.page1} sub="Positions 1–10" tone="blue" />
        <Stat label="Not ranking" value={stats.na} sub="No data yet" tone="slate" />
      </div>

      <div className="bg-white rounded-xl border p-3 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search keyword…" className="w-full h-9 pl-8 pr-3 rounded-md border border-slate-200 text-sm" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} className="h-9 px-3 rounded-md border border-slate-200 text-sm bg-white">
          <option value="all">All keywords</option>
          <option value="ranking">Ranking only</option>
          <option value="na">Not ranking yet</option>
        </select>
        <span className="text-xs text-slate-500 ml-auto">{filtered.length} shown</span>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr className="text-xs text-slate-500 uppercase tracking-wide">
                <th className="px-3 py-2">Keyword</th>
                <th className="px-3 py-2">Position</th>
                <th className="px-3 py-2">Page</th>
                <th className="px-3 py-2 text-right">Impressions</th>
                <th className="px-3 py-2 text-right">Clicks</th>
                <th className="px-3 py-2 text-right">CTR</th>
                <th className="px-3 py-2">Tracked in</th>
                <th className="px-3 py-2 w-10" />
              </tr>
            </thead>
            <tbody>
              {loading && !data ? (
                <tr><td colSpan={8} className="p-10 text-center"><Loader2 className="h-5 w-5 mx-auto animate-spin text-slate-400" /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="p-10 text-center text-slate-500">{data?.keywords.length === 0 ? "Add target keywords to your tasks first." : "No keywords match."}</td></tr>
              ) : filtered.map((k) => {
                const tone = posTone(k.position);
                const serpUrl = `https://www.google.com/search?q=${encodeURIComponent(k.keyword)}&gl=in&hl=en`;
                return (
                  <tr key={k.keyword} className="border-t hover:bg-slate-50/60 align-top">
                    <td className="px-3 py-2 font-medium text-slate-900">{k.keyword}</td>
                    <td className="px-3 py-2"><span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-semibold ${tone.cls}`}>{tone.label}</span></td>
                    <td className="px-3 py-2 text-xs text-slate-500">{pageBucket(k.position)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{k.impressions.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{k.clicks.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{k.impressions ? `${(k.ctr * 100).toFixed(1)}%` : "—"}</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1 max-w-[24rem]">
                        {k.sources.slice(0, 3).map((s, i) => (
                          <span key={i} className={`px-1.5 py-0.5 rounded border text-[11px] ${s.kind === "blog" ? "border-violet-200 bg-violet-50 text-violet-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
                            {s.kind === "blog" ? "Blog" : "Task"}{s.role === "secondary" ? " · 2°" : ""} · {s.title.length > 22 ? s.title.slice(0, 22) + "…" : s.title}
                          </span>
                        ))}
                        {k.sources.length > 3 && <span className="text-[11px] text-slate-500">+{k.sources.length - 3}</span>}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <a href={serpUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-700" title="Open SERP"><ExternalLink className="h-3.5 w-3.5" /></a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-500 flex items-center gap-1">
        <TrendingUp className="h-3 w-3" />
        Positions are the average rank in Google over the selected window. "NA" means the keyword had zero impressions yet. GSC has ~48h crawl lag.
      </p>
    </div>
  );
};

const Stat = ({ label, value, sub, tone }: { label: string; value: number; sub: string; tone?: "emerald" | "blue" | "slate" }) => {
  const bg = tone === "emerald" ? "bg-emerald-50" : tone === "blue" ? "bg-blue-50" : "bg-white";
  return (
    <div className={`p-4 rounded-xl border border-slate-100 ${bg}`}>
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-2xl font-semibold mt-1 text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{sub}</div>
    </div>
  );
};

export default AdminSeoKeywords;
