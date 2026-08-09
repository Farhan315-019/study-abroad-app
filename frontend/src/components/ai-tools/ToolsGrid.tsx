import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, LayoutGrid } from "lucide-react";
import { SectionHeader, Stagger, StaggerItem, GlassCard } from "../home/shared";
import { TOOLS, type ToolStatus } from "./data";

const STATUS_STYLE: Record<ToolStatus, { label: string; cls: string }> = {
  Live: { label: "Live", cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500" },
  "In Applications": { label: "In Applications", cls: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400" },
  "Coming Soon": { label: "Coming Soon", cls: "border-amber-500/30 bg-amber-500/10 text-amber-500" },
};

export default function ToolsGrid() {
  return (
    <section id="tools-grid" className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="tools-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag={TOOLS.tag}
          tagIcon={<LayoutGrid size={13} />}
          title={TOOLS.title}
          highlight={TOOLS.highlight}
          subtitle={TOOLS.subtitle}
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" gap={0.1}>
          {TOOLS.cards.map((t) => {
            const badge = STATUS_STYLE[t.status];
            return (
              <StaggerItem key={t.id} className={t.id === "chat-consultant" ? "lg:col-span-1" : ""}>
                <GlassCard className="group relative flex h-full flex-col overflow-hidden p-7">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="flex shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-1"
                      style={{ background: `color-mix(in srgb, ${t.tint} 14%, transparent)`, color: t.tint, width: 52, height: 52 }}
                    >
                      <t.icon size={24} />
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold text-[var(--text-primary)]">{t.name}</h3>
                  <p className="mt-1 text-sm font-bold text-brand-gradient">{t.value}</p>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-[var(--text-muted)]">{t.desc}</p>

                  <ul className="mt-4 space-y-2">
                    {t.helps.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-[13px] font-semibold text-[var(--text-secondary)]">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[var(--primary)]" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex-1" />

                  <Link
                    to={t.to}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-3 text-sm font-bold text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  >
                    {t.cta} <ArrowRight size={15} />
                  </Link>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
