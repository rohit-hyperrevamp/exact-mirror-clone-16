import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ORDER_STATES,
  PAYMENT_STATES,
  collectionLabel,
  commerce,
  methodLabel,
  type Payment,
  type TestOrder,
  type TestOrderItem,
} from "@/lib/admin/commerceApi";
import { AdminLoadError, AdminPageHeader, Badge, Btn, EmptyRow, Row, StatusSelect, TableShell, Textarea, inr, statusLabel } from "@/lib/admin/ui";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

const AdminOrderDetail = () => {
  const { id = "" } = useParams();
  const qc = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ["admin-order", id],
    queryFn: () => commerce<{ order: TestOrder; items: TestOrderItem[]; payments: Payment[] }>("get_order", { id }),
    retry: false,
  });
  const order = data?.order;
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (order) setNotes(order.notes ?? "");
  }, [order]);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin-order", id] });
    qc.invalidateQueries({ queryKey: ["admin-orders"] });
    qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
  };

  async function patch(p: Record<string, unknown>) {
    setBusy(true);
    try {
      await commerce("update_order", { id, patch: p });
      refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Link to="/admin/orders" className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500 hover:text-slate-900">
        <ArrowLeft className="h-3 w-3" /> Back to test orders
      </Link>
      <AdminPageHeader
        kicker="Commerce · Test order"
        title={order?.order_no ?? "Order"}
        subtitle={
          order
            ? `${collectionLabel(order.collection_type)} · ${methodLabel(order.payment_method)} · booked ${new Date(order.created_at).toLocaleString("en-IN")}`
            : undefined
        }
        actions={
          order && (
            <>
              <StatusSelect value={order.status} onChange={(v) => patch({ status: v })} options={[...ORDER_STATES]} label="Order" />
              <StatusSelect
                value={order.payment_status}
                onChange={(v) => patch({ payment_status: v })}
                options={[...PAYMENT_STATES]}
                label="Payment"
              />
              {order.payment_status !== "paid" && (
                <Btn
                  disabled={busy}
                  onClick={async () => {
                    setBusy(true);
                    try {
                      await commerce("mark_order_paid", { id });
                      refresh();
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  Mark payment received
                </Btn>
              )}
            </>
          )
        }
      />
      {error && <AdminLoadError label="Order" error={error} />}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
          <TableShell minWidth={520}>
            <Row cols="1fr 70px 110px 110px" head>
              <div>Test</div>
              <div className="text-right">Qty</div>
              <div className="text-right">Price</div>
              <div className="text-right">Amount</div>
            </Row>
            {(data?.items ?? []).map((it) => (
              <Row key={it.id} cols="1fr 70px 110px 110px">
                <div className="min-w-0 truncate">{it.test_name}</div>
                <div className="text-right tabular-nums">{it.qty}</div>
                <div className="text-right tabular-nums">{inr(it.price)}</div>
                <div className="text-right tabular-nums">{inr(Number(it.price) * Number(it.qty))}</div>
              </Row>
            ))}
            {!data?.items?.length && <EmptyRow>No line items recorded.</EmptyRow>}
          </TableShell>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Subtotal</span>
              <span className="tabular-nums">{inr(order?.subtotal ?? 0)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Discount {order?.promo_code ? `(${order.promo_code})` : ""}</span>
              <span className="tabular-nums">-{inr(order?.discount ?? 0)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-slate-100 pt-3 text-base font-semibold text-[#001260]">
              <span>Total</span>
              <span className="tabular-nums">{inr(order?.total ?? 0)}</span>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">Payments</h2>
            <TableShell minWidth={520}>
              <Row cols="1fr 120px 120px 110px" head>
                <div>Reference</div>
                <div>Provider</div>
                <div>Status</div>
                <div className="text-right">Amount</div>
              </Row>
              {(data?.payments ?? []).map((p) => (
                <Row key={p.id} cols="1fr 120px 120px 110px">
                  <div className="truncate text-xs">{p.reference ?? "—"}</div>
                  <div className="text-xs">{p.provider}</div>
                  <div>
                    <Badge tone={p.status === "paid" ? "good" : p.status === "failed" ? "bad" : "warn"}>{statusLabel(p.status)}</Badge>
                  </div>
                  <div className="text-right tabular-nums">{inr(p.amount)}</div>
                </Row>
              ))}
              {!data?.payments?.length && <EmptyRow>No payment recorded yet.</EmptyRow>}
            </TableShell>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
            <div className="mb-3 text-[11px] uppercase tracking-widest text-slate-500">Patient</div>
            <div className="font-medium text-[#001260]">{order?.customer_name || "Guest"}</div>
            <div className="text-slate-600">{order?.customer_phone || "—"}</div>
            <div className="break-words text-slate-600">{order?.customer_email || "—"}</div>
            <div className="mt-3 text-[11px] uppercase tracking-widest text-slate-500">Collection</div>
            <div className="text-slate-600">{order ? collectionLabel(order.collection_type) : "—"}</div>
            {order?.address && <div className="mt-1 text-slate-600">{order.address}</div>}
            {order?.pincode && <div className="text-slate-600">PIN {order.pincode}</div>}
            {order?.scheduled_at && (
              <div className="mt-2 text-slate-600">
                Slot: {new Date(order.scheduled_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-2 text-[11px] uppercase tracking-widest text-slate-500">Internal notes</div>
            <Textarea rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} />
            <Btn className="mt-3 w-full" disabled={busy} onClick={() => patch({ notes })}>
              Save notes
            </Btn>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrderDetail;
