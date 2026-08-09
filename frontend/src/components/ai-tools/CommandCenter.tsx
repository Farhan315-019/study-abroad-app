import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Bot, Send, Sparkles, LogIn } from "lucide-react";
import { api } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import { SectionHeader, EASE } from "../home/shared";
import { COMMAND_CENTER, DEMO_SCRIPT, DEMO_REPLIES, DEMO_SIGNIN_NOTE } from "./data";

interface Msg {
  role: "user" | "assistant";
  content: string;
  ai?: boolean;
  card?: { label: string; value: string; tint: string }[];
}

const FALLBACK_DEMO_REPLY =
  "That's exactly what I can help with once you sign in! I'll give you a personalized answer based on your profile, budget and goals.";

export default function CommandCenter() {
  const { user } = useAuth();
  const signedIn = !!user;
  const navigate = useNavigate();
  const location = useLocation();

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goLogin = () => navigate("/login", { state: { from: { pathname: "/chat" } } });

  /* -------- load history (signed in) or start demo script (signed out) -------- */
  useEffect(() => {
    if (signedIn) {
      api
        .get<{ messages: { role: string; content: string }[] }>("/chat/history")
        .then((r) => {
          const list = r.data.messages.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          }));
          setMessages(
            list.length > 0 ? list : [{ role: "assistant", content: DEMO_SCRIPT[0].text }]
          );
        })
        .catch(() => setMessages([{ role: "assistant", content: DEMO_SCRIPT[0].text }]));
    } else {
      setMessages([{ role: "assistant", content: DEMO_SCRIPT[0].text }]);
      const t1 = window.setTimeout(() => {
        setMessages((m) => [...m, { role: "user", content: DEMO_SCRIPT[1].text }]);
        setTyping(true);
        window.setTimeout(() => {
          setTyping(false);
          setMessages((m) => [...m, { role: "assistant", content: DEMO_SCRIPT[2].text, card: DEMO_SCRIPT[2].card }]);
        }, 1500);
      }, 2400);
      return () => window.clearTimeout(t1);
    }
  }, [signedIn]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  /* -------- prefill from homepage hero navigation state -------- */
  useEffect(() => {
    const prompt = (location.state as { prompt?: string } | null)?.prompt;
    if (prompt && prompt.trim()) {
      setInput(prompt.trim());
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  /* -------- receive prompt from hero command bar -------- */
  useEffect(() => {
    const h = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === "string" && detail.trim()) {
        setInput(detail);
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("globle:chat-prompt", h);
    return () => window.removeEventListener("globle:chat-prompt", h);
  }, []);

  /* -------- real chat send -------- */
  const send = async (text: string) => {
    if (!text.trim() || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setBusy(true);
    try {
      const r = await api.post<{ reply: string; ai: boolean }>("/chat", { message: text });
      setMessages((m) => [...m, { role: "assistant", content: r.data.reply, ai: r.data.ai }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setBusy(false);
    }
  };

  /* -------- demo chip reply -------- */
  const demoAsk = (label: string) => {
    if (typing) return;
    setMessages((m) => [...m, { role: "user", content: label }]);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: DEMO_REPLIES[label] ?? FALLBACK_DEMO_REPLY },
      ]);
    }, 1300);
  };

  const onPrompt = (p: string) => {
    if (signedIn) send(p);
    else demoAsk(p);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (signedIn) send(input);
    else goLogin();
  };

  return (
    <section id="command-center" className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="command-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag={COMMAND_CENTER.tag}
          tagIcon={<Bot size={13} />}
          title={COMMAND_CENTER.title}
          highlight={COMMAND_CENTER.highlight}
          subtitle={COMMAND_CENTER.subtitle}
        />

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="border-beam relative mx-auto mt-16 max-w-2xl rounded-[34px] p-2"
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
                  <p className="text-sm font-black text-[var(--text-primary)]">GlobleEdu AI — Consultant</p>
                  {signedIn ? (
                    <p className="text-[11px] font-bold text-[var(--success)]">● Online · 24/7</p>
                  ) : (
                    <p className="text-[11px] font-bold text-[var(--warning)]">● Demo preview</p>
                  )}
                </div>
              </div>
              {!signedIn && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                  <Sparkles size={11} className="text-[var(--warning)]" /> Preview
                </span>
              )}
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
                      {m.role === "assistant" && (
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
                          {m.content}
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

            {/* example prompts */}
            <div className="flex gap-2 overflow-x-auto border-t border-[var(--border)] px-5 py-3.5" style={{ scrollbarWidth: "none" }}>
              {COMMAND_CENTER.prompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPrompt(p)}
                  className="shrink-0 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3.5 py-2 text-xs font-bold text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* input / sign-in gate */}
            {signedIn ? (
              <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-[var(--border)] px-5 py-4">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about studying abroad..."
                  className="flex-1 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[13.5px] font-semibold text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
                />
                <button
                  type="submit"
                  disabled={busy}
                  aria-label="Send message"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white transition hover:brightness-110 disabled:opacity-50"
                  style={{ background: "var(--grad-primary)", boxShadow: "0 12px 26px -10px rgba(99,102,241,0.6)" }}
                >
                  <Send size={16} />
                </button>
              </form>
            ) : (
              <div className="border-t border-[var(--border)] px-5 py-4">
                <button
                  type="button"
                  onClick={goLogin}
                  className="shine relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 py-3.5 text-sm font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ background: "var(--grad-primary)", boxShadow: "0 14px 34px -12px rgba(99,102,241,0.65)" }}
                >
                  <LogIn size={16} /> Sign in to chat free
                </button>
                <p className="mt-2.5 text-center text-[11px] font-semibold text-[var(--text-muted)]">{DEMO_SIGNIN_NOTE}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
