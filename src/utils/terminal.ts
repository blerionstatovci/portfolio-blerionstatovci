import { profile } from "../data/profile";
import { projects } from "../data/projects";
import type { AppId } from "../types/app";

export const terminalCommands = [
  "help",
  "whoami",
  "ls",
  "about",
  "projects",
  "skills",
  "experience",
  "certificates",
  "contact",
  "neofetch",
  "open",
  "resume",
  "theme",
  "clear",
] as const;

export type TerminalAction =
  | { type: "open"; id: AppId }
  | { type: "theme"; value: "dark" | "light" }
  | { type: "contact" };

export type TerminalResult = {
  output: string;
  clear?: boolean;
  action?: TerminalAction;
};

const appAliases: Record<string, AppId> = {
  about: "about",
  "about me": "about",
  projects: "projects",
  experience: "experience",
  skills: "skills",
  certificates: "certificates",
  contact: "contact",
  terminal: "terminal",
  settings: "settings",
  resume: "resume",
  cv: "resume",
};

function distance(left: string, right: string) {
  const table = Array.from({ length: left.length + 1 }, (_, row) => [row]);
  for (let column = 0; column <= right.length; column += 1) table[0][column] = column;
  for (let row = 1; row <= left.length; row += 1) {
    for (let column = 1; column <= right.length; column += 1) {
      table[row][column] = Math.min(
        table[row - 1][column] + 1,
        table[row][column - 1] + 1,
        table[row - 1][column - 1] + (left[row - 1] === right[column - 1] ? 0 : 1),
      );
    }
  }
  return table[left.length][right.length];
}

function suggestion(input: string) {
  const candidate = terminalCommands
    .map((command) => ({ command, score: distance(input, command) }))
    .sort((left, right) => left.score - right.score)[0];
  return candidate && candidate.score <= Math.max(2, Math.floor(input.length / 2)) ? candidate.command : null;
}

export function parseTerminalCommand(rawInput: string): TerminalResult {
  const raw = rawInput.trim();
  const command = raw.toLowerCase();
  if (!command) return { output: "" };
  if (command === "clear") return { output: "", clear: true };
  if (command === "help") {
    return { output: "help  whoami  ls  neofetch  open <app>  resume  theme <dark|light>  clear\nabout  projects  skills  experience  certificates  contact" };
  }
  if (command === "whoami") return { output: `${profile.name}\n${profile.roleTitle}\n${profile.location}` };
  if (command === "ls") return { output: "about  projects  experience  certificates  skills  resume  contact  terminal  settings" };
  if (command === "about") return { output: `${profile.name} — ${profile.roleTitle}` };
  if (command === "projects") return { output: projects.map((project) => project.name).join("\n") };
  if (command === "skills") return { output: "React · Redux · TypeScript · JavaScript · Node.js · Next.js · MongoDB · Jest" };
  if (command === "experience") return { output: "AAB College · Beetroot Academy · OJQ REAL" };
  if (command === "certificates") return { output: "Beetroot Academy · Probit Academy · Unity Tech Hub" };
  if (command === "contact") return { output: `${profile.email}\n${profile.phone}\n${profile.github}\n${profile.linkedin}`, action: { type: "contact" } };
  if (command === "neofetch") {
    return {
      output: `       .---.       ${profile.name}\n      /     \\      ----------------\n     |  .-.  |     OS: BlerionOS\n     | (   ) |     Stack: React · TypeScript · Redux\n      \\ '-' /      Runtime: Browser\n       '---'       Focus: thoughtful interfaces`,
    };
  }
  if (command === "resume") return { output: "Opening resume…", action: { type: "open", id: "resume" } };
  if (command.startsWith("open ")) {
    const target = command.slice(5).trim();
    const id = appAliases[target];
    return id
      ? { output: `Opening ${target}…`, action: { type: "open", id } }
      : { output: `Unknown app: ${target}. Try: ${Object.keys(appAliases).join(", ")}` };
  }
  if (command.startsWith("theme ")) {
    const value = command.slice(6).trim();
    if (value === "dark" || value === "light") return { output: `Theme set to ${value}.`, action: { type: "theme", value } };
    return { output: "Usage: theme <dark|light>" };
  }
  if (command === "sudo hire blerion") {
    return { output: "Permission granted. Blerion is ready to build.\nRun 'open contact' to start a conversation.", action: { type: "open", id: "contact" } };
  }

  const maybe = suggestion(command.split(" ")[0]);
  return { output: maybe ? `command not found: ${raw}\nDid you mean '${maybe}'?` : `command not found: ${raw}` };
}

export function autocompleteTerminalInput(value: string) {
  const lower = value.toLowerCase();
  const candidates = lower.startsWith("open ")
    ? Object.keys(appAliases).map((alias) => `open ${alias}`)
    : terminalCommands;
  return candidates.find((candidate) => candidate.startsWith(lower)) ?? value;
}
