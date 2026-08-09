import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Bot,
  LayoutGrid,
  ArrowRight,
  Building2,
  Award,
  Globe2,
  ClipboardCheck,
  Stamp,
  BadgeCheck,
  Send,
  type LucideIcon,
} from "lucide-react";
import { EASE, useMouseParallax, AnimatedNumber } from "../home/shared";

/* ------------------------------ copy ------------------------------ */

const BADGE = "AI Tool Suite";
const BADGE_SUB = "Everything in one place";
const HEADING_1 = "Every AI tool you need";
const HEADING_2 = "to study abroad.";
const SUBTITLE =
  "Seven connected AI tools — university finder, scholarship matcher, visa assistant, document builders and a 24/7 consultant — working together to take you from your first search to your first day abroad.";

const STATS = [
  { value: 7, suffix: "", label: "Core AI tools" },
  { value: 141, suffix: "", label: "Universities" },
  { value: 50, suffix: "+", label: "Scholarships" },
  { value: 24, suffix: "/7", label: "AI support" },
];

/* --------------------------- tool launcher tiles --------------------------- */

interface ToolTile {
  icon: LucideIcon;
  name: string;
  value: string;
  tint: string;
}

const TOOL_TILES: ToolTile[] = [
  { icon: Building2, name: "University Finder", value: "10,500+ universities & colleges", tint: "#3b82f6" },
  { icon: Award, name: "Scholarship Matcher", value: "50+ scholarships", tint: "#f59e0b" },
  { icon: Globe2, name: "Country Advisor", value: "70+ countries", tint: "#06b6d4" },
  { icon: ClipboardCheck, name: "Application Assistant", value: "Track your offers", tint: "#22c55e" },
  { icon: Stamp, name: "Visa Assistant", value: "Roadmap + checklist", tint: "#ec4899" },
  { icon: Bot, name: "AI Chat Consultant", value: "24/7 · EN/UR/HI", tint: "#6366f1" },
];

/* ------------------------------ helpers ------------------------------ */

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============================== component ============================== */

