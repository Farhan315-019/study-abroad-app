import { useEffect, useState } from "react";
import { api } from "../api/client";
import Select from "../components/ui/Select";
import type { VerifyStatus } from "../api/types";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";

interface AdminUni {
  id: number;
  name: string;
  country: string;
  rank_world: number | null;
  status: VerifyStatus;
  notes: string | null;
  verified_at: string | null;
  ielts_min: number | null;
}

const STATUSES: VerifyStatus[] = ["verified", "approx", "manual"];

export default function AdminVerify() {
  const { user } = useAuth();
  const [items, setItems] = useState<AdminUni[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [offset, setOffset] = useState(0);
  const [busy, setBusy] = useState(false);
  const [agent, setAgent] = useState<{ id: number; summary: string } | null>(null);

  const PAGE = 25;

  const load = async (search = q, filter = statusFilter, off = offset) => {
    const r = await api.get<{ total: number; items: AdminUni[] }>("/admin/universities", {
      params: { q: search, status: filter, page_size: PAGE, offset: off },
    });
    setItems(r.data.items);
    setTotal(r.data.total);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilters = () => {
    setOffset(0);
    load(q, statusFilter, 0);
  };

  const setStatus = async (u: AdminUni, status: VerifyStatus) => {
    const r = await api.patch<AdminUni>(`/admin/universities/${u.id}`, { status });
    setItems((xs) => xs.map((x) => (x.id === u.id ? r.data : x)));
  };

  const runAgent = async (u: AdminUni) => {
    setBusy(true);
    setAgent(null);
    try {
      const r = await api.post<{ university: AdminUni; summary: string }>(
        `/admin/universities/${u.id}/verify`
      );
      setItems((xs) => xs.map((x) => (x.id === u.id ? r.data.university : x)));
      setAgent({ id: u.id, summary: r.data.summary });
    } finally {
      setBusy(false);
    }
  };

  if (!user?.is_admin) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        <p className="text-sm text-slate-400">Admin access required.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Verification dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">
        Manage requirement status. <StatusBadge status="verified" /> Verified ·{" "}
        <StatusBadge status="approx" /> Approximate · <StatusBadge status="manual" /> Manual
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          placeholder="Search by name or country..."
          className="min-w-60 flex-1 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-indigo-500"
        />
        <Select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setOffset(0);
            load(q, e.target.value, 0);
          }}
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
        <button
          onClick={applyFilters}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        >
          Filter
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400">
            <tr>
              <th className="px-4 py-3">University</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">IELTS</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {items.map((u) => (
              <tr key={u.id} className="bg-slate-900/40">
                <td className="px-4 py-3">
                  <div className="text-white">
                    {u.name}
                    {u.rank_world != null && (
                      <span className="ml-1 text-xs text-slate-500">#{u.rank_world}</span>
                    )}
                  </div>
                  {u.verified_at && (
                    <div className="text-xs text-slate-500">Verified {u.verified_at.slice(0, 10)}</div>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-300">{u.country}</td>
                <td className="px-4 py-3 text-slate-300">{u.ielts_min ?? "n/a"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <StatusBadge status={u.status} />
                    <Select
                      compact
                      value={u.status}
                      onChange={(e) => setStatus(u, e.target.value as VerifyStatus)}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Select>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => runAgent(u)}
                    disabled={busy}
                    className="rounded-md border border-indigo-700 px-3 py-1 text-xs text-indigo-300 transition hover:bg-indigo-950 disabled:opacity-50"
                  >
                    Verify with agent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {agent && (
        <div className="mt-4 rounded-lg border border-indigo-800 bg-indigo-950/40 px-4 py-3 text-sm text-indigo-200">
          <strong>Agent result:</strong> {agent.summary}
        </div>
      )}

      <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
        <span>
          Showing {items.length} of {total}
        </span>
        <button
          onClick={() => {
            const off = Math.max(0, offset - PAGE);
            setOffset(off);
            load(q, statusFilter, off);
          }}
          disabled={offset === 0}
          className="rounded-md border border-slate-700 px-3 py-1 transition hover:border-slate-500 disabled:opacity-40"
        >
          Prev
        </button>
        <button
          onClick={() => {
            const off = offset + PAGE;
            setOffset(off);
            load(q, statusFilter, off);
          }}
          disabled={offset + PAGE >= total}
          className="rounded-md border border-slate-700 px-3 py-1 transition hover:border-slate-500 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
