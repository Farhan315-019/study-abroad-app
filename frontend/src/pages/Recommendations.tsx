import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Banknote,
  Building2,
  GraduationCap,
  MapPin,
  RefreshCw,
  Sparkles,
  Trophy,
  Wallet,
} from "lucide-react";
import { api } from "../api/client";
import type {
  CountryRecommendation,
  RecommendationResult,
  RecommendationUniversity,
} from "../api/types";
import StatusBadge from "../components/StatusBadge";
import { FadeUp, Orbs } from "../components/home/shared";

interface FormState {
  ielts: string;
  pte: string;
  gpa: string;
  budget: string;
  countries: string;
}

const empty: FormState = { ielts: "", pte: "", gpa: "", budget: "", countries: "" };

const FLAGS: Record<string, string> = {
  Germany: "🇩🇪",
  Canada: "🇨🇦",
  Australia: "🇦🇺",
  USA: "🇺🇸",
  "United States": "🇺🇸",
  UK: "🇬🇧",
  "United Kingdom": "🇬🇧",
  Ireland: "🇮🇪",
  "New Zealand": "🇳🇿",
  Netherlands: "🇳🇱",
  Sweden: "🇸🇪",
  Norway: "🇳🇴",
  Denmark: "🇩🇰",
  Finland: "🇫🇮",
  Belgium: "🇧🇪",
  Switzerland: "🇨🇭",
  France: "🇫🇷",
  Italy: "🇮🇹",
  Spain: "🇪🇸",
  Poland: "🇵🇱",
  Hungary: "🇭🇺",
  Czechia: "🇨🇿",
  "Czech Republic": "🇨🇿",
  Singapore: "🇸🇬",
  Japan: "🇯🇵",
  "South Korea": "🇰🇷",
  China: "🇨🇳",
  Malaysia: "🇲🇾",
  UAE: "🇦🇪",
  Turkey: "🇹🇷",
};

const PALETTE = ["#3b82f6", "#06b6d4", "#8b5cf6", "#f59e0b", "#22c55e", "#ec4899", "#f97316", "#14b8a6"];

function tintOf(country: string) {
  let h = 0;
  for (let i = 0; i < country.length; i++) h = (h * 31 + country.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

const inputCls =
  "w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20";

/* ---------------------------------- rows ---------------------------------- */

function UniversityRow({ rec }: { rec: RecommendationUniversity }) {
  const uni = rec.university;
  const tint = tintOf(uni.country);
  const flag = FLAGS[uni.country] ?? undefined;

  return (
    <li className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--primary)]">
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${tint}, ${tint}44)` }} />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
            style={{ background: `${tint}1a`, border: `1px solid ${tint}33` }}
            aria-hidden="true"
          >
            {flag ?? <Building2 size={20} className="text-[var(--text-muted)]" />}
          </span>
          <div>
            <Link
              to={`/universities/${uni.id}`}
              className="font-display text-base font-bold text-[var(--text-primary)] transition hover:text-[var(--primary)]"
            >
              {uni.name}
            </Link>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-[var(--text-muted)]">
              <MapPin size={12} /> {uni.country}
              {uni.city ? ` · ${uni.city}` : ""}
              {uni.rank_world != null ? ` · Rank #${uni.rank_world}` : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white"
            style={{ background: `linear-gradient(135deg, ${tint}, ${tint}bb)` }}
          >
            Match {Math.round((rec.score + 100) / 2)}%
          </span>
          <StatusBadge status={uni.status} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {uni.tuition_min_usd != null && (
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--surface-soft)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)]">
            <Wallet size={12} style={{ color: "var(--primary)" }} />
            From ${uni.tuition_min_usd.toLocaleString()}/yr
          </span>
        )}
        {uni.ielts_min != null && (
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--surface-soft)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)]">
            IELTS {uni.ielts_min}
          </span>
        )}
      </div>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {rec.reasons.map((r, i) => (
          <li
            key={i}
            className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)]"
          >
            {r}
          </li>
        ))}
      </ul>
    </li>
  );
}

