import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { SectionHeader, Stagger, StaggerItem } from "../home/shared";
import { TOOL_FINDER } from "./data";

export default function ToolFinder() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="tool-finder-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag={TOOL_FINDER.tag}
          tagIcon={<Sparkles size={13} />}
          title={TOOL_FINDER.title}
          highlight={TOOL_FINDER.highlight}
          subtitle={TOOL_FINDER.subtitle}
        />

        <Stagger className="mx-auto mt-12 max-w-3xl text-center" gap={0.08}>
          <p className="font-display text-xl font-bold text-[var(--text-primary)] sm:text-2xl">{TOOL_FINDER.question}</p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOOL_FINDER.options.map((o) => (
              <StaggerItem key={o.label}>
                <Link
                  to={o.to}
                  className="group flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-left text-[13px] font-bold text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--text-primary)] hover:shadow-[var(--shadow-soft)]"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `color-mix(in srgb, ${o.tint} 14%, transparent)`, color: o.tint }}
                  >
                    <o.icon size={18} />
                  </span>
                  <span className="flex-1">{o.label}</span>
                  <ArrowRight size={14} className="shrink-0 text-[var(--text-muted)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  );
}
