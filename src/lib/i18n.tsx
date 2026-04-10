import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

const translations = {
  en: {
    nav: { home: "Home", create: "Create", dashboard: "Dashboard", support: "Support" },
    create: { title: "AI Studio" },
    analytics: { proFeatures: "Pro features" },
    accessibility: { title: "Accessibility Statement" },
  },
  he: {
    nav: { home: "בית", create: "יצירה", dashboard: "לוח בקרה", support: "תמיכה" },
    create: { title: "סטודיו AI" },
    analytics: { proFeatures: "פיצ'רים מקצועיים" },
    accessibility: { title: "הצהרת נגישות" },
  },
};

type Language = "en" | "he";

type I18nContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: string, fallback = "") => {
    const keys = key.split(".");
    const value = keys.reduce((obj: any, path) => obj?.[path], translations[lang] as any);
    return typeof value === "string" ? value : fallback || key;
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
};

export const LanguageToggle = () => {
  const { lang, setLang } = useI18n();
  const next = lang === "en" ? "he" : "en";

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      className="rounded-full border border-gray-300 bg-white/90 px-3 py-2 text-xs font-semibold shadow-sm"
    >
      {next.toUpperCase()}
    </button>
  );
};
