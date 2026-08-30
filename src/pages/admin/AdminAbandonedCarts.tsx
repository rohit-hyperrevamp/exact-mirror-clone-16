import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { commerce, type AbandonedCart } from "@/lib/admin/commerceApi";
import { AdminLoadError, AdminPageHeader, Badge, Btn, EmptyRow, Input, Row, StatCard, TableShell, inr } from "@/lib/admin/ui";
import { DateRangeFilter, filterByDate, useDateRange } from "@/lib/admin/date-filter";
import { Pager, usePager } from "@/lib/admin/pager";
import { MessageCircle, Phone } from "lucide-react";

const AdminAbandonedCarts = () => {
  const qc = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ["admin-carts"],
    queryFn: () => commerce<{ rows: AbandonedCart[] }>("list_carts"),
    retry: false,
  });
  const rows = data?.rows ?? [];
  const { range, setRange } = useDateRange("30d");
  const [q, setQ] = useState("");
  const [onlyOpen, setOnlyOpen] = useState(true);

  const filtered = useMemo(() => {
    let list = filterByDate(rows as unknown as Record<string, unknown>[], "created_at", range) as unknown as AbandonedCart[];
    if (onlyOpen) list = list.filter((c) => !c.recovered);
    if (q) {
      const s = q.toLowerCase();
      list = list.filter((c) => `${c.customer_name ?? ""} ${c.customer_phone ?? ""} ${c.customer_email ?? ""}`.toLowerCase().includes(s));
    }
    return list;
  }, [rows, range, onlyOpen, q]);

  const value = filtered.reduce((s, c) => s + Number(c.subtotal ?? 0), 0);
  const recovered = rows.filter((c) => c.recovered).length;
  const { pageRows, pager } = usePager(filtered, 25);
  const cols = "1fr 1.3fr 120px 120px 150px";

  async function toggle(c: AbandonedCart) {
    await commerce("update_cart", { id: c.id, patch: { recovered: !c.recovered } });
    qc.invalidateQueries({ queryKey: ["admin-carts"] });
    qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
  }

  return (
    <>
      <AdminPageHeader
        kicker="Commerce"
        title="Abandoned carts"
        subtitle="Patients who selected tests but left before confirming the booking. Follow up by call or WhatsApp."
        actions={<DateRangeFilter value={range} onChange={setRange} />}
      />
      {error && <AdminLoadError label="Abandoned carts" error={error} />}

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Open carts" value={filtered.length} />
        <StatCard label="Value at risk" value={inr(value)} accent={value > 0} />
        <StatCard label="Recovered" value={recovered} />
        <StatCard label="Recovery rate" value={rows.length ? `${Math.round((recovered / rows.length) * 100)}%` : "—"} />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px]">
        <Input placeholder="Search patient, phone, email…" value={q} onChange={(e) => setQ(e.target.value)} />
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <input type="checkbox" checked={onlyOpen} onChange={(e) => setOnlyOpen(e.target.checked)} />
          Hide recovered carts
        </label>
      </div>

      <Pager pager={pager} label="carts" />
      <TableShell minWidth={900}>
        <Row cols={cols} head>
          <div>Patient</div>
          <div>Tests left in cart</div>
          <div>Abandoned</div>
          <div className="text-right">Value</div>
          <div className="text-right">Follow-up</div>
        </Row>
        {pageRows.map((c) => (
          <Row key={c.id} cols={cols}>
            <div className="min-w-0">
              <div className="truncate font-medium text-[#001260]">{c.customer_name || "Guest"}</div>
              <div className="truncate text-xs text-slate-500">{c.customer_phone || c.customer_email || "No contact"}</div>
              {c.recovered && <Badge tone="good">Recovered</Badge>}
            </div>
            <div className="min-w-0 text-xs text-slate-600">
              {(c.items ?? []).slice(0, 3).map((it, i) => (
                <div key={i} className="truncate">
                  {it.name ?? "Test"} × {it.qty ?? 1}
                </div>
              ))}
              {(c.items?.length ?? 0) > 3 && <div className="text-slate-400">+{(c.items?.length ?? 0) - 3} more</div>}
            </div>
            <div className="text-xs text-slate-500">{new Date(c.created_at).toLocaleDateString("en-IN")}</div>
            <div className="text-right tabular-nums">{inr(c.subtotal)}</div>
            <div className="flex items-center justify-end gap-1">
              {c.customer_phone && (
                <>
                  <a
                    href={`tel:${c.customer_phone}`}
                    aria-label="Call patient"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-slate-400"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://wa.me/${c.customer_phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp patient"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-emerald-600 hover:border-emerald-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </>
              )}
              <Btn variant="outline" className="px-2 py-1 text-xs" onClick={() => toggle(c)}>
                {c.recovered ? "Reopen" : "Mark recovered"}
              </Btn>
            </div>
          </Row>
        ))}
        {!filtered.length && <EmptyRow>No abandoned carts in this range.</EmptyRow>}
      </TableShell>
    </>
  );
};

export default AdminAbandonedCarts;
