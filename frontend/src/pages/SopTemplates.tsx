import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCopy,
  Compass,
  FileText,
  GraduationCap,
  Lightbulb,
  Quote,
  Rocket,
  Sparkles,
  Target,
  Wand2,
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

interface Template {
  icon: LucideIcon;
  title: string;
  hint: string;
  intro: string;
  example: string;
}

const TEMPLATES: Template[] = [
  {
    icon: Quote,
    title: "The Hook",
    hint: "1 short paragraph",
    intro: "Open with the moment that set this goal — not a dictionary definition of your field.",
    example: "“The first line of code I wrote fixed a school timetable bug that saved 40 students a morning. That small win made me realise software isn't just technology — it's service.”",
  },
  {
    icon: Compass,
    title: "Why this program",
    hint: "1–2 paragraphs",
    intro: "Connect your undergraduate work to the specific courses and faculty you want here.",
    example: "“My final-year project on IoT water systems taught me the fundamentals, but I need formal training in distributed systems and ML pipelines to scale it — which is exactly what this program's curriculum offers.”",
  },
  {
    icon: GraduationCap,
    title: "Why this university",
    hint: "1 paragraph",
    intro: "Name real courses, labs, or professors. Generic praise reads as copy-paste.",
    example: "“The AI Lab's work on edge inference directly matches my project, and Professor X's course on federated learning is why I'm applying to this specific campus over others.”",
  },
  {
    icon: Rocket,
    title: "Career goals",
    hint: "1 paragraph",
    intro: "Show the 5-year plan — and how the degree is the missing bridge to it.",
    example: "“After graduating, I plan to join a robotics firm as an applied researcher, and within five years lead the deployment of low-cost automation in agriculture back home.”",
  },
];

const DOS: string[] = [
  "Be specific — name courses, projects, professors and numbers",
  "Tell one consistent story across your CV and SOP",
  "Show how you'll contribute to the campus community",
  "Keep it to 800–1,000 words unless asked otherwise",
  "Get a second read (or the AI) to catch tone gaps",
];

const DONTS: string[] = [
  "Don't start with “Since my childhood I always dreamt…”",
  "Don't list achievements your CV already covers",
  "Don't copy templates word-for-word — the adcom can tell",
  "Don't beg or exaggerate family hardship",
  "Don't exceed the word limit by even 5 words",
];

export default function SopTemplates() {
  const [copied, setCopied] = useState("");

  const copy = async (title: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(title);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  };

  return (
    <div className="relative overflow-x-clip">
      <Orbs opacity={0.35} />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--primary)]">
            <FileText size={13} /> SOP templates
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-black leading-tight sm:text-5xl">
            A statement of purpose, <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">structure first.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            Admissions officers skim hundreds a day. These four building blocks — with real examples — give you
            the exact structure that gets read fully.
          </p>
        </FadeUp>
        <FadeUp delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton to="/chat" size="lg">
              <Wand2 size={16} /> Draft mine with AI
            </PrimaryButton>
            <GhostButton to="/recommendations" size="lg">
              Get matched first <ArrowRight size={16} />
            </GhostButton>
          </div>
        </FadeUp>
      </section>

      {/* Templates */}
      <section className="relative mx-auto max-w-6xl px-6 py-8 sm:py-12">
        <Stagger className="space-y-5" gap={0.09}>
          {TEMPLATES.map((t) => (
            <StaggerItem key={t.title}>
              <GlassCard className="overflow-hidden" hover={false}>
                <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-start lg:p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-white shadow-[var(--shadow-soft)]">
                    <t.icon size={22} />
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">{t.title}</h2>
                      <span className="rounded-full bg-[var(--surface-soft)] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                        {t.hint}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-[var(--text-muted)]">{t.intro}</p>
                    <figure className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                      <blockquote className="text-sm leading-relaxed text-[var(--text-secondary)]">{t.example}</blockquote>
                    </figure>
                  </div>
                  <button
                    type="button"
                    onClick={() => copy(t.title, `${t.intro}\n\n${t.example}`)}
                    className="inline-flex shrink-0 items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-bold text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--text-primary)]"
                  >
                    <ClipboardCopy size={14} /> {copied === t.title ? "Copied!" : "Copy"}
                  </button>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Do / Don't */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <SectionHeader
          tag="Pro tips"
          tagIcon={<Lightbulb size={13} />}
          title="The difference between"
          highlight="accepted and rejected."
          subtitle="Small habits that separate a generic essay from one that gets the admissions officer nodding."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <FadeUp>
            <div className="h-full rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-7">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-emerald-400">
                <CheckCircle2 size={18} /> Do
              </h3>
              <ul className="mt-4 space-y-3">
                {DOS.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm font-semibold text-[var(--text-secondary)]">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="h-full rounded-3xl border border-rose-500/20 bg-rose-500/5 p-7">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-rose-400">
                <BookOpen size={18} /> Don't
              </h3>
              <ul className="mt-4 space-y-3">
                {DONTS.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm font-semibold text-[var(--text-secondary)]">
                    <Sparkles size={15} className="mt-0.5 shrink-0 text-rose-500" /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[36px] border border-[var(--border)] p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.16), rgba(139,92,246,0.14) 55%, rgba(6,182,212,0.12))" }} aria-hidden="true" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-glass)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--text-secondary)] backdrop-blur">
                <Target size={13} className="text-[var(--primary)]" /> Personalised by AI
              </span>
              <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl">
                Your story, <span className="text-brand-gradient">written for that specific university.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--text-muted)]">
                Tell the AI your background once — it drafts, restructures and polishes an SOP that matches each
                program you apply to.
              </p>
              <div className="mt-9">
                <PrimaryButton to="/chat" size="lg">
                  <Wand2 size={16} /> Draft my SOP now
                </PrimaryButton>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
