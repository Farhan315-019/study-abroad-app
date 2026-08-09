import type { ReactNode } from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  children?: ReactNode;
}

export default function Skeleton({ width = "100%", height = "1rem", className = "", children }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-[18px] bg-[var(--surface-soft)] ${className}`} style={{ width, minHeight: height }}>
      {children}
    </div>
  );
}
