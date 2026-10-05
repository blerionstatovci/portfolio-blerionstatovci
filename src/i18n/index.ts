import type { Language } from "../data/settings";

export const dictionary = {
  en: {
    welcome: "Welcome.",
    intro: "Hi, I’m Blerion. Build thoughtfully. Ship deliberately.",
    openResume: "Open Resume",
    downloadCv: "Download CV",
    search: "Search apps and projects…",
    settings: "Settings",
    theme: "Theme",
    accent: "Accent color",
    reducedMotion: "Reduced motion",
    language: "Language",
    dark: "Dark",
    light: "Light",
    english: "English",
    albanian: "Albanian",
  },
  sq: {
    welcome: "Mirë se erdhe.",
    intro: "Përshëndetje, jam Blerioni. Ndërto me kujdes. Dorëzo me vendosmëri.",
    openResume: "Hap CV-në",
    downloadCv: "Shkarko CV-në",
    search: "Kërko aplikacione dhe projekte…",
    settings: "Cilësimet",
    theme: "Tema",
    accent: "Ngjyra e theksimit",
    reducedMotion: "Lëvizje të reduktuara",
    language: "Gjuha",
    dark: "E errët",
    light: "E çelët",
    english: "Anglisht",
    albanian: "Shqip",
  },
} as const;

export function t(language: Language, key: keyof typeof dictionary.en) {
  return dictionary[language][key];
}
