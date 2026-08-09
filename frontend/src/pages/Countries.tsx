import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Banknote,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Globe2,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatedNumber,
  FadeUp,
  GhostButton,
  GlassCard,
  Orbs,
  PrimaryButton,
  SectionHeader,
  Stagger,
  StaggerItem,
} from "../components/home/shared";
import { HERO_STATS } from "../components/home/data";
import { DESTINATIONS, type StudyDestination } from "../data/study";

/* ---------------------------------- data ---------------------------------- */


const REGIONS = ["All", "Europe", "Asia", "North America", "Oceania", "Middle East", "Africa", "South America"];

const COMPARE_ROWS: { key: keyof StudyDestination; label: string; icon: LucideIcon }[] = [
  { key: "tuition", label: "Tuition / year", icon: Banknote },
  { key: "living", label: "Living / month", icon: Wallet },
  { key: "work", label: "Work rights", icon: Briefcase },
  { key: "postStudy", label: "Post-study work", icon: GraduationCap },
  { key: "visaTime", label: "Visa time", icon: Clock3 },
  { key: "intakes", label: "Intakes", icon: CalendarDays },
];

const PERKS: { icon: LucideIcon; title: string; text: string; tint: string }[] = [
  { icon: GraduationCap, title: "Post-study work", text: "Stay, work and build your career after you graduate — every route decoded per country.", tint: "#3b82f6" },
  { icon: ShieldCheck, title: "Verified visa data", text: "Timelines and financial proof requirements pulled from official embassy sources.", tint: "#22c55e" },
  { icon: Wallet, title: "Real cost picture", text: "Tuition plus living costs, so your budget actually matches reality — not marketing.", tint: "#f59e0b" },
  { icon: Sparkles, title: "AI shortlist", text: "Not sure yet? Answer 10 quick questions and get your personal country matches.", tint: "#8b5cf6" },
];

/* ---------------------------------- components ---------------------------------- */

function CountryCard({ c }: { c: StudyDestination }) {
  return (
    <GlassCard className="group relative h-full overflow-hidden p-6">
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: `linear-gradient(90deg, ${c.tint}, ${c.tint}44)` }}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-4xl" aria-hidden="true">{c.flag}</span>
          <div>
            <Link
              to={`/study/${c.slug}`}
              className="font-display text-lg font-bold text-[var(--text-primary)] transition hover:text-[var(--primary)]"
            >
              {c.name}
            </Link>
            <p className="text-[11px] font-bold text-[var(--text-muted)]">
              {c.region} · {c.unis}
            </p>
          </div>
        </div>
        <span
          className="shrink-0 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white"
          style={{ background: `linear-gradient(135deg, ${c.tint}, ${c.tint}bb)` }}
        >
          Fit {c.score}%
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-[var(--surface-soft)] p-2.5">
          <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Fees</p>
          <p className="mt-0.5 text-[11.5px] font-black leading-tight text-[var(--text-primary)]">{c.tuition}</p>
        </div>
        <div className="rounded-xl bg-[var(--surface-soft)] p-2.5">
          <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Work</p>
          <p className="mt-0.5 text-[11.5px] font-black leading-tight text-[var(--text-primary)]">{c.work}</p>
        </div>
        <div className="rounded-xl bg-[var(--surface-soft)] p-2.5">
          <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Visa</p>
          <p className="mt-0.5 text-[11.5px] font-black leading-tight text-[var(--text-primary)]">{c.visaTime}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {c.streams.map((s) => (
          <span
            key={s}
            className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-2.5 py-1 text-[10.5px] font-bold text-[var(--text-secondary)]"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-soft)]">
          <div
            className="h-full rounded-full"
            style={{ width: `${c.score}%`, background: `linear-gradient(90deg, ${c.tint}, ${c.tint}aa)` }}
          />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">GlobleFit</span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          to={`/study/${c.slug}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
          style={{ background: `linear-gradient(135deg, ${c.tint}, ${c.tint}bb)` }}
        >
          Study in {c.name} <ArrowRight size={15} />
        </Link>
        <Link
          to="/recommendations"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--text-primary)] transition group-hover:gap-2.5"
        >
          Build my shortlist
        </Link>
      </div>
    </GlassCard>
  );
}

