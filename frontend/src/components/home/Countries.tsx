import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe2, ArrowRight, PlayCircle } from "lucide-react";
import { SectionHeader, Stagger, StaggerItem, GlassCard, VideoPanel, VIDEOS, EASE } from "./shared";
import { COUNTRIES, VISA_CHIPS } from "./data";

export default function Countries() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="countries-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag="Destinations"
          tagIcon={<Globe2 size={13} />}
          title="Every route,"
          highlight="decoded."
          subtitle="Fees, work rights and visa timelines for the world's most popular study destinations — updated from official sources."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.25fr]">
          {/* video panel */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative min-h-[320px]"
          >
            <VideoPanel src={VIDEOS.universities} className="h-full w-full" rounded="rounded-[28px]" />
            <div className="absolute inset-0 flex flex-col justify-between p-7">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-white backdrop-blur">
                <PlayCircle size={13} className="text-cyan-300" /> 70+ countries
              </span>
              <div>
                <p className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                  From Karachi to
                  <br />
                  <span className="text-brand-gradient">Kyoto.</span>
                </p>
                <p className="mt-3 max-w-xs text-sm font-semibold text-slate-200">
                  Every destination with real fees, real deadlines and real post-study work rights.
                </p>
                <Link
                  to="/recommendations"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Build my shortlist <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* country cards */}
          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2" gap={0.08}>
            {COUNTRIES.map((c) => (
              <StaggerItem key={c.name}>
                <GlassCard className="group h-full p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl" aria-hidden="true">{c.flag}</span>
                      <div>
                        <p className="font-display text-base font-bold text-[var(--text-primary)]">{c.name}</p>
                        <p className="text-[11px] font-bold text-[var(--text-muted)]">{c.unis}</p>
                      </div>
                    </div>
                    <span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white" style={{ background: `linear-gradient(135deg, ${c.tint}, ${c.tint}bb)` }}>
                      {c.visa}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-[var(--surface-soft)] p-2.5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Fees</p>
                      <p className="mt-0.5 text-[11.5px] font-black leading-tight text-[var(--text-primary)]">{c.fees}</p>
                    </div>
                    <div className="rounded-xl bg-[var(--surface-soft)] p-2.5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Work</p>
                      <p className="mt-0.5 text-[11.5px] font-black leading-tight text-[var(--text-primary)]">{c.jobs}</p>
                    </div>
                    <div className="rounded-xl bg-[var(--surface-soft)] p-2.5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Best for</p>
                      <p className="mt-0.5 text-[11.5px] font-black leading-tight text-[var(--text-primary)]">{c.stream}</p>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* visa chips */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {VISA_CHIPS.map((c) => (
            <span key={c.text} className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-bold text-[var(--text-secondary)]">
              <c.icon size={14} className="text-[var(--primary)]" /> {c.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
