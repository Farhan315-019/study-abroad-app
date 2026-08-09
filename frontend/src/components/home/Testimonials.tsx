import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader, GlassCard, Stagger, StaggerItem } from "./shared";
import { TESTIMONIALS } from "./data";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag="Success stories"
          tagIcon={<Quote size={13} />}
          title="Students who made it —"
          highlight="without an agent."
          subtitle="Real journeys from Pakistan, India, Bangladesh, Nigeria, UAE and beyond."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" gap={0.1}>
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <GlassCard className="group relative h-full overflow-hidden p-6">
                <div
                  className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ background: t.tint }}
                />
                <Quote size={26} className="rotate-180" style={{ color: t.tint }} />
                <p className="mt-4 min-h-[7rem] text-[13.5px] font-medium leading-relaxed text-[var(--text-primary)]">
                  "{t.quote}"
                </p>
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -90 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35 + i * 0.08, type: "spring", stiffness: 300, damping: 16 }}
                    >
                      <Star size={14} fill={t.tint} style={{ color: t.tint }} />
                    </motion.span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3 border-t border-[var(--border)] pt-5">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                    style={{ background: `linear-gradient(135deg, ${t.tint}, ${t.tint}bb)` }}
                  >
                    {t.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-[var(--text-primary)]">{t.name}</p>
                    <p className="truncate text-[11px] font-bold text-[var(--text-muted)]">
                      {t.from} → {t.to}
                    </p>
                    <p className="truncate text-[10px] font-black" style={{ color: t.tint }}>{t.program}</p>
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-center"
        >
          <Link
            to="/community"
            className="inline-flex items-center gap-2 text-sm font-black text-[var(--primary)] transition-all duration-300 hover:gap-3.5"
          >
            Join 10,000+ students in the community <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
