import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import type { Application, University } from "../api/types";
import StatusBadge from "../components/StatusBadge";
import Select from "../components/ui/Select";

const STATUSES = ["drafted", "in_progress", "submitted", "offered", "rejected", "withdrawn"] as const;

export default function Applications() {
  const [items, setItems] = useState<Application[]>([]);
  const [unis, setUnis] = useState<University[]>([]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [openDraft, setOpenDraft] = useState<number | null>(null);
  const [draftKind, setDraftKind] = useState<"sop" | "email" | "checklist">("sop");
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const load = async () => {
    const r = await api.get<{ items: Application[] }>("/applications");
    setItems(r.data.items);
  };

  useEffect(() => {
    load().catch(() => {});
  }, []);

  useEffect(() => {
    if (showAdd) searchRef.current?.focus();
  }, [showAdd]);

  const loadUnis = async (q: string) => {
    setSearch(q);
    const r = await api.get<{ items: University[] }>("/universities", {
      params: { q, page_size: 8 },
    });
    setUnis(r.data.items);
  };

  const addUni = async (id: number) => {
    setBusy(true);
    setError("");
    try {
      await api.post("/applications", { university_id: id });
      setShowAdd(false);
      setSearch("");
      await load();
    } catch (e: unknown) {
      setError((e as { response?: { data?: { detail?: string } } }).response?.data?.detail ?? "Failed to add");
    } finally {
      setBusy(false);
    }
  };

  const patchStatus = async (a: Application, status: string) => {
    const r = await api.patch<Application>(`/applications/${a.id}`, { status });
    setItems((xs) => xs.map((x) => (x.id === a.id ? r.data : x)));
  };

  const remove = async (a: Application) => {
    await api.delete(`/applications/${a.id}`);
    setItems((xs) => xs.filter((x) => x.id !== a.id));
  };

  const draft = async (a: Application, kind: "sop" | "email" | "checklist") => {
    setDraftKind(kind);
    setOpenDraft(a.id);
    const r = await api.post<Application>(`/applications/${a.id}/draft-${kind === "sop" ? "sop" : kind === "email" ? "email" : "checklist"}`);
    setItems((xs) => xs.map((x) => (x.id === a.id ? r.data : x)));
  };

  const generatePackage = () => navigate("/applications/print");

  const open = items.find((a) => a.id === openDraft);
  const draftText =
    openDraft != null && open
      ? draftKind === "sop"
        ? open.sop_draft
        : draftKind === "email"
          ? open.email_draft
          : open.checklist
      : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Applications</h1>
          <p className="mt-1 text-sm text-slate-400">
            Track up to 10 universities, draft SOPs, emails and checklists.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAdd((s) => !s)}
            className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-500"
          >
            {showAdd ? "Cancel" : "+ Add university"}
          </button>
          <button
            onClick={generatePackage}
            className="rounded-md border border-slate-700 px-4 py-2 text-slate-200 transition hover:border-slate-500"
          >
            Print package
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <input
            ref={searchRef}
            value={search}
            onChange={(e) => loadUnis(e.target.value)}
            placeholder="Search universities to add..."
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
          <ul className="mt-3 space-y-2">
            {unis
              .filter((u) => !items.some((a) => a.university.id === u.id))
              .map((u) => (
                <li key={u.id} className="flex items-center justify-between gap-3">
                  <div className="text-sm">
                    <span className="text-slate-200">{u.name}</span>
                    <span className="text-slate-500">
                      {" "}
                      - {u.country}
                      {u.ielts_min != null ? ` - IELTS ${u.ielts_min}` : ""}
                    </span>
                  </div>
                  <button
                    onClick={() => addUni(u.id)}
                    disabled={busy}
                    className="rounded-md border border-indigo-600 px-3 py-1 text-sm text-indigo-300 transition hover:bg-indigo-950 disabled:opacity-50"
                  >
                    Add
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-amber-300">{error}</p>}

      {items.length === 0 && !showAdd ? (
        <div className="mt-16 text-center text-slate-400">
          <p>No applications yet.</p>
          <p className="mt-1 text-sm">
            Add universities from the{" "}
            <Link to="/universities" className="text-indigo-400 underline">
              university search
            </Link>{" "}
            or the button above.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((a) => (
            <div key={a.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-white">{a.university.name}</h3>
                  <p className="text-sm text-slate-400">
                    {a.university.country}
                    {a.university.city ? ` - ${a.university.city}` : ""}
                    {a.university.rank_world != null ? ` - Rank #${a.university.rank_world}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={a.university.status} />
                  <Select
                    compact
                    value={a.status}
                    onChange={(e) => patchStatus(a, e.target.value)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <button
                  onClick={() => draft(a, "sop")}
                  className={`rounded-md border px-3 py-1.5 transition ${a.sop_draft ? "border-indigo-700 text-indigo-300" : "border-slate-700 text-slate-300 hover:border-slate-500"}`}
                >
                  {a.sop_draft ? "SOP ready" : "Draft SOP"}
                </button>
                <button
                  onClick={() => draft(a, "email")}
                  className={`rounded-md border px-3 py-1.5 transition ${a.email_draft ? "border-indigo-700 text-indigo-300" : "border-slate-700 text-slate-300 hover:border-slate-500"}`}
                >
                  {a.email_draft ? "Email ready" : "Draft email"}
                </button>
                <button
                  onClick={() => draft(a, "checklist")}
                  className={`rounded-md border px-3 py-1.5 transition ${a.checklist ? "border-indigo-700 text-indigo-300" : "border-slate-700 text-slate-300 hover:border-slate-500"}`}
                >
                  {a.checklist ? "Checklist ready" : "Build checklist"}
                </button>
                <button
                  onClick={() => remove(a)}
                  className="rounded-md border border-red-900 px-3 py-1.5 text-red-300 transition hover:bg-red-950"
                >
                  Remove
                </button>
              </div>

              {a.university.admissions_page && (
                <a
                  href={a.university.admissions_page}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm text-indigo-400 underline"
                >
                  Official admissions page
                </a>
              )}

              {openDraft === a.id && draftText && (
                <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm leading-relaxed text-slate-300">
                  {draftText}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
