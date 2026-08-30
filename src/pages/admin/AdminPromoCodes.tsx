import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { commerce, type PromoCode } from "@/lib/admin/commerceApi";
import { AdminLoadError, AdminPageHeader, Badge, Btn, EmptyRow, Field, Input, Row, Select, StatCard, TableShell, inr } from "@/lib/admin/ui";
import { Pager, usePager } from "@/lib/admin/pager";
import { Plus, Trash2 } from "lucide-react";

const BLANK: Partial<PromoCode> = {
  code: "",
  description: "",
  discount_type: "percent",
  discount_value: 10,
  min_order: 0,
  max_redemptions: null,
  starts_at: null,
  ends_at: null,
  status: "active",
};

const AdminPromoCodes = () => {
  const qc = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ["admin-promos"],
    queryFn: () => commerce<{ rows: PromoCode[] }>("list_promos"),
    retry: false,
  });
  const rows = data?.rows ?? [];
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState<Partial<PromoCode> | null>(null);
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(
    () => rows.filter((p) => !q || `${p.code} ${p.description ?? ""}`.toLowerCase().includes(q.toLowerCase())),
    [rows, q],
  );
  const { pageRows, pager } = usePager(filtered, 25);
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-promos"] });

  async function save() {
    if (!draft?.code) return;
    setBusy(true);
    try {
      await commerce("upsert_promo", {
        row: {
          ...draft,
          discount_value: Number(draft.discount_value ?? 0),
          min_order: Number(draft.min_order ?? 0),
          max_redemptions: draft.max_redemptions ? Number(draft.max_redemptions) : null,
          starts_at: draft.starts_at || null,
          ends_at: draft.ends_at || null,
        },
      });
      setDraft(null);
      refresh();
    } finally {
      setBusy(false);
    }
  }

  const cols = "1fr 1.2fr 140px 120px 130px 110px 90px";

  return (
    <>
      <AdminPageHeader
        kicker="Growth"
        title="Promo codes"
        subtitle="Discount codes patients can apply while booking tests and health packages."
        actions={
          <Btn onClick={() => setDraft(draft ? null : BLANK)}>
            <Plus className="mr-1 h-4 w-4" /> New promo code
          </Btn>
        }
      />
      {error && <AdminLoadError label="Promo codes" error={error} />}

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Codes" value={rows.length} />
        <StatCard label="Active" value={rows.filter((p) => p.status === "active").length} />
        <StatCard label="Total redemptions" value={rows.reduce((s, p) => s + Number(p.times_used ?? 0), 0)} />
        <StatCard label="Expired / paused" value={rows.filter((p) => p.status !== "active").length} />
      </div>

      {draft && (
        <div className="mb-6 grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-4">
          <Field label="Code">
            <Input value={draft.code ?? ""} onChange={(e) => setDraft({ ...draft, code: e.target.value.toUpperCase() })} />
          </Field>
          <Field label="Description">
            <Input value={draft.description ?? ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </Field>
          <Field label="Discount type">
            <Select value={draft.discount_type ?? "percent"} onChange={(e) => setDraft({ ...draft, discount_type: e.target.value })}>
              <option value="percent">Percent off</option>
              <option value="flat">Flat ₹ off</option>
            </Select>
          </Field>
          <Field label="Discount value">
            <Input type="number" value={String(draft.discount_value ?? 0)} onChange={(e) => setDraft({ ...draft, discount_value: Number(e.target.value) })} />
          </Field>
          <Field label="Minimum order (₹)">
            <Input type="number" value={String(draft.min_order ?? 0)} onChange={(e) => setDraft({ ...draft, min_order: Number(e.target.value) })} />
          </Field>
          <Field label="Max redemptions" help="Leave blank for unlimited">
            <Input
              type="number"
              value={draft.max_redemptions == null ? "" : String(draft.max_redemptions)}
              onChange={(e) => setDraft({ ...draft, max_redemptions: e.target.value ? Number(e.target.value) : null })}
            />
          </Field>
          <Field label="Starts">
            <Input type="date" value={(draft.starts_at ?? "").slice(0, 10)} onChange={(e) => setDraft({ ...draft, starts_at: e.target.value })} />
          </Field>
          <Field label="Ends">
            <Input type="date" value={(draft.ends_at ?? "").slice(0, 10)} onChange={(e) => setDraft({ ...draft, ends_at: e.target.value })} />
          </Field>
          <div className="md:col-span-4 flex gap-2">
            <Btn onClick={save} disabled={busy}>
              Save promo code
            </Btn>
            <Btn variant="ghost" onClick={() => setDraft(null)}>
              Cancel
            </Btn>
          </div>
        </div>
      )}

      <div className="mb-4 max-w-md">
        <Input placeholder="Search codes…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <Pager pager={pager} label="codes" />
      <TableShell minWidth={950}>
        <Row cols={cols} head>
          <div>Code</div>
          <div>Description</div>
          <div>Discount</div>
          <div>Min order</div>
          <div>Used</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </Row>
        {pageRows.map((p) => (
          <Row key={p.id} cols={cols}>
            <div className="font-mono text-sm font-medium text-[#001260]">{p.code}</div>
            <div className="truncate text-xs text-slate-600">{p.description ?? "—"}</div>
            <div className="text-sm">{p.discount_type === "percent" ? `${p.discount_value}% off` : `${inr(p.discount_value)} off`}</div>
            <div className="text-sm tabular-nums">{p.min_order ? inr(p.min_order) : "—"}</div>
            <div className="text-xs text-slate-600">
              {p.times_used}
              {p.max_redemptions ? ` / ${p.max_redemptions}` : ""}
              {p.ends_at ? <div className="text-slate-400">till {new Date(p.ends_at).toLocaleDateString("en-IN")}</div> : null}
            </div>
            <div>
              <Badge tone={p.status === "active" ? "good" : "neutral"}>{p.status}</Badge>
            </div>
            <div className="flex items-center justify-end gap-1">
              <Btn
                variant="outline"
                className="px-2 py-1 text-xs"
                onClick={async () => {
                  await commerce("upsert_promo", { row: { id: p.id, status: p.status === "active" ? "paused" : "active" } });
                  refresh();
                }}
              >
                {p.status === "active" ? "Pause" : "Activate"}
              </Btn>
              <button
                type="button"
                aria-label={`Delete ${p.code}`}
                onClick={async () => {
                  if (!confirm(`Delete promo code ${p.code}?`)) return;
                  await commerce("delete_promo", { id: p.id });
                  refresh();
                }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Row>
        ))}
        {!filtered.length && <EmptyRow>No promo codes yet.</EmptyRow>}
      </TableShell>
    </>
  );
};

export default AdminPromoCodes;
