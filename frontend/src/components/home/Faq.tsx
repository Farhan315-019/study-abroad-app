import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { SectionHeader, EASE } from "./shared";
import { FAQS } from "./data";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 lg:py-32" aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeader
          tag="FAQ"
          tagIcon={<MessageCircleQuestion size={13} />}
          title="Questions?"
          highlight="Answered."
          subtitle="Everything students ask before starting their journey."
        />

        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`glass-panel overflow-hidden rounded-2xl transition-shadow duration-300 ${isOpen ? "ring-glow" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-black text-[var(--text-primary)] sm:text-[15px]">{f.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    style={{ background: isOpen ? "var(--grad-primary)" : "var(--surface-soft)", color: isOpen ? "#fff" : "var(--text-muted)" }}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p className="px-5 pb-5 text-[13.5px] leading-relaxed text-[var(--text-muted)]">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
