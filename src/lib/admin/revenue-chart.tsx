import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export type TrendPoint = { date: string; revenue: number; orders: number };

export function RevenueChart({ points }: { points: TrendPoint[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0172B6" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#0172B6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickFormatter={(v: string) => new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
          />
          <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v: number) => `₹${v}`} />
          <Tooltip
            formatter={(v: number, name) => (name === "revenue" ? [`₹${Number(v).toLocaleString("en-IN")}`, "Revenue"] : [v, "Orders"])}
            labelFormatter={(l: string) => new Date(l).toLocaleDateString("en-IN")}
          />
          <Area type="monotone" dataKey="revenue" stroke="#0172B6" strokeWidth={2} fill="url(#revFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
