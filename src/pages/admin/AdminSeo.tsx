// SEO/AEO/GEO task tracker — main "Plan" tab.
import { useEffect, useMemo, useState } from "react";
import { callAdmin } from "@/lib/adminApi";
import { Loader2, Plus, Trash2, CheckCircle2, Circle, Clock, ExternalLink, Filter, ShieldCheck, Sparkles, X, Pencil } from "lucide-react";
import { toast } from "sonner";

type Task = {
  id: string;
  scheduled_date: string | null;
  section: string;
  category: string;
  deliverable_type: string | null;
  priority: string;
  effort_minutes: number;
  title: string;
  description: string | null;
  target_url: string | null;
  target_keyword: string | null;
  secondary_keywords: string[] | null;
  content_brief: string | null;
  status: string;
  completed_at: string | null;
  notes: string | null;
};

const SECTION_TONE: Record<string, string> = {
  SEO: "bg-emerald-100 text-emerald-800 border-emerald-200",
  AEO: "bg-violet-100 text-violet-800 border-violet-200",
  GEO: "bg-amber-100 text-amber-800 border-amber-200",
};
const PRIORITY_TONE: Record<string, string> = {
  critical: "bg-red-100 text-red-700 border-red-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  medium: "bg-blue-100 text-blue-700 border-blue-200",
  low: "bg-slate-100 text-slate-700 border-slate-200",
};

const fmtDate = (d: string | null) => !d ? "—" : new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
const todayISO = () => new Date().toISOString().slice(0, 10);

