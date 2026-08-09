import { CheckCircle2, Download, Mail, Newspaper, Phone, Rocket, Star } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { logoDarkUrl, logoFullUrl, logoLightUrl } from "../assets/brand";
import { FadeUp, GhostButton, Orbs, SectionHeader } from "../components/home/shared";
import { HERO_STATS } from "../components/home/data";

const PRESS_POINTS: string[] = [
  "The free alternative to $3,000 study-abroad consultants",
  "Verified requirements for 10,500+ universities across 70+ countries",
  "98k+ scholarships indexed with eligibility matching",
  "AI consultant, visa coach and bulk applications in one platform",
  "10,000+ students served across 120+ countries",
];

export default function Press() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative overflow-x-clip">
      <Orbs opacity={0.35} />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--primary)]">
            <Newspaper size={13} /> Press kit
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-black leading-tight sm:text-5xl">
            GlobleEdu.ai <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">in the press.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            Media assets, verified stats and contact details for journalists covering study abroad, education
            technology and the future of admissions.
          </p>
        </FadeUp>
      </section>

      {/* Logo */}
      <section className="relative mx-auto max-w-6xl px-6 py-8 sm:py-12">
        <SectionHeader
          tag="Brand assets"
          tagIcon={<Star size={13} />}
          title="The logo,"
          highlight="cleared for use."
          subtitle="Please use the artwork as provided — don't recolor, rotate or add effects. Both light and dark variants are below."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {[
            { name: "Full logo", src: isDark ? logoLightUrl : logoDarkUrl, note: "Preferred on any background" },
            { name: "Primary lockup", src: logoFullUrl, note: "Full colour, light backgrounds" },
          ].map((logo) => (
            <div key={logo.name} className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface-glass)] p-10 backdrop-blur-xl">
              <img src={logo.src} alt={`${logo.name} — GlobleEdu.ai`} className="h-14 w-auto object-contain" />
              <div className="text-center">
                <p className="font-display text-base font-bold text-[var(--text-primary)]">{logo.name}</p>
                <p className="mt-0.5 text-xs font-bold text-[var(--text-muted)]">{logo.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key facts */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <SectionHeader
          tag="Key facts"
          tagIcon={<Rocket size={13} />}
          title="Headline-ready"
          highlight="numbers."
          subtitle="Verified, current and free to cite — with attribution to GlobleEdu.ai."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="font-display text-4xl font-black text-[var(--primary)]">10.5k+</p>
            <p className="mt-2 text-sm font-semibold text-[var(--text-secondary)]">Universities indexed with verified requirements and official source links.</p>
          </div>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="font-display text-4xl font-black text-[var(--primary)]">98k+</p>
            <p className="mt-2 text-sm font-semibold text-[var(--text-secondary)]">Scholarships tracked with eligibility matching for each applicant.</p>
          </div>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="font-display text-4xl font-black text-[var(--primary)]">120+</p>
            <p className="mt-2 text-sm font-semibold text-[var(--text-secondary)]">Countries where students use GlobleEdu to plan their journey.</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {HERO_STATS.map((s) => (
            <div key={s.label} className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-glass)] px-5 py-4 backdrop-blur-xl">
              <span className="text-sm font-semibold text-[var(--text-secondary)]">{s.label}</span>
              <span className="font-display text-lg font-black text-[var(--text-primary)]">{s.value.toLocaleString()}{s.suffix}</span>
            </div>
          ))}
        </div>
      </section>

      {/* What we're about */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <FadeUp>
            <div className="h-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">The one-paragraph story</h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                GlobleEdu.ai replaces the $3,000 study-abroad consultant with a free platform trained on live,
                verified admissions data. It builds personalised university shortlists, matches 98k+ scholarships,
                drafts SOPs and guides students through visas — for applicants in 120+ countries.
              </p>
              <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">
                Every requirement links back to the official source, so students trust what they plan with.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="h-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">What we're building</h2>
              <ul className="mt-4 space-y-3">
                {PRESS_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-[var(--text-secondary)]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Contact */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <SectionHeader
          tag="Media contact"
          tagIcon={<Mail size={13} />}
          title="Talk to"
          highlight="our team."
          subtitle="For interviews, data and partnerships — we usually reply within a day."
        />
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:press@globleedu.ai" className="inline-flex items-center justify-center gap-2 rounded-2xl font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 px-8 py-4 text-sm" style={{ background: "linear-gradient(135deg, #2563eb 0%, #6366f1 50%, #06b6d4 100%)", boxShadow: "0 18px 44px -14px rgba(99,102,241,0.6)" }}>
            <Mail size={16} /> press@globleedu.ai
          </a>
          <GhostButton to="/collaborate" size="lg">
            <Phone size={16} /> Partner enquiries
          </GhostButton>
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
          <Download size={14} className="text-[var(--primary)]" /> High-res assets available on request
        </p>
      </section>
    </div>
  );
}
