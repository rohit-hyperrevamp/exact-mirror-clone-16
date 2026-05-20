// Analytics tab — Google Search Console + GA4.
import { useEffect, useMemo, useState } from "react";
import { callAdmin, getAdminToken } from "@/lib/adminApi";
import { Loader2, RefreshCw, Link as LinkIcon, AlertCircle, TrendingUp, TrendingDown, Smartphone, Monitor, Tablet, Globe, Search, Users, Eye, Activity } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Range = { startDate: string; endDate: string; compareStart: string | null; compareEnd: string | null; label: string };
const ymd = (d: Date) => d.toISOString().slice(0, 10);
const daysAgo = (n: number) => { const d = new Date(); d.setUTCDate(d.getUTCDate() - n); return d; };

const PRESETS: Record<string, () => Range> = {
  yesterday_vs_prior: () => ({ startDate: ymd(daysAgo(1)), endDate: ymd(daysAgo(1)), compareStart: ymd(daysAgo(2)), compareEnd: ymd(daysAgo(2)), label: "Yesterday vs day before" }),
  last_7_vs_prior: () => ({ startDate: ymd(daysAgo(7)), endDate: ymd(daysAgo(1)), compareStart: ymd(daysAgo(14)), compareEnd: ymd(daysAgo(8)), label: "Last 7 vs prior 7" }),
  last_28_vs_prior: () => ({ startDate: ymd(daysAgo(28)), endDate: ymd(daysAgo(1)), compareStart: ymd(daysAgo(56)), compareEnd: ymd(daysAgo(29)), label: "Last 28 vs prior 28" }),
  last_90: () => ({ startDate: ymd(daysAgo(90)), endDate: ymd(daysAgo(1)), compareStart: null, compareEnd: null, label: "Last 90 days" }),
};

