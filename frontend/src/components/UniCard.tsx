import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import type { University } from "../api/types";
import StatusBadge from "./StatusBadge";

export default function UniCard({
  uni,
  onSavedChange,
}: {
  uni: University;
  onSavedChange?: (u: University) => void;
}) {
  const toggleSave = async (e: MouseEvent) => {
    e.preventDefault();
    const res = await api.post<University>(`/universities/${uni.id}/save`).catch(
      () => api.delete<University>(`/universities/${uni.id}/save`)
    );
    onSavedChange?.(res.data);
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-slate-600">
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-white">{uni.name}</h3>
        <StatusBadge status={uni.status} />
      </div>
      <p className="text-sm text-slate-400">
        {uni.country}
        {uni.city ? ` - ${uni.city}` : ""}
      </p>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-300">
        {uni.rank_world != null && (
          <span className="text-slate-500">Rank #{uni.rank_world}</span>
        )}
        {uni.tuition_min_usd != null && (
          <span>
            From ${uni.tuition_min_usd.toLocaleString()}/yr
          </span>
        )}
        {uni.ielts_min != null && <span>IELTS {uni.ielts_min}</span>}
        {uni.intake_seasons && <span>{uni.intake_seasons}</span>}
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm">
        <Link
          to={`/universities/${uni.id}`}
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-white transition hover:bg-indigo-500"
        >
          Details
        </Link>
        <button
          onClick={toggleSave}
          className={`rounded-md border px-3 py-1.5 transition ${
            uni.saved
              ? "border-indigo-600 bg-indigo-950/50 text-indigo-300"
              : "border-slate-700 text-slate-300 hover:border-slate-500"
          }`}
        >
          {uni.saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}
