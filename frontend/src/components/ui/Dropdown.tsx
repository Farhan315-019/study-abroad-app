import type { ReactNode } from "react";

interface DropdownProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Dropdown({ title, children, className = "" }: DropdownProps) {
  return (
    <details className={`relative ${className}`}>
      <summary className="cursor-pointer rounded-[14px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-soft)]">
        {title}
      </summary>
      <div className="mt-2 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]">
        {children}
      </div>
    </details>
  );
}