function CountryRow({ c }: { c: CountryRecommendation }) {
  const tint = tintOf(c.country);
  const flag = FLAGS[c.country] ?? undefined;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${tint}, ${tint}44)` }} />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">{flag}</span>
          <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">{c.country}</h3>
        </div>
        <span className="shrink-0 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white" style={{ background: `linear-gradient(135deg, ${tint}, ${tint}bb)` }}>
          {c.universities} unis
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {c.avg_tuition_min_usd != null && (
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--surface-soft)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)]">
            <Banknote size={12} style={{ color: "var(--primary)" }} />
            From ${c.avg_tuition_min_usd.toLocaleString()}/yr
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--surface-soft)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)]">
          <GraduationCap size={12} style={{ color: "var(--primary)" }} />
          {c.scholarships} scholarships
        </span>
      </div>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {c.top_reasons.map((r, i) => (
          <li
            key={i}
            className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)]"
          >
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function Recommendations() {
  const [form, setForm] = useState<FormState>(empty);
  const [data, setData] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof FormState) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const load = async (payload?: Partial<FormState>) => {
    setLoading(true);
    setError("");
    const num = (v: string) => (v.trim() === "" ? null : Number(v));
    try {
      const body = {
        ielts: num(payload?.ielts ?? form.ielts),
        pte: num(payload?.pte ?? form.pte),
        gpa: num(payload?.gpa ?? form.gpa),
        budget_per_year_usd: num(payload?.budget ?? form.budget),
        preferred_countries: (payload?.countries ?? form.countries).trim() || null,
      };
      const r = await api.post<RecommendationResult>("/recommendations", body);
      setData(r.data);
    } catch (e: unknown) {
      setError((e as { response?: { data?: { detail?: string } } })?.response?.data?.detail ?? "Failed to load recommendations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    load();
  };

  return (
    <div className="relative overflow-x-clip">
      <Orbs opacity={0.35} />

      <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        {/* Hero */}
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--primary)]">
            <Sparkles size={13} /> AI shortlist
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-black leading-tight sm:text-5xl">
            Your matches, <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">ranked for you.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            The AI scores every country and university against your grades, budget and goals — with the reasons, not guesses.
          </p>
        </FadeUp>

        {/* Form */}
        <FadeUp delay={0.24}>
          <form onSubmit={handleSubmit} className="mt-10 grid gap-3 rounded-[2rem] border border-[var(--border)] bg-[var(--surface-glass)] p-5 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-5 sm:p-6">
            <input className={inputCls} placeholder="IELTS (e.g. 6.5)" value={form.ielts} onChange={set("ielts")} aria-label="IELTS score" />
            <input className={inputCls} placeholder="PTE (e.g. 58)" value={form.pte} onChange={set("pte")} aria-label="PTE score" />
            <input className={inputCls} placeholder="GPA (e.g. 3.2)" value={form.gpa} onChange={set("gpa")} aria-label="GPA" />
            <input className={inputCls} placeholder="Budget $/yr" value={form.budget} onChange={set("budget")} aria-label="Budget per year" />
            <input className={inputCls} placeholder="Countries (e.g. Germany)" value={form.countries} onChange={set("countries")} aria-label="Preferred countries" />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60 sm:col-span-2 lg:col-span-5"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              {loading ? "Matching…" : "Re-run recommendations"}
            </button>
          </form>
        </FadeUp>

        {error && (
          <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm font-bold text-amber-300">
            {error}{" "}
            <Link to="/profile" className="underline">
              Complete your profile
            </Link>
          </div>
        )}

        {data && (
          <div className="mt-12 grid gap-10 lg:grid-cols-5">
            <section className="lg:col-span-2">
              <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-[var(--text-primary)]">
                <Trophy size={18} className="text-[var(--primary)]" /> Top countries
              </h2>
              <div className="space-y-4">
                {data.countries.map((c) => (
                  <CountryRow key={c.country} c={c} />
                ))}
              </div>
            </section>

            <section className="lg:col-span-3">
              <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-[var(--text-primary)]">
                <Building2 size={18} className="text-[var(--primary)]" /> University matches
              </h2>
              <ul className="space-y-4">
                {data.universities.map((rec) => (
                  <UniversityRow key={rec.university.id} rec={rec} />
                ))}
              </ul>
              <Link
                to="/universities"
                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[var(--primary)] transition hover:gap-3"
              >
                Browse all universities <ArrowRight size={15} />
              </Link>
            </section>
          </div>
        )}
      </section>
    </div>
  );
}
