import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { commerce, methodLabel, type Payment } from "@/lib/admin/commerceApi";
import { AdminLoadError, AdminPageHeader, Badge, EmptyRow, Input, Row, Select, StatCard, TableShell, inr, statusLabel } from "@/lib/admin/ui";
import { DateRangeFilter, filterByDate, useDateRange } from "@/lib/admin/date-filter";
import { Pager, usePager } from "@/lib/admin/pager";
import { Link } from "react-router-dom";

const AdminPayments = () => {
  const { data, error } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: () => commerce<{ rows: Payment[] }>("list_payments"),
    retry: false,
  });
  const rows = data?.rows ?? [];
  const { range, setRange } = useDateRange("30d");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    let list = filterByDate(rows as unknown as Record<string, unknown>[], "created_at", range) as unknown as Payment[];
    if (status !== "all") list = list.filter((p) => p.status === status);
    if (q) {
      const s = q.toLowerCase();
      list = list.filter((p) =>
        `${p.order_no ?? ""} ${p.reference ?? ""} ${p.customer_name ?? ""} ${p.customer_phone ?? ""}`.toLowerCase().includes(s),
      );
    }
    return list;
  }, [rows, range, status, q]);

  const paid = filtered.filter((p) => p.status === "paid");
  const collected = paid.reduce((s, p) => s + Number(p.amount ?? 0), 0);
  const refunded = filtered.filter((p) => p.status === "refunded").reduce((s, p) => s + Number(p.amount ?? 0), 0);
  const { pageRows, pager } = usePager(filtered, 25);
  const cols = "1fr 1fr 140px 130px 120px 110px";

  return (
    <>
      <AdminPageHeader
        kicker="Commerce"
        title="Payments"
        subtitle="Online payments and amounts collected at the centre against test bookings."
        actions={<DateRangeFilter value={range} onChange={setRange} />}
      />
      {error && <AdminLoadError label="Payments" error={error} />}

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Collected" value={inr(collected)} />
        <StatCard label="Successful payments" value={paid.length} />
        <StatCard label="Refunded" value={inr(refunded)} />
        <StatCard label="Avg payment" value={inr(paid.length ? collected / paid.length : 0)} />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_200px]">
        <Input placeholder="Search order no, reference, patient…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Payment status">
          <option value="all">All statuses</option>
          {["pending", "paid", "refunded", "failed"].map((s) => (
            <option key={s} value={s}>
              {statusLabel(s)}
            </option>
          ))}
        </Select>
      </div>

      <Pager pager={pager} label="payments" />
      <TableShell minWidth={950}>
        <Row cols={cols} head>
          <div>Order</div>
          <div>Patient</div>
          <div>Method</div>
          <div>Reference</div>
          <div>Status</div>
          <div className="text-right">Amount</div>
        </Row>
        {pageRows.map((p) => (
          <Row key={p.id} cols={cols}>
            <div className="min-w-0">
              {p.order_id ? (
                <Link to={`/admin/orders/${p.order_id}`} className="font-medium text-[#0172B6] hover:underline">
                  {p.order_no ?? "View order"}
                </Link>
              ) : (
                <span>{p.order_no ?? "—"}</span>
              )}
              <div className="text-xs text-slate-500">
                {new Date(p.paid_at ?? p.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
              </div>
            </div>
            <div className="min-w-0">
              <div className="truncate">{p.customer_name || "Guest"}</div>
              <div className="truncate text-xs text-slate-500">{p.customer_phone || "—"}</div>
            </div>
            <div className="text-xs text-slate-600">
              {methodLabel(p.method ?? p.provider)}
              <div className="text-slate-400">{p.provider}</div>
            </div>
            <div className="truncate text-xs text-slate-500">{p.reference ?? "—"}</div>
            <div>
              <Badge tone={p.status === "paid" ? "good" : p.status === "failed" ? "bad" : p.status === "refunded" ? "neutral" : "warn"}>
                {statusLabel(p.status)}
              </Badge>
            </div>
            <div className="text-right tabular-nums font-medium">{inr(p.amount)}</div>
          </Row>
        ))}
        {!filtered.length && <EmptyRow>No payments in this range.</EmptyRow>}
      </TableShell>
    </>
  );
};

export default AdminPayments;
