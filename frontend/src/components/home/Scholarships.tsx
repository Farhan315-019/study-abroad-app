import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, CalendarClock, DollarSign, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { SectionHeader, Stagger, StaggerItem, GlassCard, EASE } from "./shared";
import { SCHOLARSHIP_STATS } from "./data";

const FEATURED = [
  {
    name: "DAAD EPOS",
    country: "Germany",
    coverage: "Full tuition + stipend",
    amount: "€992 / month",
    deadline: "Aug – Sep 2026",
    eligibility: "Graduate · 2+ yrs experience",
    tint: "#f59e0b",
  },
  {
    name: "Deutschlandstipendium",
    country: "Germany",
    coverage: "€300 / month",
    amount: "€300 / month",
    deadline: "Rolling",
    eligibility: "Merit-based · all levels",
    tint: "#3b82f6",
  },
  {
    name: "Turkey Burslari",
    country: "Türkiye",
    coverage: "Full scholarship",
    amount: "₺20,000 / year",
    deadline: "Feb 2026",
    eligibility: "International students",
    tint: "#22c55e",
  },
];

export default function Scholarships() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="scholarships-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag="Scholarships"
          tagIcon={<Award size={13} />}
          title="Funding you can"
          highlight="actually win."
          subtitle="Our radar filters 98,000+ scholarships down to the ones matching your profile, country and program."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3" gap={0.1}>
          {FEATURED.map((s) => (
            <StaggerItem key={s.name}>
              <GlassCard className="group relative h-full overflow-hidden p-6">
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40" style={{ background: s.tint }} />
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${s.tint}, ${s.tint}99)` }}>
                    <Award size={20} />
                  </span>
                  <span className="rounded-full bg-[var(--surface-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                    {s.country}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-[var(--text-primary)]">{s.name}</h3>
                <div className="mt-3 space-y-2 text-[12.5px] font-semibold text-[var(--text-secondary)]">
                  <p className="flex items-center gap-2"><DollarSign size={13} style={{ color: s.tint }} /> {s.coverage}</p>
                  <p className="flex items-center gap-2"><CalendarClock size={13} style={{ color: s.tint }} /> Deadline: {s.deadline}</p>
                  <p className="flex items-center gap-2"><CheckCircle2 size={13} style={{ color: s.tint }} /> {s.eligibility}</p>
                </div>
                <Link to="/scholarships" className="mt-5 inline-flex items-center gap-1.5 text-xs font-black text-[var(--primary)]">
                  Check eligibility <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>

        {/* eligibility prompt */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-[26px] p-8 text-center"
          style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(6,182,212,0.08))", border: "1px solid var(--border)" }}
        >
          <Sparkles size={22} className="mx-auto text-[var(--primary)]" />
          <p className="mt-3 font-display text-lg font-bold text-[var(--text-primary)]">
            Tell the AI your grades & budget — get every scholarship you qualify for, ranked.
          </p>
          <Link
            to="/register"
            className="shine relative mt-5 inline-flex items-center gap-2 overflow-hidden rounded-2xl px-7 py-3.5 text-sm font-bold text-white"
            style={{ background: "var(--grad-primary)" }}
          >
            Find my scholarships <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-4"
        >
          {SCHOLARSHIP_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-bold text-brand-gradient">{s.value}</p>
              <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
