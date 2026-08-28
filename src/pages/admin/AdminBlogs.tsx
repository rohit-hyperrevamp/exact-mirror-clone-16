import { useCallback, useEffect, useMemo, useState } from "react";
import { callAdmin } from "@/lib/adminApi";
import { CalendarClock, CheckCircle2, FileText, AlertTriangle, RefreshCw, Play, Download } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  status: "draft" | "scheduled" | "published" | "failed";
  scheduled_date: string;
  scheduled_time: string;
  timezone: string;
  needs_review: boolean;
  last_error: string | null;
  published_at: string | null;
};

type Settings = {
  default_publish_time: string;
  timezone: string;
  auto_publish_enabled: boolean;
  overdue_grace_days: number;
};

type ListResponse = {
  posts: Post[];
  settings: Settings;
  logs: { id: string; slug: string | null; action: string; message: string | null; created_at: string }[];
  now_ist: string;
};

const TABS = ["scheduled", "published", "draft", "failed"] as const;

const fmtIst = (d: string, t: string) =>
  `${new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} | ${t.slice(0, 5)} IST`;

const countdown = (d: string, t: string, nowIst: string) => {
  const target = new Date(`${d}T${t}`).getTime();
  const now = new Date(nowIst.replace(" ", "T")).getTime();
  const diff = target - now;
  if (Number.isNaN(diff)) return "";
  if (diff <= 0) return "due";
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return days > 0 ? `in ${days}d ${hours}h` : hours > 0 ? `in ${hours}h ${mins}m` : `in ${mins}m`;
};

export const AdminBlogs = () => {
  const [data, setData] = useState<ListResponse | null>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]>("scheduled");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const res = await callAdmin<ListResponse>("blog-admin", { action: "list" });
      setData(res);
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const act = async (label: string, body: Record<string, unknown>) => {
    setBusy(label);
    try {
      await callAdmin("blog-admin", body);
      await load();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const grouped = useMemo(() => {
    const g: Record<string, Post[]> = { scheduled: [], published: [], draft: [], failed: [] };
    (data?.posts ?? []).forEach((p) => g[p.status]?.push(p));
    g.scheduled.sort((a, b) => a.scheduled_date.localeCompare(b.scheduled_date));
    g.published.sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? ""));
    return g;
  }, [data]);

  const stats = [
    { key: "published", label: "Published", icon: CheckCircle2, color: "text-emerald-600" },
    { key: "scheduled", label: "Scheduled", icon: CalendarClock, color: "text-[#0172B6]" },
    { key: "draft", label: "Drafts / Review", icon: FileText, color: "text-slate-600" },
    { key: "failed", label: "Failed", icon: AlertTriangle, color: "text-red-600" },
  ] as const;

  return (
    <div className="max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-bold text-[#001260]">Blog Publishing</h1>
          <p className="text-slate-500 text-[13px] mt-1">
            Automatic publishing runs every 5 minutes. Server time (IST): {data?.now_ist?.slice(0, 16) ?? "…"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => act("import", { action: "import_calendar" })}
            disabled={busy !== null}
            className="h-9 px-3 rounded-lg text-[12px] bg-white border border-slate-200 inline-flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5" /> Import calendar
          </button>
          <button
            onClick={() => act("run", { action: "run_scheduler" })}
            disabled={busy !== null}
            className="h-9 px-3 rounded-lg text-[12px] bg-[#001260] text-white inline-flex items-center gap-2 disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5" /> Run scheduler now
          </button>
          <button onClick={load} className="h-9 px-3 rounded-lg text-[12px] bg-white border border-slate-200 inline-flex items-center gap-2">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>
      </div>

      {error && <p className="mt-4 text-[13px] text-red-600">{error}</p>}

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.key}
              onClick={() => setTab(s.key)}
              className={`text-left bg-white rounded-xl border p-4 transition ${tab === s.key ? "border-[#001260]" : "border-slate-200"}`}
            >
              <Icon className={`h-4 w-4 ${s.color}`} />
              <p className="text-[22px] font-bold text-[#001260] mt-2">{grouped[s.key].length}</p>
              <p className="text-[12px] text-slate-500">{s.label}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-[13px] min-w-[720px]">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="text-left font-medium px-4 py-3">Title</th>
              <th className="text-left font-medium px-4 py-3">Category</th>
              <th className="text-left font-medium px-4 py-3">Scheduled (IST)</th>
              <th className="text-left font-medium px-4 py-3">Status</th>
              <th className="text-right font-medium px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {grouped[tab].map((p) => (
              <tr key={p.id} className="border-t border-slate-100 align-top">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-800">{p.title}</p>
                  <p className="text-slate-400 text-[11px]">/insights/{p.slug}</p>
                  {p.last_error && <p className="text-red-600 text-[11px] mt-1">{p.last_error}</p>}
                </td>
                <td className="px-4 py-3 text-slate-600">{p.category ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">
                  {fmtIst(p.scheduled_date, p.scheduled_time)}
                  {p.status === "scheduled" && data && (
                    <span className="block text-[11px] text-[#0172B6]">{countdown(p.scheduled_date, p.scheduled_time, data.now_ist)}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-[11px] ${
                      p.status === "published"
                        ? "bg-emerald-50 text-emerald-700"
                        : p.status === "scheduled"
                        ? "bg-blue-50 text-[#0172B6]"
                        : p.status === "failed"
                        ? "bg-red-50 text-red-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {p.status}
                  </span>
                  {p.needs_review && <span className="block text-[11px] text-amber-600 mt-1">needs review</span>}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  {p.status !== "published" && (
                    <>
                      <button
                        onClick={() => act(p.id, { action: "publish_overdue", id: p.id })}
                        disabled={busy !== null}
                        className="text-[12px] text-[#001260] underline disabled:opacity-50"
                      >
                        Publish now
                      </button>
                      {p.status !== "scheduled" && (
                        <button
                          onClick={() => act(p.id, { action: "set_status", id: p.id, status: "scheduled" })}
                          disabled={busy !== null}
                          className="ml-3 text-[12px] text-slate-600 underline disabled:opacity-50"
                        >
                          Re-schedule
                        </button>
                      )}
                    </>
                  )}
                  {p.status === "published" && (
                    <button
                      onClick={() => act(p.id, { action: "unpublish", id: p.id })}
                      disabled={busy !== null}
                      className="text-[12px] text-slate-600 underline disabled:opacity-50"
                    >
                      Unpublish
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {grouped[tab].length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  No {tab} posts.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data?.logs?.length ? (
        <div className="mt-6 bg-white rounded-xl border border-slate-200 p-4">
          <p className="font-semibold text-[13px] text-[#001260] mb-3">Recent publishing activity</p>
          <ul className="space-y-1.5 text-[12px] text-slate-600">
            {data.logs.slice(0, 12).map((l) => (
              <li key={l.id}>
                <span className="text-slate-400">{l.created_at.slice(0, 16).replace("T", " ")}</span> — {l.action}
                {l.slug ? ` · ${l.slug}` : ""}
                {l.message ? ` · ${l.message}` : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default AdminBlogs;
