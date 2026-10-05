import { describe, expect, it } from "vitest";
import { buildCalendarGrid } from "./calendar";
import { filterSearchableItems } from "./search";
import { formatPrishtinaTime } from "./time";
import { autocompleteTerminalInput, parseTerminalCommand } from "./terminal";
import { initialWindowManagerState, windowManagerReducer } from "../hooks/useWindowManager";

const origin = { x: 0, y: 0, scale: 1 };

describe("window reducer", () => {
  it("opens, focuses and updates a window without losing other windows", () => {
    const opened = windowManagerReducer(initialWindowManagerState, { type: "open", id: "projects", origin, position: { x: 20, y: 30 } });
    const withTerminal = windowManagerReducer(opened, { type: "open", id: "terminal", origin });
    const focused = windowManagerReducer(withTerminal, { type: "focus", id: "projects" });
    const moved = windowManagerReducer(focused, { type: "update", id: "projects", patch: { x: 100, y: 120 } });
    expect(moved.windows).toHaveLength(2);
    expect(moved.focus).toBe("projects");
    expect(moved.windows.find((window) => window.id === "projects")).toMatchObject({ x: 100, y: 120 });
  });
});

describe("timezone helper", () => {
  it("formats Prishtina using the Belgrade timezone", () => {
    expect(formatPrishtinaTime(new Date("2026-01-01T12:00:00.000Z"))).toBe("13:00:00");
  });
});

describe("calendar grid", () => {
  it("starts Monday-first with leading blanks", () => {
    const grid = buildCalendarGrid(2026, 1);
    expect(grid.slice(0, 6)).toEqual([null, null, null, null, null, null]);
    expect(grid.filter((day) => day !== null)).toHaveLength(28);
    expect(grid.at(-1)).toBe(28);
  });
});

describe("terminal parser", () => {
  it("returns plain-text actions for hiring commands", () => {
    expect(parseTerminalCommand("whoami").output).toContain("Blerion Statovci");
    expect(parseTerminalCommand("sudo hire blerion").action).toEqual({ type: "open", id: "contact" });
    expect(parseTerminalCommand("theme light").action).toEqual({ type: "theme", value: "light" });
    expect(parseTerminalCommand("unknwon").output).toContain("Did you mean");
    expect(autocompleteTerminalInput("open pro")).toBe("open projects");
  });
});

describe("search filter", () => {
  it("matches labels and descriptions case-insensitively", () => {
    const items = [{ name: "Projects", hint: "Six live projects" }, { name: "Terminal", hint: "Command line" }];
    expect(filterSearchableItems(items, "LIVE", (item) => `${item.name} ${item.hint}`)).toHaveLength(1);
    expect(filterSearchableItems(items, "", (item) => item.name)).toHaveLength(2);
  });
});
