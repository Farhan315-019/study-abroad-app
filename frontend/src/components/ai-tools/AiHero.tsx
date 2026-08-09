import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EASE, Typewriter } from "../home/shared";
import { useTheme } from "../../context/ThemeContext";

/* ------------------------- copy ------------------------- */

const BADGE = "No agents. No commissions. Just results.";
const HEADING_1 = "Study abroad,";
const HEADING_WORDS = ["with AI.", "without agents.", "on scholarships.", "anywhere you want."];
const SUBTITLE =
  "Search 10,500+ universities, win scholarships, auto-apply and prepare your visa — all in one AI-powered platform. Built for students from Pakistan, India, Bangladesh, Nigeria and beyond.";
const TRUST = ["Free forever plan", "Verified data", "10,000+ students"];
const PLACEHOLDER = "Ask GlobleEdu AI anything about studying abroad...";
const PROMPTS = [
  "Find universities for my budget",
  "Which country fits my profile?",
  "Find scholarships",
  "Help me with my visa",
];
const VALUES = [
  { title: "AI Guidance", sub: "Personalized" },
  { title: "University Discovery", sub: "Global" },
  { title: "Scholarship Matching", sub: "Profile-based" },
  { title: "Application Support", sub: "Step-by-step" },
  { title: "Visa Preparation", sub: "Country-specific" },
];

/* ------------------------- helpers ------------------------- */

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============================ component ============================ */

