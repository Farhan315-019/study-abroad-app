import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Handshake,
  Landmark,
  Mail,
  Megaphone,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { api } from "../api/client";
import Select from "../components/ui/Select";
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

const inputCls =
  "w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20";
const labelCls = "mb-1.5 block text-xs font-black uppercase tracking-widest text-[var(--text-muted)]";

const BENEFITS = [
  {
    icon: Users,
    title: "40,000+ qualified applicants",
    text: "Students who have already shortlisted real requirements — not random leads. Reach candidates who genuinely fit your programs.",
    tint: "#3b82f6",
  },
  {
    icon: Megaphone,
    title: "Built-in brand visibility",
    text: "Your university gets featured on program pages, scholarship listings and AI-driven shortlists students actually see.",
    tint: "#8b5cf6",
  },
  {
    icon: TrendingUp,
    title: "Data-driven recruitment",
    text: "Understand demand by country, course and budget. We show you where your applicants come from and why.",
    tint: "#06b6d4",
  },
  {
    icon: BadgeCheck,
    title: "Verified profile badge",
    text: "A 'Verified' badge on your university card builds instant trust with every applicant who researches you.",
    tint: "#22c55e",
  },
];

const STEPS = [
  { icon: Mail, step: "01", title: "Tell us about you", text: "Fill in a 30-second form with your university details and contact info." },
  { icon: Handshake, step: "02", title: "We reach out", text: "Our partnerships team connects within 2 business days to plan your onboarding." },
  { icon: Globe2, step: "03", title: "Get listed & verified", text: "We verify your data, add the badge, and surface you to the right applicants." },
];

const PARTNER_UNIVERSITIES = [
  "Technical University of Munich",
  "University of Toronto",
  "University of Melbourne",
  "NUS Singapore",
  "TU Delft",
  "KAIST",
  "LMU Munich",
  "McGill University",
];

/* ---------------------------------- page ---------------------------------- */

