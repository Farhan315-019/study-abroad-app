import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Bot,
  Mic,
  Send,
  Sparkles,
  Globe2,
  GraduationCap,
  Award,
  ArrowRight,
  Volume2,
  VolumeX,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader, EASE } from "./shared";
import { AI_QUICK_ACTIONS, AI_POINTS, CHAT_SUGGESTIONS } from "./data";

type ChatMsg = {
  role: "user" | "bot";
  text: string;
  card?: { label: string; value: string; tint: string }[];
};

const SCRIPT: ChatMsg[] = [
  {
    role: "bot",
    text: "Hey! I'm Zephyr 👋 your AI study-abroad consultant. I know live admissions data from 70+ countries. What's on your mind?",
  },
  {
    role: "user",
    text: "I have 2.8 CGPA, 6.5 IELTS and 4 years gap. Where can I actually go?",
  },
  {
    role: "bot",
    text: "Totally doable. With a 2.8 CGPA your best routes are:",
    card: [
      { label: "Germany · Public Uni", value: "92% fit", tint: "#f59e0b" },
      { label: "Malaysia · Affordable", value: "96% fit", tint: "#06b6d4" },
      { label: "Ireland · 2-yr visa", value: "88% fit", tint: "#22c55e" },
    ],
  },
];

const BOT_REPLIES: Record<string, string> = {
  Voice: "Voice mode is on — just ask me anything and I'll reply like a friend, not a script. Try: 'Which country suits me best?'",
  SOP: "Send me your background and target universities. I'll draft a tailored Statement of Purpose with your story, achievements and goals — ready to polish.",
  Scholarship: "Searching grants for CS in Germany… The DAAD EPOS, Deutschlandstipendium and university-specific waivers are your top 3. Want me to check eligibility?",
  Visa: "Financial proof is a visa requirement for most countries, yes. Amounts vary: Germany €11.9k/yr, Canada CAD 20.6k, Ireland €10k. I can generate your bank-proof checklist.",
  Match: "On it! Tell me your budget, program and preferred countries — I'll rank 5 universities with reasons and scholarship odds.",
  Plan: "Great choice! Australia gives you 48h/2wk work rights. Step 1: pick an intake. Want me to map the timeline from today to landing?",
};