const AdminSeoAnalytics = () => {
  const [rangeKey, setRangeKey] = useState("last_28_vs_prior");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notConnected, setNotConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const range = useMemo(() => PRESETS[rangeKey](), [rangeKey]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await callAdmin<any>("seo-google-analytics-fetch", {
        startDate: range.startDate, endDate: range.endDate,
        compareStart: range.compareStart, compareEnd: range.compareEnd,
      });
      if (res?.error === "not_connected") { setNotConnected(true); setData(null); }
      else if (res?.error) toast.error(res.error);
      else { setNotConnected(false); setData(res); }
    } catch (e) { toast.error(e instanceof Error ? e.message : "Fetch failed"); }
    setLoading(false);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("google") === "connected") { toast.success("Google connected"); window.history.replaceState({}, "", window.location.pathname); }
    else if (params.get("google") === "error") { toast.error(`Connect failed: ${params.get("reason") ?? "unknown"}`); window.history.replaceState({}, "", window.location.pathname); }
    void fetchData();
    // eslint-disable-next-line
  }, [rangeKey]);

  async function connect() {
    setConnecting(true);
    try {
      const res = await callAdmin<{ url?: string; error?: string }>("seo-google-oauth-start", { returnTo: window.location.origin });
      if (res?.error) throw new Error(res.error);
      if (!res?.url) throw new Error("No URL");
      window.location.href = res.url;
    } catch (e) { toast.error(e instanceof Error ? e.message : "OAuth failed"); setConnecting(false); }
  }

  if (notConnected) {
    return (
      <div className="bg-white rounded-2xl border p-10 text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-[#0172B6]/10 flex items-center justify-center">
          <LinkIcon className="h-6 w-6 text-[#0172B6]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#001260]">Connect Google to see live analytics</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">One sign-in grants read access to Search Console and GA4. The refresh token doesn't expire so you only do this once.</p>
        </div>
        <button onClick={connect} disabled={connecting} className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#001260] text-white font-medium hover:bg-[#001260]/90 disabled:opacity-60">
          {connecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <LinkIcon className="h-4 w-4" />}
          Connect Google account
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border p-4 flex flex-wrap items-center gap-3 text-sm">
        {data ? (
          <>
            <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">Connected</span>
            <span className="text-slate-500">Site: <span className="text-slate-900 font-medium">{data.connection?.siteUrl ?? "—"}</span></span>
          </>
        ) : <span className="text-slate-500">Loading…</span>}
        <div className="ml-auto flex items-center gap-2">
          <select value={rangeKey} onChange={(e) => setRangeKey(e.target.value)} className="h-9 px-3 rounded-md border border-slate-200 text-sm bg-white">
            <option value="yesterday_vs_prior">Yesterday vs day before</option>
            <option value="last_7_vs_prior">Last 7d vs prior 7</option>
            <option value="last_28_vs_prior">Last 28d vs prior 28</option>
            <option value="last_90">Last 90 days</option>
          </select>
          <button onClick={fetchData} disabled={loading} className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-slate-200 bg-white">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </button>
          <button onClick={connect} className="h-9 px-3 rounded-md text-xs text-slate-600 hover:bg-slate-100">Reconnect</button>
        </div>
      </div>

      <div className="text-xs text-slate-500">
        Range: <span className="font-medium">{range.startDate}</span> → <span className="font-medium">{range.endDate}</span>
        {range.compareStart && <> · vs <span className="font-medium">{range.compareStart}</span> → <span className="font-medium">{range.compareEnd}</span></>}
      </div>

      {loading && !data && <div className="bg-white rounded-xl border p-10 text-center"><Loader2 className="h-5 w-5 mx-auto animate-spin text-slate-400" /></div>}

      {data && (
        <>
          {data.ga4 ? (
            <Section icon={<Users className="h-4 w-4" />} title="Audience (GA4)">
              <Ga4Kpis ga4={data.ga4} />
            </Section>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              GA4 not configured. Add <code className="text-xs bg-white px-1.5 py-0.5 rounded border border-amber-200">GA4_PROPERTY_ID</code> in Cloud → Backend → Secrets.
            </div>
          )}

          <Section icon={<Search className="h-4 w-4" />} title="Search Console">
            <GscKpis totals={data.gsc.totals} prev={data.gsc.totalsPrev} />
          </Section>

          <div className="grid md:grid-cols-2 gap-4">
            {data.ga4 && (
              <Section icon={<Smartphone className="h-4 w-4" />} title="Device (GA4 users)">
                <DeviceBars rows={data.ga4.device} keyName="Users" />
              </Section>
            )}
            <Section icon={<Smartphone className="h-4 w-4" />} title="Device (GSC clicks)">
              <GscDeviceBars rows={data.gsc.device} />
            </Section>
          </div>

          {data.ga4 && (
            <div className="grid md:grid-cols-2 gap-4">
              <Section icon={<Activity className="h-4 w-4" />} title="Top traffic sources (GA4)">
                <SimpleTable headers={["Channel", "Sessions", "Users"]} rows={(data.ga4.sources ?? []).map((r: any) => [
                  r.dimensionValues?.[0]?.value ?? "—",
                  r.metricValues?.[0]?.value ?? "0",
                  r.metricValues?.[1]?.value ?? "0",
                ])} />
              </Section>
              <Section icon={<Eye className="h-4 w-4" />} title="Top landing pages (GA4)">
                <SimpleTable headers={["Path", "Views", "Users"]} rows={(data.ga4.pages ?? []).map((r: any) => [
                  r.dimensionValues?.[0]?.value ?? "—",
                  r.metricValues?.[0]?.value ?? "0",
                  r.metricValues?.[1]?.value ?? "0",
                ])} />
              </Section>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <Section icon={<Search className="h-4 w-4" />} title="Top search queries (GSC)">
              <SimpleTable headers={["Query", "Clicks", "Impr.", "CTR", "Pos."]} rows={(data.gsc.queries ?? []).map((r: any) => [
                r.keys?.[0] ?? "—",
                String(r.clicks ?? 0),
                String(r.impressions ?? 0),
                `${((r.ctr ?? 0) * 100).toFixed(1)}%`,
                (r.position ?? 0).toFixed(1),
              ])} />
            </Section>
            <Section icon={<Globe className="h-4 w-4" />} title="Top landing URLs (GSC)">
              <SimpleTable headers={["URL", "Clicks", "Impr.", "CTR", "Pos."]} rows={(data.gsc.pages ?? []).map((r: any) => [
                shortUrl(r.keys?.[0] ?? ""),
                String(r.clicks ?? 0),
                String(r.impressions ?? 0),
                `${((r.ctr ?? 0) * 100).toFixed(1)}%`,
                (r.position ?? 0).toFixed(1),
              ])} />
            </Section>
          </div>

          <Section icon={<Globe className="h-4 w-4" />} title="Top countries (GSC)">
            <SimpleTable headers={["Country", "Clicks", "Impr.", "CTR", "Pos."]} rows={(data.gsc.country ?? []).map((r: any) => [
              (r.keys?.[0] ?? "—").toUpperCase(),
              String(r.clicks ?? 0),
              String(r.impressions ?? 0),
              `${((r.ctr ?? 0) * 100).toFixed(1)}%`,
              (r.position ?? 0).toFixed(1),
            ])} />
          </Section>
        </>
      )}
    </div>
  );
};

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-xl border p-4 space-y-3">
    <div className="flex items-center gap-2 text-sm font-semibold text-[#001260]">{icon}{title}</div>
    {children}
  </div>
);

const Delta = ({ now, prev, invert = false }: { now: number; prev: number | null | undefined; invert?: boolean }) => {
  if (prev == null || prev === 0) return <span className="text-xs text-slate-400">—</span>;
  const pct = ((now - prev) / prev) * 100;
  const positive = invert ? pct < 0 : pct > 0;
  return (
    <span className={`text-xs flex items-center gap-0.5 ${positive ? "text-emerald-600" : "text-red-600"}`}>
      {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      {pct > 0 ? "+" : ""}{pct.toFixed(1)}%
    </span>
  );
};

const Kpi = ({ label, value, prev, fmt, invert }: { label: string; value: number; prev?: number | null; fmt?: (n: number) => string; invert?: boolean }) => {
  const f = fmt ?? ((n: number) => n.toLocaleString());
  return (
    <div className="rounded-lg border border-slate-200 p-3 space-y-1 bg-white">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-xl font-semibold text-slate-900">{f(value)}</div>
      {prev != null && <Delta now={value} prev={prev} invert={invert} />}
    </div>
  );
};

const Ga4Kpis = ({ ga4 }: { ga4: any }) => {
  const t = ga4.totals?.metricValues ?? [];
  const p = ga4.totalsPrev?.metricValues;
  const num = (i: number, s: any[]) => Number(s?.[i]?.value ?? 0);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Kpi label="Total users" value={num(0, t)} prev={p ? num(0, p) : null} />
      <Kpi label="New users" value={num(1, t)} prev={p ? num(1, p) : null} />
      <Kpi label="Sessions" value={num(2, t)} prev={p ? num(2, p) : null} />
      <Kpi label="Page views" value={num(3, t)} prev={p ? num(3, p) : null} />
      <Kpi label="Avg session (s)" value={Math.round(num(4, t))} prev={p ? Math.round(num(4, p)) : null} />
      <Kpi label="Engagement rate" value={num(5, t) * 100} prev={p ? num(5, p) * 100 : null} fmt={(n) => `${n.toFixed(1)}%`} />
      <Kpi label="Bounce rate" value={num(6, t) * 100} prev={p ? num(6, p) * 100 : null} fmt={(n) => `${n.toFixed(1)}%`} invert />
    </div>
  );
};

const GscKpis = ({ totals, prev }: { totals: any; prev: any }) => {
  const clicks = totals?.clicks ?? 0;
  const impr = totals?.impressions ?? 0;
  const ctr = (totals?.ctr ?? 0) * 100;
  const pos = totals?.position ?? 0;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Kpi label="Clicks" value={clicks} prev={prev?.clicks} />
      <Kpi label="Impressions" value={impr} prev={prev?.impressions} />
      <Kpi label="CTR" value={ctr} prev={prev ? (prev.ctr ?? 0) * 100 : null} fmt={(n) => `${n.toFixed(2)}%`} />
      <Kpi label="Avg position" value={pos} prev={prev?.position} fmt={(n) => n.toFixed(1)} invert />
    </div>
  );
};

const deviceIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("mobile")) return <Smartphone className="h-3 w-3" />;
  if (n.includes("tablet")) return <Tablet className="h-3 w-3" />;
  return <Monitor className="h-3 w-3" />;
};

const DeviceBars = ({ rows, keyName }: { rows: any[]; keyName: string }) => {
  const total = rows.reduce((s, r) => s + Number(r.metricValues?.[0]?.value ?? 0), 0) || 1;
  if (!rows.length) return <div className="text-sm text-slate-400">No data.</div>;
  return (
    <div className="space-y-2">
      {rows.map((r, i) => {
        const name = r.dimensionValues?.[0]?.value ?? "—";
        const val = Number(r.metricValues?.[0]?.value ?? 0);
        const pct = (val / total) * 100;
        return (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="capitalize flex items-center gap-1">{deviceIcon(name)}{name}</span>
              <span className="text-slate-500">{val.toLocaleString()} {keyName} · {pct.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0172B6]" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const GscDeviceBars = ({ rows }: { rows: any[] }) => {
  const total = rows.reduce((s, r) => s + (r.clicks ?? 0), 0) || 1;
  if (!rows.length) return <div className="text-sm text-slate-400">No data.</div>;
  return (
    <div className="space-y-2">
      {rows.map((r, i) => {
        const name = (r.keys?.[0] ?? "—").toLowerCase();
        const val = r.clicks ?? 0;
        const pct = (val / total) * 100;
        return (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="capitalize flex items-center gap-1">{deviceIcon(name)}{name}</span>
              <span className="text-slate-500">{val} clicks · {pct.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0172B6]" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SimpleTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => {
  if (!rows.length) return <div className="text-sm text-slate-400">No data.</div>;
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs">
        <thead className="text-left text-slate-500">
          <tr>{headers.map((h, i) => <th key={i} className="px-2 py-1.5 font-medium">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              {r.map((c, j) => <td key={j} className="px-2 py-1.5 truncate max-w-[280px]" title={c}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const shortUrl = (u: string) => {
  try { return new URL(u).pathname || "/"; } catch { return u; }
};

export default AdminSeoAnalytics;
