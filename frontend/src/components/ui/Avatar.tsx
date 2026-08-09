interface AvatarProps {
  name: string;
  src?: string | null;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const sizeMap: Record<NonNullable<AvatarProps["size"]>, string> = {
  xs: "h-8 w-8 text-xs",
  sm: "h-10 w-10 text-sm",
  md: "h-12 w-12 text-base",
  lg: "h-14 w-14 text-lg",
};

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function Avatar({ name, src, size = "md", className = "" }: AvatarProps) {
  const initials = getInitials(name);

  return src ? (
    <img
      src={src}
      alt={name}
      className={`shrink-0 rounded-full object-cover ${sizeMap[size]} ${className}`}
    />
  ) : (
    <div
      aria-hidden="true"
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--primary),var(--secondary))] font-semibold text-white ${sizeMap[size]} ${className}`}
    >
      {initials || "U"}
    </div>
  );
}
