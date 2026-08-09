import { Compass } from "lucide-react";
import { SectionHeader, Stagger, StaggerItem, GlassCard } from "../home/shared";
import { CATEGORIES } from "./data";

export default function Categories() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="categories-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag={CATEGORIES.tag}
          tagIcon={<Compass size={13} />}
          title={CATEGORIES.title}
          highlight={CATEGORIES.highlight}
          subtitle={CATEGORIES.subtitle}
        />

        <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7" gap={0.08}>
          {CATEGORIES.items.map((c) => (
            <StaggerItem key={c.name}>
              <GlassCard hover={false} className="group h-full p-5 text-center">
                <span
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ background: `color-mix(in srgb, ${c.tint} 14%, transparent)`, color: c.tint }}
                >
                  <c.icon size={22} />
                </span>
                <p className="mt-4 font-display text-sm font-bold text-[var(--text-primary)]">{c.name}</p>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-[var(--text-muted)]">{c.text}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
