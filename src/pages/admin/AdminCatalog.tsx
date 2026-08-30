import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { commerce, type LabTest } from "@/lib/admin/commerceApi";
import {
  AdminLoadError,
  AdminPageHeader,
  Badge,
  Btn,
  EmptyRow,
  Input,
  Row,
  Select,
  TableShell,
  inr,
} from "@/lib/admin/ui";
import { Pager, usePager } from "@/lib/admin/pager";
import { Download, Pencil, Plus, Trash2 } from "lucide-react";

const AdminCatalog = () => {
  const qc = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ["admin-tests"],
    queryFn: () => commerce<{ rows: LabTest[] }>("list_tests"),
    retry: false,
  });
  const rows = data?.rows ?? [];

  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  const departments = useMemo(
    () => ["all", ...Array.from(new Set(rows.map((r) => r.department || "Other")))],
    [rows],
  );

  const filtered = useMemo(
    () =>
      rows.filter((r) => {
        if (dept !== "all" && (r.department || "Other") !== dept) return false;
        if (status !== "all" && r.status !== status) return false;
        if (q) {
          const t = `${r.name} ${r.slug} ${r.sub ?? ""}`.toLowerCase();
          if (!t.includes(q.toLowerCase())) return false;
        }
        return true;
      }),
    [rows, dept, status, q],
  );

  const { pageRows, pager } = usePager(filtered, 25);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!slug || !name) return;
    setBusy(true);
    try {
      await commerce("create_test", { slug, name });
      setSlug("");
      setName("");
      setShowForm(false);
      qc.invalidateQueries({ queryKey: ["admin-tests"] });
    } finally {
      setBusy(false);
    }
  }

  async function seed() {
    setBusy(true);
    try {
      const res = await commerce<{ inserted: number; skipped: number; total: number }>("seed_catalog");
      alert(`Catalog import complete.\nAdded: ${res.inserted}\nAlready present: ${res.skipped}\nTotal tests: ${res.total}`);
      qc.invalidateQueries({ queryKey: ["admin-tests"] });
    } finally {
      setBusy(false);
    }
  }

  const cols = "1fr 110px 150px 130px 110px 90px";

  return (
    <>
      <AdminPageHeader
        kicker="Commerce"
        title="Catalog"
        subtitle={`${rows.length} test${rows.length === 1 ? "" : "s"} and packages, mirroring the departments published on aarvakdiagnostics.com.`}
        actions={
          <>
            <Btn variant="outline" onClick={seed} disabled={busy}>
              <Download className="mr-1 h-4 w-4" /> Import from website
            </Btn>
            <Btn onClick={() => setShowForm((v) => !v)}>
              <Plus className="mr-1 h-4 w-4" /> New test
            </Btn>
          </>
        }
      />
      {error && <AdminLoadError label="Catalog" error={error} />}

      {showForm && (
        <form onSubmit={create} className="mb-6 grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-3">
          <Input placeholder="slug (e.g. lipid-profile)" value={slug} onChange={(e) => setSlug(e.target.value)} />
          <Input placeholder="Test name" value={name} onChange={(e) => setName(e.target.value)} />
          <Btn type="submit" disabled={busy}>
            Create test
          </Btn>
        </form>
      )}

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_200px_160px]">
        <Input placeholder="Search tests…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Department">
          {departments.map((d) => (
            <option key={d} value={d}>
              {d === "all" ? "All departments" : d}
            </option>
          ))}
        </Select>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="all">All statuses</option>
          <option value="live">Live</option>
          <option value="draft">Draft</option>
        </Select>
      </div>

      <Pager pager={pager} label="tests" />
      <TableShell minWidth={900}>
        <Row cols={cols} head>
          <div>Test</div>
          <div>Price</div>
          <div>Sample</div>
          <div>Turnaround</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </Row>
        {pageRows.map((t) => (
          <Row key={t.id} cols={cols}>
            <div className="min-w-0">
              <Link to={`/admin/catalog/${t.id}`} className="block truncate font-medium text-[#001260] hover:underline">
                {t.name}
              </Link>
              <div className="truncate text-xs text-slate-500">
                {t.department ?? "—"} · {t.sub ?? t.slug}
              </div>
            </div>
            <div className="tabular-nums">
              {inr(t.price)}
              {t.mrp ? <div className="text-xs text-slate-400 line-through">{inr(t.mrp)}</div> : null}
            </div>
            <div className="truncate text-xs text-slate-500">{t.sample_type ?? "—"}</div>
            <div className="text-xs text-slate-500">
              {t.turnaround ?? "—"}
              {t.fasting_required ? <div className="text-[11px] text-amber-600">Fasting</div> : null}
            </div>
            <div>
              <Badge tone={t.status === "live" ? "good" : "neutral"}>{t.status}</Badge>
            </div>
            <div className="flex items-center justify-end gap-1">
              <Link
                to={`/admin/catalog/${t.id}`}
                aria-label={`Edit ${t.name}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <button
                type="button"
                aria-label={`Delete ${t.name}`}
                onClick={async () => {
                  if (!confirm(`Delete ${t.name}?`)) return;
                  await commerce("delete_test", { id: t.id });
                  qc.invalidateQueries({ queryKey: ["admin-tests"] });
                }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Row>
        ))}
        {!filtered.length && (
          <EmptyRow>
            {rows.length ? "No tests match these filters." : "Catalog is empty — use “Import from website” to load the test list."}
          </EmptyRow>
        )}
      </TableShell>
    </>
  );
};

export default AdminCatalog;
