import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`rounded-[24px] border border-[var(--border)] bg-[var(--surface-glass)] p-6 shadow-[var(--shadow-glass)] backdrop-blur-2xl backdrop-saturate-150 ${className}`}
    >
      {children}
    </div>
  );
}
