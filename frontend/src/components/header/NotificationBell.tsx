import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Inbox } from "lucide-react";
import { useDropdown } from "./useDropdown";

/**
 * Custom event used to open the single shared notification panel from
 * elsewhere (e.g. the "Notifications" entry in the profile menu), so we
 * never maintain two separate notification UIs.
 */
export const OPEN_NOTIFICATIONS_EVENT = "app:open-notifications";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  read: boolean;
}

export default function NotificationBell() {
  const { open, ref, toggle, show } = useDropdown();
  // No backend notification feed exists yet, so this starts empty — the badge
  // only appears when there are genuine unread notifications.
  const [notifications] = useState<NotificationItem[]>([]);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = () => show();
    window.addEventListener(OPEN_NOTIFICATIONS_EVENT, handler);
    return () => window.removeEventListener(OPEN_NOTIFICATIONS_EVENT, handler);
  }, [show]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : "Notifications"}
        aria-expanded={open}
        onClick={toggle}
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 ? (
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[10px] font-bold text-white shadow-sm">
            {unread > 9 ? "9+" : unread}
          </span>
        ) : null}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] origin-top-right overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-menu)] shadow-[var(--shadow-glass)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Notifications</p>
              {unread > 0 ? (
                <span className="rounded-full bg-[var(--primary)]/10 px-2 py-0.5 text-xs font-medium text-[var(--primary)]">
                  {unread} new
                </span>
              ) : null}
            </div>

            {notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface-soft)] text-[var(--text-muted)]">
                  <Inbox className="h-5 w-5" />
                </span>
                <p className="text-sm font-medium text-[var(--text-primary)]">You&apos;re all caught up</p>
                <p className="text-xs leading-5 text-[var(--text-muted)]">
                  We&apos;ll let you know here when there&apos;s something new.
                </p>
              </div>
            ) : (
              <ul className="max-h-80 overflow-y-auto py-1">
                {notifications.map((n) => (
                  <li key={n.id} className="px-4 py-3 transition hover:bg-[var(--surface-soft)]">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{n.title}</p>
                    <p className="mt-0.5 text-xs leading-5 text-[var(--text-muted)]">{n.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
