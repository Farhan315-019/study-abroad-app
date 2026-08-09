import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Building2,
  CalendarDays,
  Globe2,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  Wallet,
} from "lucide-react";
import { api } from "../api/client";
import type { Paginated, University } from "../api/types";
import StatusBadge from "../components/StatusBadge";
import Select from "../components/ui/Select";
import {
  FadeUp,
  GhostButton,
  GlassCard,
  Orbs,
  PrimaryButton,
  SectionHeader,
  Stagger,
  StaggerItem,
} from "../components/home/shared";
import { UNI_STATS } from "../components/home/data";
import { DESTINATION_COUNTRIES, countryToDbName } from "../data/study";

/* ---------------------------------- helpers ---------------------------------- */

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

function rankColor(rank: number | null) {
  if (!rank) return "var(--text-muted)";
  if (rank <= 25) return "#f59e0b";
  if (rank <= 60) return "#3b82f6";
  return "#06b6d4";
}

/* ---------------------------------- pagination ---------------------------------- */

function PageNav({
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
  const btn =
    "rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-bold text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--text-primary)] disabled:opacity-40 disabled:hover:border-[var(--border)]";
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className="text-sm font-bold text-[var(--text-muted)]">{total.toLocaleString()} universities found</span>
      <div className="flex items-center gap-2">
        <button type="button" className={btn} disabled={page <= 1} onClick={() => onPage(page - 1)}>
          Prev
        </button>
        <span className="px-2 text-sm font-bold text-[var(--text-secondary)]">
          {page} / {pages}
        </span>
        <button type="button" className={btn} disabled={page >= pages} onClick={() => onPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- card ---------------------------------- */

function UniCard({ u }: { u: University }) {
  const tint = tintOf(u.country);
  const flag = FLAGS[u.country] ?? undefined;

  return (
    <GlassCard className="group relative flex h-full flex-col overflow-hidden p-6">
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${tint}, ${tint}44)` }} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
            style={{ background: `${tint}1a`, border: `1px solid ${tint}33` }}
            aria-hidden="true"
          >
            {flag ?? <Building2 size={20} className="text-[var(--text-muted)]" />}
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-base font-bold leading-snug text-[var(--text-primary)] group-hover:text-[var(--primary)]">
              {u.name}
            </h3>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-[var(--text-muted)]">
              <MapPin size={12} /> {u.city ? `${u.city}, ` : ""}
              {u.country}
            </p>
          </div>
        </div>
        <span
          className="flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest"
          style={{ color: rankColor(u.rank_world), background: "var(--surface-soft)" }}
        >
          <Trophy size={11} /> {u.rank_world ? `#${u.rank_world}` : "Top-tier"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--surface-soft)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)]">
          <Wallet size={12} style={{ color: "var(--primary)" }} />
          {u.tuition_min_usd != null ? `From $${u.tuition_min_usd.toLocaleString()}/yr` : "Contact for fees"}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--surface-soft)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)]">
          IELTS {u.ielts_min ?? "—"}
        </span>
        {u.intake_seasons && (
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--surface-soft)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)]">
            <CalendarDays size={12} style={{ color: "var(--primary)" }} />
            {u.intake_seasons.split(",")[0].trim()}
          </span>
        )}
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
        {u.gpa_requirement ? `GPA requirement: ${u.gpa_requirement}` : "Requirements verified against official admissions data."}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
        <StatusBadge status={u.status} />
        <Link
          to={`/universities/${u.id}`}
          className="inline-flex shrink-0 items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[var(--primary)] transition group-hover:gap-2.5"
        >
          View requirements <ArrowRight size={13} />
        </Link>
      </div>
    </GlassCard>
  );
}

/* ---------------------------------- page ---------------------------------- */

const PAGE_SIZE = 9;

