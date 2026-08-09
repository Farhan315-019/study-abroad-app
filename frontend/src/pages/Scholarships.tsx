import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  CalendarDays,
  ExternalLink,
  Globe2,
  GraduationCap,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  Wallet,
} from "lucide-react";
import { api } from "../api/client";
import type { Paginated, Scholarship } from "../api/types";
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
import { SCHOLARSHIP_STATS } from "../components/home/data";
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

function tintOf(country: string | null) {
  const key = country ?? "";
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

function formatDeadline(d: string | null) {
  if (!d) return "Rolling";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
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
      <span className="text-sm font-bold text-[var(--text-muted)]">{total.toLocaleString()} scholarships found</span>
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

function ScholarshipCard({ s }: { s: Scholarship }) {
  const tint = tintOf(s.country);
  const flag = s.country ? FLAGS[s.country] : undefined;

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
            {flag ?? <Globe2 size={22} className="text-[var(--text-muted)]" />}
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-base font-bold leading-snug text-[var(--text-primary)]">{s.name}</h3>
            <p className="mt-0.5 text-[11px] font-bold text-[var(--text-muted)]">
              {s.country ?? "Multiple countries"}
              {s.university_id != null ? " · University-specific" : ""}
            </p>
          </div>
        </div>
        <StatusBadge status={s.status} />
      </div>

      {(s.amount_per_year_usd != null || s.coverage) && (
        <div
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-2xl px-3.5 py-2 text-sm font-black text-white"
          style={{ background: `linear-gradient(135deg, ${tint}, ${tint}99)` }}
        >
          <Wallet size={15} />
          {s.amount_per_year_usd != null ? `Up to $${s.amount_per_year_usd.toLocaleString()}/yr` : s.coverage}
        </div>
      )}

      {s.eligibility && (
        <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">{s.eligibility}</p>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)]">
          <CalendarDays size={14} className="text-[var(--primary)]" />
          {formatDeadline(s.deadline)}
        </span>
        {s.link ? (
          <a
            href={s.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[var(--primary)] transition group-hover:gap-2.5"
          >
            Official page <ExternalLink size={13} />
          </a>
        ) : (
          <span className="shrink-0 text-xs font-bold text-[var(--text-muted)]">Verified by GlobleEdu</span>
        )}
      </div>
    </GlassCard>
  );
}

/* ---------------------------------- page ---------------------------------- */

const PAGE_SIZE = 9;

export default function Scholarships() {
  const [list, setList] = useState<Scholarship[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [page, setPage] = useState(1);



  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(false);
    const timer = setTimeout(async () => {
      try {
        const res = await api.get<Paginated<Scholarship>>("/scholarships/", {
          params: {
            q: query || undefined,
            country: country === "All" ? undefined : countryToDbName(country),
            page,
            page_size: PAGE_SIZE,
          },
          signal: ctrl.signal,
        });
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
  }, [query, country, page]);

  return (
    <div className="relative overflow-x-clip">
      <Orbs />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-28 sm:pt-32">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--primary)]">
            <Trophy size={13} /> 98,000+ scholarships indexed
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-tight sm:text-6xl">
            Fund your future, <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">not your loans.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            Discover fully funded, partially funded, and need-based scholarships across 70+ countries — all verified against official sources.
          </p>
        </FadeUp>

        <FadeUp delay={0.24}>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {SCHOLARSHIP_STATS.map((st) => (
              <div key={st.label} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/60 p-4">
                <div className="font-display text-2xl font-black text-[var(--text-primary)]">{st.value}</div>
                <div className="mt-1 text-xs font-bold text-[var(--text-muted)]">{st.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Explore */}
      <section id="explore" className="relative mx-auto max-w-7xl px-6 pb-16">
        <SectionHeader
          tag="Explore scholarships"
          tagIcon={<Sparkles size={13} />}
          title="Find your"
          highlight="funding match"
          subtitle="Search by university, field, or keyword — then filter down to the country you're aiming for."
          align="center"
        />

        {/* Search + filter */}
        <FadeUp delay={0.1}>
          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search scholarships, fields, universities…"
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-3.5 pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
              />
            </label>
            <Select
              className="sm:w-52"
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
              <p className="font-display text-lg font-bold text-[var(--text-primary)]">Couldn't load scholarships</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCountry("All");
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
              <p className="mt-1 text-sm text-[var(--text-muted)]">Try a different keyword or country.</p>
            </div>
          ) : (
            <>
              <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((s) => (
                  <StaggerItem key={s.id}>
                    <ScholarshipCard s={s} />
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
          tagIcon={<GraduationCap size={13} />}
          title="Three steps to"
          highlight="free funding"
          subtitle="We do the research so you can focus on the applications."
          align="center"
        />
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: Globe2,
              step: "01",
              title: "Shortlist",
              text: "Filter scholarships by country, deadline, and amount until your shortlist is razor sharp.",
            },
            {
              icon: ShieldCheck,
              step: "02",
              title: "Verify",
              text: "Every listing links to the official source, so you never fall for a lookalike site or scam.",
            },
            {
              icon: ArrowRight,
              step: "03",
              title: "Apply",
              text: "Track deadlines and apply with confidence — most of our listings are free or fully funded.",
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
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--primary)]/25 bg-gradient-to-br from-[var(--primary)]/15 via-transparent to-emerald-500/10 p-10 text-center sm:p-16">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-black leading-tight sm:text-5xl">
              Your scholarship is out there. <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Go get it.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--text-secondary)] sm:text-base">
              Start exploring now — or get matched with a shortlist of funding that fits your profile.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton to="/recommendations" size="lg">
                Get matched for free
              </PrimaryButton>
              <GhostButton to="/universities" size="lg">
                Browse universities
              </GhostButton>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}

