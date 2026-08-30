import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  COLLECTION_TYPES,
  ORDER_STATES,
  collectionLabel,
  commerce,
  methodLabel,
  orderStatusLabel,
  type TestOrder,
} from "@/lib/admin/commerceApi";
import { AdminLoadError, AdminPageHeader, Badge, EmptyRow, Input, Row, Select, StatCard, TableShell, inr, statusLabel } from "@/lib/admin/ui";
import { DateRangeFilter, filterByDate, useDateRange } from "@/lib/admin/date-filter";
import { Pager, usePager } from "@/lib/admin/pager";

function OrderStatusCell({ order, onSaved }: { order: TestOrder; onSaved: () => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div>
      <select
        aria-label={`Update status for ${order.order_no}`}
        value={order.status}
        disabled={busy}
        onChange={async (e) => {
          const next = e.target.value;
          setBusy(true);
          try {
            await commerce("update_order", { id: order.id, patch: { status: next } });
            onSaved();
          } finally {
            setBusy(false);
          }
        }}
        className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-[#0172B6] disabled:opacity-50"
      >
        {ORDER_STATES.map((s) => (
          <option key={s} value={s}>
            {orderStatusLabel(s)}
          </option>
        ))}
      </select>
    </div>
  );
}

const AdminOrders = () => {
  const qc = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => commerce<{ rows: TestOrder[] }>("list_orders"),
    retry: false,
  });
  const rows = data?.rows ?? [];

  const { range, setRange } = useDateRange("30d");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [collection, setCollection] = useState("all");

  const filtered = useMemo(() => {
    let list = filterByDate(rows as unknown as Record<string, unknown>[], "created_at", range) as unknown as TestOrder[];
    if (status !== "all") list = list.filter((o) => o.status === status);
    if (collection !== "all") list = list.filter((o) => o.collection_type === collection);
    if (q) {
      const s = q.toLowerCase();
      list = list.filter((o) =>
        `${o.order_no} ${o.customer_name ?? ""} ${o.customer_phone ?? ""} ${o.customer_email ?? ""}`.toLowerCase().includes(s),
      );
    }
    return list;
  }, [rows, range, status, collection, q]);

  const revenue = filtered.reduce((s, o) => s + Number(o.total ?? 0), 0);
  const collected = filtered.filter((o) => o.payment_status === "paid").reduce((s, o) => s + Number(o.total ?? 0), 0);
  const { pageRows, pager } = usePager(filtered, 25);
  const cols = "1.2fr 1fr 130px 130px 180px 110px";

  return (
    <>
      <AdminPageHeader
        kicker="Commerce"
        title="Test orders"
        subtitle="Every diagnostic test booking received from the website, with collection and payment state."
        actions={<DateRangeFilter value={range} onChange={setRange} />}
      />
      {error && <AdminLoadError label="Test orders" error={error} />}

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Orders" value={filtered.length} />
        <StatCard label="Order value" value={inr(revenue)} />
        <StatCard label="Collected" value={inr(collected)} />
        <StatCard label="Pay at lab pending" value={inr(revenue - collected)} accent={revenue - collected > 0} />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_190px_190px]">
        <Input placeholder="Search order no, patient, phone…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Order status">
          <option value="all">All statuses</option>
          {ORDER_STATES.map((s) => (
            <option key={s} value={s}>
              {orderStatusLabel(s)}
            </option>
          ))}
        </Select>
        <Select value={collection} onChange={(e) => setCollection(e.target.value)} aria-label="Collection type">
          <option value="all">All collection types</option>
          {COLLECTION_TYPES.map((c) => (
            <option key={c} value={c}>
              {collectionLabel(c)}
            </option>
          ))}
        </Select>
      </div>

      <Pager pager={pager} label="orders" />
      <TableShell minWidth={1010}>
        <Row cols={cols} head>
          <div>Order</div>
          <div>Patient</div>
          <div>Collection</div>
          <div>Payment</div>
          <div>Status</div>
          <div className="text-right">Total</div>
        </Row>
        {pageRows.map((o) => (
          <Row key={o.id} cols={cols}>
            <div className="min-w-0">
              <Link to={`/admin/orders/${o.id}`} className="font-medium text-[#0172B6] hover:underline">
                {o.order_no}
              </Link>
              <div className="text-xs text-slate-500">
                {new Date(o.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
              </div>
              <div className="text-xs text-slate-400">{o.items?.length ?? 0} test(s)</div>
            </div>
            <div className="min-w-0">
              <div className="truncate">{o.customer_name || "Guest"}</div>
              <div className="truncate text-xs text-slate-500">{o.customer_phone || o.customer_email || "—"}</div>
            </div>
            <div className="text-xs text-slate-600">
              {collectionLabel(o.collection_type)}
              {o.pincode ? <div className="text-slate-400">{o.pincode}</div> : null}
            </div>
            <div className="text-xs">
              <div>{methodLabel(o.payment_method)}</div>
              <Badge tone={o.payment_status === "paid" ? "good" : o.payment_status === "failed" ? "bad" : "warn"}>
                {statusLabel(o.payment_status)}
              </Badge>
            </div>
            <div>
              <OrderStatusCell
                order={o}
                onSaved={() => {
                  qc.invalidateQueries({ queryKey: ["admin-orders"] });
                  qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
                }}
              />
            </div>
            <div className="text-right tabular-nums font-medium">{inr(o.total)}</div>
          </Row>
        ))}
        {!filtered.length && <EmptyRow>No test orders in this range.</EmptyRow>}
      </TableShell>
    </>
  );
};

export default AdminOrders;
