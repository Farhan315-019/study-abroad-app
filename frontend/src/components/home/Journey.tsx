import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Route, MoveRight } from "lucide-react";
import { SectionHeader, Stagger, StaggerItem, EASE, GlassCard } from "./shared";
import { STEPS, JOURNEY_STATS } from "./data";

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 35%"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="journey-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag="How it works"
          tagIcon={<Route size={13} />}
          title="From first search to"
          highlight="visa stamp."
          subtitle="Six steps. Zero confusion. The AI handles the busywork — you make the decisions."
        />

        {/* progress line */}
        <div ref={ref} className="relative mx-auto mt-14 hidden max-w-4xl lg:block">
          <div className="h-[3px] w-full rounded-full bg-[var(--surface-soft)]" />
          <motion.div
            style={{ scaleX }}
            className="h-[3px] w-full origin-left rounded-full"
          >
            <div
              className="h-full w-full rounded-full"
              style={{ background: "linear-gradient(90deg, #2563eb, #6366f1, #06b6d4)", boxShadow: "0 0 18px rgba(99,102,241,0.6)" }}
            />
          </motion.div>
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.12}>
          {STEPS.map((s, i) => (
            <StaggerItem key={s.title}>
              <GlassCard className="group relative h-full overflow-hidden p-7">
                <span className="pointer-events-none absolute -right-4 -top-7 font-display text-[6rem] font-bold leading-none text-transparent" style={{ WebkitTextStroke: "1.5px var(--border)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex items-center justify-center rounded-2xl text-white transition-transform duration-300 group-hover:-translate-y-1" style={{ width: 52, height: 52, background: "var(--grad-primary)", boxShadow: "0 14px 30px -12px rgba(99,102,241,0.7)" }}>
                  <s.icon size={22} />
                </span>
                <h3 className="relative mt-5 font-display text-lg font-bold text-[var(--text-primary)]">{s.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{s.text}</p>
                {i < STEPS.length - 1 && (
                  <span className="relative mt-4 hidden items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[var(--primary)] lg:flex">
                    Next <MoveRight size={12} />
                  </span>
                )}
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>

        {/* stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3"
        >
          {JOURNEY_STATS.map((s) => (
            <div key={s.label} className="bg-[var(--surface)] px-6 py-7 text-center">
              <p className="font-display text-2xl font-bold text-brand-gradient">{s.value}</p>
              <p className="mt-1.5 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
