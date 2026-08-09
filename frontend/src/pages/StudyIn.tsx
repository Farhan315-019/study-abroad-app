import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileCheck2,
  GraduationCap,
  Languages,
  MapPin,
  Plane,
  ShieldCheck,
  Trophy,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import {
  FadeUp,
  GhostButton,
  Orbs,
  PrimaryButton,
} from "../components/home/shared";
import { DESTINATIONS } from "../data/study";
import { api } from "../api/client";
import type { DestinationStats } from "../api/types";

const FACTS: { icon: LucideIcon; label: string; key: "tuition" | "living" | "work" | "postStudy" | "visaTime" | "intakes" }[] = [
  { icon: Banknote, label: "Tuition / yr", key: "tuition" },
  { icon: Wallet, label: "Living / mo", key: "living" },
  { icon: Briefcase, label: "Work rights", key: "work" },
  { icon: GraduationCap, label: "Post-study", key: "postStudy" },
  { icon: Clock3, label: "Visa time", key: "visaTime" },
  { icon: CalendarDays, label: "Intakes", key: "intakes" },
];
export default function StudyIn() {
  const { country } = useParams();
  const c = DESTINATIONS.find((d) => d.slug === country);
  const [stats, setStats] = useState<DestinationStats | null>(null);

  useEffect(() => {
    if (!c) return;
    let active = true;
    setStats(null);
    api
      .get<DestinationStats>(`/destinations/${c.slug}`, { params: { name: c.name } })
      .then((r) => {
        if (active) setStats(r.data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [c]);

  if (!c) {
    return (
      <div className="relative overflow-x-clip">
        <Orbs opacity={0.3} />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="font-display text-2xl font-black text-[var(--text-primary)]">Destination not found</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">We cover 70+ countries — explore the full list instead.</p>
          <Link to="/countries" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-6 py-3 text-sm font-bold text-white">
            <ArrowLeft size={15} /> Browse countries
          </Link>
        </div>
      </div>
    );
  }

  const tint = c.tint;

  return (
    <div className="relative overflow-x-clip">
      <Orbs opacity={0.35} colors={[c.tint, "#2563eb", "#6366f1"]} />

      <section className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <Link to="/countries" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] transition hover:text-[var(--text-primary)]">
          <ArrowLeft size={15} /> All countries
        </Link>

        {/* Hero */}
        <FadeUp>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl text-3xl" style={{ background: `${tint}1a`, border: `1px solid ${tint}33` }} aria-hidden="true">
                {c.flag}
              </span>
              <div>
                <h1 className="font-display text-2xl font-black text-[var(--text-primary)] sm:text-4xl">
                  Study in {c.name}
                </h1>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-[var(--text-muted)]">
                  <MapPin size={14} /> {c.tagline}
                </p>
              </div>
            </div>
            <span className="rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-white" style={{ background: `linear-gradient(135deg, ${tint}, ${tint}bb)` }}>
              {c.flag} {c.name}
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">{c.overview}</p>
        </FadeUp>

        {/* Facts */}
        <FadeUp delay={0.16}>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {FACTS.map((f) => (
              <div key={f.label} className="rounded-3xl border border-[var(--border)] bg-[var(--surface-glass)] p-4 backdrop-blur-xl">
                <f.icon size={18} style={{ color: tint }} />
                <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">{f.label}</p>
                <p className="mt-1 text-sm font-black leading-tight text-[var(--text-primary)]">{c[f.key]}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Requirements */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-bold text-[var(--text-primary)]">
              <Languages size={18} style={{ color: tint }} /> Entry requirements
            </h2>
            <dl className="space-y-3.5">
              {[
                { label: "IELTS", value: c.ielts },
                { label: "PTE", value: c.pte },
                { label: "GPA", value: c.gpa },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3">
                  <dt className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">{r.label}</dt>
                  <dd className="text-sm font-bold text-[var(--text-primary)]">{r.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400">
                <Wallet size={14} /> Financial proof
              </p>
              <p className="mt-1.5 text-sm font-bold text-[var(--text-primary)]">{c.financialProof}</p>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Streams + scholarships */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-[var(--text-primary)]">
                  <GraduationCap size={18} style={{ color: tint }} /> Popular streams
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {c.streams.map((s) => (
                    <li key={s} className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)]">
                      {s}
                    </li>
                  ))}
                </ul>
                <h2 className="mb-4 mt-6 flex items-center gap-2 font-display text-lg font-bold text-[var(--text-primary)]">
                  <Trophy size={18} style={{ color: tint }} /> Scholarship routes
                </h2>
                <ul className="space-y-2.5">
                  {c.scholarships.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm font-semibold text-[var(--text-secondary)]">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" /> {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top cities */}
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-[var(--text-primary)]">
                  <Building2 size={18} style={{ color: tint }} /> Top cities
                </h2>
                <ul className="space-y-2.5">
                  {c.topCities.map((city) => (
                    <li key={city} className="flex items-center gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm font-bold text-[var(--text-primary)]">
                      <MapPin size={14} style={{ color: tint }} /> {city}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Universities */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[var(--text-primary)]">
                  <ShieldCheck size={18} style={{ color: tint }} /> Leading universities
                </h2>
                {stats && (
                  <span className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-[10.5px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                    {stats.university_count} in DB · {stats.verified_count} verified
                  </span>
                )}
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {(stats && stats.top_universities.length > 0
                  ? stats.top_universities.map((u) => u.name)
                  : c.topUnis
                ).map((name) => (
                  <li key={name} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-bold text-[var(--text-secondary)]">
                    {name}
                  </li>
                ))}
              </ul>
              {stats && stats.tuition_min_usd ? (
                <p className="mt-4 text-xs font-semibold text-[var(--text-muted)]">
                  Tuition range (DB): USD {stats.tuition_min_usd.toLocaleString()}
                  {stats.tuition_max_usd ? `–${stats.tuition_max_usd.toLocaleString()}` : ""} / year
                </p>
              ) : null}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <PrimaryButton to={`/universities`}>
                  Search {c.name} universities <ArrowRight size={15} />
                </PrimaryButton>
                <GhostButton to="/recommendations">
                  Check my match <ArrowRight size={15} />
                </GhostButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-6">
          <FadeUp>
            <div className="relative overflow-hidden rounded-[36px] border border-[var(--border)] p-10 text-center sm:p-14">
              <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: `linear-gradient(135deg, ${tint}26, rgba(139,92,246,0.14) 55%, rgba(6,182,212,0.12))` }} aria-hidden="true" />
              <div className="relative z-10">
                <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl">
                  Ready for {c.name}? Get your <span className="text-brand-gradient">personal match list.</span>
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--text-muted)]">
                  The AI ranks universities for your grades, budget and goals — with scholarship routes and reasons included.
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <PrimaryButton to="/recommendations" size="lg">
                    Build my shortlist <ArrowRight size={16} />
                  </PrimaryButton>
                  <GhostButton to="/visa-guides" size="lg">
                    <Plane size={16} /> Visa guide
                  </GhostButton>
                </div>
                <p className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
                  <FileCheck2 size={14} className="text-emerald-500" /> Verified official data · Free forever plan
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
