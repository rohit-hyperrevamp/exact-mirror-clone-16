import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { commerce, type Customer } from "@/lib/admin/commerceApi";
import { AdminLoadError, AdminPageHeader, Badge, EmptyRow, Input, Row, Select, StatCard, TableShell, inr } from "@/lib/admin/ui";
import { Pager, usePager } from "@/lib/admin/pager";
import { MessageCircle, Phone } from "lucide-react";

type SortKey = "recent" | "spend" | "orders";

const AdminCustomers = () => {
  const { data, error } = useQuery({
    queryKey: ["admin-customers"],
    queryFn: () => commerce<{ rows: Customer[] }>("list_customers"),
    retry: false,
  });
  const rows = data?.rows ?? [];
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("recent");

  const filtered = useMemo(() => {
    let list = rows;
    if (q) {
      const s = q.toLowerCase();
      list = list.filter((c) => `${c.name ?? ""} ${c.phone} ${c.email ?? ""} ${c.city ?? ""}`.toLowerCase().includes(s));
    }
    const sorted = [...list];
    if (sort === "spend") sorted.sort((a, b) => b.spend - a.spend);
    else if (sort === "orders") sorted.sort((a, b) => b.orders - a.orders);
    else
      sorted.sort(
        (a, b) => new Date(b.last_order_at ?? b.created_at).getTime() - new Date(a.last_order_at ?? a.created_at).getTime(),
      );
    return sorted;
  }, [rows, q, sort]);

  const repeat = rows.filter((c) => c.orders > 1).length;
  const spend = rows.reduce((s, c) => s + c.spend, 0);
  const { pageRows, pager } = usePager(filtered, 25);
  const cols = "1.2fr 1fr 100px 130px 120px 120px";

  return (
    <>
      <AdminPageHeader
        kicker="Commerce"
        title="Patients"
        subtitle="Everyone who has booked a diagnostic test, with booking history and loyalty standing."
      />
      {error && <AdminLoadError label="Patients" error={error} />}

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Patients" value={rows.length} />
        <StatCard label="Repeat patients" value={repeat} hint={rows.length ? `${Math.round((repeat / rows.length) * 100)}% return` : undefined} />
        <StatCard label="Lifetime value" value={inr(spend)} />
        <StatCard label="Avg per patient" value={inr(rows.length ? spend / rows.length : 0)} />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_200px]">
        <Input placeholder="Search patient, phone, email, city…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Sort patients">
          <option value="recent">Most recent booking</option>
          <option value="spend">Highest spend</option>
          <option value="orders">Most bookings</option>
        </Select>
      </div>

      <Pager pager={pager} label="patients" />
      <TableShell minWidth={950}>
        <Row cols={cols} head>
          <div>Patient</div>
          <div>Contact</div>
          <div className="text-right">Orders</div>
          <div className="text-right">Spend</div>
          <div>Loyalty</div>
          <div className="text-right">Reach out</div>
        </Row>
        {pageRows.map((c) => (
          <Row key={c.id} cols={cols}>
            <div className="min-w-0">
              <div className="truncate font-medium text-[#001260]">{c.name || "Unnamed"}</div>
              <div className="truncate text-xs text-slate-500">
                {c.city ?? "—"} · joined {new Date(c.created_at).toLocaleDateString("en-IN")}
              </div>
            </div>
            <div className="min-w-0 text-xs text-slate-600">
              <div className="truncate">{c.phone}</div>
              <div className="truncate text-slate-400">{c.email ?? "—"}</div>
            </div>
            <div className="text-right tabular-nums">{c.orders}</div>
            <div className="text-right tabular-nums">{inr(c.spend)}</div>
            <div className="text-xs">
              {c.points ? (
                <Badge tone="good">
                  {c.points} pts{c.tier ? ` · ${c.tier}` : ""}
                </Badge>
              ) : (
                <span className="text-slate-400">—</span>
              )}
            </div>
            <div className="flex items-center justify-end gap-1">
              <a
                href={`tel:${c.phone}`}
                aria-label={`Call ${c.name ?? c.phone}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-slate-400"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${c.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`WhatsApp ${c.name ?? c.phone}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-emerald-600 hover:border-emerald-300"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </Row>
        ))}
        {!filtered.length && <EmptyRow>No patients yet.</EmptyRow>}
      </TableShell>
    </>
  );
};

export default AdminCustomers;