export default function FindUniversity() {
  const [list, setList] = useState<University[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [q, setQ] = useState("");
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [budget, setBudget] = useState("");
  const [sort, setSort] = useState("rank");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(false);
    const timer = setTimeout(async () => {
      try {
        const params: Record<string, string | number | undefined> = {
          q: query || undefined,
          country: country === "All" ? undefined : countryToDbName(country),
          sort,
          page,
          page_size: PAGE_SIZE,
        };
        if (budget) params.budget_max = Number(budget);
        const res = await api.get<Paginated<University>>("/universities/", { params, signal: ctrl.signal });
        setList(res.data.items ?? []);
        setTotal(res.data.total ?? 0);
      } catch {
        if (!ctrl.signal.aborted) setError(true);
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 300);
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query, country, budget, sort, page]);

  return (
    <div className="relative overflow-x-clip">
      <Orbs />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-28 sm:pt-32">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--primary)]">
            <Globe2 size={13} /> 10,500+ universities indexed
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-tight sm:text-6xl">
            The right university, <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">zero guesswork.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            Search, filter and compare verified admissions data — ranks, fees, English scores and intakes, every entry linked to the official source.
          </p>
        </FadeUp>

        <FadeUp delay={0.24}>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {UNI_STATS.map((st) => (
              <div key={st.label} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/60 p-4">
                <div className="font-display text-2xl font-black text-brand-gradient">{st.value}</div>
                <div className="mt-1 text-xs font-bold text-[var(--text-muted)]">{st.label}</div>
                <div className="mt-0.5 text-[10.5px] font-semibold text-[var(--text-muted)] opacity-70">{st.hint}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Explore */}
      <section id="explore" className="relative mx-auto max-w-7xl px-6 pb-16">
        <SectionHeader
          tag="Explore universities"
          tagIcon={<Sparkles size={13} />}
          title="Find your"
          highlight="perfect fit"
          subtitle="Search by name or city, filter by country and budget, then sort by rank, name or tuition."
          align="center"
        />

        {/* Search + filters */}
        <FadeUp delay={0.1}>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <label className="relative lg:col-span-2">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setQuery(q);
                    setPage(1);
                  }
                }}
                onBlur={() => {
                  setQuery(q);
                  setPage(1);
                }}
                placeholder="Search name or city…"
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-3.5 pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
              />
            </label>
            <Select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setPage(1);
              }}
            >
              <option value="All">All countries</option>
              {DESTINATION_COUNTRIES.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.flag} {d.name}
                </option>
              ))}
            </Select>
            <input
              value={budget}
              onChange={(e) => {
                setBudget(e.target.value);
                setPage(1);
              }}
              type="number"
              min={0}
              placeholder="Max budget $/yr"
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
            />
            <Select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
            >
              <option value="rank">Sort by rank</option>
              <option value="name">Sort by name</option>
              <option value="tuition">Sort by tuition</option>
            </Select>
          </div>
        </FadeUp>

        {/* Grid */}
        <div className="mt-10">
          {loading ? (
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <StaggerItem key={i}>
                  <div className="h-64 animate-pulse rounded-3xl border border-[var(--border)] bg-[var(--surface)]" />
                </StaggerItem>
              ))}
            </Stagger>
          ) : error ? (
            <div className="mx-auto max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
              <p className="font-display text-lg font-bold text-[var(--text-primary)]">Couldn't load universities</p>
              <button
                type="button"
                onClick={() => {
                  setQ("");
                  setQuery("");
                  setCountry("All");
                  setBudget("");
                  setPage(1);
                }}
                className="mt-4 rounded-2xl border border-[var(--border)] px-4 py-2 text-sm font-bold text-[var(--text-primary)] transition hover:border-[var(--primary)]"
              >
                Reset filters
              </button>
            </div>
          ) : list.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
              <Award size={32} className="mx-auto text-[var(--primary)]" />
              <p className="mt-4 font-display text-lg font-bold text-[var(--text-primary)]">No matches found</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Try a different keyword, country or budget.</p>
            </div>
          ) : (
            <>
              <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((u) => (
                  <StaggerItem key={u.id}>
                    <UniCard u={u} />
                  </StaggerItem>
                ))}
              </Stagger>
              <div className="mt-10">
                <PageNav page={page} total={total} pageSize={PAGE_SIZE} onPage={setPage} />
              </div>
            </>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          tag="How it works"
          tagIcon={<ShieldCheck size={13} />}
          title="Verified data,"
          highlight="honest filters"
          subtitle="We index official admissions pages so the numbers you plan with are real."
          align="center"
        />
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: Search,
              step: "01",
              title: "Search",
              text: "Type a name or city and we'll pull the matching universities with live requirements.",
            },
            {
              icon: Wallet,
              step: "02",
              title: "Filter by budget",
              text: "Set a max tuition and instantly see only the universities that fit your wallet.",
            },
            {
              icon: ArrowRight,
              step: "03",
              title: "Apply",
              text: "Open the official page, review verified requirements, and track it all in your dashboard.",
            },
          ].map((f) => (
            <StaggerItem key={f.step}>
              <GlassCard className="relative h-full overflow-hidden p-7">
                <span className="absolute right-5 top-4 font-display text-5xl font-black text-[var(--text-primary)]/5">
                  {f.step}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
                  <f.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-[var(--text-primary)]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{f.text}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-8">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--primary)]/25 bg-gradient-to-br from-[var(--primary)]/15 via-transparent to-violet-500/10 p-10 text-center sm:p-16">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-black leading-tight sm:text-5xl">
              Not sure where to apply? <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Get matched.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--text-secondary)] sm:text-base">
              Answer 10 quick questions and the AI builds your ranked shortlist — with reasons and scholarship routes included.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton to="/recommendations" size="lg">
                Get matched for free
              </PrimaryButton>
              <GhostButton to="/scholarships" size="lg">
                Explore scholarships
              </GhostButton>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}

