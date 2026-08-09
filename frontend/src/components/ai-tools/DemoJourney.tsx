import { motion } from "framer-motion";
import { MonitorSmartphone } from "lucide-react";
import { SectionHeader, Stagger, StaggerItem, Orbs, EASE } from "../home/shared";
import { DEMO_JOURNEY } from "./data";

export default function DemoJourney() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="demo-journey-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag={DEMO_JOURNEY.tag}
          tagIcon={<MonitorSmartphone size={13} />}
          title={DEMO_JOURNEY.title}
          highlight={DEMO_JOURNEY.highlight}
          subtitle={DEMO_JOURNEY.subtitle}
        />

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="border-beam relative mx-auto mt-16 max-w-5xl rounded-[34px] p-2"
        >
          <div className="relative overflow-hidden rounded-[26px] bg-[var(--surface)]">
            <Orbs className="-z-0 opacity-40" colors={["#2563eb", "#06b6d4", "#8b5cf6"]} />
            <div className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-40" />

            <div className="relative px-6 py-10 sm:px-10 lg:py-14">
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--success)]" />
                {DEMO_JOURNEY.label}
              </motion.span>

              <Stagger className="mt-10 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-9" gap={0.07}>
                {DEMO_JOURNEY.steps.map((s, i) => (
                  <StaggerItem key={s.label} className="flex flex-col items-center text-center">
                    <span
                      className="relative flex h-14 w-14 items-center justify-center rounded-2xl text-white transition-transform duration-300 hover:-translate-y-1"
                      style={{ background: "var(--grad-primary)", boxShadow: "0 14px 30px -12px rgba(99,102,241,0.7)" }}
                    >
                      <s.icon size={22} />
                      <span className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--surface)] bg-[var(--surface-soft)] text-[9px] font-black text-[var(--text-secondary)]">
                        {i + 1}
                      </span>
                    </span>
                    <p className="mt-3 text-[11px] font-bold leading-snug text-[var(--text-secondary)]">{s.label}</p>
                  </StaggerItem>
                ))}
              </Stagger>

              <p className="mt-10 text-center text-xs font-semibold text-[var(--text-muted)]">
                A live demo experience — built directly into your AI tools page.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
