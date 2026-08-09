import type { InputHTMLAttributes, DetailedHTMLProps } from "react";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <label className={`space-y-2 ${className}`}>
      {label ? <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span> : null}
      <input
        className="w-full rounded-[14px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition duration-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
        {...props}
      />
      {error ? <span className="text-sm text-[var(--danger)]">{error}</span> : null}
    </label>
  );
}
