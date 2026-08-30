import { useMemo, useState } from "react";
import { Pill } from "./ui";

export type RangePreset = "today" | "7d" | "30d" | "90d" | "month" | "all" | "custom";

export type DateRange = { preset: RangePreset; from: string; to: string };

const PRESETS: { id: RangePreset; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "90d", label: "90 days" },
  { id: "month", label: "This month" },
  { id: "all", label: "All time" },
];

export function resolveRange(range: DateRange): { start: Date | null; end: Date | null; days: number } {
  const now = new Date();
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const back = (n: number) => startOfDay(new Date(now.getTime() - n * 86400000));

  switch (range.preset) {
    case "today":
      return { start: startOfDay(now), end: endOfToday, days: 1 };
    case "7d":
      return { start: back(6), end: endOfToday, days: 7 };
    case "30d":
      return { start: back(29), end: endOfToday, days: 30 };
    case "90d":
      return { start: back(89), end: endOfToday, days: 90 };
    case "month":
      return { start: new Date(now.getFullYear(), now.getMonth(), 1), end: endOfToday, days: now.getDate() };
    case "custom": {
      const start = range.from ? new Date(`${range.from}T00:00:00`) : null;
      const end = range.to ? new Date(`${range.to}T23:59:59.999`) : endOfToday;
      return { start, end, days: 365 };
    }
    default:
      return { start: null, end: null, days: 365 };
  }
}

export function useDateRange(initial: RangePreset = "30d") {
  const [range, setRange] = useState<DateRange>({ preset: initial, from: "", to: "" });
  const resolved = useMemo(() => resolveRange(range), [range]);
  return { range, setRange, ...resolved };
}

/** Client-side filter of any row list by a timestamp field. */
export function filterByDate<T extends Record<string, unknown>>(rows: T[], field: string, range: DateRange): T[] {
  const { start, end } = resolveRange(range);
  if (!start && !end) return rows;
  return rows.filter((r) => {
    const raw = r?.[field];
    if (!raw) return false;
    const t = new Date(String(raw)).getTime();
    if (Number.isNaN(t)) return false;
    if (start && t < start.getTime()) return false;
    if (end && t > end.getTime()) return false;
    return true;
  });
}

export function rangeLabel(range: DateRange) {
  if (range.preset === "all") return "All time";
  if (range.preset === "custom") return `${range.from || "start"} → ${range.to || "today"}`;
  return PRESETS.find((p) => p.id === range.preset)?.label ?? "";
}

export function DateRangeFilter({ value, onChange }: { value: DateRange; onChange: (r: DateRange) => void }) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {PRESETS.map((p) => (
        <Pill key={p.id} active={value.preset === p.id} onClick={() => onChange({ ...value, preset: p.id })}>
          {p.label}
        </Pill>
      ))}
      <label className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs text-slate-500">
        <input
          type="date"
          value={value.from}
          onChange={(e) => onChange({ ...value, preset: "custom", from: e.target.value })}
          className="bg-transparent outline-none"
          aria-label="From date"
        />
        <span>–</span>
        <input
          type="date"
          value={value.to}
          onChange={(e) => onChange({ ...value, preset: "custom", to: e.target.value })}
          className="bg-transparent outline-none"
          aria-label="To date"
        />
      </label>
    </div>
  );
}
