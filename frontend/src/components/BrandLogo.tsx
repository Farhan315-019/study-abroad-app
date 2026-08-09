import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { iconUrl, logoLightUrl, logoDarkUrl, appLightUrl, appDarkUrl } from "../assets/brand";

interface BrandLogoProps {
  variant?: "icon" | "compact" | "full" | "app";
  className?: string;
  height?: number;
}

/**
 * BrandLogo — renders ONLY the user's logo artwork, theme-aware:
 * the "for light theme" PNG on light backgrounds and the "for dark theme"
 * PNG on dark backgrounds, so it always stays crisp and clearly visible.
 * Size is controlled by the caller via className (e.g. h-14 w-auto) or height.
 */
export default function BrandLogo({ variant = "compact", className = "", height }: BrandLogoProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const logoSrc =
    variant === "icon"
      ? iconUrl
      : variant === "app"
      ? isDark
        ? appDarkUrl
        : appLightUrl
      : isDark
      ? logoDarkUrl
      : logoLightUrl;

  return (
    <Link to="/" className="group relative inline-flex items-center" aria-label="GlobleEdu.ai home">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[26px] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-80"
        style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.55), rgba(6,182,212,0.55))" }}
      />
      <img
        src={logoSrc}
        alt="GlobleEdu.ai logo"
        style={{ height: height ?? undefined }}
        className={`w-auto select-none object-contain transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.07] group-hover:drop-shadow-[0_8px_20px_rgba(59,130,246,0.45)] ${height ? "" : "h-10"} ${className}`}
        draggable={false}
      />
    </Link>
  );
}
