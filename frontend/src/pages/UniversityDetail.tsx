import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileText,
  GraduationCap,
  Globe2,
  Languages,
  MapPin,
  NotebookPen,
  ShieldCheck,
  Trophy,
  Wallet,
} from "lucide-react";
import { api } from "../api/client";
import type { University } from "../api/types";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";
import { FadeUp, Orbs, PrimaryButton } from "../components/home/shared";

const FLAGS: Record<string, string> = {
  Germany: "🇩🇪",
  Canada: "🇨🇦",
  Australia: "🇦🇺",
  USA: "🇺🇸",
  "United States": "🇺🇸",
  UK: "🇬🇧",
  "United Kingdom": "🇬🇧",
  Ireland: "🇮🇪",
  "New Zealand": "🇳🇿",
  Netherlands: "🇳🇱",
  Sweden: "🇸🇪",
  Norway: "🇳🇴",
  Denmark: "🇩🇰",
  Finland: "🇫🇮",
  Belgium: "🇧🇪",
  Switzerland: "🇨🇭",
  France: "🇫🇷",
  Italy: "🇮🇹",
  Spain: "🇪🇸",
  Poland: "🇵🇱",
  Hungary: "🇭🇺",
  Czechia: "🇨🇿",
  "Czech Republic": "🇨🇿",
  Singapore: "🇸🇬",
  Japan: "🇯🇵",
  "South Korea": "🇰🇷",
  China: "🇨🇳",
  Malaysia: "🇲🇾",
  UAE: "🇦🇪",
  Turkey: "🇹🇷",
};

const PALETTE = ["#3b82f6", "#06b6d4", "#8b5cf6", "#f59e0b", "#22c55e", "#ec4899", "#f97316", "#14b8a6"];

