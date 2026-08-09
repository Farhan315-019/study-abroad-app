import { Link } from "react-router-dom";
import { ArrowRight, Globe, Mail, MapPin, MessageSquare, Send, Share2 } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { FOOTER_COLS } from "./home/data";

const SOCIALS = [
  { icon: Globe, label: "Twitter / X", href: "https://twitter.com" },
  { icon: MessageSquare, label: "Instagram", href: "https://instagram.com" },
  { icon: Share2, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Mail, label: "YouTube", href: "https://youtube.com" },
  { icon: Send, label: "Facebook", href: "https://facebook.com" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--surface)]">
      {/* top gradient hairline */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--primary), var(--secondary), transparent)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* main grid */}
        <div className="grid gap-12 py-14 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          {/* brand + newsletter */}
          <div>
            <BrandLogo className="h-11 w-auto sm:h-12" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--text-muted)]">
              The future of studying abroad. Search, compare and apply to universities with verified
              requirements — plus an AI consultant that answers 24/7.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-7 max-w-sm"
              aria-label="Newsletter signup"
            >
              <label htmlFor="footer-newsletter" className="mb-2 block text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                Get deadline & scholarship alerts
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-1.5 transition focus-within:border-[var(--primary)]">
                <Mail size={16} className="ml-3 shrink-0 text-[var(--text-muted)]" />
                <input
                  id="footer-newsletter"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full bg-transparent py-2 text-sm font-semibold text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="shine inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white"
                  style={{ background: "var(--grad-primary)" }}
                >
                  Subscribe <ArrowRight size={13} />
                </button>
              </div>
            </form>

            <div className="mt-7 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-4" aria-label="Footer">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="group inline-flex items-center gap-1 text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                      >
                        <span className="h-px w-0 bg-[var(--primary)] transition-all duration-300 group-hover:w-2.5" aria-hidden="true" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] py-6 sm:flex-row">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)]">
            <MapPin size={13} className="text-[var(--primary)]" />
            Serving students in 120+ countries
          </p>
          <p className="text-xs font-semibold text-[var(--text-muted)]">
            © {new Date().getFullYear()} GlobleEdu.ai · The Future of Study Abroad
          </p>
          <div className="flex items-center gap-5 text-xs font-semibold">
            <Link to="/privacy" className="text-[var(--text-muted)] transition hover:text-[var(--text-primary)]">Privacy</Link>
            <Link to="/about" className="text-[var(--text-muted)] transition hover:text-[var(--text-primary)]">Terms</Link>
            <Link to="/collaborate" className="text-[var(--text-muted)] transition hover:text-[var(--text-primary)]">For universities</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
