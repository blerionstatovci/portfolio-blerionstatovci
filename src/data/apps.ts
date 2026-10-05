import { Code2, FileDown, Folder, Globe2, Mail, Settings2, TerminalSquare, UserRound } from "lucide-react";
import type { AppDefinition } from "../types/app";
import { skills } from "./skills";

export const apps: readonly AppDefinition[] = [
  { id: "about", label: "About Me", icon: UserRound, color: "blue", hint: "Profile and education" },
  { id: "projects", label: "Projects", icon: Folder, color: "amber", hint: "06 live projects" },
  { id: "experience", label: "Experience", icon: Globe2, color: "green", hint: "Training and community" },
  { id: "skills", label: "Skills", icon: Code2, color: "violet", hint: `${skills.length} capabilities` },
  { id: "resume", label: "Resume.pdf", icon: FileDown, color: "red", hint: "Open CV" },
  { id: "contact", label: "Contact", icon: Mail, color: "cyan", hint: "Open channel" },
  { id: "terminal", label: "Terminal", icon: TerminalSquare, color: "slate", hint: "Command line" },
  { id: "settings", label: "Settings", icon: Settings2, color: "gray", hint: "OS preferences" },
];
