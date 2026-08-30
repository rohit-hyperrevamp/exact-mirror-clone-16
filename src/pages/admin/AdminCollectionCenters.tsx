import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { commerce, type CollectionCenter } from "@/lib/admin/commerceApi";
import { AdminLoadError, AdminPageHeader, Badge, Btn, EmptyRow, Field, Input, Row, Select, StatCard, TableShell } from "@/lib/admin/ui";
import { Pager, usePager } from "@/lib/admin/pager";
import { Plus, Trash2 } from "lucide-react";

const BLANK: Partial<CollectionCenter> = {
  name: "",
  location: "",
  address: "",
  city: "Gurugram",
  pincode: "",
  phone: "",
  alt_phone: "",
  email: "",
  timings: "7:00 AM – 8:00 PM",
  map_url: "",
  latitude: null,
  longitude: null,
  home_collection: true,
  notes: "",
  sort_order: 0,
  enabled: true,
};

const AdminCollectionCenters = () => {
  const qc = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ["admin-centers"],
    queryFn: () => commerce<{ rows: CollectionCenter[] }>("list_centers"),
    retry: false,
  });
  const rows = data?.rows ?? [];
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState<Partial<CollectionCenter> | null>(null);
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(
    () =>
      rows.filter(
        (c) =>
          !q ||
          `${c.name} ${c.location ?? ""} ${c.address ?? ""} ${c.phone ?? ""} ${c.pincode ?? ""}`
            .toLowerCase()
            .includes(q.toLowerCase()),
      ),
    [rows, q],
  );
  const { pageRows, pager } = usePager(filtered, 25);
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-centers"] });

  async function save() {
    if (!draft?.name) return;
    setBusy(true);
    try {
      await commerce("upsert_center", {
        row: { ...draft, sort_order: Number(draft.sort_order ?? 0) },
      });
      setDraft(null);
      refresh();
    } finally {
      setBusy(false);
    }
  }

  const cols = "1.3fr 1fr 1.6fr 150px 110px 100px 90px";

  return (
    <>
      <AdminPageHeader
        kicker="Commerce"
        title="Collection centers"
        subtitle="Aarvak sample collection centers — name, area, full address, contact numbers and whether the center is currently active."
        actions={
          <Btn onClick={() => setDraft(draft ? null : BLANK)}>
            <Plus className="mr-1 h-4 w-4" /> New center
          </Btn>
        }
      />
      {error && <AdminLoadError label="Collection centers" error={error} />}

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Centers" value={rows.length} />
        <StatCard label="Enabled" value={rows.filter((c) => c.enabled).length} />
        <StatCard label="Disabled" value={rows.filter((c) => !c.enabled).length} />
        <StatCard label="Home collection" value={rows.filter((c) => c.home_collection).length} />
      </div>

      {draft && (
        <div className="mb-6 grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-3">
          <Field label="Center name">
            <Input value={draft.name ?? ""} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </Field>
          <Field label="Location / area" help="e.g. Sector 67, Sohna Road">
            <Input value={draft.location ?? ""} onChange={(e) => setDraft({ ...draft, location: e.target.value })} />
          </Field>
          <Field label="City">
            <Input value={draft.city ?? ""} onChange={(e) => setDraft({ ...draft, city: e.target.value })} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Full address">
              <Input value={draft.address ?? ""} onChange={(e) => setDraft({ ...draft, address: e.target.value })} />
            </Field>
          </div>
          <Field label="Pincode">
            <Input value={draft.pincode ?? ""} onChange={(e) => setDraft({ ...draft, pincode: e.target.value })} />
          </Field>
          <Field label="Phone number">
            <Input value={draft.phone ?? ""} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
          </Field>
          <Field label="Alternate phone">
            <Input value={draft.alt_phone ?? ""} onChange={(e) => setDraft({ ...draft, alt_phone: e.target.value })} />
          </Field>
          <Field label="Email">
            <Input value={draft.email ?? ""} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
          </Field>
          <Field label="Timings">
            <Input value={draft.timings ?? ""} onChange={(e) => setDraft({ ...draft, timings: e.target.value })} />
          </Field>
          <Field label="Google Maps link">
            <Input value={draft.map_url ?? ""} onChange={(e) => setDraft({ ...draft, map_url: e.target.value })} />
          </Field>
          <Field label="Latitude" help="Used to suggest the nearest center to patients">
            <Input
              value={draft.latitude ?? ""}
              onChange={(e) => setDraft({ ...draft, latitude: e.target.value === "" ? null : Number(e.target.value) })}
              inputMode="decimal"
              placeholder="28.4028"
            />
          </Field>
          <Field label="Longitude" help="Used to suggest the nearest center to patients">
            <Input
              value={draft.longitude ?? ""}
              onChange={(e) => setDraft({ ...draft, longitude: e.target.value === "" ? null : Number(e.target.value) })}
              inputMode="decimal"
              placeholder="77.0568"
            />
          </Field>
          <Field label="Home collection">
            <Select
              value={draft.home_collection ? "yes" : "no"}
              onChange={(e) => setDraft({ ...draft, home_collection: e.target.value === "yes" })}
            >
              <option value="yes">Available</option>
              <option value="no">Not available</option>
            </Select>
          </Field>
          <Field label="Status">
            <Select value={draft.enabled ? "enabled" : "disabled"} onChange={(e) => setDraft({ ...draft, enabled: e.target.value === "enabled" })}>
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </Select>
          </Field>
          <Field label="Display order">
            <Input type="number" value={String(draft.sort_order ?? 0)} onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })} />
          </Field>
          <div className="md:col-span-3">
            <Field label="Internal notes">
              <Input value={draft.notes ?? ""} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
            </Field>
          </div>
          <div className="md:col-span-3 flex gap-2">
            <Btn onClick={save} disabled={busy}>
              Save center
            </Btn>
            <Btn variant="ghost" onClick={() => setDraft(null)}>
              Cancel
            </Btn>
          </div>
        </div>
      )}

      <div className="mb-4 max-w-md">
        <Input placeholder="Search centers, area, phone…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <Pager pager={pager} label="centers" />
      <TableShell minWidth={1050}>
        <Row cols={cols} head>
          <div>Center</div>
          <div>Location</div>
          <div>Address</div>
          <div>Phone</div>
          <div>Timings</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </Row>
        {pageRows.map((c) => (
          <Row key={c.id} cols={cols}>
            <div>
              <div className="text-sm font-medium text-[#001260]">{c.name}</div>
              {c.home_collection && <div className="text-[11px] text-slate-500">Home collection</div>}
            </div>
            <div className="text-xs text-slate-600">
              {c.location ?? "—"}
              <div className="text-slate-400">{c.city}{c.pincode ? ` – ${c.pincode}` : ""}</div>
            </div>
            <div className="truncate text-xs text-slate-600">{c.address ?? "—"}</div>
            <div className="text-xs text-slate-700">
              {c.phone ?? "—"}
              {c.alt_phone ? <div className="text-slate-400">{c.alt_phone}</div> : null}
            </div>
            <div className="text-xs text-slate-600">{c.timings ?? "—"}</div>
            <div>
              <Badge tone={c.enabled ? "good" : "neutral"}>{c.enabled ? "enabled" : "disabled"}</Badge>
            </div>
            <div className="flex items-center justify-end gap-1">
              <Btn
                variant="outline"
                className="px-2 py-1 text-xs"
                onClick={async () => {
                  await commerce("upsert_center", { row: { id: c.id, enabled: !c.enabled } });
                  refresh();
                }}
              >
                {c.enabled ? "Disable" : "Enable"}
              </Btn>
              <Btn variant="ghost" className="px-2 py-1 text-xs" onClick={() => setDraft(c)}>
                Edit
              </Btn>
              <button
                type="button"
                aria-label={`Delete ${c.name}`}
                onClick={async () => {
                  if (!confirm(`Delete center ${c.name}?`)) return;
                  await commerce("delete_center", { id: c.id });
                  refresh();
                }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Row>
        ))}
        {!filtered.length && <EmptyRow>No collection centers yet. Add your first center.</EmptyRow>}
      </TableShell>
    </>
  );
};

export default AdminCollectionCenters;
