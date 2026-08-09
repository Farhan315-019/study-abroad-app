import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Compass,
  Eye,
  Globe2,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
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
import { FEATURE_STATS, HERO_STATS } from "../components/home/data";

const VALUES: { icon: LucideIcon; title: string; text: string; tint: string }[] = [
  { icon: Eye, title: "Radical transparency", text: "Every requirement links to its official source. No hidden fees, no commission-driven suggestions — ever.", tint: "#3b82f6" },
  { icon: Compass, title: "Student-first, always", text: "We measure success by offers and visas, not by our sales. Free to start, cheaper to finish than any agency.", tint: "#06b6d4" },
  { icon: ShieldCheck, title: "Verified data", text: "1M+ data points refreshed daily from official university and embassy pages — not scraped gossip.", tint: "#22c55e" },
  { icon: HeartHandshake, title: "No one left behind", text: "From Lagos to Lahore, everyone deserves the same world-class advice agencies charge lakhs for.", tint: "#8b5cf6" },
];

const TIMELINE: { year: string; title: string; text: string }[] = [
  { year: "2023", title: "The problem", text: "A friend paid ₹2.4 lakh to an agency and still got ghosted. The founders knew there had to be a better way." },
  { year: "2024", title: "The prototype", text: "A weekend prototype matched students to universities using official data. Within a month, thousands were using it." },
  { year: "2025", title: "The platform", text: "AI consultant, scholarship radar, visa coach and bulk applications launched. 10,000+ students across 120+ countries." },
  { year: "2026", title: "The mission", text: "Verifying 10,500+ universities and pushing toward a world where no capable student is priced out of studying abroad." },
];

export default function About() {
  return (
    <div className="relative overflow-x-clip">
      <Orbs opacity={0.35} />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--primary)]">
            <Sparkles size={13} /> About us
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-black leading-tight sm:text-5xl">
            We're making study abroad <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">a right, not a privilege.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            GlobleEdu.ai was built by students and engineers who watched families spend lakhs on advice that a
            well-built platform could give for free.
          </p>
        </FadeUp>
        <FadeUp delay={0.24}>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
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
      </section>

      {/* Mission */}
      <section className="relative mx-auto max-w-6xl px-6 py-8 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <FadeUp>
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl">
                Why we exist
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--text-secondary)]">
                The average consultant charges $3,000+ and recommends whatever pays the highest commission —
                not what fits you. The result: wasted money, wasted years and dreams deferred.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                We believe the same advice should be free, verified and instantly available to every applicant on
                earth. That's the entire product.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-glass)] p-8 backdrop-blur-xl">
              <Bot size={28} className="text-[var(--primary)]" />
              <p className="mt-4 font-display text-lg font-bold text-[var(--text-primary)]">Our promise</p>
              <ul className="mt-4 space-y-3">
                {FEATURE_STATS.map((s) => (
                  <li key={s.label} className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3">
                    <span className="text-sm font-semibold text-[var(--text-secondary)]">{s.label}</span>
                    <span className="font-display text-base font-black text-[var(--primary)]">{s.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Values */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <SectionHeader
          tag="What we believe"
          tagIcon={<Target size={13} />}
          title="The values behind"
          highlight="every decision."
          subtitle="Four principles that survive our roadmap meetings, funding rounds and feature debates."
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
          {VALUES.map((v) => (
            <StaggerItem key={v.title} className="h-full">
              <GlassCard className="h-full p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${v.tint}, ${v.tint}99)`, boxShadow: `0 12px 26px -10px ${v.tint}` }}>
                  <v.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-[var(--text-primary)]">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{v.text}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Timeline */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <SectionHeader
          tag="The story"
          tagIcon={<Globe2 size={13} />}
          title="From frustration to"
          highlight="10,500 universities."
          subtitle="A short timeline of how a broken market turned into a free platform."
        />
        <div className="relative mt-12">
          <div className="pointer-events-none absolute left-5 top-0 bottom-0 hidden w-px bg-[var(--border)] sm:block" aria-hidden="true" />
          <Stagger className="space-y-6">
            {TIMELINE.map((t) => (
              <StaggerItem key={t.year}>
                <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7" hover={false}>
                  <span className="inline-flex w-fit shrink-0 rounded-full bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-4 py-1.5 font-display text-sm font-black text-white shadow-[var(--shadow-soft)] sm:w-28 sm:justify-center">
                    {t.year}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">{t.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{t.text}</p>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[36px] border border-[var(--border)] p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.16), rgba(139,92,246,0.14) 55%, rgba(6,182,212,0.12))" }} aria-hidden="true" />
            <div className="relative z-10">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl">
                Come see the mission <span className="text-brand-gradient">in action.</span>
              </h2>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <PrimaryButton to="/register" size="lg">
                  Start free <ArrowRight size={16} />
                </PrimaryButton>
                <GhostButton to="/collaborate" size="lg">
                  <Globe2 size={16} /> Partner with us
                </GhostButton>
              </div>
              <p className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
                <CheckCircle2 size={14} className="text-emerald-500" /> Free forever plan · Verified data
              </p>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