function tintOf(country: string) {
  let h = 0;
  for (let i = 0; i < country.length; i++) h = (h * 31 + country.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

export default function UniversityDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [uni, setUni] = useState<University | null>(null);
  const [error, setError] = useState("");
  const [appMsg, setAppMsg] = useState("");
  const [appMsgOk, setAppMsgOk] = useState(false);

  useEffect(() => {
    api
      .get<University>(`/universities/${id}`)
      .then((r) => setUni(r.data))
      .catch(() => setError("University not found."));
  }, [id]);

  const toggleSave = async () => {
    if (!uni) return;
    const res = await api.post<University>(`/universities/${uni.id}/save`).catch(
      () => api.delete<University>(`/universities/${uni.id}/save`)
    );
    setUni(res.data);
  };

  const addToApplications = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setAppMsg("");
    try {
      await api.post("/applications", { university_id: uni!.id });
      setAppMsg("Added to your application list.");
      setAppMsgOk(true);
    } catch (e: unknown) {
      const detail = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setAppMsg(detail ?? "Could not add. It may already be in your list.");
      setAppMsgOk(false);
    }
  };

  if (error) {
    return (
      <div className="relative overflow-x-clip">
        <Orbs opacity={0.3} />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="font-display text-2xl font-black text-[var(--text-primary)]">{error}</p>
          <Link to="/universities" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-6 py-3 text-sm font-bold text-white">
            <ArrowLeft size={15} /> Back to search
          </Link>
        </div>
      </div>
    );
  }

  if (!uni) {
    return <div className="mx-auto max-w-3xl px-6 py-24 text-center text-sm font-bold text-[var(--text-muted)]">Loading…</div>;
  }

  const tint = tintOf(uni.country);
  const flag = FLAGS[uni.country] ?? undefined;

  const keyRows: { icon: typeof Globe2; label: string; value: string | null }[] = [
    { icon: MapPin, label: "Country / City", value: uni.city ? `${uni.country} — ${uni.city}` : uni.country },
    { icon: Trophy, label: "World rank", value: uni.rank_world != null ? `#${uni.rank_world}` : "Not ranked" },
    { icon: CalendarDays, label: "Intakes", value: uni.intake_seasons },
    { icon: Banknote, label: "Application fee", value: uni.application_fee },
    { icon: Wallet, label: "Tuition", value: uni.tuition_fees ?? (uni.tuition_min_usd != null ? `From $${uni.tuition_min_usd.toLocaleString()}/yr` : null) },
  ];

  const englishRows: { label: string; value: string | null }[] = [
    { label: "IELTS", value: uni.ielts_min != null ? `${uni.ielts_min} minimum` : null },
    { label: "PTE", value: uni.pte_min != null ? `${uni.pte_min} minimum` : null },
    { label: "TOEFL", value: uni.toefl_min != null ? `${uni.toefl_min} minimum` : null },
    { label: "GPA", value: uni.gpa_requirement },
  ];

  const documents = uni.documents_required?.split(", ").filter(Boolean) ?? [];

  return (
    <div className="relative overflow-x-clip">
      <Orbs opacity={0.35} />

      <section className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <Link
          to="/universities"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
        >
          <ArrowLeft size={15} /> Back to search
        </Link>

        {/* Header */}
        <FadeUp>
          <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <span
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl text-3xl"
                style={{ background: `${tint}1a`, border: `1px solid ${tint}33` }}
                aria-hidden="true"
              >
                {flag ?? <Building2 size={26} className="text-[var(--text-muted)]" />}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-black text-[var(--text-primary)] sm:text-4xl">{uni.name}</h1>
                  <StatusBadge status={uni.status} />
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-[var(--text-muted)]">
                  <MapPin size={14} /> {uni.country}
                  {uni.city ? ` — ${uni.city}` : ""}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={addToApplications}
                className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <NotebookPen size={16} /> Add to applications
              </button>
              <button
                onClick={toggleSave}
                className={`inline-flex items-center gap-2 rounded-2xl border px-6 py-3.5 text-sm font-bold transition ${
                  uni.saved
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <CheckCircle2 size={16} /> {uni.saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </FadeUp>

        {appMsg && (
          <div
            className={`mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-sm font-bold ${
              appMsgOk
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-amber-500/30 bg-amber-500/10 text-amber-300"
            }`}
          >
            <span>{appMsg}</span>
            <Link to="/applications" className="inline-flex items-center gap-1.5 underline">
              View applications <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {uni.notes && (
          <p className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-glass)] px-5 py-4 text-sm leading-relaxed text-[var(--text-secondary)] backdrop-blur">
            {uni.notes}
          </p>
        )}

        {/* Main grid */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Key info */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-[var(--text-primary)]">
              <Globe2 size={18} className="text-[var(--primary)]" /> Key information
            </h2>
            <dl className="space-y-3.5">
              {keyRows.map((r) => (
                <div key={r.label} className="flex items-start justify-between gap-4">
                  <dt className="flex shrink-0 items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">
                    <r.icon size={14} className="text-[var(--primary)]" /> {r.label}
                  </dt>
                  <dd className="text-right text-sm font-semibold text-[var(--text-primary)]">{r.value ?? "—"}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 border-t border-[var(--border)] pt-4">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">
                <Languages size={14} className="text-[var(--primary)]" /> English & GPA
              </h3>
              <div className="space-y-2">
                {englishRows.map((r) => (
                  <div key={r.label} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-[var(--text-muted)]">{r.label}</span>
                    <span className="font-bold text-[var(--text-primary)]">{r.value ?? "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Documents */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-[var(--text-primary)]">
                <FileText size={18} className="text-[var(--primary)]" /> Documents required
              </h2>
              {documents.length > 0 ? (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {documents.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold text-[var(--text-secondary)]"
                    >
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" /> {d}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--text-muted)]">Not available yet.</p>
              )}
            </div>

            {/* Official links */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-[var(--text-primary)]">
                <ShieldCheck size={18} className="text-[var(--primary)]" /> Official sources
              </h2>
              <div className="flex flex-col gap-3 sm:flex-row">
                {uni.admissions_page && (
                  <a
                    href={uni.admissions_page}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-5 py-3.5 text-sm font-bold text-[var(--primary)] transition hover:bg-[var(--primary)]/20"
                  >
                    <GraduationCap size={16} /> Admissions page <ExternalLink size={14} />
                  </a>
                )}
                {uni.official_website && (
                  <a
                    href={uni.official_website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-3.5 text-sm font-bold text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--text-primary)]"
                  >
                    <Globe2 size={16} /> Official website <ExternalLink size={14} />
                  </a>
                )}
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[var(--text-muted)]">
                <ShieldCheck size={13} className="text-emerald-500" /> Always confirm on the official page before applying.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-violet-500/10 p-6 text-center">
              <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                Not sure if {uni.name.split(" ")[0]} is right for you?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-muted)]">
                Get a ranked shortlist with every university scored against your profile.
              </p>
              <div className="mt-5">
                <PrimaryButton to="/recommendations">Get my matches</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
