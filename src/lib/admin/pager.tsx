import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type PagerState = {
  page: number;
  pages: number;
  perPage: number;
  total: number;
  from: number;
  to: number;
  setPage: (n: number) => void;
  setPerPage: (n: number) => void;
};

const OPTIONS = [10, 25, 50, 100];

/** Client-side pagination for admin lists. */
export function usePager<T>(rows: T[], initialPerPage = 25) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(initialPerPage);

  const total = rows.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), pages);
  const start = (current - 1) * perPage;

  const pageRows = useMemo(() => rows.slice(start, start + perPage), [rows, start, perPage]);

  const pager: PagerState = {
    page: current,
    pages,
    perPage,
    total,
    from: total === 0 ? 0 : start + 1,
    to: Math.min(total, start + perPage),
    setPage,
    setPerPage: (n: number) => {
      setPerPage(n);
      setPage(1);
    },
  };

  return { pageRows, pager };
}

export function Pager({ pager, label = "items" }: { pager: PagerState; label?: string }) {
  const { page, pages, perPage, total, from, to, setPage, setPerPage } = pager;
  if (total <= OPTIONS[0]) return null;

  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-500">
      <div>
        Showing {from}–{to} of {total} {label}
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <span>Per page</span>
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="rounded border border-slate-200 bg-white px-2 py-1 outline-none"
          >
            {OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="inline-flex h-7 w-7 items-center justify-center rounded border border-slate-200 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-1">
            {page} / {pages}
          </span>
          <button
            type="button"
            aria-label="Next page"
            disabled={page >= pages}
            onClick={() => setPage(page + 1)}
            className="inline-flex h-7 w-7 items-center justify-center rounded border border-slate-200 disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
