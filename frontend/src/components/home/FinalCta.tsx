import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, GraduationCap, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { VIDEOS, VideoPanel, Starfield, EASE } from "./shared";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36" aria-labelledby="cta-title">
      <div className="keep-dark relative">
        <div className="absolute inset-0">
          <VideoPanel src={VIDEOS.travel} className="h-full w-full" rounded="rounded-none" overlay="none" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, var(--bg) 0%, rgba(5,8,22,0.72) 30%, rgba(5,8,22,0.78) 70%, var(--bg) 100%)" }}
          />
        </div>
        <Starfield count={50} />

        <div className="relative mx-auto max-w-4xl px-5 py-10 text-center sm:px-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-indigo-200 backdrop-blur"
          >
            <Sparkles size={13} className="text-cyan-300" /> Your seat is waiting
          </motion.span>

          <motion.h2
            id="cta-title"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[4rem]"
          >
            The future of studying abroad
            <br />
            <span className="text-brand-gradient">starts in 60 seconds.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mx-auto mt-6 max-w-xl text-base text-slate-300 sm:text-lg"
          >
            Create a free profile. Let the AI build your shortlist, your scholarship plan
            and your visa roadmap — before you even call a consultant.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/register"
              className="shine relative inline-flex items-center gap-2 overflow-hidden rounded-2xl px-9 py-4 text-sm font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: "var(--grad-primary)", boxShadow: "0 18px 44px -14px rgba(99,102,241,0.65)" }}
            >
              <GraduationCap size={16} /> Create free profile <ArrowRight size={15} />
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-9 py-4 text-sm font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
            >
              <Plane size={16} className="text-cyan-300" /> Talk to AI first
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-7 flex items-center justify-center gap-2 text-xs font-bold text-slate-400"
          >
            <ShieldCheck size={14} className="text-emerald-400" /> Free forever · No credit card · No agent pressure
          </motion.p>
        </div>
      </div>
    </section>
  );
}
