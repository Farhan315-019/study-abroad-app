import { ArrowRight, CheckCircle2, Coffee, Globe2, HeartHandshake, Rocket, Sparkles, TrendingUp, Users } from "lucide-react";
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

const ROLES: { title: string; team: string; type: string; location: string }[] = [
  { title: "Senior Frontend Engineer", team: "Platform", type: "Full-time · Remote", location: "Worldwide" },
  { title: "Backend Engineer (Python)", team: "Platform", type: "Full-time · Remote", location: "Worldwide" },
  { title: "AI / ML Engineer", team: "Intelligence", type: "Full-time · Remote", location: "Worldwide" },
  { title: "Product Designer", team: "Design", type: "Full-time · Remote", location: "Worldwide" },
  { title: "Student Success Lead", team: "Community", type: "Full-time", location: "Karachi / Remote" },
  { title: "Content & SEO Writer", team: "Growth", type: "Contract", location: "Remote" },
];

export default function Careers() {
  return (
    <div className="relative overflow-x-clip">
      <Orbs opacity={0.35} />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--primary)]">
            <Users size={13} /> Careers
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-black leading-tight sm:text-5xl">
            Build the thing that <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">replaces agencies.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            We're a small, fully remote team shipping the future of study abroad — for students, by people who
            actually understand the struggle.
          </p>
        </FadeUp>
        <FadeUp delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="#roles" className="inline-flex items-center justify-center gap-2 rounded-2xl font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 px-8 py-4 text-sm" style={{ background: "linear-gradient(135deg, #2563eb 0%, #6366f1 50%, #06b6d4 100%)", boxShadow: "0 18px 44px -14px rgba(99,102,241,0.6)" }}>
              See open roles <ArrowRight size={16} />
            </a>
            <GhostButton to="/about" size="lg">
              Why we exist
            </GhostButton>
          </div>
        </FadeUp>
      </section>

      {/* Perks */}
      <section className="relative mx-auto max-w-6xl px-6 py-8 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Rocket, title: "Impact first", text: "Your code helps a student board a plane." },
            { icon: Coffee, title: "Async & remote", text: "Work from anywhere, ship on your schedule." },
            { icon: HeartHandshake, title: "Small team", text: "Your voice shapes the roadmap directly." },
            { icon: TrendingUp, title: "Grow fast", text: "Own features end-to-end from day one." },
            { icon: Globe2, title: "Global users", text: "Build for 120+ countries, every day." },
            { icon: Sparkles, title: "Ship the future", text: "AI consultant, visa coach, scholarship radar — next is you." },
          ].map((p) => (
            <div key={p.title} className="flex items-start gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface-glass)] p-6 backdrop-blur-xl">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
                <p.icon size={20} />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-[var(--text-primary)]">{p.title}</h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-12 sm:py-16">
        <SectionHeader
          tag="Open roles"
          tagIcon={<Rocket size={13} />}
          title="Where you'll"
          highlight="fit in."
          subtitle="Don't see your role? Email us anyway — great people beat perfect job titles."
        />
        <Stagger className="mt-12 space-y-4" gap={0.07}>
          {ROLES.map((r) => (
            <StaggerItem key={r.title}>
              <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between" hover={false}>
                <div>
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">{r.title}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-xs font-bold text-[var(--text-muted)]">
                    <span className="rounded-full bg-[var(--surface-soft)] px-2.5 py-0.5">{r.team}</span>
                    {r.type} · {r.location}
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-6 py-3 text-sm font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Apply now <ArrowRight size={15} />
                </button>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[36px] border border-[var(--border)] p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.16), rgba(139,92,246,0.14) 55%, rgba(6,182,212,0.12))" }} aria-hidden="true" />
            <div className="relative z-10">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl">
                Don't see a fit but <span className="text-brand-gradient">love the mission?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--text-muted)]">
                Send a short note with what you'd build for us. If it clicks, we'll make a role.
              </p>
              <div className="mt-9">
                <PrimaryButton to="/collaborate" size="lg">
                  Say hello <ArrowRight size={16} />
                </PrimaryButton>
              </div>
              <p className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
                <CheckCircle2 size={14} className="text-emerald-500" /> Remote-first · Equity included
              </p>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
