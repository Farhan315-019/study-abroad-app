import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import Select from "../components/ui/Select";
import type { StudentProfile } from "../api/types";

interface FormState {
  current_country: string;
  nationality: string;
  highest_education: string;
  gpa: string;
  ielts: string;
  pte: string;
  budget_per_year_usd: string;
  preferred_countries: string;
  preferred_degrees: string;
  target_intake: string;
  goal: string;
}

const empty: FormState = {
  current_country: "",
  nationality: "",
  highest_education: "",
  gpa: "",
  ielts: "",
  pte: "",
  budget_per_year_usd: "",
  preferred_countries: "",
  preferred_degrees: "",
  target_intake: "",
  goal: "",
};

export default function Profile() {
  const [form, setForm] = useState<FormState>(empty);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.get<StudentProfile | null>("/me/profile").then((r) => {
      if (!r.data) return;
      setForm({
        current_country: r.data.current_country ?? "",
        nationality: r.data.nationality ?? "",
        highest_education: r.data.highest_education ?? "",
        gpa: r.data.gpa != null ? String(r.data.gpa) : "",
        ielts: r.data.ielts != null ? String(r.data.ielts) : "",
        pte: r.data.pte != null ? String(r.data.pte) : "",
        budget_per_year_usd:
          r.data.budget_per_year_usd != null ? String(r.data.budget_per_year_usd) : "",
        preferred_countries: r.data.preferred_countries ?? "",
        preferred_degrees: r.data.preferred_degrees ?? "",
        target_intake: r.data.target_intake ?? "",
        goal: r.data.goal ?? "",
      });
    });
  }, []);

  const set = (k: keyof FormState) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setSaved(false);
    const num = (v: string) => (v.trim() === "" ? null : Number(v));
    await api.put("/me/profile", {
      ...form,
      gpa: num(form.gpa),
      ielts: num(form.ielts),
      pte: num(form.pte),
      budget_per_year_usd: num(form.budget_per_year_usd),
      completed: true,
    });
    setBusy(false);
    setSaved(true);
  };

  const input =
    "rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none transition focus:border-indigo-500";
  const label = "flex flex-col gap-1 text-sm";
  const span = "text-slate-400";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Your profile</h1>
      <p className="mt-1 text-sm text-slate-400">
        This helps us recommend the right countries and universities for you.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className={label}>
          <span className={span}>Current country</span>
          <input className={input} value={form.current_country} onChange={set("current_country")} />
        </label>
        <label className={label}>
          <span className={span}>Nationality</span>
          <input className={input} value={form.nationality} onChange={set("nationality")} />
        </label>
        <Select
          label="Highest education"
          value={form.highest_education}
          onChange={set("highest_education")}
        >
          <option value="">Select...</option>
          <option value="High school">High school</option>
          <option value="FSc / Intermediate">FSc / Intermediate</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Master">Master</option>
        </Select>
        <label className={label}>
          <span className={span}>GPA (out of 4.0)</span>
          <input
            className={input}
            type="number"
            step="0.01"
            min="0"
            max="5"
            value={form.gpa}
            onChange={set("gpa")}
            placeholder="3.2"
          />
        </label>
        <label className={label}>
          <span className={span}>IELTS score (0-9)</span>
          <input
            className={input}
            type="number"
            step="0.5"
            min="0"
            max="9"
            value={form.ielts}
            onChange={set("ielts")}
            placeholder="6.5"
          />
        </label>
        <label className={label}>
          <span className={span}>PTE score (0-90)</span>
          <input
            className={input}
            type="number"
            step="1"
            min="0"
            max="90"
            value={form.pte}
            onChange={set("pte")}
            placeholder="58"
          />
        </label>
        <label className={label}>
          <span className={span}>Budget per year (USD)</span>
          <input
            className={input}
            type="number"
            min="0"
            value={form.budget_per_year_usd}
            onChange={set("budget_per_year_usd")}
            placeholder="20000"
          />
        </label>
        <label className={label}>
          <span className={span}>Target intake</span>
          <input
            className={input}
            value={form.target_intake}
            onChange={set("target_intake")}
            placeholder="Fall 2026"
          />
        </label>
        <label className={`${label} sm:col-span-2`}>
          <span className={span}>Preferred countries (comma separated)</span>
          <input
            className={input}
            value={form.preferred_countries}
            onChange={set("preferred_countries")}
            placeholder="Canada, Germany, Malaysia"
          />
        </label>
        <label className={`${label} sm:col-span-2`}>
          <span className={span}>Preferred degrees</span>
          <input
            className={input}
            value={form.preferred_degrees}
            onChange={set("preferred_degrees")}
            placeholder="Computer Science, Data Science"
          />
        </label>
        <label className={`${label} sm:col-span-2`}>
          <span className={span}>Your goal</span>
          <textarea
            className={`${input} min-h-24`}
            value={form.goal}
            onChange={set("goal")}
            placeholder="e.g. Bachelor in Computer Science with a path to PR"
          />
        </label>

        <div className="flex items-center gap-4 sm:col-span-2">
          <button
            type="submit"
            disabled={busy}
            className="rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
          >
            {busy ? "Saving..." : "Save profile"}
          </button>
          {saved && (
            <span className="text-sm text-emerald-300">
              Profile saved —{" "}
              <Link to="/recommendations" className="underline">
                get recommendations
              </Link>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
