import { useEffect, useRef, useState } from "react";
import type { Theme } from "../data/settings";
import type { AppId } from "../types/app";
import { autocompleteTerminalInput, parseTerminalCommand } from "../utils/terminal";

export function TerminalApp({
  openApp,
  setTheme,
}: {
  openApp?: (id: AppId) => void;
  setTheme?: (value: Theme) => void;
}) {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState(["BlerionOS Terminal v1.0", "Type 'help' to see available commands."]);
  const [commands, setCommands] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    const result = parseTerminalCommand(value);
    setCommands((current) => [...current, value]);
    setHistoryIndex(-1);
    setInput("");
    if (result.clear) {
      setLines([]);
    } else {
      setLines((current) => [...current, `> ${value}`, ...result.output.split("\n")]);
    }
    if (result.action?.type === "open") openApp?.(result.action.id);
    if (result.action?.type === "theme") setTheme?.(result.action.value);
    if (result.action?.type === "contact") openApp?.("contact");
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    run(input);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setLines([]);
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      setInput(autocompleteTerminalInput(input));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = Math.min(commands.length - 1, historyIndex + 1);
      setHistoryIndex(nextIndex);
      setInput(commands[commands.length - 1 - nextIndex] ?? "");
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = Math.max(-1, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(nextIndex < 0 ? "" : commands[commands.length - 1 - nextIndex] ?? "");
    }
  };

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-output" ref={outputRef} aria-live="polite">
        {lines.map((line, index) => (
          <pre className={line.startsWith(">") ? "terminal-command" : index === 0 ? "terminal-title" : "terminal-result"} key={`${line}-${index}`}>
            {line}
          </pre>
        ))}
      </div>
      <form onSubmit={submit} className="terminal-prompt">
        <span>blerion@os:~$</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setHistoryIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          aria-label="Terminal command"
          autoComplete="off"
        />
      </form>
    </div>
  );
}
