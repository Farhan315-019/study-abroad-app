interface AIMessageProps {
  role: "user" | "assistant" | "system";
  message: string;
  className?: string;
}

const roleStyles: Record<AIMessageProps["role"], string> = {
  user: "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]",
  assistant: "bg-[var(--secondary)]/10 text-[var(--text-primary)] border border-[var(--border)]",
  system: "bg-[var(--surface-soft)] text-[var(--text-secondary)] border border-[var(--border)]",
};

export default function AIMessage({ role, message, className = "" }: AIMessageProps) {
  return (
    <div className={`rounded-[24px] p-5 ${roleStyles[role]} ${className}`}>
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">{role}</div>
      <p className="whitespace-pre-wrap text-sm leading-7">{message}</p>
    </div>
  );
}
