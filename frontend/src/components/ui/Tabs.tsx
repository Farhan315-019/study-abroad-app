import type { ReactNode } from "react";

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function Tabs({ items, activeId, onChange, className = "" }: TabsProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-wrap gap-2 rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`rounded-[14px] px-4 py-2 text-sm font-semibold transition ${
              item.id === activeId
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--text-secondary)] hover:bg-[var(--surface-soft)]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]">
        {items.find((item) => item.id === activeId)?.content}
      </div>
    </div>
  );
}
