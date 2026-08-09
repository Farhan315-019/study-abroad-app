import { Link } from "react-router-dom";
import { FileText, ArrowRight, Lock } from "lucide-react";
import { SectionHeader, Stagger, StaggerItem, GlassCard } from "../home/shared";
import { DOCUMENT_TOOLS, type ToolStatus } from "./data";

const STATUS_STYLE: Record<ToolStatus, { label: string; cls: string }> = {
  Live: { label: "Live", cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500" },
  "In Applications": { label: "In Applications", cls: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400" },
  "Coming Soon": { label: "Coming Soon", cls: "border-amber-500/30 bg-amber-500/10 text-amber-500" },
};

export default function DocumentTools() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="doc-tools-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag={DOCUMENT_TOOLS.tag}
          tagIcon={<FileText size={13} />}
          title={DOCUMENT_TOOLS.title}
          highlight={DOCUMENT_TOOLS.highlight}
          subtitle={DOCUMENT_TOOLS.subtitle}
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {DOCUMENT_TOOLS.items.map((d) => {
            const badge = STATUS_STYLE[d.status];
            return (
              <StaggerItem key={d.name}>
                <GlassCard className="group relative flex h-full flex-col overflow-hidden p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="flex shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-1"
                      style={{ background: `color-mix(in srgb, ${d.tint} 14%, transparent)`, color: d.tint, width: 48, height: 48 }}
                    >
                      <d.icon size={22} />
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-[var(--text-primary)]">{d.name}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-muted)]">{d.text}</p>

                  <div className="mt-5 flex-1" />

                  {d.to ? (
                    <Link
                      to={d.to}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-[13px] font-bold text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                    >
                      Open tool <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-[13px] font-bold text-[var(--text-muted)]">
                      <Lock size={13} /> Coming Soon
                    </span>
                  )}
                </GlassCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