export default function ToolsHero() {
  const reduced = useReducedMotion() === true;
  const { ref, x, y, onMouseMove } = useMouseParallax();
  const panelX = x;
  const panelY = y;

  const fade = (delay: number, yFrom = 22) => ({
    initial: { opacity: 0, y: yFrom },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.2 : 0.8, delay, ease: EASE },
  });

  return (
    <section aria-labelledby="tools-hero-title" className="relative overflow-hidden">
      {/* ------------------------- background ------------------------- */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 700px at 82% -10%, color-mix(in srgb, var(--primary) 16%, transparent), transparent 60%), radial-gradient(1000px 640px at 4% 112%, color-mix(in srgb, var(--secondary) 13%, transparent), transparent 60%), radial-gradient(900px 520px at 50% 122%, color-mix(in srgb, var(--accent) 9%, transparent), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 bg-grid-pattern"
          style={{
            opacity: "var(--grid-opacity, 0.05)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 0%, #000 30%, transparent 78%)",
            maskImage: "radial-gradient(ellipse 85% 75% at 50% 0%, #000 30%, transparent 78%)",
          }}
        />
        <div
          className="orb absolute -left-28 -top-32 h-[460px] w-[460px]"
          style={{ background: "color-mix(in srgb, var(--primary) 40%, transparent)", opacity: "var(--orb-opacity, 0.14)" }}
        />
        <div
          className="orb absolute right-[-8%] top-24 h-[420px] w-[420px]"
          style={{ background: "color-mix(in srgb, var(--secondary) 38%, transparent)", opacity: "var(--orb-opacity, 0.12)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-20 pt-14 sm:px-8 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          {/* ========================== LEFT ========================== */}
          <div className="max-w-2xl">
            <motion.span
              {...fade(0.05)}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)]"
            >
              <Sparkles size={13} className="text-[var(--primary)]" />
              {BADGE}
              <span className="hidden text-[9px] font-black tracking-widest opacity-60 sm:inline">· {BADGE_SUB}</span>
            </motion.span>

            <motion.h1
              id="tools-hero-title"
              {...fade(0.12)}
              className="mt-6 font-display text-[2.35rem] font-bold leading-[1.06] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[3.5rem] xl:text-[4.05rem]"
            >
              {HEADING_1}
              <br />
              <span className="text-brand-gradient">{HEADING_2}</span>
            </motion.h1>

            <motion.p {...fade(0.22)} className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-[17px]">
              {SUBTITLE}
            </motion.p>

            <motion.div {...fade(0.32)} className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToId("command-center")}
                className="shine group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                style={{ background: "var(--grad-primary)", boxShadow: "0 18px 44px -14px color-mix(in srgb, var(--primary) 55%, transparent)" }}
              >
                <Bot size={16} />
                Start with AI Assistant
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => scrollToId("tools-grid")}
                className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-8 py-4 text-sm font-bold text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                <LayoutGrid size={16} className="text-[var(--primary)]" />
                Explore the toolbox
              </button>
            </motion.div>

            <motion.div
              {...fade(0.44)}
              className="mt-10 grid max-w-lg grid-cols-4 gap-4"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-[var(--text-primary)] sm:text-[1.7rem]">
                    <AnimatedNumber to={s.value} suffix={s.suffix} duration={1.4} />
                  </p>
                  <p className="mt-1 text-[10.5px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ========================== RIGHT: launcher ========================== */}
          <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0.2 : 0.9, delay: 0.3, ease: EASE }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <motion.div
              style={reduced ? undefined : { x: panelX, y: panelY }}
              className="relative"
            >
              {/* ambient glow behind panel */}
              <div
                className="absolute -inset-6 rounded-[40px]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--primary) 16%, transparent), transparent 65%)",
                  filter: "blur(30px)",
                }}
              />

              {/* demo tag */}
              <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-[var(--border)] bg-[var(--surface-menu)] px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Live tool preview
              </span>

              {/* tool launcher panel */}
              <div className="glass-panel relative overflow-hidden rounded-[28px] p-4 sm:p-5">
                {/* accent line */}
                <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: "var(--grad-primary)" }} />

                {/* panel header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
                  </div>
                  <span className="flex items-center gap-1.5 text-[10.5px] font-black uppercase tracking-widest text-[var(--text-secondary)]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Toolkit Online
                  </span>
                </div>

                {/* tiles */}
                <div className="mt-4 grid grid-cols-3 gap-2.5">
                  {TOOL_TILES.map((t, i) => (
                    <motion.button
                      key={t.name}
                      type="button"
                      initial={{ opacity: 0, y: 16, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: reduced ? 0.2 : 0.6, delay: 0.55 + i * 0.09, ease: EASE }}
                      onClick={() => scrollToId("tools-grid")}
                      className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[0_14px_30px_-16px_color-mix(in_srgb,var(--primary)_45%,transparent)] sm:p-3.5"
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5"
                        style={{ background: `color-mix(in srgb, ${t.tint} 14%, transparent)`, color: t.tint }}
                      >
                        <t.icon size={17} />
                      </span>
                      <span className="mt-2.5 text-[10.5px] font-bold leading-tight text-[var(--text-primary)]">{t.name}</span>
                      <span className="mt-1 text-[8.5px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{t.value}</span>
                    </motion.button>
                  ))}
                </div>

                {/* mini command bar */}
                <motion.button
                  type="button"
                  onClick={() => scrollToId("command-center")}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0.2 : 0.6, delay: 1.15, ease: EASE }}
                  className="mt-4 flex w-full items-center gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-2.5 pl-3.5 text-left transition-all duration-300 hover:border-[var(--primary)]"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
                    style={{ background: "var(--grad-primary)", boxShadow: "0 8px 18px -8px color-mix(in srgb, var(--primary) 60%, transparent)" }}
                  >
                    <Bot size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-bold text-[var(--text-primary)]">
                      Ask GlobleEdu AI anything…
                    </span>
                    <span className="block truncate text-[10px] font-semibold text-[var(--text-muted)]">
                      Universities, scholarships, documents, visa
                    </span>
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-soft)] text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-0.5">
                    <Send size={15} />
                  </span>
                </motion.button>
              </div>

              {/* floating accent chips */}
              <motion.div
                initial={{ opacity: 0, scale: 0.82, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: reduced ? 0.2 : 0.7, delay: 0.75, ease: EASE }}
                className="absolute -right-3 -top-6 z-20 sm:-right-6"
              >
                <motion.div
                  animate={reduced ? undefined : { y: [0, -7, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="glass-soft flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(245,158,11,0.14)", color: "#f59e0b" }}>
                      <Award size={16} />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[11.5px] font-bold text-[var(--text-primary)]">DAAD Matched</span>
                      <span className="block text-[9.5px] font-bold uppercase tracking-wider text-[var(--text-muted)]">94% fit</span>
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.82, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: reduced ? 0.2 : 0.7, delay: 0.9, ease: EASE }}
                className="absolute -bottom-5 -left-3 z-20 sm:-left-6"
              >
                <motion.div
                  animate={reduced ? undefined : { y: [0, 7, 0] }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="glass-soft flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(34,197,94,0.14)", color: "#22c55e" }}>
                      <BadgeCheck size={16} />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[11.5px] font-bold text-[var(--text-primary)]">Visa Approved</span>
                      <span className="block text-[9.5px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Germany · 4 weeks</span>
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
