import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  FileText,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Monitor,
  Moon,
  Settings,
  ShieldCheck,
  Sun,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme, type ThemePreference } from "../../context/ThemeContext";
import type { UserRole } from "../../api/types";
import Avatar from "../ui/Avatar";
import { useDropdown } from "./useDropdown";
import { OPEN_NOTIFICATIONS_EVENT } from "./NotificationBell";

type MenuEntry =
  | { type: "link"; label: string; icon: LucideIcon; to: string }
  | { type: "action"; label: string; icon: LucideIcon; onSelect: () => void };

const ROLE_LABEL: Record<UserRole, string> = {
  student: "Student",
  parent: "Parent",
  admin: "Admin",
};

const THEME_OPTIONS: { value: ThemePreference; label: string; icon: LucideIcon }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

function MenuRow({
  icon: Icon,
  label,
  onClick,
  danger = false,
  trailing,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  danger?: boolean;
  trailing?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left text-sm font-medium transition ${
        danger
          ? "text-[var(--danger)] hover:bg-[var(--danger)]/10"
          : "text-[var(--text-secondary)] hover:bg-[var(--surface-soft)] hover:text-[var(--text-primary)]"
      }`}
    >
      <Icon
        className={`h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ${
          danger ? "text-[var(--danger)]" : "text-[var(--text-muted)] group-hover:text-[var(--primary)]"
        }`}
      />
      <span className="flex-1">{label}</span>
      {trailing}
    </button>
  );
}

function Divider() {
  return <div className="my-2 border-t border-[var(--border)]" />;
}

export default function ProfileMenu() {
  const { user, logout } = useAuth();
  const { preference, setPreference } = useTheme();
  const navigate = useNavigate();
  const { open, ref, toggle, close } = useDropdown();
  const [loggingOut, setLoggingOut] = useState(false);

  if (!user) {
    return null;
  }

  // Derive the role from the authenticated user (no hardcoding). The backend
  // currently exposes `is_admin`; `role` is honoured if it is ever provided.
  const role: UserRole = user.role ?? (user.is_admin ? "admin" : "student");

  const openNotifications = () => {
    close();
    window.dispatchEvent(new CustomEvent(OPEN_NOTIFICATIONS_EVENT));
  };

  const handleLogout = async () => {
    if (loggingOut) {
      return;
    }
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      close();
      setLoggingOut(false);
      navigate("/");
    }
  };

  // Build the menu for the active role. Admin-only destinations (e.g. the
  // admin settings page) are never offered to students or parents.
  const entries: MenuEntry[] = [
    { type: "link", label: "My Profile", icon: UserRound, to: "/profile" },
    { type: "link", label: "My Dashboard", icon: LayoutDashboard, to: "/app" },
    ...(role === "admin"
      ? [{ type: "link", label: "Admin Panel", icon: ShieldCheck, to: "/admin" } as MenuEntry]
      : []),
    { type: "link", label: "My Applications", icon: FileText, to: "/applications" },
    { type: "link", label: "My Documents", icon: FolderOpen, to: "/applications" },
    { type: "action", label: "Notifications", icon: Bell, onSelect: openNotifications },
    // `/settings` is admin-only; students/parents manage their account via the profile page.
    { type: "link", label: "Settings", icon: Settings, to: role === "admin" ? "/settings" : "/profile" },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Account menu"
        aria-expanded={open}
        onClick={toggle}
        className={`inline-flex items-center gap-2 rounded-full border py-1 pl-1 pr-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 ${
          open
            ? "border-[var(--border)] bg-[var(--surface-soft)]"
            : "border-transparent hover:bg-[var(--surface-soft)]"
        }`}
      >
        <Avatar name={user.name} src={user.avatar_url} size="xs" />
        <span className="hidden max-w-[10rem] truncate text-sm font-medium text-[var(--text-primary)] sm:inline">
          {user.name}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-[var(--text-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] origin-top-right overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-menu)] shadow-[var(--shadow-glass)] backdrop-blur-xl"
          >
            {/* Profile header */}
            <div className="flex items-center gap-3 px-4 py-4">
              <Avatar name={user.name} src={user.avatar_url} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[var(--text-primary)]">{user.name}</p>
                <p className="truncate text-xs text-[var(--text-muted)]">{user.email}</p>
                <span className="mt-1 inline-flex items-center rounded-full bg-[var(--primary)]/10 px-2 py-0.5 text-[11px] font-medium text-[var(--primary)]">
                  {ROLE_LABEL[role]}
                </span>
              </div>
            </div>

            <div className="px-2 pb-2">
              <Divider />
              <nav className="flex flex-col gap-0.5">
                {entries.map((entry) =>
                  entry.type === "link" ? (
                    <MenuRow
                      key={entry.label}
                      icon={entry.icon}
                      label={entry.label}
                      onClick={() => {
                        close();
                        navigate(entry.to);
                      }}
                    />
                  ) : (
                    <MenuRow key={entry.label} icon={entry.icon} label={entry.label} onClick={entry.onSelect} />
                  )
                )}
              </nav>

              <Divider />

              {/* Theme */}
              <div className="mt-1 rounded-[12px] px-3 py-2.5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Theme</p>
                <div className="grid grid-cols-3 gap-1 rounded-[12px] bg-[var(--surface-soft)] p-1">
                  {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
                    const active = preference === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setPreference(value)}
                        aria-pressed={active}
                        className={`flex items-center justify-center gap-1.5 rounded-[9px] px-2 py-1.5 text-xs font-medium transition ${
                          active
                            ? "bg-[var(--surface)] text-[var(--primary)] shadow-sm"
                            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Divider />

              <MenuRow
                icon={LogOut}
                label={loggingOut ? "Logging out..." : "Logout"}
                onClick={handleLogout}
                danger
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
