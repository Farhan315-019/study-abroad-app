import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BrandLogo from "./BrandLogo";
import Button from "./ui/Button";
import ThemeToggle from "./ui/ThemeToggle";
import NotificationBell from "./header/NotificationBell";
import ProfileMenu from "./header/ProfileMenu";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Universities", to: "/universities" },
  { label: "Scholarships", to: "/scholarships" },
  { label: "Countries", to: "/countries" },
  { label: "AI Tools", to: "/chat" },
  { label: "How It Works", to: "/" },
  { label: "Collaborate", to: "/collaborate" },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-[14px] px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-[var(--surface)] text-[var(--text-primary)]"
      : "text-[var(--text-secondary)] hover:bg-[var(--surface-soft)] hover:text-[var(--text-primary)]"
  }`;

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-[var(--shadow-glass)]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:px-6 lg:gap-8 lg:px-8">
        <div className="flex items-center justify-self-start">
          <BrandLogo className="h-10 w-auto sm:h-11" />
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to + item.label} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <ThemeToggle />
          {user ? (
            <>
              <NotificationBell />
              <ProfileMenu />
            </>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <NavLink to="/login" className={navLinkClass}>
                Log in
              </NavLink>
              <Button variant="primary" size="sm" className="inline-flex" onClick={() => navigate("/register")}>
                Get started
              </Button>
            </div>
          )}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-soft)] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--surface)] lg:hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <NavLink
                  key={`mobile-${item.to}-${item.label}`}
                  to={item.to}
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            {!user ? (
              <div className="flex flex-col gap-3 border-t border-[var(--border)] p-4">
                <NavLink to="/login" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  Log in
                </NavLink>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/register");
                  }}
                >
                  Get started
                </Button>
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
