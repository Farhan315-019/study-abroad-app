interface NotificationProps {
  title: string;
  message: string;
  variant?: "success" | "warning" | "error" | "info";
  className?: string;
}

const variantStyles: Record<NonNullable<NotificationProps["variant"]>, string> = {
  success: "border-[var(--success)]/30 bg-[var(--success)]/10 text-[var(--success)]",
  warning: "border-[var(--warning)]/30 bg-[var(--warning)]/10 text-[var(--warning)]",
  error: "border-[var(--danger)]/30 bg-[var(--danger)]/10 text-[var(--danger)]",
  info: "border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]",
};

export default function Notification({
  title,
  message,
  variant = "info",
  className = "",
}: NotificationProps) {
  return (
    <div className={`rounded-[24px] border p-5 shadow-[var(--shadow-soft)] ${variantStyles[variant]} ${className}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-6 text-[var(--text-primary)]">{message}</p>
    </div>
  );
}
