import { Monitor, Zap } from "lucide-react";
import type { Language, Theme } from "../data/settings";
import { t } from "../i18n";

export function SettingsApp({
  accent,
  setAccent,
  reducedMotion,
  setReducedMotion,
  theme,
  setTheme,
  language,
  setLanguage,
}: {
  accent: string;
  setAccent: (value: string) => void;
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  theme: Theme;
  setTheme: (value: Theme) => void;
  language: Language;
  setLanguage: (value: Language) => void;
}) {
  return (
    <div className="content-app settings">
      <span className="eyebrow">SYSTEM PREFERENCES</span>
      <h2>{t(language, "settings")}</h2>
      <label>
        <span>
          <Monitor size={15} /> {t(language, "theme")}
        </span>
        <select value={theme} onChange={(event) => setTheme(event.target.value as Theme)}>
          <option value="dark">{t(language, "dark")}</option>
          <option value="light">{t(language, "light")}</option>
        </select>
      </label>
      <label>
        <span>
          <Zap size={15} /> {t(language, "accent")}
        </span>
        <select value={accent} onChange={(event) => setAccent(event.target.value)}>
          <option value="cyan">Arctic cyan</option>
          <option value="violet">Soft violet</option>
          <option value="green">Signal green</option>
        </select>
      </label>
      <label>
        <span>
          <Monitor size={15} /> {t(language, "reducedMotion")}
        </span>
        <input type="checkbox" checked={reducedMotion} onChange={(event) => setReducedMotion(event.target.checked)} />
      </label>
      <label>
        <span>
          <Monitor size={15} /> {t(language, "language")}
        </span>
        <select value={language} onChange={(event) => setLanguage(event.target.value as Language)}>
          <option value="en">{t(language, "english")}</option>
          <option value="sq">{t(language, "albanian")}</option>
        </select>
      </label>
    </div>
  );
}
