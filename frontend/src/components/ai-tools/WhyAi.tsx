import { HeartHandshake } from "lucide-react";
import { SectionHeader, Stagger, StaggerItem, GlassCard } from "../home/shared";
import { WHY_AI } from "./data";

export default function WhyAi() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="why-ai-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag={WHY_AI.tag}
          tagIcon={<HeartHandshake size={13} />}
          title={WHY_AI.title}
          highlight={WHY_AI.highlight}
          subtitle={WHY_AI.subtitle}
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.1}>
          {WHY_AI.cards.map((c) => (
            <StaggerItem key={c.title}>
              <GlassCard className="group relative h-full overflow-hidden p-7">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ background: `color-mix(in srgb, ${c.tint} 14%, transparent)`, color: c.tint }}
                >
                  <c.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-[var(--text-primary)]">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{c.text}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
