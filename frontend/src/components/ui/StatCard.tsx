import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

export default function StatCard({ label, value, description, icon, className = "" }: StatCardProps) {
  return (
    <div className={`rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] ${className}`}>
      <div className="flex items-start gap-4">
        {icon ? <div>{icon}</div> : null}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">{value}</p>
          {description ? <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{description}</p> : null}
        </div>
      </div>
    </div>
  );
}
