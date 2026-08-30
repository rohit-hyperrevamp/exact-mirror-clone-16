import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function inr(n: number) {
  return "₹" + Math.round(Number(n) || 0).toLocaleString("en-IN");
}

export function AdminLoadError({ label, error }: { label: string; error: unknown }) {
  const msg = error instanceof Error ? error.message : String(error ?? "Unknown error");
  return (
    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      <div className="font-medium">{label} failed to load.</div>
      <div className="mt-1 break-words">{msg}</div>
    </div>
  );
}

export function AdminPageHeader({
  kicker,
  title,
  subtitle,
  actions,
}: {
  kicker?: string;
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        {kicker && <div className="text-[11px] uppercase tracking-[0.22em] text-[#0172B6] font-semibold">{kicker}</div>}
        <h1 className="mt-1 text-2xl md:text-3xl font-bold text-[#001260]">{title}</h1>
        {subtitle && <div className="mt-2 max-w-2xl text-sm text-slate-500">{subtitle}</div>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  accent,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-5 shadow-sm",
        accent && "border-[#FFC107]/60 bg-[#FFC107]/5",
      )}
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-slate-500">
        <span>{label}</span>
        {icon && <span className="text-[#0172B6]">{icon}</span>}
      </div>
      <div className="mt-3 text-2xl font-bold text-[#001260]">{value}</div>
      {hint && <div className="mt-2 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}

export function Pill({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs transition",
        active
          ? "border-[#001260] bg-[#001260] text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-400",
      )}
    >
      {children}
    </button>
  );
}

/** "in_review" -> "In review" */
export function statusLabel(s: string) {
  const t = String(s ?? "").replace(/[_-]+/g, " ").trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "good" | "warn" | "bad" }) {
  const tones = {
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
    good: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warn: "bg-amber-50 text-amber-700 border-amber-200",
    bad: "bg-red-50 text-red-700 border-red-200",
  } as const;
  return (
    <span className={cn("inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium", tones[tone])}>
      {children}
    </span>
  );
}

export function StatusSelect({
  value,
  onChange,
  options,
  label = "Status",
  className,
  renderLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label?: string;
  className?: string;
  renderLabel?: (s: string) => string;
}) {
  return (
    <label className={cn("flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5", className)}>
      <span className="text-[11px] uppercase tracking-widest text-slate-400">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent text-sm outline-none">
        {options.map((o) => (
          <option key={o} value={o}>
            {(renderLabel ?? statusLabel)(o)}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#0172B6] focus:ring-2 focus:ring-[#0172B6]/20",
        props.className,
      )}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#0172B6] focus:ring-2 focus:ring-[#0172B6]/20",
        props.className,
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#0172B6]",
        props.className,
      )}
    />
  );
}

export function Field({ label, help, children, span }: { label: string; help?: string; children: ReactNode; span?: 1 | 2 }) {
  return (
    <label className={cn("block", span === 2 && "md:col-span-2")}>
      <div className="mb-1 text-[11px] uppercase tracking-widest text-slate-500">{label}</div>
      {children}
      {help && <div className="mt-1 text-[11px] text-slate-400">{help}</div>}
    </label>
  );
}

export function Btn({
  children,
  variant = "solid",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "outline" | "ghost" | "danger" }) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50",
        variant === "solid" && "bg-[#001260] text-white hover:bg-[#001260]/90",
        variant === "outline" && "border border-slate-200 bg-white text-slate-700 hover:border-slate-400",
        variant === "ghost" && "text-slate-500 hover:text-slate-900",
        variant === "danger" && "border border-red-200 bg-white text-red-600 hover:bg-red-50",
        rest.className,
      )}
    >
      {children}
    </button>
  );
}

export function TableShell({ children, minWidth }: { children: ReactNode; minWidth?: number }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <div style={minWidth ? { minWidth } : undefined}>{children}</div>
    </div>
  );
}

export function Row({ cols, children, head }: { cols: string; children: ReactNode; head?: boolean }) {
  return (
    <div
      style={{ gridTemplateColumns: cols }}
      className={cn(
        "grid items-center gap-3 px-4 py-3",
        head
          ? "border-b border-slate-200 text-[11px] uppercase tracking-widest text-slate-500"
          : "border-b border-slate-100 text-sm last:border-b-0 hover:bg-slate-50/60",
      )}
    >
      {children}
    </div>
  );
}

export function EmptyRow({ children = "Nothing here yet." }: { children?: ReactNode }) {
  return <div className="px-4 py-12 text-center text-sm text-slate-400">{children}</div>;
}
