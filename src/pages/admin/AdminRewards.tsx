import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { commerce, type LoyaltyCampaign, type LoyaltyConfig, type LoyaltyMember } from "@/lib/admin/commerceApi";
import { AdminLoadError, AdminPageHeader, Badge, Btn, EmptyRow, Field, Input, Row, Select, StatCard, TableShell } from "@/lib/admin/ui";
import { Pager, usePager } from "@/lib/admin/pager";
import { Plus, Trash2 } from "lucide-react";

type Payload = {
  config: LoyaltyConfig | null;
  campaigns: LoyaltyCampaign[];
  members: LoyaltyMember[];
  stats: { members: number; points: number; lifetime: number };
};

const BLANK: Partial<LoyaltyCampaign> = { code: "", name: "", kind: "bonus_points", value: 0, audience: "all", active: true };

const AdminRewards = () => {
  const qc = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ["admin-loyalty"],
    queryFn: () => commerce<Payload>("get_loyalty"),
    retry: false,
  });

  const [config, setConfig] = useState<LoyaltyConfig | null>(null);
  const [draft, setDraft] = useState<Partial<LoyaltyCampaign> | null>(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data?.config) setConfig(data.config);
  }, [data]);

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-loyalty"] });
  const setC = (k: keyof LoyaltyConfig, v: string) => {
    setConfig((c) => (c ? { ...c, [k]: Number(v) } : c));
    setSaved(false);
  };

  async function saveConfig() {
    if (!config) return;
    setBusy(true);
    try {
      await commerce("update_loyalty", { patch: config });
      setSaved(true);
    } finally {
      setBusy(false);
    }
  }

  async function saveCampaign() {
    if (!draft?.code || !draft?.name) return;
    setBusy(true);
    try {
      await commerce("upsert_campaign", { row: draft });
      setDraft(null);
      refresh();
    } finally {
      setBusy(false);
    }
  }

  const { pageRows, pager } = usePager(data?.members ?? [], 25);

  return (
    <>
      <AdminPageHeader
        kicker="Growth"
        title="Rewards & loyalty"
        subtitle="Points patients earn on test bookings, how much they can redeem, and the campaigns running on top."
        actions={
          <Btn onClick={() => setDraft(draft ? null : BLANK)}>
            <Plus className="mr-1 h-4 w-4" /> New campaign
          </Btn>
        }
      />
      {error && <AdminLoadError label="Rewards" error={error} />}

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Members" value={data?.stats?.members ?? 0} />
        <StatCard label="Points outstanding" value={(data?.stats?.points ?? 0).toLocaleString("en-IN")} />
        <StatCard label="Lifetime points issued" value={(data?.stats?.lifetime ?? 0).toLocaleString("en-IN")} />
        <StatCard label="Active campaigns" value={(data?.campaigns ?? []).filter((c) => c.active).length} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 text-[11px] uppercase tracking-widest text-slate-500">Earning & redemption rules</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Field label="Points earned (% of order)">
            <Input type="number" value={String(config?.earn_percent ?? 0)} onChange={(e) => setC("earn_percent", e.target.value)} />
          </Field>
          <Field label="1 point equals (₹)">
            <Input type="number" step="0.01" value={String(config?.point_to_rupee ?? 0)} onChange={(e) => setC("point_to_rupee", e.target.value)} />
          </Field>
          <Field label="Max redeemable (% of order)">
            <Input type="number" value={String(config?.max_redeem_percent ?? 0)} onChange={(e) => setC("max_redeem_percent", e.target.value)} />
          </Field>
          <Field label="Minimum order to earn (₹)">
            <Input type="number" value={String(config?.min_order_amount ?? 0)} onChange={(e) => setC("min_order_amount", e.target.value)} />
          </Field>
          <Field label="Points expire after (days)">
            <Input type="number" value={String(config?.expiry_days ?? 0)} onChange={(e) => setC("expiry_days", e.target.value)} />
          </Field>
          <Field label="Max points per order">
            <Input type="number" value={String(config?.max_earn_per_order ?? 0)} onChange={(e) => setC("max_earn_per_order", e.target.value)} />
          </Field>
        </div>
        <Btn className="mt-4" onClick={saveConfig} disabled={busy || !config}>
          {saved ? "Saved" : "Save rules"}
        </Btn>
      </div>

      {draft && (
        <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-5">
          <Field label="Code">
            <Input value={draft.code ?? ""} onChange={(e) => setDraft({ ...draft, code: e.target.value })} />
          </Field>
          <Field label="Campaign name">
            <Input value={draft.name ?? ""} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </Field>
          <Field label="Type">
            <Select value={draft.kind ?? "bonus_points"} onChange={(e) => setDraft({ ...draft, kind: e.target.value })}>
              <option value="bonus_points">Bonus points</option>
              <option value="multiplier">Points multiplier</option>
              <option value="cashback">Cashback</option>
            </Select>
          </Field>
          <Field label="Value">
            <Input type="number" value={String(draft.value ?? 0)} onChange={(e) => setDraft({ ...draft, value: Number(e.target.value) })} />
          </Field>
          <Field label="Audience">
            <Select value={draft.audience ?? "all"} onChange={(e) => setDraft({ ...draft, audience: e.target.value })}>
              <option value="all">All patients</option>
              <option value="new">First-time patients</option>
              <option value="repeat">Repeat patients</option>
            </Select>
          </Field>
          <div className="md:col-span-5 flex gap-2">
            <Btn onClick={saveCampaign} disabled={busy}>
              Save campaign
            </Btn>
            <Btn variant="ghost" onClick={() => setDraft(null)}>
              Cancel
            </Btn>
          </div>
        </div>
      )}

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-widest text-slate-500">Campaigns</h2>
      <TableShell minWidth={760}>
        <Row cols="1fr 140px 140px 120px 110px 90px" head>
          <div>Campaign</div>
          <div>Code</div>
          <div>Type</div>
          <div>Audience</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </Row>
        {(data?.campaigns ?? []).map((c) => (
          <Row key={c.id} cols="1fr 140px 140px 120px 110px 90px">
            <div className="truncate font-medium text-[#001260]">{c.name}</div>
            <div className="text-xs font-mono">{c.code}</div>
            <div className="text-xs text-slate-600">
              {c.kind} · {c.value}
            </div>
            <div className="text-xs text-slate-600">{c.audience ?? "all"}</div>
            <div>
              <Badge tone={c.active ? "good" : "neutral"}>{c.active ? "Active" : "Paused"}</Badge>
            </div>
            <div className="flex items-center justify-end gap-1">
              <Btn
                variant="outline"
                className="px-2 py-1 text-xs"
                onClick={async () => {
                  await commerce("upsert_campaign", { row: { id: c.id, active: !c.active } });
                  refresh();
                }}
              >
                {c.active ? "Pause" : "Start"}
              </Btn>
              <button
                type="button"
                aria-label={`Delete ${c.name}`}
                onClick={async () => {
                  if (!confirm(`Delete campaign ${c.name}?`)) return;
                  await commerce("delete_campaign", { id: c.id });
                  refresh();
                }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Row>
        ))}
        {!data?.campaigns?.length && <EmptyRow>No campaigns yet.</EmptyRow>}
      </TableShell>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-widest text-slate-500">Members</h2>
      <Pager pager={pager} label="members" />
      <TableShell minWidth={700}>
        <Row cols="1fr 160px 130px 130px 110px" head>
          <div>Member</div>
          <div>Phone</div>
          <div className="text-right">Points</div>
          <div className="text-right">Lifetime</div>
          <div>Tier</div>
        </Row>
        {pageRows.map((m) => (
          <Row key={m.id} cols="1fr 160px 130px 130px 110px">
            <div className="truncate">{m.name || "Unnamed"}</div>
            <div className="text-xs text-slate-600">{m.phone}</div>
            <div className="text-right tabular-nums">{m.points_balance}</div>
            <div className="text-right tabular-nums">{m.lifetime_points}</div>
            <div>
              <Badge>{m.tier}</Badge>
            </div>
          </Row>
        ))}
        {!data?.members?.length && <EmptyRow>No loyalty members yet.</EmptyRow>}
      </TableShell>
    </>
  );
};

export default AdminRewards;