export default function AiHero({ mode = "tools" }: { mode?: "tools" | "home" }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const reduced = useReducedMotion() === true;
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  /* tools page: scroll to the command center. home page: jump to the tools page. */
  const goTools = (text?: string) => {
    navigate("/chat", text && text.trim() ? { state: { prompt: text.trim() } } : undefined);
  };

  const goExplore = () => {
    if (mode === "home") goTools();
    else scrollToId("command-center");
  };

  const ask = (text: string) => {
    if (mode === "home") {
      goTools(text);
      return;
    }
    window.dispatchEvent(new CustomEvent("globle:chat-prompt", { detail: text }));
    scrollToId("command-center");
  };

  const onAsk = (e: FormEvent) => {
    e.preventDefault();
    const text = query.trim();
    if (mode === "home") {
      goTools(text || undefined);
      return;
    }
    if (text) ask(text);
    else scrollToId("command-center");
  };

  const focusQuickAsk = () => {
    if (mode === "home") {
      goTools();
      return;
    }
    scrollToId("ai-command-bar");
    window.setTimeout(() => document.getElementById("ai-command-input")?.focus(), 500);
  };

  const hero = (delay: number, dur = 0.8) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.2 : dur, delay, ease: EASE },
  });

  return (
    <section
      aria-labelledby="ai-tools-title"
      className="relative overflow-hidden"
      style={{ background: dark ? "#060b1d" : "#f7faff" }}
    >
      {/* -------------------- background atmosphere -------------------- */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: dark
              ? "radial-gradient(1200px 700px at 80% -10%, rgba(37,99,235,0.22), transparent 60%), radial-gradient(1000px 700px at 6% 112%, rgba(124,58,237,0.16), transparent 60%), radial-gradient(900px 520px at 50% 122%, rgba(6,182,212,0.10), transparent 60%)"
              : "radial-gradient(1200px 620px at 80% -10%, rgba(59,130,246,0.14), transparent 60%), radial-gradient(1000px 620px at 6% 112%, rgba(139,92,246,0.10), transparent 60%), radial-gradient(900px 500px at 50% 122%, rgba(6,182,212,0.08), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 bg-grid-pattern"
          style={{
            opacity: dark ? 0.08 : 0.05,
            WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 0%, #000 30%, transparent 78%)",
            maskImage: "radial-gradient(ellipse 85% 75% at 50% 0%, #000 30%, transparent 78%)",
          }}
        />
        <div
          className="orb h-[520px] w-[520px] -left-32 -top-40"
          style={{ background: dark ? "#2563eb" : "#93c5fd", opacity: dark ? 0.22 : 0.28 }}
        />
        <div
          className="orb h-[460px] w-[460px] -right-24 top-24"
          style={{ background: dark ? "#7c3aed" : "#c4b5fd", opacity: dark ? 0.16 : 0.22 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-20 pt-14 sm:px-8 lg:pt-20">
        <div className="grid items-center gap-14">
          {/* ======================= LEFT: copy ======================= */}
          <div className="max-w-3xl">
            <motion.span
              {...hero(0.05)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] backdrop-blur ${
                dark
                  ? "border-white/12 bg-white/5 text-indigo-200"
                  : "border-blue-200/80 bg-white/70 text-blue-700"
              }`}
            >
              <Sparkles size={13} className={dark ? "text-amber-300" : "text-amber-500"} />
              {BADGE}
            </motion.span>

            <motion.h1
              id="ai-tools-title"
              {...hero(0.12)}
              className={`mt-6 font-display text-[2.35rem] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.5rem] xl:text-[4.15rem] ${
                dark ? "text-white" : "text-slate-900"
              }`}
            >
              {HEADING_1}
              <br />
              <Typewriter words={HEADING_WORDS} className="text-brand-gradient" />
            </motion.h1>

            <motion.p
              {...hero(0.22)}
              className={`mt-6 max-w-xl text-base leading-relaxed sm:text-[17px] ${
                dark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {SUBTITLE}
            </motion.p>

            <motion.div {...hero(0.32)} className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={goExplore}
                className="shine group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                style={{
                  background: dark
                    ? "linear-gradient(135deg, #2563eb 0%, #7c3aed 60%, #0ea5e9 100%)"
                    : "linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%)",
                  boxShadow: dark
                    ? "0 18px 44px -14px rgba(124,58,237,0.55)"
                    : "0 18px 40px -14px rgba(29,78,216,0.45)",
                }}
              >
                Find my universities
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={focusQuickAsk}
                className={`inline-flex items-center gap-2 rounded-2xl border px-8 py-4 text-sm font-bold backdrop-blur transition-all duration-300 hover:-translate-y-0.5 ${
                  dark
                    ? "border-white/15 bg-white/5 text-white hover:border-blue-400/70"
                    : "border-slate-300/80 bg-white/60 text-slate-800 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                <Sparkles size={16} className="text-[var(--primary)]" />
                Talk to AI — free
              </button>
            </motion.div>

            <motion.div
              {...hero(0.42)}
              className={`mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold ${
                dark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {TRUST.map((t, i) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[var(--primary)]" />
                  {t}
                  {i < TRUST.length - 1 && <span className="ml-1 opacity-40">•</span>}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ======================= AI COMMAND BAR ======================= */}
        <motion.div
          id="ai-command-bar"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE }}
          className="mx-auto mt-14 max-w-3xl"
        >
          <form
            onSubmit={onAsk}
            className={`flex items-center gap-2 rounded-[26px] p-2 pl-5 backdrop-blur-xl transition focus-within:ring-glow ${
              dark
                ? "border border-white/10 bg-[#0d1732]/70 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] ring-1 ring-inset ring-white/5"
                : "border border-slate-200/80 bg-white/70 shadow-[0_20px_50px_-20px_rgba(37,99,235,0.28)]"
            }`}
          >
            <Sparkles size={18} className="shrink-0 text-[var(--primary)]" />
            <input
              id="ai-command-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={PLACEHOLDER}
              aria-label={PLACEHOLDER}
              className={`min-w-0 flex-1 bg-transparent py-3 text-sm font-semibold outline-none placeholder:font-medium ${
                dark ? "text-white placeholder:text-slate-500" : "text-slate-900 placeholder:text-slate-400"
              }`}
            />
            <button
              type="submit"
              className="shine relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-2xl px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:brightness-110"
              style={{
                background: dark
                  ? "linear-gradient(135deg, #2563eb 0%, #7c3aed 60%, #0ea5e9 100%)"
                  : "linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%)",
                boxShadow: dark
                  ? "0 12px 30px -12px rgba(124,58,237,0.5)"
                  : "0 12px 30px -12px rgba(29,78,216,0.4)",
              }}
            >
              Ask AI <ArrowRight size={15} />
            </button>
          </form>

          <div className="mt-3.5 flex flex-wrap justify-center gap-2">
            {PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => ask(p)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-bold backdrop-blur transition hover:-translate-y-0.5 ${
                  dark
                    ? "border-white/10 bg-white/5 text-slate-300 hover:border-blue-400/70 hover:text-white"
                    : "border-slate-200/80 bg-white/60 text-slate-600 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ======================= VALUE STRIP ======================= */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduced ? 0.2 : 0.7, delay: 0.1, ease: EASE }}
          className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {VALUES.map((v) => (
            <div
              key={v.title}
              className={`rounded-2xl px-4 py-3.5 text-center backdrop-blur-xl ${
                dark
                  ? "border border-white/8 bg-white/[0.04]"
                  : "border border-slate-200/70 bg-white/55 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.18)]"
              }`}
            >
              <p
                className={`text-[10px] font-black uppercase tracking-[0.14em] ${
                  dark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {v.title}
              </p>
              <p className={`mt-1 font-display text-sm font-bold ${dark ? "text-white" : "text-slate-900"}`}>
                {v.sub}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
