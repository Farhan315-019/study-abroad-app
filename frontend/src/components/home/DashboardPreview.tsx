import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  FileCheck2,
  Plane,
  CheckCircle2,
  GraduationCap,
  ArrowRight,
  Search,
  Sparkles,
} from "lucide-react";
import { SectionHeader, EASE } from "./shared";
import { DASH_METRICS, DASH_PIPELINE, DASH_ACTIVITY, DASH_APPLICATIONS } from "./data";

const SIDEBAR = [
  { icon: LayoutDashboard, active: true },
  { icon: Search, active: false },
  { icon: GraduationCap, active: false },
  { icon: FileCheck2, active: false },
  { icon: Plane, active: false },
  { icon: Bell, active: false },
];

export default function DashboardPreview() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="dash-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag="Your dashboard"
          tagIcon={<LayoutDashboard size={13} />}
          title="Every application,"
          highlight="in one glance."
          subtitle="Offers, deadlines, visa stages and scholarship odds — tracked automatically, so you never miss a step."
        />

        {/* browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="border-beam mx-auto mt-16 max-w-5xl rounded-[28px] p-2"
        >
          <div className="overflow-hidden rounded-[20px] bg-[var(--surface)] shadow-2xl">
            {/* browser chrome */}
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
              <span className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[var(--danger)]" />
                <span className="h-3 w-3 rounded-full bg-[var(--warning)]" />
                <span className="h-3 w-3 rounded-full bg-[var(--success)]" />
              </span>
              <span className="flex flex-1 items-center gap-2 rounded-full bg-[var(--surface-soft)] px-4 py-1.5 text-[11px] font-bold text-[var(--text-muted)]">
                <Search size={11} /> app.globleedu.ai/dashboard
              </span>
            </div>

            <div className="grid lg:grid-cols-[56px_1fr]">
              {/* sidebar */}
              <div className="hidden flex-col items-center gap-3 border-r border-[var(--border)] py-5 lg:flex">
                {SIDEBAR.map((s, i) => (
                  <span
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={
                      s.active
                        ? { background: "var(--grad-primary)", color: "#fff", boxShadow: "0 8px 20px -8px rgba(99,102,241,0.7)" }
                        : { color: "var(--text-muted)" }
                    }
                  >
                    <s.icon size={16} />
                  </span>
                ))}
              </div>

              {/* main */}
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-bold text-[var(--text-primary)]">Welcome back, Ayesha 👋</p>
                    <p className="text-[11px] font-bold text-[var(--text-muted)]">Your applications are on track</p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[11px] font-black text-[var(--success)]">
                    <CheckCircle2 size={12} /> Profile 86% complete
                  </span>
                </div>

                {/* metrics */}
                <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {DASH_METRICS.map((m) => (
                    <div key={m.label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                      <span className="flex items-center gap-2 text-[10.5px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                        <m.icon size={13} style={{ color: m.tint }} /> {m.label}
                      </span>
                      <p className="mt-2 font-display text-xl font-bold text-[var(--text-primary)]">{m.value}</p>
                      <p className="mt-0.5 text-[10.5px] font-bold" style={{ color: m.tint }}>{m.delta}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
                  {/* applications */}
                  <div className="rounded-2xl border border-[var(--border)]">
                    <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
                      <p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Applications</p>
                      <Link to="/applications" className="text-[11px] font-bold text-[var(--primary)]">View all</Link>
                    </div>
                    {DASH_APPLICATIONS.map((a) => (
                      <div key={a.uni} className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3 last:border-0">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-black text-white" style={{ background: `linear-gradient(135deg, ${a.tint}, ${a.tint}99)` }}>
                          {a.uni.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12.5px] font-black text-[var(--text-primary)]">{a.uni}</p>
                          <p className="truncate text-[10.5px] font-bold text-[var(--text-muted)]">{a.program} · {a.deadline}</p>
                        </div>
                        <div className="w-16 shrink-0">
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-soft)]">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${a.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.1, ease: EASE }}
                              className="h-full rounded-full"
                              style={{ background: a.tint }}
                            />
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-black uppercase tracking-wide" style={{ background: `color-mix(in srgb, ${a.tint} 14%, transparent)`, color: a.tint }}>
                          {a.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* pipeline + activity */}
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-[var(--border)] p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Pipeline</p>
                      <div className="mt-3 space-y-3">
                        {DASH_PIPELINE.map((p) => (
                          <div key={p.label}>
                            <div className="flex items-center justify-between text-[11px] font-bold">
                              <span className="text-[var(--text-secondary)]">{p.label}</span>
                              <span style={{ color: p.color }}>{p.value}</span>
                            </div>
                            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[var(--surface-soft)]">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${p.value * 14}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: EASE }}
                                className="h-full rounded-full"
                                style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}88)` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[var(--border)] p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Activity</p>
                      <div className="mt-3 space-y-3">
                        {DASH_ACTIVITY.map((a) => (
                          <div key={a.text} className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in srgb, ${a.tint} 14%, transparent)`, color: a.tint }}>
                              <a.icon size={13} />
                            </span>
                            <div className="min-w-0">
                              <p className="text-[11.5px] font-bold leading-snug text-[var(--text-secondary)]">{a.text}</p>
                              <p className="text-[10px] font-bold text-[var(--text-muted)]">{a.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-10 text-center"
        >
          <Link
            to="/register"
            className="shine relative inline-flex items-center gap-2 overflow-hidden rounded-2xl px-8 py-4 text-sm font-bold text-white"
            style={{ background: "var(--grad-primary)", boxShadow: "0 18px 44px -14px rgba(99,102,241,0.6)" }}
          >
            <Sparkles size={15} /> Get your dashboard <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
