import type { Language } from "../data/settings";

export function LanguageSwitch({ language, setLanguage }: { language: Language; setLanguage: (value: Language) => void }) {
  return (
    <div className="about-language" role="radiogroup" aria-label="Language">
      {(["en", "sq"] as const).map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={language === option}
          aria-pressed={language === option}
          className={language === option ? "active" : ""}
          onClick={() => setLanguage(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
