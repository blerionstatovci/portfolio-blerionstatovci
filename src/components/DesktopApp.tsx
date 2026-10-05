import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Grid2X2, Search, Settings2, X } from "lucide-react";
import { AppIcon } from "./AppIcon";
import { Window } from "./Window";
import { ProjectModal } from "./ProjectModal";
import { AboutApp } from "../apps/AboutApp";
import { ContactApp } from "../apps/ContactApp";
import { ExperienceApp } from "../apps/ExperienceApp";
import { MusicApp } from "../apps/MusicApp";
import { ProjectsApp } from "../apps/ProjectsApp";
import { SettingsApp } from "../apps/SettingsApp";
import { SkillsApp } from "../apps/SkillsApp";
import { TerminalApp } from "../apps/TerminalApp";
import { apps } from "../data/apps";
import { profile } from "../data/profile";
import { useWindowManager } from "../hooks/useWindowManager";
import type { AppId, DockOrigin, Project, WindowState } from "../types/app";

export function DesktopApp() {
  const { state: windowManager, dispatch } = useWindowManager();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const [accent, setAccent] = useState("cyan");
  const [reducedMotion, setReducedMotion] = useState(false);

  const originFor = useCallback((source?: HTMLElement): DockOrigin => {
    const rect = source?.getBoundingClientRect();
    const appHeight = Math.max(320, window.innerHeight - 132);
    return {
      x: (rect ? rect.left + rect.width / 2 : window.innerWidth / 2) - window.innerWidth / 2,
      y: (rect ? rect.top + rect.height / 2 : window.innerHeight - 32) - (58 + appHeight / 2),
      scale: Math.max(
        0.06,
        Math.min(
          (rect?.width ?? 36) / Math.max(320, window.innerWidth - 24),
          (rect?.height ?? 36) / appHeight,
        ),
      ),
    };
  }, []);

  const dockOriginFor = useCallback((id: AppId): DockOrigin => {
    const windowElement = document.querySelector<HTMLElement>(`.native-app-window[data-window-id="${id}"]`);
    const dockElement = document.querySelector<HTMLElement>(
      `.dock-app[title="${apps.find((app) => app.id === id)?.label}"]`,
    );
    if (!windowElement || !dockElement) return originFor(dockElement ?? undefined);
    const windowRect = windowElement.getBoundingClientRect();
    const dockRect = dockElement.getBoundingClientRect();
    return {
      x: dockRect.left + dockRect.width / 2 - (windowRect.left + windowRect.width / 2),
      y: dockRect.top + dockRect.height / 2 - (windowRect.top + windowRect.height / 2),
      scale: Math.max(0.06, Math.min(dockRect.width / windowRect.width, dockRect.height / windowRect.height)),
    };
  }, [originFor]);

  const update = (id: AppId, patch: Partial<WindowState>) => dispatch({ type: "update", id, patch });
  const close = (id: AppId) => dispatch({ type: "close", id });
  const minimize = useCallback(
    (id: AppId) => dispatch({ type: "minimize", id, origin: dockOriginFor(id) }),
    [dispatch, dockOriginFor],
  );
  const filtered = useMemo(
    () => apps.filter((app) => `${app.label} ${app.hint}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const open = (id: AppId, source?: HTMLElement) => {
    if (id === "resume") {
      window.open(profile.resumePath, "_blank", "noopener,noreferrer");
      return;
    }

    const dockSource =
      source ?? document.querySelector<HTMLElement>(`.dock-app[data-dock-app="${id}"]`) ?? undefined;
    dispatch({ type: "open", id, origin: originFor(dockSource) });
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.querySelector<HTMLInputElement>(".search-launcher input")?.focus();
        return;
      }
      if (event.key === "Escape") {
        const active = document.activeElement as HTMLElement | null;
        if (active?.closest(".search-launcher")) {
          active.blur();
          return;
        }
        if (windowManager.focus) {
          event.preventDefault();
          minimize(windowManager.focus);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [minimize, windowManager.focus]);

  const toggleDockApp = (id: AppId, source?: HTMLElement) => {
    const existing = windowManager.windows.find((window) => window.id === id);
    if (existing && !existing.minimized) minimize(id);
    else open(id, source);
  };

  const content = (id: AppId) => {
    switch (id) {
      case "projects":
        return <ProjectsApp inspect={setSelected} />;
      case "about":
        return <AboutApp />;
      case "experience":
        return <ExperienceApp />;
      case "skills":
        return <SkillsApp />;
      case "music":
        return <MusicApp />;
      case "terminal":
        return <TerminalApp />;
      case "settings":
        return (
          <SettingsApp
            accent={accent}
            setAccent={setAccent}
            reducedMotion={reducedMotion}
            setReducedMotion={setReducedMotion}
          />
        );
      case "contact":
        return <ContactApp />;
      default:
        return null;
    }
  };

  return (
    <div className={`os-shell accent-${accent} ${reducedMotion ? "reduce-motion" : ""}`}>
      <main className="desktop-area">
        <div className="desktop-heading">
          <span className="eyebrow">
            <i />BLERION OS · PERSONAL WORKSPACE
          </span>
          <h1>
            Good to see you, <em>Blerion.</em>
          </h1>
          <p>Build thoughtfully. Ship deliberately.</p>
        </div>
        <div className="desktop-icons">
          {filtered.map((app) => (
            <AppIcon app={app} open={open} key={app.id} />
          ))}
        </div>
        <AnimatePresence>
          {windowManager.windows.map((windowState) => {
            const app = apps.find((item) => item.id === windowState.id)!;
            return (
              <Window
                key={windowState.id}
                state={windowState}
                title={app.label}
                icon={app.icon}
                focus={() => dispatch({ type: "focus", id: windowState.id })}
                close={() => close(windowState.id)}
                minimize={() => minimize(windowState.id)}
                maximize={() => update(windowState.id, { maximized: !windowState.maximized })}
                finished={(status) => dispatch({ type: "finish", id: windowState.id, status })}
              >
                {content(windowState.id)}
              </Window>
            );
          })}
        </AnimatePresence>
      </main>
      <nav className="dock" aria-label="Application dock">
        <button className="dock-launcher" onClick={() => open("about")} aria-label="Open launcher">
          <Grid2X2 size={19} />
        </button>
        {apps
          .filter((app) => app.id !== "settings")
          .map((app) => {
            const Icon = app.icon;
            const isActive = windowManager.windows.some((window) => window.id === app.id && !window.minimized);
            return (
              <button
                className={isActive ? "dock-app active" : "dock-app"}
                data-dock-app={app.id}
                key={app.id}
                onClick={(event) => toggleDockApp(app.id, event.currentTarget)}
                title={app.label}
              >
                <Icon size={18} />
              </button>
            );
          })}
        <span className="dock-divider" />
        <button
          className={windowManager.windows.some((window) => window.id === "settings" && !window.minimized) ? "dock-app active" : "dock-app"}
          data-dock-app="settings"
          onClick={(event) => toggleDockApp("settings", event.currentTarget)}
          title="Settings"
        >
          <Settings2 size={18} />
        </button>
      </nav>
      <div className="search-launcher">
        <Search size={14} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search apps..." aria-label="Search apps" />
        {query && (
          <button onClick={() => setQuery("")} aria-label="Clear search">
            <X size={13} />
          </button>
        )}
      </div>
      {selected && <ProjectModal project={selected} close={() => setSelected(null)} />}
      <div className="focus-indicator">
        ONLINE <span>·</span> {windowManager.focus.toUpperCase()}
      </div>
    </div>
  );
}
