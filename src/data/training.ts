import type { TrainingItem } from "../types/app";

export const training: readonly TrainingItem[] = [
  {
    provider: "Beetroot Academy · Certified by National Qualification Authority of Kosovo",
    period: "DECEMBER 2025 — MARCH 2026",
    title: "Node.js Bootcamp",
    detail: "Intensive 4-month full-stack program · 64+ instructor hours · 160+ total hours",
    technologies: "Node.js · Express.js · MongoDB · Next.js · REST APIs",
    project: "Project: Virtual Software Company Workers Portfolio — RESTful API backend",
    additional: "Career counseling · Scrum framework · AI tools integration",
  },
  {
    provider: "Beetroot Academy · Certified by National Qualification Authority of Kosovo",
    period: "APRIL 2026 — JUNE 2026",
    title: "Advanced JavaScript & Front-End Development Bootcamp",
    detail: "Advanced JavaScript with variable scopes, closures, asynchronous programming and OOP using ES6+ prototypes and classes.",
    technologies: "React · Redux · React Hooks · Higher-Order Components · Jest · Scrum",
    project: "Projects: Films App & Courses Catalog — responsive SPAs integrated with backend servers, global state management and automated testing.",
    additional: "Component and unit testing with Jest · Agile practice within Scrum",
  },
  {
    provider: "Probit Academy",
    period: "2025 · 20-HOUR COURSE",
    title: "Introduction to Web Development",
    detail: "Core programming concepts and problem-solving techniques with practical front-end development examples.",
    technologies: "Hands-on coding exercises · Structured learning approach",
    project: "",
    additional: "",
  },
  {
    provider: "Unity Tech Hub",
    period: "2025 · 1-DAY INTENSIVE",
    title: "JavaScript Basics",
    detail: "Fundamental JavaScript concepts including variables, functions, loops and conditionals.",
    technologies: "DOM manipulation · Event handling · Interactive coding practice",
    project: "",
    additional: "Immediate feedback through practical exercises",
  },
] as const;
