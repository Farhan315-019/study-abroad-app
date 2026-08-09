import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Google sample videos are guaranteed to exist; heavily blurred + overlaid for ambience. */
export const VIDEOS = {
  travel: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  universities:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
};

/* ---------------------------------- shared visuals ---------------------------------- */

export function Orbs({
  colors = ["#2563eb", "#06b6d4", "#6366f1"],
  className = "",
  opacity = 0.5,
}: {
  colors?: string[];
  className?: string;
  opacity?: number;
}) {
  const positions = [
    { top: "-6%", left: "-4%", size: 420 },
    { top: "22%", right: "-8%", size: 380 },
    { bottom: "-10%", left: "18%", size: 460 },
  ];
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {positions.map((p, i) => (
        <span
          key={i}
          className="orb"
          style={{
            ...p,
            width: p.size,
            height: p.size,
            background: colors[i % colors.length],
            opacity,
          }}
        />
      ))}
    </div>
  );
}

export function Starfield({ count = 55, className = "" }: { count?: number; className?: string }) {
  const stars = useRef(
    Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      delay: `${(Math.random() * 4).toFixed(2)}s`,
      dur: `${(2.6 + Math.random() * 4).toFixed(2)}s`,
    }))
  ).current;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------------------------- motion primitives ---------------------------------- */

export function FadeUp({
  children,
  delay = 0,
  y = 26,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function FadeLeft({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function FadeRight({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = "",
  delay = 0,
  gap = 0.1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.985 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------- layout cards ---------------------------------- */

export function GlassCard({
  children,
  className = "",
  style,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ duration: 0.35, ease: EASE }}
      className={`glass-panel rounded-3xl ${hover ? "transition-shadow duration-500 hover:ring-glow" : ""} ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------- headers ---------------------------------- */

export function SectionTag({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
      {icon}
      {children}
    </span>
  );
}

export function SectionHeader({
  tag,
  tagIcon,
  title,
  highlight,
  subtitle,
  align = "center",
}: {
  tag: string;
  tagIcon?: ReactNode;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <FadeUp className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <SectionTag icon={tagIcon}>{tag}</SectionTag>
      <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.6rem]">
        {title}{" "}
        {highlight && <span className="text-brand-gradient">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-muted)]">{subtitle}</p>
      )}
    </FadeUp>
  );
}

/* ---------------------------------- video ---------------------------------- */

export function VideoPanel({
  src,
  className = "",
  rounded = "rounded-[28px]",
  overlay = "gradient",
}: {
  src: string;
  className?: string;
  rounded?: string;
  overlay?: "gradient" | "none" | "solid";
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      {!failed ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover scale-105"
        />
      ) : (
        <div
          className="h-full w-full animate-aurora-1"
          style={{ background: "linear-gradient(135deg, #1e293b, #0f172a, #1e1b4b)" }}
        />
      )}
      {overlay === "gradient" && (
        <div
          className="absolute inset-0 video-shade"
          style={{ background: "linear-gradient(160deg, rgba(15,23,42,0.15), rgba(15,23,42,0.6))" }}
        />
      )}
      {overlay === "solid" && (
        <div className="absolute inset-0 video-shade" style={{ background: "rgba(2,6,23,0.45)" }} />
      )}
    </div>
  );
}

/* ---------------------------------- interactive helpers ---------------------------------- */

export function useMouseParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 50, damping: 16 });
  const y = useSpring(my, { stiffness: 50, damping: 16 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  return { ref, x, y, onMouseMove };
}

export function MagneticWrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, x, y, onMouseMove } = useMouseParallax();
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: useSpring(x, { stiffness: 150, damping: 15 }), y: useSpring(y, { stiffness: 150, damping: 15 }) }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function TiltCard({
  children,
  className = "",
  max = 10,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Typewriter({
  words,
  className = "",
  typeSpeed = 60,
  deleteSpeed = 30,
  pause = 1700,
}: {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let t: number;
    if (!deleting && text === word) {
      t = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
      t = 400;
    } else {
      t = window.setTimeout(
        () =>
          setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => window.clearTimeout(t);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-[3px] animate-pulse rounded-full bg-[var(--primary)]" style={{ height: "1em" }} />
    </span>
  );
}

export function AnimatedNumber({
  to,
  decimals = 0,
  duration = 1.6,
  suffix = "",
  prefix = "",
}: {
  to: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay((to * eased).toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, decimals, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {Number(display).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/* ---------------------------------- buttons ---------------------------------- */

export function PrimaryButton({
  children,
  to = "/register",
  className = "",
  size = "md",
}: {
  children: ReactNode;
  to?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "px-5 py-2.5 text-xs", md: "px-6 py-3.5 text-sm", lg: "px-8 py-4 text-sm" };
  return (
    <Link
      to={to}
      className={`shine relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 ${sizes[size]} ${className}`}
      style={{ background: "linear-gradient(135deg, #2563eb 0%, #6366f1 50%, #06b6d4 100%)", boxShadow: "0 18px 44px -14px rgba(99,102,241,0.6)" }}
    >
      {children}
    </Link>
  );
}

export function GhostButton({
  children,
  to,
  className = "",
  size = "md",
}: {
  children: ReactNode;
  to: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "px-5 py-2.5 text-xs", md: "px-6 py-3.5 text-sm", lg: "px-8 py-4 text-sm" };
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-glass)] font-bold text-[var(--text-primary)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)] ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

/* ---------------------------------- decorative spring line (Journey) ---------------------------------- */

export function SpringLine({
  progress,
  color = "var(--primary)",
}: {
  progress: MotionValue<number>;
  color?: string;
}) {
  return (
    <motion.div
      style={{ scaleX: progress }}
      className="h-[3px] w-full origin-left rounded-full"
    >
      <motion.div
        className="h-full w-full rounded-full"
        style={{ background: color, boxShadow: `0 0 18px ${color}` }}
      />
    </motion.div>
  );
}

export type { LucideIcon };
