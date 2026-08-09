interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: string;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  badge,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--secondary)]">
          {eyebrow}
        </p>
      ) : null}
      <div className="mt-3">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">{description}</p>
        ) : null}
      </div>
      {badge ? (
        <span className="mt-4 inline-flex rounded-full bg-[var(--surface-soft)] px-3 py-1 text-sm font-medium text-[var(--primary)]">
          {badge}
        </span>
      ) : null}
    </div>
  );
}
