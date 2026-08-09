import type { VerifyStatus } from "../api/types";

const styles: Record<VerifyStatus, { label: string; cls: string }> = {
  verified: { label: "Verified", cls: "border-(--success)/30 bg-(--success)/10 text-(--success)" },
  approx: { label: "Approx", cls: "border-(--warning)/30 bg-(--warning)/10 text-(--warning)" },
  manual: { label: "Manual review", cls: "border-(--danger)/30 bg-(--danger)/10 text-(--danger)" },
};

export default function StatusBadge({ status }: { status: VerifyStatus }) {
  const s = styles[status] ?? styles.approx;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${s.cls}`}
    >
      {s.label}
    </span>
  );
}
