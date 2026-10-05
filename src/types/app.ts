import type { LucideIcon } from "lucide-react";

export type AppId =
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "resume"
  | "contact"
  | "terminal"
  | "settings";

export type DockOrigin = { x: number; y: number; scale: number };

export type WindowStatus =
  | "opening"
  | "open"
  | "minimizing"
  | "minimized"
  | "closing";

export type WindowState = {
  id: AppId;
  minimized: boolean;
  maximized: boolean;
  z: number;
  status: WindowStatus;
  origin: DockOrigin;
};

export type WindowManagerState = {
  windows: WindowState[];
  focus: AppId;
};

export type Project = {
  name: string;
  category: string;
  description: string;
  tech: readonly string[];
  url: string;
  image: string;
};

export type TrainingItem = {
  provider: string;
  period: string;
  title: string;
  detail: string;
  technologies: string;
  project: string;
  additional: string;
};

export type AppDefinition = {
  id: AppId;
  label: string;
  icon: LucideIcon;
  color: string;
  hint: string;
};
