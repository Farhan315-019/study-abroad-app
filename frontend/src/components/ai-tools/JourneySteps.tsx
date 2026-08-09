import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Route, MoveRight } from "lucide-react";
import { SectionHeader, Stagger, StaggerItem, GlassCard } from "../home/shared";
import { JOURNEY_STEPS } from "./data";

export default function JourneySteps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 35%"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="journey-steps-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag={JOURNEY_STEPS.tag}
          tagIcon={<Route size={13} />}
          title={JOURNEY_STEPS.title}
          highlight={JOURNEY_STEPS.highlight}
          subtitle={JOURNEY_STEPS.subtitle}
        />

        <div ref={ref} className="relative mx-auto mt-14 hidden max-w-5xl lg:block">
          <div className="h-[3px] w-full rounded-full bg-[var(--surface-soft)]" />
          <motion.div style={{ scaleX }} className="h-[3px] w-full origin-left rounded-full">
            <div
              className="h-full w-full rounded-full"
              style={{ background: "linear-gradient(90deg, #2563eb, #6366f1, #06b6d4)", boxShadow: "0 0 18px rgba(99,102,241,0.6)" }}
            />
          </motion.div>
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
          {JOURNEY_STEPS.steps.map((s, i) => (
            <StaggerItem key={s.title}>
              <GlassCard className="group relative h-full overflow-hidden p-6">
                <span className="pointer-events-none absolute -right-3 -top-6 font-display text-[5rem] font-bold leading-none text-transparent" style={{ WebkitTextStroke: "1.5px var(--border)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex items-center justify-center rounded-2xl text-white transition-transform duration-300 group-hover:-translate-y-1" style={{ width: 48, height: 48, background: "var(--grad-primary)", boxShadow: "0 12px 26px -12px rgba(99,102,241,0.7)" }}>
                  <s.icon size={21} />
                </span>
                <h3 className="relative mt-4 font-display text-base font-bold text-[var(--text-primary)]">{s.title}</h3>
                <p className="relative mt-1.5 text-[13px] leading-relaxed text-[var(--text-muted)]">{s.text}</p>
                {i < JOURNEY_STEPS.steps.length - 1 && (
                  <span className="relative mt-3 hidden items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] lg:flex">
                    Next <MoveRight size={11} />
                  </span>
                )}
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
