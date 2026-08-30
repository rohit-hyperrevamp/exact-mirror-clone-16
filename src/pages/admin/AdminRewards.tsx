import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { commerce, type LoyaltyConfig, type LoyaltyMember } from "@/lib/admin/commerceApi";
import { AdminLoadError, AdminPageHeader, Badge, Btn, EmptyRow, Field, Input, Row, StatCard, TableShell } from "@/lib/admin/ui";
import { Pager, usePager } from "@/lib/admin/pager";

type Payload = {
  config: LoyaltyConfig | null;
  members: LoyaltyMember[];
  stats: { members: number; points: number; lifetime: number };
};

const AdminRewards = () => {
  const { data, error } = useQuery({
    queryKey: ["admin-loyalty"],
    queryFn: () => commerce<Payload>("get_loyalty"),
    retry: false,
  });

  const [config, setConfig] = useState<LoyaltyConfig | null>(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data?.config) setConfig(data.config);
  }, [data]);

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

  const members = useMemo(
    () => [...(data?.members ?? [])].sort((a, b) => Number(b.points_balance ?? 0) - Number(a.points_balance ?? 0)),
    [data],
  );
  const { pageRows, pager } = usePager(members, 25);

  return (
    <>
      <AdminPageHeader
        kicker="Growth"
        title="Rewards & loyalty"
        subtitle="Points patients earn on their test bookings, and how much of an order they can redeem."
      />
      {error && <AdminLoadError label="Rewards" error={error} />}

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard label="Members" value={data?.stats?.members ?? 0} />
        <StatCard label="Points outstanding" value={(data?.stats?.points ?? 0).toLocaleString("en-IN")} />
        <StatCard label="Lifetime points issued" value={(data?.stats?.lifetime ?? 0).toLocaleString("en-IN")} />
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
          <Field label="Max points per order (0 = no cap)">
            <Input type="number" value={String(config?.max_earn_per_order ?? 0)} onChange={(e) => setC("max_earn_per_order", e.target.value)} />
          </Field>
        </div>
        <Btn className="mt-4" onClick={saveConfig} disabled={busy || !config}>
          {saved ? "Saved" : "Save rules"}
        </Btn>
      </div>

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
        {!members.length && <EmptyRow>No loyalty members yet — points are created the moment a patient books a test.</EmptyRow>}
      </TableShell>
    </>
  );
};

export default AdminRewards;
