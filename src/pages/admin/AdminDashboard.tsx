import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { commerce, type DashboardData, inrSafe } from "@/lib/admin/dashboardHelpers";
import { AdminLoadError, AdminPageHeader, Badge, EmptyRow, Row, StatCard, TableShell, inr, statusLabel } from "@/lib/admin/ui";
import { DateRangeFilter, rangeLabel, useDateRange } from "@/lib/admin/date-filter";
import { RevenueChart } from "@/lib/admin/revenue-chart";
import { IndianRupee, ShoppingBag, Users, FlaskConical, Clock, ShoppingCart } from "lucide-react";

const AdminDashboard = () => {
  const { range, setRange, start, end } = useDateRange("30d");
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-dashboard", range],
    queryFn: () =>
      commerce<DashboardData>("dashboard", {
        range: range.preset,
        from: range.preset === "custom" && start ? start.toISOString() : undefined,
        to: range.preset === "custom" && end ? end.toISOString() : undefined,
      }),
    retry: false,
    refetchInterval: 60000,
  });

  return (
    <>
      <AdminPageHeader
        kicker="Command Center"
        title="Dashboard"
        subtitle={`Live view of test bookings, revenue and patients · ${rangeLabel(range)}.`}
        actions={<DateRangeFilter value={range} onChange={setRange} />}
      />
      {error && <AdminLoadError label="Dashboard" error={error} />}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total revenue"
          value={inr(data?.revenue ?? 0)}
          hint={`Collected ${inr(data?.paidRevenue ?? 0)} · Pay at lab ${inr(data?.payAtLabPending ?? 0)}`}
          icon={<IndianRupee className="h-4 w-4" />}
        />
        <StatCard
          label="Paid test orders"
          value={data?.paidOrders ?? 0}
          hint={`${data?.tests ?? 0} tests booked`}
          icon={<ShoppingBag className="h-4 w-4" />}
        />
        <StatCard label="Avg order value" value={inr(data?.aov ?? 0)} icon={<IndianRupee className="h-4 w-4" />} />
        <StatCard label="Patients" value={data?.customers ?? 0} icon={<Users className="h-4 w-4" />} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Live tests in catalog" value={data?.activeTests ?? 0} icon={<FlaskConical className="h-4 w-4" />} />
        <StatCard
          label="Pending orders"
          value={data?.pendingOrders ?? 0}
          icon={<Clock className="h-4 w-4" />}
          accent={(data?.pendingOrders ?? 0) > 0}
        />
        <StatCard
          label="Pay at lab pending"
          value={inr(data?.payAtLabPending ?? 0)}
          icon={<IndianRupee className="h-4 w-4" />}
          accent={(data?.payAtLabPending ?? 0) > 0}
        />
        <StatCard
          label="Abandoned carts"
          value={data?.openCarts ?? 0}
          hint={`${inrSafe(data?.cartValue)} at risk`}
          icon={<ShoppingCart className="h-4 w-4" />}
          accent={(data?.openCarts ?? 0) > 0}
        />
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 text-[11px] uppercase tracking-widest text-slate-500">Revenue trend</div>
        {isLoading || !data?.trend?.length ? (
          <div className="flex h-48 items-center justify-center text-sm text-slate-400">
            {isLoading ? "Loading…" : "No test orders in this range."}
          </div>
        ) : (
          <RevenueChart points={data.trend} />
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">Most booked tests</h2>
          <TableShell>
            <Row cols="1fr 90px" head>
              <div>Test</div>
              <div className="text-right">Booked</div>
            </Row>
            {(data?.topTests ?? []).map((t) => (
              <Row key={t.name} cols="1fr 90px">
                <div className="truncate">{t.name}</div>
                <div className="text-right tabular-nums">{t.qty}</div>
              </Row>
            ))}
            {!data?.topTests?.length && <EmptyRow>No tests booked in this range.</EmptyRow>}
          </TableShell>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">Latest test orders</h2>
          <TableShell>
            <Row cols="1fr 110px 110px" head>
              <div>Order</div>
              <div>Status</div>
              <div className="text-right">Total</div>
            </Row>
            {(data?.recentOrders ?? []).map((o) => (
              <Row key={o.id} cols="1fr 110px 110px">
                <div className="min-w-0">
                  <Link to={`/admin/orders/${o.id}`} className="truncate font-medium text-[#0172B6] hover:underline">
                    {o.order_no}
                  </Link>
                  <div className="truncate text-xs text-slate-500">{o.customer_name || o.customer_phone || "Guest"}</div>
                </div>
                <div>
                  <Badge tone={o.status === "cancelled" ? "bad" : o.status === "completed" ? "good" : "neutral"}>
                    {statusLabel(o.status)}
                  </Badge>
                </div>
                <div className="text-right tabular-nums">{inr(o.total)}</div>
              </Row>
            ))}
            {!data?.recentOrders?.length && <EmptyRow>No orders yet.</EmptyRow>}
          </TableShell>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
