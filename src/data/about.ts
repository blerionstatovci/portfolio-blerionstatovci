import type { Language } from "./settings";

export type AboutEducation = {
  period: string;
  title: string;
  institution: string;
};

export type AboutCopy = {
  profileEyebrow: string;
  heading: string;
  paragraphs: readonly string[];
  educationEyebrow: string;
  education: readonly AboutEducation[];
};

export const aboutCopy: Record<Language, AboutCopy> = {
  en: {
    profileEyebrow: "PROFILE / 01",
    heading: "I build with purpose.",
    paragraphs: [
      "I’m Blerion, a Computer Science & Software Engineering student at AAB College with a passion for transforming ideas into functional, high-performance web applications.",
      "I bridge the gap between back-end logic and front-end user experience. Whether designing scalable REST APIs, managing databases, or crafting responsive interfaces, my goal is always the same: writing clean, maintainable code that solves real-world problems.",
      "I thrive at the intersection of modern web technologies, thoughtful UI/UX design. Always eager to adapt, learn new tools, and collaborate on ambitious digital products.",
    ],
    educationEyebrow: "EDUCATION",
    education: [
      {
        period: "2024 — Present",
        title: "Bachelor in Computer Science, Software Engineering",
        institution: "Kolegji \"AAB\", Prishtinë",
      },
      {
        period: "2021 — 2024",
        title: "Diploma in Natural Science",
        institution: "Aleksander Xhuvani High School, Podujevë",
      },
    ],
  },
  sq: {
    profileEyebrow: "PROFILI / 01",
    heading: "Ndërtoj me qëllim.",
    paragraphs: [
      "Jam Blerion, student i Shkencave Kompjuterike / Inxhinierisë së Softuerit në Kolegjin AAB. Më intereson të ndërtoj aplikacione web praktike, të përqendruara te përdoruesi, nga ndërfaqja deri te API-ja që qëndron pas saj.",
      "Në universitet kam punuar me SQL, .NET dhe Java. Paralelisht me studimet, kam përfunduar trajnime profesionale në Node.js, zhvillim full-stack dhe JavaScript të avancuar. Në back-end punoj me Express.js, REST API dhe MongoDB; në front-end me React, Redux, Hooks dhe TypeScript.",
    ],
    educationEyebrow: "ARSIMI",
    education: [
      {
        period: "2024 — Tani",
        title: "Bachelor në Shkenca Kompjuterike, Inxhinieri Softuerike",
        institution: "Kolegji \"AAB\", Prishtinë",
      },
      {
        period: "2021 — 2024",
        title: "Diplomë në Shkenca Natyrore",
        institution: "Shkolla e Mesme \"Aleksander Xhuvani\", Podujevë",
      },
    ],
  },
};
