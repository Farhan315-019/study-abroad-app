import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import type { ApplicationPackage } from "../api/types";

export default function PrintPackage() {
  const navigate = useNavigate();
  const [data, setData] = useState<ApplicationPackage | null>(null);

  useEffect(() => {
    const load = async () => {
      const r = await api.get<ApplicationPackage>("/applications/package");
      if (r.data.applications.length === 0) {
        navigate("/applications");
        return;
      }
      setData(r.data);
      setTimeout(() => window.print(), 300);
    };
    load().catch(() => navigate("/applications"));
  }, [navigate]);

  if (!data) {
    return <div className="mx-auto max-w-4xl px-4 py-10 text-slate-400">Preparing your package...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <button
        onClick={() => navigate("/applications")}
        className="mb-6 rounded-md border border-slate-700 px-4 py-2 text-slate-300 transition hover:border-slate-500 print:hidden"
      >
        Back to applications
      </button>

      <div className="space-y-8">
        {data.applications.map((a) => (
          <section
            key={a.id}
            className="break-after-page rounded-xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <h1 className="text-xl font-bold text-white">
              {data.user.name} - {a.university.name}
            </h1>
            <p className="text-sm text-slate-400">
              {a.university.country}
              {a.university.city ? ` - ${a.university.city}` : ""}
              {" | Status: "}
              {a.status}
              {a.university.ielts_min != null ? ` | IELTS min ${a.university.ielts_min}` : ""}
              {" | Rank #"}
              {a.university.rank_world ?? "n/a"}
            </p>

            {a.sop_draft && (
              <div className="mt-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-300">
                  Statement of Purpose
                </h2>
                <pre className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                  {a.sop_draft}
                </pre>
              </div>
            )}
            {a.email_draft && (
              <div className="mt-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-300">
                  Email Draft
                </h2>
                <pre className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                  {a.email_draft}
                </pre>
              </div>
            )}
            {a.checklist && (
              <div className="mt-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-300">
                  Checklist
                </h2>
                <pre className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                  {a.checklist}
                </pre>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
