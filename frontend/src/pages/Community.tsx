import {
  ArrowRight,
  Award,
  CheckCircle2,
  HeartHandshake,
  MessageSquare,
  MessagesSquare,
  Sparkles,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
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
import { TESTIMONIALS } from "../components/home/data";

const FEATURES: { icon: LucideIcon; title: string; text: string; tint: string }[] = [
  { icon: MessagesSquare, title: "10,000+ applicants", text: "Share deadlines, offers and experiences with people in the same boat.", tint: "#3b82f6" },
  { icon: Users, title: "Country alumni", text: "Ask students already in Germany, Canada, Australia and more — real answers.", tint: "#06b6d4" },
  { icon: HeartHandshake, title: "Mentor circles", text: "Small groups with a verified alumni mentor guiding your applications.", tint: "#8b5cf6" },
  { icon: Award, title: "Scholarship finds", text: "Members share grant discoveries and application tips before they close.", tint: "#f59e0b" },
  { icon: Sparkles, title: "Peer document review", text: "Get your SOP and CV reviewed by people who've been admitted.", tint: "#22c55e" },
  { icon: Star, title: "Offer celebrations", text: "Be the first to hear a visa came through — and celebrate together.", tint: "#ec4899" },
];

export default function Community() {
  return (
    <div className="relative overflow-x-clip">
      <Orbs opacity={0.35} />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--primary)]">
            <Users size={13} /> Community
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-black leading-tight sm:text-5xl">
            Nobody studies abroad <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">alone.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            A 10,000+ strong community of applicants, alumni and mentors across 120+ countries — free for every
            account.
          </p>
        </FadeUp>
        <FadeUp delay={0.24}>
          <div className="mt-9 grid grid-cols-3 gap-6">
            {[
              { value: "10k+", label: "members" },
              { value: "120+", label: "countries" },
              { value: "4.9★", label: "avg. rating" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-black text-[var(--text-primary)] sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Features */}
      <section className="relative mx-auto max-w-6xl px-6 py-8 sm:py-12">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {FEATURES.map((f) => (
            <StaggerItem key={f.title} className="h-full">
              <GlassCard className="h-full p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${f.tint}, ${f.tint}99)`, boxShadow: `0 12px 26px -10px ${f.tint}` }}>
                  <f.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-[var(--text-primary)]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{f.text}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Stories */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <SectionHeader
          tag="Real stories"
          tagIcon={<MessageSquare size={13} />}
          title="Members who"
          highlight="made it."
          subtitle="From first search to boarding pass — in their own words."
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {TESTIMONIALS.slice(0, 6).map((t) => (
            <StaggerItem key={t.name} className="h-full">
              <GlassCard className="flex h-full flex-col p-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">“{t.quote}”</p>
                <div className="mt-5 flex items-center gap-3 border-t border-[var(--border)] pt-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black text-white" style={{ background: `linear-gradient(135deg, ${t.tint}, ${t.tint}99)` }}>
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[var(--text-primary)]">{t.name}</p>
                    <p className="text-[11px] font-bold text-[var(--text-muted)]">{t.from} → {t.to} · {t.program}</p>
                  </div>
                </div>
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
                Your visa story could be <span className="text-brand-gradient">someone's roadmap.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--text-muted)]">
                Create a free account and join the conversation — ask anything, help others, and grow with the group.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <PrimaryButton to="/register" size="lg">
                  Join free <ArrowRight size={16} />
                </PrimaryButton>
                <GhostButton to="/login" size="lg">
                  <MessageSquare size={16} /> I have an account
                </GhostButton>
              </div>
              <p className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
                <CheckCircle2 size={14} className="text-emerald-500" /> Free forever plan · No agency fees
              </p>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
