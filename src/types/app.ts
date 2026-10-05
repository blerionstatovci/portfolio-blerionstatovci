import type { LucideIcon } from "lucide-react";

export type AppId =
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "resume"
  | "contact"
  | "terminal"
  | "settings"
  | "certificates";

export type DockOrigin = { x: number; y: number; scale: number };

export type WindowSnap = "left" | "right" | null;

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
  x?: number;
  y?: number;
  snap?: WindowSnap;
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
  /** TODO(owner): add the repository URL when the project is public. */
  repoUrl?: string;
  /** TODO(owner): fill in case-study fields for projects that have them. */
  role?: string;
  problem?: string;
  outcome?: string;
  learnings?: string;
  featured?: boolean;
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
