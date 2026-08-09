import { Link } from "react-router-dom";
import {
  ArrowRight,
  Banknote,
  Briefcase,
  CheckCircle2,
  Clock3,
  FileText,
  Globe2,
  ShieldCheck,
  Stamp,
  Wallet,
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
import { VISA_CHIPS } from "../components/home/data";

interface VisaGuide {
  country: string;
  flag: string;
  tint: string;
  timeline: string;
  fee: string;
  financialProof: string;
  steps: string[];
}

const VISAS: VisaGuide[] = [
  {
    country: "Germany",
    flag: "🇩🇪",
    tint: "#f59e0b",
    timeline: "~4 weeks",
    fee: "€75",
    financialProof: "€11,904 blocked account",
    steps: ["Get admission & blocked account", "Book visa appointment", "Submit docs & biometrics", "Collect student visa (D)"],
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    tint: "#ef4444",
    timeline: "~10 weeks",
    fee: "CAD 150",
    financialProof: "CAD ~20,635 + 1st-yr tuition",
    steps: ["Receive letter of acceptance", "Complete IRCC online form", "Submit biometrics & medical", "Get study permit & POE letter"],
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    tint: "#22c55e",
    timeline: "~12 weeks",
    fee: "AUD 650",
    financialProof: "AUD ~29,710/yr",
    steps: ["Enrol & get CoE", "Lodge subclass 500 online", "Attach GTE statement", "Biometrics & health checks"],
  },
  {
    country: "USA",
    flag: "🇺🇸",
    tint: "#3b82f6",
    timeline: "~6 weeks",
    fee: "USD 185 (SEVIS $350)",
    financialProof: "Full first-year funding",
    steps: ["Get I-20 from university", "Pay SEVIS fee", "Fill DS-160 & book F-1 interview", "Visa interview & stamping"],
  },
  {
    country: "UK",
    flag: "🇬🇧",
    tint: "#8b5cf6",
    timeline: "~4 weeks",
    fee: "£490",
    financialProof: "~£1,483/mo for 9 months",
    steps: ["Receive CAS number", "Apply for Student visa online", "Pay IHS surcharge", "Biometrics & decision"],
  },
];

const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: FileText, title: "Get your offer", text: "Confirmed admission with a valid CAS, CoE, I-20 or equivalent document." },
  { icon: Banknote, title: "Arrange funds", text: "Blocked account, GIC or financial documents meeting the exact proof amount." },
  { icon: Stamp, title: "Submit the application", text: "Online form, fee, biometrics, medical tests and passport-size photos." },
  { icon: ShieldCheck, title: "Prepare for the interview", text: "Study intent, funds story and future plans — clear, confident answers." },
  { icon: Clock3, title: "Track & receive decision", text: "Follow timelines per country and get your visa stamped in the passport." },
];

export default function VisaGuides() {
  return (
    <div className="relative overflow-x-clip">
      <Orbs opacity={0.35} />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--primary)]">
            <Stamp size={13} /> Visa guides
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-black leading-tight sm:text-5xl">
            Visa made <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">clear, not scary.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            Document-by-document roadmaps for the biggest study destinations — timelines, fees and exact
            financial proof amounts, checked against official embassy sources.
          </p>
        </FadeUp>
        <FadeUp delay={0.24}>
          <div className="mx-auto mt-9 flex flex-wrap items-center justify-center gap-3">
            {VISAS.map((v) => (
              <Link
                key={v.country}
                to={`/study/${v.country.toLowerCase()}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-glass)] px-4 py-2 text-sm font-bold text-[var(--text-secondary)] backdrop-blur transition hover:border-[var(--primary)] hover:text-[var(--text-primary)]"
              >
                <span aria-hidden="true">{v.flag}</span> {v.country}
              </Link>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Guide cards */}
      <section className="relative mx-auto max-w-6xl px-6 py-8 sm:py-12">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {VISAS.map((v) => (
            <StaggerItem key={v.country} className="h-full">
              <GlassCard className="group relative h-full overflow-hidden p-6">
                <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${v.tint}, ${v.tint}44)` }} />
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" aria-hidden="true">{v.flag}</span>
                    <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">{v.country}</h2>
                  </div>
                  <span className="rounded-full bg-[var(--surface-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                    {v.timeline}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-[var(--surface-soft)] p-3">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Visa fee</p>
                    <p className="mt-0.5 text-sm font-black text-[var(--text-primary)]">{v.fee}</p>
                  </div>
                  <div className="rounded-xl bg-[var(--surface-soft)] p-3">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Funds proof</p>
                    <p className="mt-0.5 text-[12px] font-black leading-tight text-[var(--text-primary)]">{v.financialProof}</p>
                  </div>
                </div>

                <ol className="mt-4 space-y-2">
                  {v.steps.map((s, i) => (
                    <li key={s} className="flex items-start gap-2.5 text-[13px] font-semibold text-[var(--text-secondary)]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${v.tint}1a`, color: v.tint }}>
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>

                <Link to={`/study/${v.country.toLowerCase()}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--primary)] transition group-hover:gap-2.5">
                  Study in {v.country} <ArrowRight size={15} />
                </Link>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* General roadmap */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <SectionHeader
          tag="The universal path"
          tagIcon={<Globe2 size={13} />}
          title="Five steps apply"
          highlight="almost everywhere."
          subtitle="No matter the destination, every student visa follows this shape — master it once, repeat everywhere."
        />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" gap={0.09}>
          {STEPS.map((s, i) => (
            <StaggerItem key={s.title} className="h-full">
              <GlassCard className="relative h-full p-5" hover={false}>
                <span className="font-display text-xs font-black text-[var(--primary)]">0{i + 1}</span>
                <s.icon size={22} className="mt-3 text-[var(--primary)]" />
                <h3 className="mt-3 font-display text-base font-bold text-[var(--text-primary)]">{s.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-muted)]">{s.text}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Cheat chips */}
      <section className="relative mx-auto max-w-6xl px-6 py-8 sm:py-12">
        <FadeUp>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {VISA_CHIPS.map((c) => (
              <div key={c.text} className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-glass)] px-5 py-4 backdrop-blur-xl">
                <c.icon size={18} className="shrink-0 text-[var(--primary)]" />
                <span className="text-sm font-bold text-[var(--text-secondary)]">{c.text}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[36px] border border-[var(--border)] p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.16), rgba(139,92,246,0.14) 55%, rgba(6,182,212,0.12))" }} aria-hidden="true" />
            <div className="relative z-10">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl">
                Want your documents checked <span className="text-brand-gradient">before you submit?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--text-muted)]">
                The AI validates your visa checklist against the destination's rules and flags gaps before the embassy does.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <PrimaryButton to="/chat" size="lg">
                  Ask the AI consultant <ArrowRight size={16} />
                </PrimaryButton>
                <GhostButton to="/recommendations" size="lg">
                  <Briefcase size={16} /> Check my match
                </GhostButton>
              </div>
              <p className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
                <CheckCircle2 size={14} className="text-emerald-500" /> Free forever plan · <Wallet size={14} className="text-[var(--primary)]" /> No agency fees
              </p>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
