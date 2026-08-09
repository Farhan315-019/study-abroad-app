import { Route, MoveRight } from "lucide-react";
import { SectionHeader, Stagger, StaggerItem, GlassCard } from "../home/shared";
import { CONSULTANT } from "./data";

export default function Consultant() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="consultant-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag={CONSULTANT.tag}
          tagIcon={<Route size={13} />}
          title={CONSULTANT.title}
          highlight={CONSULTANT.highlight}
          subtitle={CONSULTANT.subtitle}
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.12}>
          {CONSULTANT.steps.map((s, i) => (
            <StaggerItem key={s.title}>
              <GlassCard className="group relative h-full overflow-hidden p-7">
                <span className="pointer-events-none absolute -right-4 -top-7 font-display text-[6rem] font-bold leading-none text-transparent" style={{ WebkitTextStroke: "1.5px var(--border)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative mt-4 font-display text-lg font-bold text-[var(--text-primary)]">{s.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{s.text}</p>
                {i < CONSULTANT.steps.length - 1 && (
                  <span className="relative mt-4 hidden items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[var(--primary)] lg:flex">
                    Next <MoveRight size={12} />
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
