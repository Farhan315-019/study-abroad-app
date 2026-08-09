import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BrandLogo from "../components/BrandLogo";
import { FadeUp, Orbs } from "../components/home/shared";

interface LocationState {
  from?: { pathname?: string };
}

const inputCls =
  "w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-3.5 pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20";
const labelCls = "mb-1.5 block text-xs font-black uppercase tracking-widest text-[var(--text-muted)]";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const from = (location.state as LocationState | null)?.from?.pathname ?? "/app";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      const detail = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setError(detail ?? "Login failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-12">
      <Orbs opacity={0.35} />

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <FadeUp>
          <div className="flex flex-col items-center text-center">
            <BrandLogo variant="compact" className="h-12 w-auto" />
            <h1 className="mt-7 font-display text-3xl font-black text-[var(--text-primary)]">Welcome back</h1>
            <p className="mt-2 text-sm font-medium text-[var(--text-muted)]">Log in to continue your study-abroad journey.</p>
          </div>
        </FadeUp>

        {/* Card */}
        <FadeUp delay={0.08}>
          <div className="relative mt-9 rounded-[2rem] border border-[var(--border)] bg-[var(--surface-glass)] p-8 backdrop-blur-xl sm:p-10">
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-[2rem]" style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }} aria-hidden="true" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className={labelCls} htmlFor="email">Email</label>
                <div className="relative">
                  <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className={labelCls} htmlFor="password">Password</label>
                <div className="relative">
                  <Lock size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputCls}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-bold text-rose-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] px-7 py-4 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
              >
                {busy ? "Logging in…" : "Log in"} {!busy && <ArrowRight size={16} />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm font-semibold text-[var(--text-muted)]">
              No account yet?{" "}
              <Link to="/register" className="font-bold text-[var(--primary)] transition hover:text-[var(--text-primary)]">
                Create one free
              </Link>
            </p>
          </div>
        </FadeUp>

        {/* Back home */}
        <FadeUp delay={0.16}>
          <p className="mt-7 text-center text-sm font-semibold text-[var(--text-muted)]">
            <Link to="/" className="transition hover:text-[var(--text-primary)]">← Back to homepage</Link>
          </p>
        </FadeUp>
      </div>
    </div>
  );
}
