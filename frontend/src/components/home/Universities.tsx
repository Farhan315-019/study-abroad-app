import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, ArrowRight, MapPin, Trophy, Wallet, BadgeCheck, Search } from "lucide-react";
import { SectionHeader, TiltCard, EASE } from "./shared";
import { UNI_STATS } from "./data";
import { api } from "../../api/client";
import type { Paginated, University } from "../../api/types";

const FALLBACK_UNIS: Partial<University>[] = [
  { id: 1, name: "Technical University of Munich", country: "Germany", city: "Munich", rank_world: 28, tuition_min_usd: 0, ielts_min: 6.5, status: "verified" },
  { id: 2, name: "Delft University of Technology", country: "Netherlands", city: "Delft", rank_world: 47, tuition_min_usd: 15000, ielts_min: 6.5, status: "verified" },
  { id: 3, name: "University of Toronto", country: "Canada", city: "Toronto", rank_world: 21, tuition_min_usd: 25000, ielts_min: 6.5, status: "verified" },
  { id: 4, name: "University of Melbourne", country: "Australia", city: "Melbourne", rank_world: 34, tuition_min_usd: 23000, ielts_min: 6.5, status: "verified" },
  { id: 5, name: "National University of Singapore", country: "Singapore", city: "Singapore", rank_world: 8, tuition_min_usd: 20000, ielts_min: 6.5, status: "verified" },
  { id: 6, name: "KAIST", country: "South Korea", city: "Daejeon", rank_world: 53, tuition_min_usd: 4000, ielts_min: 6.5, status: "verified" },
];

function rankColor(rank: number | null) {
  if (!rank) return "var(--text-muted)";
  if (rank <= 25) return "#f59e0b";
  if (rank <= 60) return "#3b82f6";
  return "#06b6d4";
}

export default function Universities() {
  const [q, setQ] = useState("");
  const [query, setQuery] = useState("");
  const [unis, setUnis] = useState<University[] | null>(null);
  const [total, setTotal] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    setBusy(true);
    const params: Record<string, string | number> = { q: query, page: 1, page_size: 6 };
    api
      .get<Paginated<University>>("/universities", { params })
      .then((r) => {
        if (!alive) return;
        setUnis(r.data.items);
        setTotal(r.data.total);
      })
      .catch(() => {
        if (!alive) return;
        setUnis(null);
        setTotal(FALLBACK_UNIS.length);
      })
      .finally(() => alive && setBusy(false));
    return () => {
      alive = false;
    };
  }, [query]);

  const list: Partial<University>[] = unis ?? FALLBACK_UNIS;

  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="unis-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeader
          tag="Universities"
          tagIcon={<Building2 size={13} />}
          title="10,500+ universities."
          highlight="Zero guesses."
          subtitle="Search, filter and compare verified requirements — every entry links to the official source."
        />

        {/* search bar */}
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(q);
          }}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mt-12 flex max-w-2xl items-center gap-2 rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-soft transition-all duration-300 focus-within:ring-glow"
        >
          <div className="flex flex-1 items-center gap-3 px-4">
            <Search size={18} className="shrink-0 text-[var(--text-muted)]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try 'MSc Computer Science in Germany'…"
              className="w-full bg-transparent py-3 text-sm font-semibold text-[var(--text-primary)] focus:outline-none"
              aria-label="Search universities"
            />
          </div>
          <button
            type="submit"
            className="shine relative inline-flex items-center gap-2 overflow-hidden rounded-2xl px-6 py-3.5 text-sm font-bold text-white"
            style={{ background: "var(--grad-primary)" }}
          >
            <Search size={15} /> Search
          </button>
        </motion.form>

        {/* results */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((u, i) => (
            <motion.div
              key={u.id ?? i}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
            >
              <TiltCard className="h-full">
                <Link
                  to={`/universities/${u.id}`}
                  className="group glass-panel flex h-full flex-col rounded-[26px] p-6 transition-shadow duration-500 hover:ring-glow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white" style={{ background: "var(--grad-primary)", boxShadow: "0 12px 26px -10px rgba(99,102,241,0.6)" }}>
                      <Building2 size={20} />
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-[var(--surface-soft)] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest" style={{ color: rankColor(u.rank_world ?? null) }}>
                      <Trophy size={11} /> {u.rank_world ? `#${u.rank_world}` : "Top-tier"}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold leading-snug text-[var(--text-primary)] group-hover:text-[var(--primary)]">
                    {u.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-[12.5px] font-bold text-[var(--text-muted)]">
                    <MapPin size={13} /> {u.city ? `${u.city}, ` : ""}{u.country}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="flex items-center gap-1.5 rounded-xl bg-[var(--surface-soft)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)]">
                      <Wallet size={12} style={{ color: "var(--primary)" }} />
                      {u.tuition_min_usd ? `$${u.tuition_min_usd.toLocaleString()}/yr` : "Free tuition"}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-xl bg-[var(--surface-soft)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)]">
                      IELTS {u.ielts_min ?? "—"}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-xl bg-[var(--surface-soft)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)]">
                      <BadgeCheck size={12} style={{ color: "var(--success)" }} /> {u.status ?? "verified"}
                    </span>
                  </div>

                  <span className="mt-5 flex items-center gap-1.5 pt-2 text-xs font-black text-[var(--primary)]">
                    View requirements <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-[13px] font-bold text-[var(--text-muted)]">
          {busy ? "Searching…" : unis ? `${total.toLocaleString()} universities found` : `Showing ${FALLBACK_UNIS.length} of the world's best · connect the backend for the full 10,500+`}
        </p>

        <div className="mt-8 text-center">
          <Link
            to="/universities"
            className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-7 py-3.5 text-sm font-bold text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]"
          >
            Browse all universities <ArrowRight size={15} />
          </Link>
        </div>

        {/* stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--border)] lg:grid-cols-4"
        >
          {UNI_STATS.map((s) => (
            <div key={s.label} className="bg-[var(--surface)] px-6 py-8 text-center">
              <p className="font-display text-2xl font-bold text-brand-gradient">{s.value}</p>
              <p className="mt-1.5 text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">{s.label}</p>
              <p className="mt-1 text-[10.5px] font-semibold text-[var(--text-muted)] opacity-70">{s.hint}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
