// Indexing API tab — manual ping + last 50 pings log.
import { useEffect, useState } from "react";
import { callAdmin } from "@/lib/adminApi";
import { toast } from "sonner";
import { Loader2, RefreshCw, Send, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

type Row = { id: string; url: string; action: string; source: string | null; status: string; http_status: number | null; error: string | null; pinged_at: string };

const AdminSeoIndexing = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [pinging, setPinging] = useState(false);
  const [url, setUrl] = useState("");
  const [needsReconnect, setNeedsReconnect] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await callAdmin<{ rows: Row[] }>("seo-data", { op: "list_indexing" });
      const logs = res.rows ?? [];
      setRows(logs);
      const last = logs.find((r) => r.status === "success" || r.error === "missing_indexing_scope");
      setNeedsReconnect(last?.error === "missing_indexing_scope");
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed to load"); }
    setLoading(false);
  }
  useEffect(() => { void load(); }, []);

  async function ping() {
    if (!/^https?:\/\//i.test(url)) { toast.error("Enter a full URL starting with https://"); return; }
    setPinging(true);
    try {
      const res = await callAdmin<{ ok?: boolean; status?: string; error?: string }>("seo-indexing-ping", { url, action: "URL_UPDATED", source: "manual" });
      if (res?.error === "missing_indexing_scope") { setNeedsReconnect(true); toast.error("Reconnect Google to grant Indexing scope"); }
      else if (res?.ok) { setNeedsReconnect(false); toast.success("Pinged Google"); }
      else toast.error(res?.error ?? "Ping failed");
    } catch (e) { toast.error(e instanceof Error ? e.message : "Ping failed"); }
    setPinging(false);
    await load();
  }

  async function reconnect() {
    try {
      const res = await callAdmin<{ url?: string; error?: string }>("seo-google-oauth-start", { returnTo: window.location.origin });
      if (res?.error || !res?.url) throw new Error(res?.error || "Failed");
      window.location.href = res.url;
    } catch (e) { toast.error(e instanceof Error ? e.message : "Reconnect failed"); }
  }

  return (
    <div className="bg-white rounded-2xl border p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-lg font-semibold text-[#001260] flex items-center gap-2"><Send className="h-4 w-4" /> Google Indexing API</h3>
          <p className="text-sm text-slate-500 mt-1">Manually request a re-crawl for any URL after you publish or edit it.</p>
        </div>
        <button onClick={load} disabled={loading} className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-slate-200">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </button>
      </div>

      {needsReconnect && (
        <div className="flex items-start gap-3 rounded-md border border-amber-500/40 bg-amber-50 p-3 text-sm">
          <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-600 shrink-0" />
          <div className="flex-1">
            <div className="font-medium text-amber-900">Reconnect Google to enable indexing</div>
            <div className="text-amber-800 text-xs">Your current connection lacks the indexing permission. Reconnect once.</div>
          </div>
          <button onClick={reconnect} className="h-8 px-3 rounded-md bg-[#001260] text-white text-xs">Reconnect</button>
        </div>
      )}

      <div className="flex gap-2">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.aarvakdiagnostics.com/your-page" className="flex-1 h-10 px-3 rounded-md border border-slate-200 text-sm" />
        <button onClick={ping} disabled={pinging || !url} className="h-10 px-4 rounded-md bg-[#001260] text-white text-sm font-medium inline-flex items-center gap-2 disabled:opacity-60">
          {pinging ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ping URL"}
        </button>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="grid grid-cols-[1fr_90px_140px_160px] text-xs font-medium bg-slate-50 px-3 py-2 text-slate-600">
          <div>URL</div><div>Status</div><div>Source</div><div>When</div>
        </div>
        <div className="max-h-[420px] overflow-auto divide-y">
          {rows.length === 0 && <div className="p-4 text-sm text-slate-500">No pings yet.</div>}
          {rows.map((r) => (
            <div key={r.id} className="grid grid-cols-[1fr_90px_140px_160px] px-3 py-2 text-xs items-center">
              <div className="truncate" title={r.url}>{r.url}</div>
              <div>
                {r.status === "success" ? (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-700"><CheckCircle2 className="h-3 w-3" /> ok</span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-red-200 bg-red-50 text-red-700" title={r.error ?? ""}><XCircle className="h-3 w-3" /> {r.status}</span>
                )}
              </div>
              <div className="truncate text-slate-500">{r.source ?? "—"}</div>
              <div className="text-slate-500">{new Date(r.pinged_at).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSeoIndexing;