const AdminSeo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSection, setFilterSection] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editing, setEditing] = useState<Task | null>(null);
  const [creating, setCreating] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await callAdmin<{ rows: Task[] }>("seo-data", { op: "list_tasks" });
      setTasks(res.rows ?? []);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load");
    }
    setLoading(false);
  }
  useEffect(() => { void load(); }, []);

  async function updateTask(id: string, patch: Partial<Task>) {
    try {
      await callAdmin("seo-data", { op: "update_task", id, patch });
      toast.success("Saved");
      await load();
    } catch (e) { toast.error(e instanceof Error ? e.message : "Save failed"); }
  }

  async function deleteTask(id: string) {
    if (!confirm("Delete this task?")) return;
    try {
      await callAdmin("seo-data", { op: "delete_task", id });
      toast.success("Deleted");
      await load();
    } catch (e) { toast.error(e instanceof Error ? e.message : "Delete failed"); }
  }

  const filtered = useMemo(() => tasks.filter((t) =>
    (filterSection === "all" || t.section === filterSection) &&
    (filterStatus === "all" || t.status === filterStatus)
  ), [tasks, filterSection, filterStatus]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const t = todayISO();
    const dueToday = tasks.filter((x) => x.scheduled_date === t && x.status !== "done").length;
    const overdue = tasks.filter((x) => x.scheduled_date && x.scheduled_date < t && x.status !== "done").length;
    const inProgress = tasks.filter((x) => x.status === "in_progress").length;
    return { total, done, dueToday, overdue, inProgress, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [tasks]);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-[#001260] via-[#0172B6] to-[#001260] p-6 md:p-8 text-white">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FFC107]/20 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FFC107] mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Aarvak Diagnostics · SEO Command
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">SEO · AEO · GEO Plan</h1>
            <p className="text-sm text-white/70 mt-2 max-w-2xl">
              Day-by-day execution tracker for aarvakdiagnostics.com. Every task maps to a target page, keyword and deliverable.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-white/15 border border-white/20 backdrop-blur">
              <ShieldCheck className="h-3 w-3" /> {stats.done}/{stats.total} shipped
            </span>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Kpi label="Progress" value={`${stats.pct}%`} sub={`${stats.done} / ${stats.total}`} tone="emerald" />
        <Kpi label="Due today" value={String(stats.dueToday)} sub={fmtDate(todayISO())} tone="blue" />
        <Kpi label="Overdue" value={String(stats.overdue)} sub="Need attention" tone={stats.overdue > 0 ? "red" : "slate"} />
        <Kpi label="In progress" value={String(stats.inProgress)} sub="Active" tone="amber" />
        <Kpi label="Total" value={String(stats.total)} sub="All sections" tone="slate" />
      </div>

      {/* Filters + add */}
      <div className="flex flex-wrap items-center gap-2 bg-white rounded-xl border p-3">
        <Filter className="h-4 w-4 text-slate-400" />
        <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)} className="h-9 px-3 rounded-md border border-slate-200 text-sm bg-white">
          <option value="all">All sections</option>
          <option value="SEO">SEO</option>
          <option value="AEO">AEO</option>
          <option value="GEO">GEO</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="h-9 px-3 rounded-md border border-slate-200 text-sm bg-white">
          <option value="all">All statuses</option>
          <option value="todo">Not started</option>
          <option value="in_progress">In progress</option>
          <option value="done">Completed</option>
          <option value="blocked">Blocked</option>
        </select>
        <div className="ml-auto">
          <button onClick={() => setCreating(true)} className="h-9 px-3 rounded-md bg-[#001260] text-white text-sm font-medium inline-flex items-center gap-1.5 hover:bg-[#001260]/90">
            <Plus className="h-4 w-4" /> Add task
          </button>
        </div>
      </div>

      {/* Task list */}
      <div className="bg-white border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center"><Loader2 className="h-5 w-5 mx-auto animate-spin text-slate-400" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            {tasks.length === 0 ? "No tasks yet — click 'Add task' to plan your first SEO action." : "No tasks match the filter."}
          </div>
        ) : (
          <div className="divide-y">
            {filtered.map((t) => (
              <div key={t.id} className="p-4 hover:bg-slate-50/60 transition flex flex-col md:flex-row md:items-start gap-3">
                <button
                  onClick={() => updateTask(t.id, { status: t.status === "done" ? "todo" : "done", completed_at: t.status === "done" ? null : new Date().toISOString() })}
                  className="mt-0.5 shrink-0"
                  title="Toggle done"
                >
                  {t.status === "done"
                    ? <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    : t.status === "in_progress"
                      ? <Clock className="h-5 w-5 text-blue-500" />
                      : <Circle className="h-5 w-5 text-slate-300" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide border ${SECTION_TONE[t.section] ?? SECTION_TONE.SEO}`}>{t.section}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide border ${PRIORITY_TONE[t.priority] ?? PRIORITY_TONE.medium}`}>{t.priority}</span>
                    <span className="text-[11px] text-slate-500">{t.category}</span>
                    {t.scheduled_date && (
                      <span className={`text-[11px] ${t.scheduled_date < todayISO() && t.status !== "done" ? "text-red-600 font-medium" : "text-slate-500"}`}>
                        {fmtDate(t.scheduled_date)}
                      </span>
                    )}
                  </div>
                  <div className={`mt-1 font-medium ${t.status === "done" ? "text-slate-400 line-through" : "text-slate-900"}`}>{t.title}</div>
                  {t.description && <div className="text-sm text-slate-600 mt-0.5">{t.description}</div>}
                  <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                    {t.target_url && (
                      <a href={t.target_url.startsWith("http") ? t.target_url : `https://www.aarvakdiagnostics.com${t.target_url}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#0172B6] hover:underline">
                        <ExternalLink className="h-3 w-3" /> {t.target_url}
                      </a>
                    )}
                    {t.target_keyword && <span>🎯 {t.target_keyword}</span>}
                    {t.deliverable_type && <span>📦 {t.deliverable_type}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <select
                    value={t.status}
                    onChange={(e) => updateTask(t.id, { status: e.target.value, completed_at: e.target.value === "done" ? new Date().toISOString() : null })}
                    className="h-8 px-2 rounded-md border border-slate-200 text-xs bg-white"
                  >
                    <option value="todo">Not started</option>
                    <option value="in_progress">In progress</option>
                    <option value="done">Completed</option>
                    <option value="blocked">Blocked</option>
                  </select>
                  <button onClick={() => setEditing(t)} className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-slate-100" title="Edit">
                    <Pencil className="h-3.5 w-3.5 text-slate-500" />
                  </button>
                  <button onClick={() => deleteTask(t.id)} className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-red-50" title="Delete">
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {(editing || creating) && (
        <TaskEditor
          task={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSaved={async () => { setEditing(null); setCreating(false); await load(); }}
        />
      )}
    </div>
  );
};

const Kpi = ({ label, value, sub, tone }: { label: string; value: string; sub: string; tone: "emerald" | "blue" | "slate" | "red" | "amber" }) => {
  const bg = {
    emerald: "bg-emerald-50 border-emerald-100",
    blue: "bg-blue-50 border-blue-100",
    slate: "bg-slate-50 border-slate-100",
    red: "bg-red-50 border-red-100",
    amber: "bg-amber-50 border-amber-100",
  }[tone];
  return (
    <div className={`p-4 rounded-xl border ${bg}`}>
      <div className="text-[11px] uppercase tracking-wide text-slate-600">{label}</div>
      <div className="text-2xl font-bold text-slate-900 mt-1">{value}</div>
      <div className="text-[11px] text-slate-500 mt-0.5">{sub}</div>
    </div>
  );
};

const TaskEditor = ({ task, onClose, onSaved }: { task: Task | null; onClose: () => void; onSaved: () => void }) => {
  const [form, setForm] = useState({
    title: task?.title ?? "",
    section: task?.section ?? "SEO",
    category: task?.category ?? "On-page",
    priority: task?.priority ?? "medium",
    scheduled_date: task?.scheduled_date ?? todayISO(),
    target_url: task?.target_url ?? "",
    target_keyword: task?.target_keyword ?? "",
    secondary_keywords: (task?.secondary_keywords ?? []).join(", "),
    description: task?.description ?? "",
    content_brief: task?.content_brief ?? "",
    deliverable_type: task?.deliverable_type ?? "",
    effort_minutes: task?.effort_minutes ?? 30,
    notes: task?.notes ?? "",
    status: task?.status ?? "todo",
  });
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!form.title.trim()) { toast.error("Title required"); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        secondary_keywords: form.secondary_keywords.split(",").map((s) => s.trim()).filter(Boolean),
        effort_minutes: Number(form.effort_minutes) || 30,
      };
      if (task) {
        await callAdmin("seo-data", { op: "update_task", id: task.id, patch: payload });
      } else {
        await callAdmin("seo-data", { op: "create_task", row: payload });
      }
      toast.success(task ? "Updated" : "Created");
      onSaved();
    } catch (e) { toast.error(e instanceof Error ? e.message : "Save failed"); }
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-[#001260]">{task ? "Edit task" : "New task"}</h2>
          <button onClick={onClose} className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-slate-100"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <Field label="Title"><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" /></Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Section">
              <select value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} className="input">
                <option>SEO</option><option>AEO</option><option>GEO</option>
              </select>
            </Field>
            <Field label="Priority">
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="input">
                <option>critical</option><option>high</option><option>medium</option><option>low</option>
              </select>
            </Field>
            <Field label="Status">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input">
                <option value="todo">Not started</option><option value="in_progress">In progress</option><option value="done">Completed</option><option value="blocked">Blocked</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category"><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input" placeholder="e.g. On-page, Technical, Content, GMB" /></Field>
            <Field label="Deliverable type"><input value={form.deliverable_type} onChange={(e) => setForm({ ...form, deliverable_type: e.target.value })} className="input" placeholder="meta, blog, schema, backlink…" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Scheduled date"><input type="date" value={form.scheduled_date} onChange={(e) => setForm({ ...form, scheduled_date: e.target.value })} className="input" /></Field>
            <Field label="Effort (min)"><input type="number" value={form.effort_minutes} onChange={(e) => setForm({ ...form, effort_minutes: Number(e.target.value) })} className="input" /></Field>
          </div>
          <Field label="Target URL"><input value={form.target_url} onChange={(e) => setForm({ ...form, target_url: e.target.value })} className="input" placeholder="/departments/pathology/hematology-tests" /></Field>
          <Field label="Primary keyword"><input value={form.target_keyword} onChange={(e) => setForm({ ...form, target_keyword: e.target.value })} className="input" placeholder="hematology tests in gurugram" /></Field>
          <Field label="Secondary keywords (comma separated)"><input value={form.secondary_keywords} onChange={(e) => setForm({ ...form, secondary_keywords: e.target.value })} className="input" /></Field>
          <Field label="Description"><textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" /></Field>
          <Field label="Content brief"><textarea rows={4} value={form.content_brief} onChange={(e) => setForm({ ...form, content_brief: e.target.value })} className="input" /></Field>
          <Field label="Notes"><textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input" /></Field>
        </div>
        <div className="flex justify-end gap-2 p-5 border-t bg-slate-50 sticky bottom-0">
          <button onClick={onClose} className="h-10 px-4 rounded-md border border-slate-200 text-sm">Cancel</button>
          <button onClick={save} disabled={saving} className="h-10 px-5 rounded-md bg-[#001260] text-white text-sm font-medium inline-flex items-center gap-2 disabled:opacity-60">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save
          </button>
        </div>
      </div>
      <style>{`.input { width: 100%; height: 40px; padding: 0 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; background: #fff; }
        textarea.input { padding: 8px 12px; height: auto; min-height: 60px; resize: vertical; }
        .input:focus { outline: none; border-color: #0172B6; box-shadow: 0 0 0 2px rgba(1,114,182,0.15); }`}</style>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="block text-xs font-medium text-slate-700 mb-1">{label}</span>
    {children}
  </label>
);

export default AdminSeo;
