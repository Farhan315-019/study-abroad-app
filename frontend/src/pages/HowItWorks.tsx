import { ArrowRight, CheckCircle2, Clock3, Rocket, Target } from "lucide-react";
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
import { JOURNEY_STATS, STEPS } from "../components/home/data";

export default function HowItWorks() {
  return (
    <div className="relative overflow-x-clip">
      <Orbs opacity={0.35} />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--primary)]">
            <Rocket size={13} /> Your journey
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-black leading-tight sm:text-5xl">
            From "where do I start?" to <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">boarding a plane.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            Six simple steps. No consultants, no confusing forms — the platform holds your hand from the first
            search to your visa approval.
          </p>
        </FadeUp>
        <FadeUp delay={0.24}>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {JOURNEY_STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-black text-[var(--text-primary)] sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Steps */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="relative">
          <div className="pointer-events-none absolute left-5 top-0 bottom-0 hidden w-px bg-[var(--border)] sm:block" aria-hidden="true" />
          <Stagger className="space-y-6">
            {STEPS.map((step, i) => (
              <StaggerItem key={step.title}>
                <GlassCard className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
                  <div className="relative flex items-center">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] font-display text-sm font-black text-white shadow-[var(--shadow-soft)]">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">{step.title}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">{step.text}</p>
                  </div>
                  <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--primary)] sm:flex">
                    <step.icon size={26} />
                  </span>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Where each step happens */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <SectionHeader
          tag="Built into the platform"
          tagIcon={<Target size={13} />}
          title="Every step lives"
          highlight="in one dashboard."
          subtitle="Start free today — explore, match and get your first shortlist in under a minute."
        />
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <PrimaryButton to="/recommendations" size="lg">
            Get my shortlist <ArrowRight size={16} />
          </PrimaryButton>
          <GhostButton to="/universities" size="lg">
            Explore universities <ArrowRight size={16} />
          </GhostButton>
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
          <CheckCircle2 size={14} className="text-emerald-500" /> Free forever plan · <Clock3 size={14} className="text-[var(--primary)]" /> 60-second setup
        </p>
      </section>
    </div>
  );
}
