import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ThemeMode = "light" | "dark";
export type ThemePreference = "light" | "dark" | "system";

interface ThemeContextValue {
  /** The resolved theme actually applied to the document. */
  theme: ThemeMode;
  /** The user's selected preference (light, dark or system). */
  preference: ThemePreference;
  /** Set an explicit light/dark theme (kept for backwards compatibility). */
  setTheme: (theme: ThemeMode) => void;
  /** Set the preference, including "system". */
  setPreference: (preference: ThemePreference) => void;
  toggleTheme: () => void;
  ready: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "globleedu.theme";

function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialPreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "system";
}

function resolveTheme(preference: ThemePreference): ThemeMode {
  return preference === "system" ? getSystemTheme() : preference;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = getInitialPreference();
    setPreferenceState(initial);
    setTheme(resolveTheme(initial));
    setReady(true);
  }, []);

  // Keep the resolved theme in sync when the OS preference changes
  // and the user is following the system.
  useEffect(() => {
    if (preference !== "system") {
      return;
    }
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setTheme(getSystemTheme());
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [preference]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(STORAGE_KEY, preference);
    }
  }, [preference, ready]);

  const setPreference = (value: ThemePreference) => {
    setPreferenceState(value);
    setTheme(resolveTheme(value));
  };

  const setThemeMode = (value: ThemeMode) => setPreference(value);

  const toggleTheme = () => setPreference(theme === "dark" ? "light" : "dark");

  const value = useMemo(
    () => ({ theme, preference, setTheme: setThemeMode, setPreference, toggleTheme, ready }),
    [theme, preference, ready]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
