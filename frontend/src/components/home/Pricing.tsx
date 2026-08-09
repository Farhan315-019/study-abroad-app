import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Check, ArrowRight, Zap, Crown } from "lucide-react";
import { SectionHeader, Stagger, StaggerItem } from "./shared";
import { PRICING } from "./data";

export default function Pricing() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="pricing-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag="Pricing"
          tagIcon={<Sparkles size={13} />}
          title="Less than a consultant."
          highlight="Better than one."
          subtitle="Start free. Upgrade only when the AI is saving you thousands."
        />

        <Stagger className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3" gap={0.1}>
          {PRICING.map((p) => (
            <StaggerItem key={p.name} className={p.featured ? "md:-mt-4 md:mb-4" : ""}>
              <div className={`relative h-full rounded-3xl ${p.featured ? "border-beam" : "glass-panel"} p-2`}>
                <div
                  className="relative flex h-full flex-col rounded-[20px] p-7"
                  style={{ background: p.featured ? "var(--surface)" : "transparent" }}
                >
                  {p.featured && (
                    <span
                      className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white"
                      style={{ background: "var(--grad-primary)", boxShadow: "0 12px 26px -10px rgba(99,102,241,0.7)" }}
                    >
                      <Crown size={11} /> Most popular
                    </span>
                  )}

                  <h3 className="text-sm font-black uppercase tracking-widest text-[var(--primary)]">{p.name}</h3>
                  <p className="mt-4 flex items-baseline gap-1.5">
                    <span className="font-display text-4xl font-bold text-[var(--text-primary)]">{p.price}</span>
                    <span className="text-xs font-bold text-[var(--text-muted)]">{p.period}</span>
                  </p>
                  <p className="mt-2 text-[13px] font-semibold text-[var(--text-muted)]">{p.tagline}</p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px] font-semibold text-[var(--text-primary)]">
                        <Check size={15} className="mt-0.5 shrink-0 text-[var(--success)]" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-7">
                    <Link
                      to={p.to}
                      className={`flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold transition-all duration-300 ${
                        p.featured ? "text-white" : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--primary)]"
                      }`}
                      style={p.featured ? { background: "var(--grad-primary)", boxShadow: "0 16px 36px -14px rgba(99,102,241,0.7)" } : undefined}
                    >
                      {p.featured && <Zap size={14} />}
                      {p.cta} <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
