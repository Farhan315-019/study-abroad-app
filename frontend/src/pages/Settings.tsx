import { useEffect, useState, type FormEvent } from "react";
import { api } from "../api/client";
import Select from "../components/ui/Select";
import { useAuth } from "../context/AuthContext";

interface SettingsState {
  ai_provider: string;
  ai_base_url: string;
  ai_model: string;
  ai_api_key: string;
  websearch_provider: string;
  websearch_api_key: string;
  hipolabs_refresh_hours: string;
}

const empty: SettingsState = {
  ai_provider: "",
  ai_base_url: "",
  ai_model: "",
  ai_api_key: "",
  websearch_provider: "",
  websearch_api_key: "",
  hipolabs_refresh_hours: "72",
};

const PROVIDERS = ["", "openai", "openrouter", "groq", "gemini", "ollama"];
const SEARCH_PROVIDERS = ["", "tavily", "serpapi"];

export default function Settings() {
  const { user } = useAuth();
  const [form, setForm] = useState<SettingsState>(empty);
  const [keySet, setKeySet] = useState({ ai_api_key: false, websearch_api_key: false });
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api
      .get<Record<string, string | { set: boolean }>>("/settings")
      .then((r) => {
        const next: SettingsState = { ...empty };
        const sets: typeof keySet = { ai_api_key: false, websearch_api_key: false };
        for (const [k, v] of Object.entries(r.data)) {
          if (k === "ai_api_key" || k === "websearch_api_key") {
            sets[k] = (v as { set: boolean }).set;
          } else {
            (next as Record<string, string> & SettingsState)[k] = String(v ?? "");
          }
        }
        setForm(next);
        setKeySet(sets);
      })
      .catch(() => {});
  }, []);

  const set = (k: keyof SettingsState) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setSaved(false);
    await api.put("/settings", form);
    setBusy(false);
    setSaved(true);
  };

  if (!user?.is_admin) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        <p className="text-sm text-slate-400">Admin access required.</p>
      </div>
    );
  }

  const input =
    "rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none transition focus:border-indigo-500";
  const label = "flex flex-col gap-1 text-sm";
  const span = "text-slate-400";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-slate-400">
        Optional AI configuration. Everything works without a key using the built-in engine;
        adding a key upgrades responses, chat, and verification.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Select
          label="AI provider"
          value={form.ai_provider}
          onChange={set("ai_provider")}
        >
          {PROVIDERS.map((p) => (
            <option key={p} value={p}>
              {p || "Disabled (built-in engine)"}
            </option>
          ))}
        </Select>
        <label className={label}>
          <span className={span}>Base URL (optional, defaults to provider)</span>
          <input
            className={input}
            value={form.ai_base_url}
            onChange={set("ai_base_url")}
            placeholder="https://api.openai.com/v1"
          />
        </label>
        <label className={label}>
          <span className={span}>Model</span>
          <input
            className={input}
            value={form.ai_model}
            onChange={set("ai_model")}
            placeholder="gpt-4o-mini"
          />
        </label>
        <label className={label}>
          <span className={span}>API key {keySet.ai_api_key && "(saved - enter a new one to replace)"}</span>
          <input
            className={input}
            type="password"
            value={form.ai_api_key}
            onChange={set("ai_api_key")}
            placeholder={keySet.ai_api_key ? "•••••••• (hidden)" : "sk-..."}
          />
        </label>

        <div className="my-6 border-t border-slate-800" />

        <Select
          label="Web search provider (for verification agent)"
          value={form.websearch_provider}
          onChange={set("websearch_provider")}
        >
          {SEARCH_PROVIDERS.map((p) => (
            <option key={p} value={p}>
              {p || "Disabled"}
            </option>
          ))}
        </Select>
        <label className={label}>
          <span className={span}>
            Web search API key {keySet.websearch_api_key && "(saved - enter a new one to replace)"}
          </span>
          <input
            className={input}
            type="password"
            value={form.websearch_api_key}
            onChange={set("websearch_api_key")}
            placeholder={keySet.websearch_api_key ? "•••••••• (hidden)" : "tvly-..."}
          />
        </label>
        <label className={label}>
          <span className={span}>HipoLabs refresh interval (hours)</span>
          <input
            className={input}
            value={form.hipolabs_refresh_hours}
            onChange={set("hipolabs_refresh_hours")}
          />
        </label>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={busy}
            className="rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
          >
            {busy ? "Saving..." : "Save settings"}
          </button>
          {saved && <span className="text-sm text-emerald-300">Settings saved</span>}
        </div>
      </form>
    </div>
  );
}
