import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bot, Sparkles, ArrowUpRight, LayoutGrid } from "lucide-react";
import { SectionHeader, Stagger, StaggerItem, EASE } from "./shared";
import { FEATURES, FEATURE_STATS } from "./data";

export default function Features() {
  const rest = FEATURES.slice(1);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="features-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag="Platform"
          tagIcon={<LayoutGrid size={13} />}
          title="Everything you need,"
          highlight="one ecosystem."
          subtitle="From your first search to your visa stamp — no more juggling agencies, spreadsheets and random WhatsApp groups."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3" gap={0.08}>
          {/* big card */}
          <StaggerItem className="lg:col-span-2 lg:row-span-2">
            <Link
              to="/chat"
              className="group relative block h-full overflow-hidden rounded-[28px] p-8 sm:p-10 text-white transition-shadow duration-500 hover:ring-glow"
              style={{ background: "linear-gradient(135deg, #1e293b, #0f172a 55%, #1e1b4b)" }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-30 blur-3xl transition-transform duration-700 group-hover:scale-125" style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }} />
              <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-20" />
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--grad-primary)", boxShadow: "0 18px 40px -14px rgba(99,102,241,0.8)" }}>
                <Bot size={26} />
              </span>
              <h3 className="relative mt-6 font-display text-2xl font-bold sm:text-3xl">
                The AI Consultant that never sleeps
              </h3>
              <p className="relative mt-3 max-w-lg text-[15px] leading-relaxed text-slate-300">
                Ask about any country, university, visa or deadline. Zephyr answers in seconds —
                with live data and sources, in your language.
              </p>
              <ul className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "University shortlists with reasons",
                  "Scholarship eligibility checks",
                  "SOP & CV drafting",
                  "Visa document validation",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[13.5px] font-semibold text-slate-200">
                    <Sparkles size={14} className="shrink-0 text-amber-300" /> {f}
                  </li>
                ))}
              </ul>
              <span className="relative mt-7 inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold text-white" style={{ background: "var(--grad-primary)" }}>
                Try it free <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </StaggerItem>

          {/* small cards */}
          {rest.map((f) => (
            <StaggerItem key={f.title}>
              <div className="group glass-panel relative h-full overflow-hidden rounded-[24px] p-6 transition-shadow duration-500 hover:ring-glow">
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25" style={{ background: f.tint }} />
                <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" style={{ background: `color-mix(in srgb, ${f.tint} 15%, transparent)`, color: f.tint }}>
                  <f.icon size={20} />
                </span>
                <h3 className="relative mt-4 text-[15px] font-black text-[var(--text-primary)]">{f.title}</h3>
                <p className="relative mt-1.5 text-[13px] leading-relaxed text-[var(--text-muted)]">{f.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3"
        >
          {FEATURE_STATS.map((s) => (
            <div key={s.label} className="bg-[var(--surface)] px-6 py-8 text-center">
              <p className="font-display text-2xl font-bold text-brand-gradient">{s.value}</p>
              <p className="mt-1.5 text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
