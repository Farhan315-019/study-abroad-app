export default function Pagination({
  page,
  total,
  pageSize,
  onPage,
}: {
  page: number;
  total: number;
  pageSize: number;
  onPage: (p: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
      <span>
        {total.toLocaleString()} results
      </span>
      <div className="flex items-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
          className="rounded-md border border-slate-700 px-3 py-1.5 transition enabled:hover:border-slate-500 disabled:opacity-40"
        >
          Prev
        </button>
        <span>
          {page} / {pages}
        </span>
        <button
          disabled={page >= pages}
          onClick={() => onPage(page + 1)}
          className="rounded-md border border-slate-700 px-3 py-1.5 transition enabled:hover:border-slate-500 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
