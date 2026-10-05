import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LanguageSwitch } from "../components/LanguageSwitch";
import { aboutCopy } from "../data/about";
import type { Language } from "../data/settings";

export function AboutApp({
  language,
  setLanguage,
  reducedMotion,
}: {
  language: Language;
  setLanguage: (value: Language) => void;
  reducedMotion: boolean;
}) {
  const copy = aboutCopy[language];
  const prefersReducedMotion = useReducedMotion();
  const animateText = !reducedMotion && !prefersReducedMotion;

  return (
    <section className="content-app about-app" aria-labelledby="about-title">
      <div className="about-toolbar">
        <span className="eyebrow">{copy.profileEyebrow}</span>
        <LanguageSwitch language={language} setLanguage={setLanguage} />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={language}
          className="about-layout"
          lang={language}
          initial={animateText ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          exit={animateText ? { opacity: 0 } : undefined}
          transition={{ duration: animateText ? 0.15 : 0 }}
        >
          <div className="about-profile">
            <h2 id="about-title">{copy.heading}</h2>
            {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <section className="about-education" aria-labelledby="education-title">
            <h3 className="eyebrow" id="education-title">{copy.educationEyebrow}</h3>
            <ol className="about-timeline">
              {copy.education.map((item) => (
                <li key={`${item.period}-${item.title}`}>
                  <time>{item.period}</time>
                  <h4>{item.title}</h4>
                  <p>{item.institution}</p>
                </li>
              ))}
            </ol>
          </section>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
