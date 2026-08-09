import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  Award,
  BadgeCheck,
  Plane,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  EASE,
  VIDEOS,
  VideoPanel,
  Starfield,
  AnimatedNumber,
  Typewriter,
  MagneticWrap,
  useMouseParallax,
} from "./shared";
import { HERO_STATS, HERO_PARTNERS } from "./data";
import { logoHeroUrl } from "../../assets/brand";

function FloatChip({
  icon: Icon,
  text,
  sub,
  className = "",
  delay = 0,
  tint = "#3b82f6",
  floatDelay = 0,
}: {
  icon: LucideIcon;
  text: string;
  sub: string;
  className?: string;
  delay?: number;
  tint?: string;
  floatDelay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      >
        <div className="glass-soft flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
            style={{ background: `linear-gradient(135deg, ${tint}, ${tint}99)`, boxShadow: `0 10px 22px -8px ${tint}` }}
          >
            <Icon size={18} />
          </span>
          <span>
            <span className="block text-[12.5px] font-bold text-white">{text}</span>
            <span className="block text-[10.5px] font-semibold text-slate-300">{sub}</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const { ref, x, y, onMouseMove } = useMouseParallax();

  return (
    <section className="keep-dark relative overflow-hidden" aria-label="Hero">
      {/* background */}
      <div className="absolute inset-0">
        <VideoPanel src={VIDEOS.travel} className="h-full w-full" rounded="rounded-none" overlay="solid" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(2,6,23,0.62) 0%, rgba(2,6,23,0.82) 55%, var(--bg) 100%)" }}
        />
        <div className="bg-grid-pattern absolute inset-0 opacity-30" />
        <Starfield count={70} />
        <div className="orb w-[520px] h-[520px] -top-24 -left-20" style={{ background: "#3b82f6", opacity: 0.3 }} />
        <div className="orb w-[460px] h-[460px] top-10 right-[-10%]" style={{ background: "#06b6d4", opacity: 0.22 }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-24 pt-16 sm:px-8 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* ------- left: copy ------- */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 backdrop-blur"
            >
              <Sparkles size={13} className="text-amber-300" />
              No agents. No commissions. Just results.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="mt-6 font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]"
            >
              Study abroad,
              <br />
              <Typewriter
                words={["with AI.", "without agents.", "on scholarships.", "anywhere you want."]}
                className="text-brand-gradient"
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
            >
              Search <strong className="font-bold text-white">10,500+ universities</strong>, win scholarships,
              auto-apply and prepare your visa — all in one AI-powered platform. Built for students
              from Pakistan, India, Bangladesh, Nigeria and beyond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticWrap>
                <Link
                  to="/register"
                  className="shine relative inline-flex items-center gap-2 overflow-hidden rounded-2xl px-8 py-4 text-sm font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, #2563eb 0%, #6366f1 50%, #06b6d4 100%)", boxShadow: "0 20px 50px -16px rgba(99,102,241,0.7)" }}
                >
                  <Search size={16} /> Find my universities <ArrowRight size={15} />
                </Link>
              </MagneticWrap>
              <Link
                to="/chat"
                className="group inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                <Zap size={16} className="text-amber-300 transition-transform duration-300 group-hover:rotate-12" />
                Talk to AI — free
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-400"
            >
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-400" /> Free forever plan</span>
              <span className="inline-flex items-center gap-1.5"><BadgeCheck size={14} className="text-cyan-400" /> Verified data</span>
              <span className="inline-flex items-center gap-1.5"><Award size={14} className="text-amber-400" /> 10,000+ students</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4"
            >
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                    <AnimatedNumber to={s.value} suffix={s.suffix} duration={1.8} />
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ------- right: logo showcase ------- */}
          <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto max-w-[540px]">
              <motion.div style={{ x, y }}>
                <div className="border-beam relative overflow-hidden rounded-[34px] p-2">
                  <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-b from-slate-900 via-slate-950 to-black">
                    <img
                      src={logoHeroUrl}
                      alt="GlobleEdu.ai — AI-powered study abroad platform"
                      className="h-auto w-full object-contain"
                      loading="eager"
                    />
                    <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(2,6,23,0.35))" }} />
                  </div>
                </div>
              </motion.div>

              <FloatChip icon={Award} text="DAAD Scholarship" sub="Matched · 94% fit" className="-left-8 top-8" delay={0.9} tint="#f59e0b" floatDelay={0.2} />
              <FloatChip icon={Plane} text="Visa approved" sub="Germany · 4 weeks" className="-right-6 top-1/3" delay={1.05} tint="#22c55e" floatDelay={0.8} />
              <FloatChip icon={BadgeCheck} text="Offer: TU Munich" sub="MSc Informatics" className="-bottom-6 left-6" delay={1.2} tint="#3b82f6" floatDelay={1.4} />
            </div>
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
            <span className="h-9 w-5 rounded-full border border-white/20 p-1">
              <span className="animate-scroll-hint block h-2 w-2 rounded-full bg-white/70" />
            </span>
          </div>
        </motion.div>
      </div>

      {/* partner marquee */}
      <div className="relative z-10 border-t border-white/10 py-5">
        <div className="mask-fade-x overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-12">
            {[...HERO_PARTNERS, ...HERO_PARTNERS].map((u, i) => (
              <span key={i} className="flex items-center gap-2 whitespace-nowrap text-sm font-bold text-slate-400">
                <BadgeCheck size={14} className="text-cyan-400/70" /> {u}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
