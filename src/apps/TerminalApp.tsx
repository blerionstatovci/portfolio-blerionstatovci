import { useState } from "react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";

export function TerminalApp() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState(["BlerionOS Terminal v1.0", "Type 'help' to see available commands."]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;

    const output: Record<string, string> = {
      help: "about  projects  skills  experience  contact  clear",
      about: `${profile.name} — ${profile.roleTitle}`,
      projects: projects.map((project) => project.name).join(" · "),
      skills: "React · Next.js · Node.js · MongoDB · UI/UX",
      experience: "AAB College · Beetroot Academy · OJQ REAL",
      contact: `${profile.email} · ${profile.phone} · GitHub · LinkedIn`,
    };

    setHistory((current) =>
      command === "clear" ? [] : [...current, `> ${command}`, output[command] ?? `command not found: ${command}`],
    );
    setInput("");
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {history.map((line, index) => (
          <div
            className={line.startsWith(">") ? "terminal-command" : index === 0 ? "terminal-title" : "terminal-result"}
            key={`${line}-${index}`}
          >
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="terminal-prompt">
        <span>blerion@os:~$</span>
        <input
          autoFocus
          value={input}
          onChange={(event) => setInput(event.target.value)}
          aria-label="Terminal command"
          autoComplete="off"
        />
      </form>
    </div>
  );
}
