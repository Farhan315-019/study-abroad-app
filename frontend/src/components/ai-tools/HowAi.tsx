import { motion } from "framer-motion";
import { Lightbulb, Sparkles, ShieldCheck } from "lucide-react";
import { SectionHeader, EASE, FadeUp } from "../home/shared";
import { HOW_AI } from "./data";

export default function HowAi() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="how-ai-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag={HOW_AI.tag}
          tagIcon={<Lightbulb size={13} />}
          title={HOW_AI.title}
          highlight={HOW_AI.highlight}
          subtitle={HOW_AI.subtitle}
        />

        <div className="mx-auto mt-14 grid max-w-5xl items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {HOW_AI.points.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
                className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "color-mix(in srgb, var(--primary) 14%, transparent)", color: "var(--primary)" }}>
                  <Sparkles size={13} />
                </span>
                <p className="text-[13.5px] font-semibold text-[var(--text-secondary)]">{p}</p>
              </motion.div>
            ))}
          </div>

          <FadeUp className="lg:pt-2">
            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface-soft)] p-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                <ShieldCheck size={13} className="text-[var(--success)]" /> Responsible AI
              </span>
              <p className="mt-5 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">{HOW_AI.disclaimer}</p>
              <p className="mt-4 text-[13px] leading-relaxed text-[var(--text-muted)]">
                GlobleEdu.ai helps you research, plan and prepare — but official decisions on admission, scholarships and visas always come from the institutions and authorities themselves.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