function CompareTable({
  compare,
  toggleCompare,
}: {
  compare: string[];
  toggleCompare: (name: string) => void;
}) {
  const rows = compare
    .map((name) => DESTINATIONS.find((c) => c.name === name))
    .filter((c): c is StudyDestination => Boolean(c));

  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-glass)] backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="px-5 py-4 text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                Factor
              </th>
              {rows.map((c) => (
                <th key={c.name} className="px-4 py-4 text-center">
                  <span className="text-2xl" aria-hidden="true">{c.flag}</span>
                  <Link to={`/study/${c.slug}`} className="mt-1 block text-sm font-bold text-[var(--text-primary)] transition hover:text-[var(--primary)]">
                    {c.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.key} className="border-b border-[var(--border)] last:border-0">
                <td className="px-5 py-3.5 text-sm font-bold text-[var(--text-secondary)]">
                  <row.icon size={15} className="mr-2 inline-block text-[var(--primary)]" />
                  {row.label}
                </td>
                {rows.map((c) => (
                  <td key={c.name} className="px-4 py-3.5 text-center text-sm font-semibold text-[var(--text-primary)]">
                    {String(c[row.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] px-5 py-4">
        <span className="mr-1 text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">
          Compare:
        </span>
        {DESTINATIONS.map((c) => {
          const active = compare.includes(c.name);
          const disabled = !active && compare.length >= 6;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => toggleCompare(c.name)}
              disabled={disabled}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                active
                  ? "border-transparent text-white"
                  : "border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:border-[var(--primary)] disabled:opacity-40"
              }`}
              style={active ? { background: `linear-gradient(135deg, ${c.tint}, ${c.tint}bb)` } : undefined}
            >
              <span aria-hidden="true">{c.flag}</span> {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function Countries() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [compare, setCompare] = useState(["Germany", "Canada", "Australia", "UK"]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DESTINATIONS.filter(
      (c) =>
        (region === "All" || c.region === region) &&
        (q === "" ||
          c.name.toLowerCase().includes(q) ||
          c.streams.some((s) => s.toLowerCase().includes(q)))
    );
  }, [query, region]);

  const toggleCompare = (name: string) => {
    setCompare((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : prev.length < 6 ? [...prev, name] : prev
    );
  };

  return (
    <div className="relative overflow-x-clip">
      {/* =============================== HERO =============================== */}
      <section className="relative overflow-hidden py-20 lg:py-28" aria-labelledby="countries-hero-title">
        <Orbs opacity={0.35} />
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FadeUp>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-glass)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--text-secondary)] backdrop-blur">
                <Globe2 size={13} className="text-[var(--primary)]" /> 70+ study destinations
              </span>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h1
                id="countries-hero-title"
                className="mt-6 font-display text-4xl font-bold leading-[1.06] tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-[4.4rem]"
              >
                Pick your
                <br />
                <span className="text-brand-gradient">destination.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                Real tuition, real work rights, real visa timelines — decoded from official sources so you
                never follow a consultant's guess.
              </p>
            </FadeUp>

            <FadeUp delay={0.24}>
              <div className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {HERO_STATS.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                      <AnimatedNumber to={s.value} suffix={s.suffix} duration={1.6} />
                    </p>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ========================== FILTER + CARDS ========================== */}
      <section className="relative py-12 lg:py-20" aria-labelledby="countries-grid-title">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <SectionHeader
              align="left"
              tag="Explore"
              title="All countries,"
              highlight="one place."
              subtitle="Filter by region or search by course — each card shows fees, work rights, visa time and your match score."
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="relative block">
                <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search country or course…"
                  aria-label="Search countries or courses"
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 text-sm font-semibold text-[var(--text-primary)] outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 sm:w-64"
                />
              </label>
              <div className="flex flex-wrap gap-2">
                {REGIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRegion(r)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                      region === r
                        ? "bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-white shadow-[var(--shadow-soft)]"
                        : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--primary)]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filtered.length > 0 ? (
            <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3" gap={0.07}>
              {filtered.map((c) => (
                <StaggerItem key={c.name} className="h-full">
                  <CountryCard c={c} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <div className="mt-12 rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface-glass)] px-6 py-16 text-center">
              <p className="font-display text-xl font-bold text-[var(--text-primary)]">No matches found</p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">Try another course or clear the region filter.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setRegion("All");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[var(--surface-soft)] px-6 py-3 text-sm font-bold text-[var(--text-primary)] transition hover:bg-[var(--surface)]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================== COMPARE ========================== */}
      <section className="relative py-12 lg:py-20" aria-labelledby="countries-compare-title">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <SectionHeader
            tag="Head to head"
            tagIcon={<Globe2 size={13} />}
            title="Compare up to 6"
            highlight="countries."
            subtitle="Tap the chips below the table to add or remove destinations and see the real numbers side by side."
          />

          <FadeUp delay={0.1} className="mt-12">
            <CompareTable compare={compare} toggleCompare={toggleCompare} />
          </FadeUp>
        </div>
      </section>

      {/* ========================== PERKS ========================== */}
      <section className="relative py-12 lg:py-20" aria-labelledby="countries-perks-title">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <SectionHeader
            tag="Why it matters"
            tagIcon={<ShieldCheck size={13} />}
            title="Decisions,"
            highlight="not guesses."
            subtitle="Everything on this page is verified against official sources and kept up to date — so the numbers you plan with are real."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.09}>
            {PERKS.map((p) => (
              <StaggerItem key={p.title} className="h-full">
                <GlassCard className="h-full p-6">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                    style={{ background: `linear-gradient(135deg, ${p.tint}, ${p.tint}99)`, boxShadow: `0 12px 26px -10px ${p.tint}` }}
                  >
                    <p.icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-[var(--text-primary)]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{p.text}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ========================== CTA ========================== */}
      <section className="relative py-16 lg:py-24" aria-labelledby="countries-cta-title">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <FadeUp>
            <div className="relative overflow-hidden rounded-[36px] border border-[var(--border)] p-10 text-center sm:p-16">
              <div
                className="pointer-events-none absolute inset-0 opacity-90"
                style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.16), rgba(139,92,246,0.14) 55%, rgba(6,182,212,0.12))" }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-glass)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--text-secondary)] backdrop-blur">
                  <Sparkles size={13} className="text-[var(--primary)]" /> Not sure where to start?
                </span>
                <h2
                  id="countries-cta-title"
                  className="mx-auto mt-6 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl"
                >
                  Answer 10 quick questions and get your <span className="text-brand-gradient">personal country matches.</span>
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--text-muted)]">
                  The AI ranks every country for your grades, budget and goals — with the reasons and the
                  scholarship routes included.
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <PrimaryButton to="/recommendations" size="lg">
                    Build my shortlist <ArrowRight size={16} />
                  </PrimaryButton>
                  <GhostButton to="/universities" size="lg">
                    Browse universities <ArrowRight size={16} />
                  </GhostButton>
                </div>
                <p className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Free forever plan · No agency fees · Verified data
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