export default function AiDemo() {
  const [messages, setMessages] = useState<ChatMsg[]>(SCRIPT.slice(0, 1));
  const [typing, setTyping] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [scriptDone, setScriptDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-160px" });

  const speak = (text: string) => {
    if (!voiceOn || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[👋]/g, ""));
    u.rate = 1.02;
    window.speechSynthesis.speak(u);
  };

  const pushBot = (msg: ChatMsg, delay = 1400) => {
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, msg]);
      setTyping(false);
      speak(msg.text);
    }, delay);
  };

  const ask = (label: string) => {
    if (typing) return;
    window.speechSynthesis?.cancel?.();
    setMessages((m) => [...m, { role: "user", text: label }]);
    pushBot({ role: "bot", text: BOT_REPLIES[label] ?? "Let me look that up for you…" });
  };

  useEffect(() => {
    if (!inView || scriptDone) return;
    const t1 = window.setTimeout(() => pushBot(SCRIPT[1]), 2200);
    const t2 = window.setTimeout(() => pushBot(SCRIPT[2], 700), 5600);
    setScriptDone(true);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="aidemo-title" ref={sectionRef}>
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag="AI Consultant"
          tagIcon={<Bot size={13} />}
          title="Ask anything. Get an answer"
          highlight="with sources."
          subtitle="Zephyr knows universities, scholarships, visas and deadlines — and speaks your language."
        />

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1fr_0.9fr]">
          {/* ------- chat panel ------- */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="border-beam relative mx-auto max-w-xl rounded-[34px] p-2"
            >
              <div className="relative overflow-hidden rounded-[26px] bg-[var(--surface)]">
                {/* header */}
                <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl text-white" style={{ background: "var(--grad-primary)", boxShadow: "0 12px 26px -10px rgba(99,102,241,0.7)" }}>
                      <Bot size={20} />
                      <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[var(--surface)] bg-emerald-400" />
                    </span>
                    <div>
                      <p className="text-sm font-black text-[var(--text-primary)]">Zephyr — AI Consultant</p>
                      <p className="text-[11px] font-bold text-[var(--success)]">● Online · 24/7</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVoiceOn((v) => !v)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-muted)] transition hover:text-[var(--primary)]"
                    aria-label={voiceOn ? "Mute voice" : "Enable voice"}
                    title={voiceOn ? "Mute voice" : "Enable voice"}
                  >
                    {voiceOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
                  </button>
                </div>

                {/* messages */}
                <div ref={scrollRef} className="h-[340px] space-y-4 overflow-y-auto px-5 py-5" style={{ scrollbarWidth: "thin" }}>
                  <AnimatePresence initial={false}>
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 14, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[85%] ${m.role === "user" ? "" : "flex items-end gap-2.5"}`}>
                          {m.role === "bot" && (
                            <span className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: "var(--grad-primary)" }}>
                              <Bot size={14} />
                            </span>
                          )}
                          <div>
                            <div
                              className={`rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed ${
                                m.role === "user"
                                  ? "rounded-br-md text-white"
                                  : "rounded-bl-md border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-primary)]"
                              }`}
                              style={m.role === "user" ? { background: "var(--grad-primary)", boxShadow: "0 12px 26px -12px rgba(99,102,241,0.6)" } : undefined}
                            >
                              {m.text}
                            </div>
                            {m.card && (
                              <div className="mt-2 grid grid-cols-3 gap-2">
                                {m.card.map((c) => (
                                  <div key={c.label} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5 text-center">
                                    <p className="truncate text-[10px] font-bold uppercase tracking-wide text-[var(--text-muted)]">{c.label}</p>
                                    <p className="mt-1 text-xs font-black" style={{ color: c.tint }}>{c.value}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {typing && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl text-white" style={{ background: "var(--grad-primary)" }}>
                          <Bot size={14} />
                        </span>
                        <span className="flex gap-1.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3.5">
                          {[0, 1, 2].map((d) => (
                            <motion.span
                              key={d}
                              className="h-2 w-2 rounded-full bg-[var(--text-muted)]"
                              animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                              transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                            />
                          ))}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* quick actions */}
                <div className="flex gap-2 overflow-x-auto border-t border-[var(--border)] px-5 py-3.5" style={{ scrollbarWidth: "none" }}>
                  {AI_QUICK_ACTIONS.map((a) => (
                    <button
                      key={a.label}
                      type="button"
                      onClick={() => ask(a.label)}
                      className="group flex shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3.5 py-2 text-xs font-bold text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                    >
                      <a.icon size={14} className="transition-transform duration-300 group-hover:scale-110" />
                      {a.label}
                    </button>
                  ))}
                </div>

                {/* input */}
                <div className="flex items-center gap-2 border-t border-[var(--border)] px-5 py-4">
                  <div className="flex flex-1 items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3">
                    <Mic size={15} className="shrink-0 text-[var(--text-muted)]" />
                    <span className="text-[13px] font-semibold text-[var(--text-muted)]">Ask anything…</span>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white" style={{ background: "var(--grad-primary)" }}>
                    <Send size={16} />
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ------- right: capabilities ------- */}
          <div className="lg:pt-4">
            <FadeList />
            <div className="mt-8 grid gap-3">
              {AI_POINTS.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: EASE }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: "color-mix(in srgb, var(--primary) 14%, transparent)", color: "var(--primary)" }}>
                    <Sparkles size={12} />
                  </span>
                  <p className="text-sm font-semibold text-[var(--text-secondary)]">{p}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              className="mt-9"
            >
              <p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Try asking</p>
              <div className="mt-3 space-y-2.5">
                {CHAT_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="group flex w-full items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 text-left text-[13px] font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--text-primary)]"
                  >
                    <span className="mt-0.5 shrink-0 text-[var(--primary)]"><GraduationCap size={15} /></span>
                    <span className="flex-1">{s}</span>
                    <ArrowRight size={14} className="mt-0.5 shrink-0 text-[var(--text-muted)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  </button>
                ))}
              </div>

              <Link
                to="/chat"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] transition-all duration-300 hover:gap-3.5"
              >
                Open full AI consultant <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FadeList() {
  const items: { icon: LucideIcon; title: string; text: string; tint: string }[] = [
    { icon: Globe2, title: "70+ countries covered", text: "Live intakes, fees, and post-study work rights.", tint: "#06b6d4" },
    { icon: GraduationCap, title: "10,500+ universities", text: "Ranked by match score, not commission.", tint: "#3b82f6" },
    { icon: Award, title: "98k+ scholarships", text: "Filtered to ones you can actually win.", tint: "#f59e0b" },
  ];
  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
          className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white" style={{ background: `color-mix(in srgb, ${it.tint} 16%, transparent)`, color: it.tint }}>
            <it.icon size={20} />
          </span>
          <div>
            <p className="text-sm font-black text-[var(--text-primary)]">{it.title}</p>
            <p className="mt-0.5 text-[13px] font-semibold text-[var(--text-muted)]">{it.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
