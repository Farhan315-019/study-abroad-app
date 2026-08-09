import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { Children, isValidElement } from "react";
import { Check, ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  error?: string;
  className?: string;
  compact?: boolean;
  value?: string | number | readonly string[];
  disabled?: boolean;
  required?: boolean;
  children: ReactNode;
  onChange?: (e: { target: { value: string } }) => void;
}

function collectOptions(children: ReactNode): SelectOption[] {
  const options: SelectOption[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === "option") {
      const props = child.props as { value?: unknown; disabled?: boolean; children?: ReactNode };
      const { value, disabled } = props;
      const text = Children.toArray(props.children).join("").trim();
      options.push({ value: String(value ?? ""), label: text || String(value ?? ""), disabled: Boolean(disabled) });
    }
  });
  return options;
}

export default function Select({
  label,
  error,
  className = "",
  compact = false,
  value,
  disabled,
  required,
  children,
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLLabelElement>(null);

  const options = collectOptions(children);
  const current = options.find((o) => o.value === String(value ?? ""));
  const display = current?.label ?? "";

  const select = (o: SelectOption) => {
    if (o.disabled) return;
    onChange?.({ target: { value: o.value } });
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleTriggerKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleListKeyDown = (e: ReactKeyboardEvent) => {
    const enabled = options.filter((o) => !o.disabled);
    if (enabled.length === 0) return;
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const dir = e.key === "ArrowDown" ? 1 : -1;
      const base = active >= 0 ? active : Math.max(0, options.findIndex((o) => o.value === String(value ?? "")));
      let next = base;
      for (let i = 0; i < options.length; i++) {
        next = (next + dir + options.length) % options.length;
        if (!options[next].disabled) break;
      }
      setActive(next);
    } else if (e.key === "Enter") {
      const o = options[active];
      if (o && !o.disabled) {
        e.preventDefault();
        select(o);
      }
    }
  };

  const buttonCls =
    "flex w-full cursor-pointer items-center justify-between gap-2 border border-[var(--border)] bg-[var(--surface)] text-left font-semibold text-[var(--text-primary)] outline-none transition duration-200 hover:border-[var(--primary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 disabled:cursor-not-allowed disabled:opacity-60 " +
    (compact ? "rounded-lg px-2.5 py-1.5 pr-2 text-xs" : "rounded-2xl px-4 py-3 pr-3 text-sm");

  return (
    <label ref={rootRef} className={`block ${className}`}>
      {label ? (
        <span className="mb-1.5 block text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">
          {label}
          {required ? <span className="text-[var(--danger)]"> *</span> : null}
        </span>
      ) : null}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={handleTriggerKeyDown}
          className={buttonCls}
        >
          <span className="truncate">{display || (required ? "Select..." : "")}</span>
          <span
            className={`flex shrink-0 items-center justify-center rounded-lg bg-[var(--surface-soft)] text-[var(--text-muted)] transition duration-200 ${
              open ? "rotate-180 bg-[var(--primary)] text-white" : ""
            } ${compact ? "h-5 w-5" : "h-6 w-6"}`}
          >
            <ChevronDown size={compact ? 13 : 15} strokeWidth={2.5} />
          </span>
        </button>

        {open ? (
          <div
            role="listbox"
            onKeyDown={handleListKeyDown}
            className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-menu)] p-1.5 shadow-[var(--shadow-soft)] backdrop-blur-xl"
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map((o, i) => {
                const isSelected = o.value === String(value ?? "");
                const isActive = i === active;
                return (
                  <button
                    key={o.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={o.disabled}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => select(o)}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition ${
                      isActive ? "bg-[var(--surface-soft)]" : ""
                    } ${o.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${
                      isSelected ? "text-[var(--primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <span className="truncate">{o.label}</span>
                    {isSelected ? <Check size={15} strokeWidth={2.5} className="shrink-0" /> : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      {error ? <span className="mt-1.5 block text-xs font-semibold text-[var(--danger)]">{error}</span> : null}
    </label>
  );
}
