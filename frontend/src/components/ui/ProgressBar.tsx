interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  className = "",
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`space-y-2 ${className}`}>
      {label ? <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]"><span>{label}</span><span>{Math.round(percent)}%</span></div> : null}
      <div className="h-3 overflow-hidden rounded-full bg-[var(--surface-soft)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(135deg,var(--primary),var(--secondary))] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
