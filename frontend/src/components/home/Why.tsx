import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserX, ArrowRight, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { SectionHeader, FadeLeft, FadeRight, EASE, Orbs } from "./shared";
import { WHY_POINTS, WHY_COMPARE } from "./data";

export default function Why() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="why-title">
      <Orbs opacity={0.25} />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag="Why GlobleEdu"
          tagIcon={<UserX size={13} />}
          title="Agencies take you for a ride."
          highlight="We give you the keys."
          subtitle="Consultants charge families thousands for guesswork. GlobleEdu gives you the same intelligence — sourced, instant and always up to date."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          {/* points */}
          <FadeLeft className="space-y-5">
            {WHY_POINTS.map((p) => (
              <div key={p.title} className="group flex items-start gap-5">
                <span
                  className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `color-mix(in srgb, ${p.tint} 14%, transparent)`, color: p.tint }}
                >
                  <p.icon size={20} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">{p.text}</p>
                </div>
              </div>
            ))}
            <Link
              to="/register"
              className="inline-flex items-center gap-2 pt-2 text-sm font-bold text-[var(--primary)] transition-all duration-300 hover:gap-3.5"
            >
              <Sparkles size={15} /> See your honest options <ArrowRight size={15} />
            </Link>
          </FadeLeft>

          {/* comparison */}
          <FadeRight>
            <div className="relative">
              <div className="glass-panel overflow-hidden rounded-[28px]">
                <div className="grid grid-cols-2 divide-x divide-[var(--border)]">
                  {/* agents */}
                  <div className="p-6">
                    <p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Typical agent</p>
                    <ul className="mt-5 space-y-4">
                      {WHY_COMPARE.agents.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[13px] font-semibold text-[var(--text-muted)]">
                          <XCircle size={15} className="mt-0.5 shrink-0 text-[var(--danger)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* globledu */}
                  <div className="p-6" style={{ background: "color-mix(in srgb, var(--primary) 8%, transparent)" }}>
                    <p className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest" style={{ color: "var(--primary)" }}>
                      <Sparkles size={12} /> GlobleEdu
                    </p>
                    <ul className="mt-5 space-y-4">
                      {WHY_COMPARE.globledu.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[13px] font-bold text-[var(--text-primary)]">
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[var(--success)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                className="absolute -bottom-7 left-1/2 -translate-x-1/2"
              >
                <div className="shine relative flex items-center gap-3 overflow-hidden rounded-2xl px-6 py-4 text-white"
                  style={{ background: "linear-gradient(135deg, #2563eb, #6366f1, #06b6d4)", boxShadow: "0 22px 50px -18px rgba(99,102,241,0.7)" }}>
                  <CheckCircle2 size={20} />
                  <span className="text-sm font-bold">Average student saves <span className="text-amber-300">$4,200</span></span>
                </div>
              </motion.div>
            </div>
          </FadeRight>
        </div>
      </div>
    </section>
  );
}
