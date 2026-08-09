import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Cookie, Database, Eye, FileText, Lock, ShieldCheck, Trash2, type LucideIcon } from "lucide-react";
import { FadeUp, Orbs, PrimaryButton } from "../components/home/shared";

interface PolicySection {
  icon: LucideIcon;
  title: string;
  text: string;
}

const SECTIONS: PolicySection[] = [
  {
    icon: Database,
    title: "What we collect",
    text: "Account details (name, email, password hash), profile data you add (grades, budget, preferences), documents you upload, and standard usage analytics. We never collect more than needed to run the product.",
  },
  {
    icon: Eye,
    title: "How we use it",
    text: "To build your university shortlist, match scholarships, draft documents and power the AI consultant. Your profile data is used only to serve you — never sold and never used to advertise other products.",
  },
  {
    icon: ShieldCheck,
    title: "Who we share it with",
    text: "Only the infrastructure providers needed to operate (hosting, email). We never share your data with agencies, universities or advertisers. You control every export and download.",
  },
  {
    icon: Cookie,
    title: "Cookies & analytics",
    text: "We use essential cookies for login and preference storage, plus privacy-friendly analytics to improve the product. No third-party ad trackers. You can disable non-essential cookies anytime.",
  },
  {
    icon: Lock,
    title: "Data security",
    text: "Passwords are hashed, connections are encrypted, and documents are stored with restricted access. We run regular security reviews and follow data protection best practices.",
  },
  {
    icon: Trash2,
    title: "Your rights",
    text: "Access, export, correct or delete your data at any time — right from your settings page, with one click. We honour deletion requests within 30 days, no questions asked.",
  },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Do you sell my data?", a: "No. Ever. Your data is used only to run the platform for you." },
  { q: "Can I delete my account?", a: "Yes — from Settings, one click. Everything is removed within 30 days." },
  { q: "Who owns my uploaded documents?", a: "You do. They're only used to build your application package." },
  { q: "How long do you keep data?", a: "Only as long as your account exists, plus a short retention window for legal reasons." },
];

export default function Privacy() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % SECTIONS.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-x-clip">
      <Orbs opacity={0.35} />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--primary)]">
            <ShieldCheck size={13} /> Privacy
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-black leading-tight sm:text-5xl">
            Your data is <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">yours.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            We don't sell data, we don't push ads, and we don't share your documents with anyone without your
            explicit consent. It's that simple.
          </p>
        </FadeUp>
        <FadeUp delay={0.24}>
          <div className="mx-auto mt-9 flex max-w-md flex-wrap items-center justify-center gap-3">
            {["Encrypted", "Never sold", "Delete anytime"].map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-emerald-400">
                <CheckCircle2 size={13} /> {c}
              </span>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Highlights */}
      <section className="relative mx-auto max-w-6xl px-6 py-8 sm:py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s, i) => (
            <div
              key={s.title}
              className={`rounded-3xl border p-6 transition-all duration-500 ${
                active === i ? "border-[var(--primary)] bg-[var(--surface)] shadow-[var(--shadow-soft)]" : "border-[var(--border)] bg-[var(--surface-glass)] backdrop-blur-xl"
              }`}
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${active === i ? "bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-white" : "bg-[var(--primary)]/10 text-[var(--primary)]"}`}>
                <s.icon size={20} />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold text-[var(--text-primary)]">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <FadeUp>
          <h2 className="text-center font-display text-3xl font-bold text-[var(--text-primary)]">
            Quick answers
          </h2>
        </FadeUp>
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <div key={f.q} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-glass)] backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="text-sm font-bold text-[var(--text-primary)]">{f.q}</span>
                <FileText size={16} className={`shrink-0 text-[var(--primary)] transition-transform ${open === i ? "rotate-90" : ""}`} />
              </button>
              {open === i && (
                <p className="border-t border-[var(--border)] px-6 py-4 text-sm leading-relaxed text-[var(--text-secondary)]">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[36px] border border-[var(--border)] p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.16), rgba(139,92,246,0.14) 55%, rgba(6,182,212,0.12))" }} aria-hidden="true" />
            <div className="relative z-10">
              <Cookie size={26} className="mx-auto text-[var(--primary)]" />
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl">
                Want to see exactly <span className="text-brand-gradient">what we store?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--text-muted)]">
                Create a free account and export or delete everything from Settings — anytime, with one click.
              </p>
              <div className="mt-9">
                <PrimaryButton to="/register" size="lg">
                  Start free <ArrowRight size={16} />
                </PrimaryButton>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