export default function Collaborate() {
  const [form, setForm] = useState({
    university_name: "",
    country: "",
    contact_name: "",
    email: "",
    role: "",
    website: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.post("/resources/partner-inquiries", form);
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-x-clip">
      <Orbs />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-28 sm:pt-32">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--primary)]">
            <Handshake size={13} /> For universities
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-tight sm:text-6xl">
            Partner with <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">GlobleEdu</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            Bring your university in front of thousands of serious, pre-filtered international applicants — verified data, zero agency noise.
          </p>
        </FadeUp>
        <FadeUp delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#partner-form" className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-7 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5">
              Become a partner <ArrowRight size={16} />
            </a>
            <GhostButton to="/universities" size="lg">
              See how we list universities
            </GhostButton>
          </div>
        </FadeUp>

        {/* partner marquee */}
        <FadeUp delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">
              Already working with
            </span>
            {PARTNER_UNIVERSITIES.map((u) => (
              <span
                key={u}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-bold text-[var(--text-secondary)]"
              >
                <CheckCircle2 size={12} className="text-emerald-500" /> {u}
              </span>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Benefits */}
      <section className="relative mx-auto max-w-7xl px-6 pb-16">
        <SectionHeader
          tag="Why partner with us"
          tagIcon={<Sparkles size={13} />}
          title="Reach students who are"
          highlight="already serious"
          subtitle="Everyone on GlobleEdu has shortlisted programs, set budgets and checked real requirements before they ever see your university."
          align="center"
        />
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <StaggerItem key={b.title}>
              <GlassCard className="group relative h-full overflow-hidden p-7">
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${b.tint}, ${b.tint}44)` }}
                />
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                  style={{ background: `linear-gradient(135deg, ${b.tint}, ${b.tint}99)`, boxShadow: `0 12px 26px -10px ${b.tint}` }}
                >
                  <b.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-[var(--text-primary)]">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{b.text}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* How it works */}
      <section className="relative mx-auto max-w-7xl px-6 pb-16">
        <SectionHeader
          tag="How it works"
          tagIcon={<Handshake size={13} />}
          title="Partnership in"
          highlight="three steps"
          subtitle="From first contact to verified listing in under a week."
          align="center"
        />
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-3">
          {STEPS.map((f) => (
            <StaggerItem key={f.step}>
              <GlassCard className="relative h-full overflow-hidden p-7">
                <span className="absolute right-5 top-4 font-display text-5xl font-black text-[var(--text-primary)]/5">
                  {f.step}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
                  <f.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-[var(--text-primary)]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{f.text}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Form + contact */}
      <section id="partner-form" className="relative mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          {/* Left: pitch */}
          <FadeUp>
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                align="left"
                tag="Start the conversation"
                tagIcon={<Landmark size={13} />}
                title="Let's grow your"
                highlight="international intake"
                subtitle="Tell us a little about your university and a member of the partnerships team will get back to you within 2 business days."
              />
              <div className="mt-8 space-y-4">
                {[
                  { icon: ShieldCheck, text: "Your data stays 100% accurate — we verify everything against official sources." },
                  { icon: GraduationCap, text: "Full onboarding support, from CSV imports to custom program pages." },
                  { icon: TrendingUp, text: "Quarterly reports on applicant demand, clicks and conversions." },
                ].map((f) => (
                  <div key={f.text} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
                      <f.icon size={18} />
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Right: form */}
          <FadeUp delay={0.1}>
            <GlassCard className="p-7 sm:p-9">
              {sent ? (
                <div className="py-10 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <CheckCircle2 size={32} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-black text-[var(--text-primary)]">
                    Inquiry received!
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[var(--text-muted)]">
                    Thanks {form.contact_name} — our partnerships team will reach out to {form.email} within 2 business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm({ university_name: "", country: "", contact_name: "", email: "", role: "", website: "", message: "" });
                    }}
                    className="mt-6 rounded-2xl border border-[var(--border)] px-5 py-2.5 text-sm font-bold text-[var(--text-primary)] transition hover:border-[var(--primary)]"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls} htmlFor="university_name">University name *</label>
                      <input id="university_name" required value={form.university_name} onChange={set("university_name")} placeholder="e.g. University of Toronto" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="country">Country *</label>
                      <input id="country" required value={form.country} onChange={set("country")} placeholder="e.g. Canada" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls} htmlFor="contact_name">Contact name *</label>
                      <input id="contact_name" required value={form.contact_name} onChange={set("contact_name")} placeholder="Full name" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="email">Work email *</label>
                      <input id="email" type="email" required value={form.email} onChange={set("email")} placeholder="name@university.edu" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Select
                      label="Your role *"
                      required
                      value={form.role}
                      onChange={set("role")}
                    >
                      <option value="" disabled>Select role</option>
                      <option value="International Office">International Office</option>
                      <option value="Admissions">Admissions</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Dean / Head of School">Dean / Head of School</option>
                      <option value="Other">Other</option>
                    </Select>
                    <div>
                      <label className={labelCls} htmlFor="website">University website</label>
                      <input id="website" type="url" value={form.website} onChange={set("website")} placeholder="https://…" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="message">Anything else?</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us about your programs, intakes, or what you're looking for…"
                      className={inputCls + " resize-none"}
                    />
                  </div>

                  {error && (
                    <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-bold text-rose-400">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-7 py-4 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    <Send size={16} />
                    {submitting ? "Sending…" : "Send partnership inquiry"}
                  </button>
                  <p className="text-center text-xs font-bold text-[var(--text-muted)]">
                    No spam, no obligations — just a conversation.
                  </p>
                </form>
              )}
            </GlassCard>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-8">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--primary)]/25 bg-gradient-to-br from-[var(--primary)]/15 via-transparent to-violet-500/10 p-10 text-center sm:p-16">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-black leading-tight sm:text-5xl">
              Students are searching. <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Be their answer.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--text-secondary)] sm:text-base">
              Join the universities using GlobleEdu to reach qualified international applicants — with data you can trust.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#partner-form" className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-8 py-4 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5">
                Partner with us <ArrowRight size={16} />
              </a>
              <PrimaryButton to="/universities" size="lg">
                Browse universities
              </PrimaryButton>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
