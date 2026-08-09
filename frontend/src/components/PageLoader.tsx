import { motion } from "framer-motion";
import { iconUrl } from "../assets/brand";

interface PageLoaderProps {
  message?: string;
}

export default function PageLoader({ message = "Preparing your study abroad journey..." }: PageLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg)] text-[var(--text-primary)]">
      <motion.div
        className="flex max-w-md flex-col items-center justify-center rounded-[28px] border border-[var(--border)] bg-[var(--surface)] px-10 py-12 text-center shadow-[var(--shadow-soft)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <img
          src={iconUrl}
          alt="GlobleEdu.ai icon"
          className="mb-8 h-16 w-16 rounded-[18px] border border-[var(--border)] bg-[var(--surface)] object-contain shadow-[var(--shadow-soft)]"
        />
        <p className="max-w-xs text-sm leading-7 text-[var(--text-secondary)]">{message}</p>
      </motion.div>
    </div>
  );
}
