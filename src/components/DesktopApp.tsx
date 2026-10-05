import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, type PanInfo } from "framer-motion";
import { Grid2X2, Search, Settings2, X } from "lucide-react";
import { AppIcon } from "./AppIcon";
import { ContextMenu, type ContextMenuAction } from "./ContextMenu";
import { DockItem } from "./DockItem";
import { Window } from "./Window";
import { ProjectModal } from "./ProjectModal";
import { apps } from "../data/apps";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import type { Language, Theme } from "../data/settings";
import { t } from "../i18n";
import { useWindowManager } from "../hooks/useWindowManager";
import type { AppId, DockOrigin, Project, WindowState } from "../types/app";
import { filterSearchableItems } from "../utils/search";

const SNAP_EDGE = 28;
const AboutApp = lazy(() => import("../apps/AboutApp").then(({ AboutApp }) => ({ default: AboutApp })));
const CertificatesApp = lazy(() => import("../apps/CertificatesApp").then(({ CertificatesApp }) => ({ default: CertificatesApp })));
const ContactApp = lazy(() => import("../apps/ContactApp").then(({ ContactApp }) => ({ default: ContactApp })));
const ExperienceApp = lazy(() => import("../apps/ExperienceApp").then(({ ExperienceApp }) => ({ default: ExperienceApp })));
const ProjectsApp = lazy(() => import("../apps/ProjectsApp").then(({ ProjectsApp }) => ({ default: ProjectsApp })));
const SettingsApp = lazy(() => import("../apps/SettingsApp").then(({ SettingsApp }) => ({ default: SettingsApp })));
const SkillsApp = lazy(() => import("../apps/SkillsApp").then(({ SkillsApp }) => ({ default: SkillsApp })));
const TerminalApp = lazy(() => import("../apps/TerminalApp").then(({ TerminalApp }) => ({ default: TerminalApp })));

function AppSkeleton() {
  return <div className="app-skeleton" aria-label="Loading app"><i /><i /><i /></div>;
}

export function DesktopApp({
  accent,
  setAccent,
  reducedMotion,
  setReducedMotion,
  theme,
  setTheme,
  language,
  setLanguage,
  onActiveAppChange,
}: {
  accent: string;
  setAccent: (value: string) => void;
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  theme: Theme;
  setTheme: (value: Theme) => void;
  language: Language;
  setLanguage: (value: Language) => void;
  onActiveAppChange?: (value: string) => void;
}) {
  const { state: windowManager, dispatch } = useWindowManager();
  const desktopRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [snapTarget, setSnapTarget] = useState<"left" | "right" | "top" | null>(null);
  const [canMagnify, setCanMagnify] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanMagnify(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!contextMenu) return;
    const close = () => setContextMenu(null);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [contextMenu]);

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
    () => filterSearchableItems(apps, query, (app) => `${app.label} ${app.hint}`),
    [query],
  );
  const filteredProjects = useMemo(
    () => filterSearchableItems(projects, query, (project) => `${project.name} ${project.category} ${project.tech.join(" ")}`),
    [query],
  );
  const activeWindow = windowManager.windows
    .filter((window) => !window.minimized)
    .reduce<WindowState | undefined>((current, window) => (!current || window.z > current.z ? window : current), undefined);

  useEffect(() => {
    const app = apps.find((item) => item.id === activeWindow?.id);
    onActiveAppChange?.(app?.label ?? "Workspace");
  }, [activeWindow?.id, activeWindow?.z, onActiveAppChange]);

  const open = (id: AppId, source?: HTMLElement) => {
    if (id === "resume") {
      window.open(profile.resumePath, "_blank", "noopener,noreferrer");
      return;
    }

    const dockSource =
      source ?? document.querySelector<HTMLElement>(`.dock-app[data-dock-app="${id}"]`) ?? undefined;
    const cascadeIndex = windowManager.windows.length % 5;
    dispatch({
      type: "open",
      id,
      origin: originFor(dockSource),
      position: { x: 120 + cascadeIndex * 28, y: 94 + cascadeIndex * 24 },
    });
  };

  const getSnapTarget = (info: PanInfo) => {
    if (info.point.y <= SNAP_EDGE + 52) return "top" as const;
    if (info.point.x <= SNAP_EDGE) return "left" as const;
    if (info.point.x >= window.innerWidth - SNAP_EDGE) return "right" as const;
    return null;
  };

  const handleSnapPreview = (info: PanInfo) => setSnapTarget(getSnapTarget(info));

  const handleMove = (id: AppId, info: PanInfo) => {
    const current = windowManager.windows.find((window) => window.id === id);
    if (!current || !desktopRef.current) return;
    const element = document.querySelector<HTMLElement>(`.native-app-window[data-window-id="${id}"]`);
    const area = desktopRef.current.getBoundingClientRect();
    const rect = element?.getBoundingClientRect();
    const startX = current.x ?? (rect ? rect.left - area.left : 0);
    const startY = current.y ?? (rect ? rect.top - area.top : 0);
    const width = rect?.width ?? Math.min(720, area.width - 24);
    const height = rect?.height ?? Math.min(560, area.height - 24);
    const x = Math.max(0, Math.min(startX + info.offset.x, Math.max(0, area.width - width)));
    const y = Math.max(0, Math.min(startY + info.offset.y, Math.max(0, area.height - height)));
    update(id, { x, y });
  };

  const handleSnap = (id: AppId, info: PanInfo) => {
    const next = getSnapTarget(info);
    setSnapTarget(null);
    if (next === "top") update(id, { maximized: true, snap: null });
    if (next === "left" || next === "right") update(id, { maximized: false, snap: next });
  };

  const handleContextAction = (action: ContextMenuAction) => {
    if (action === "refresh") window.location.reload();
    if (action === "wallpaper") document.querySelector<HTMLButtonElement>(".control-center-trigger")?.click();
    if (action === "terminal") open("terminal");
    if (action === "about") open("about");
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
        return <AboutApp language={language} setLanguage={setLanguage} reducedMotion={reducedMotion} />;
      case "experience":
        return <ExperienceApp />;
      case "certificates":
        return <CertificatesApp />;
      case "skills":
        return <SkillsApp />;
      case "terminal":
        return <TerminalApp openApp={open} setTheme={setTheme} />;
      case "settings":
        return (
          <SettingsApp
            accent={accent}
            setAccent={setAccent}
            reducedMotion={reducedMotion}
            setReducedMotion={setReducedMotion}
            theme={theme}
            setTheme={setTheme}
            language={language}
            setLanguage={setLanguage}
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
      <main
        ref={desktopRef}
        className="desktop-area"
        onContextMenu={(event) => {
          if ((event.target as HTMLElement).closest(".os-window")) return;
          event.preventDefault();
          setContextMenu({ x: event.clientX, y: event.clientY });
        }}
      >
        <div className="desktop-heading">
          <span className="eyebrow">
            <i />BLERION OS · PERSONAL WORKSPACE
          </span>
          <h1>{t(language, "welcome")}</h1>
          <p>{t(language, "intro")}</p>
          <div className="welcome-actions">
            <button className="primary-action" onClick={() => open("resume")}>
              {t(language, "openResume")}
            </button>
            <a className="secondary-action" href={profile.resumePath} download>
              {t(language, "downloadCv")}
            </a>
          </div>
        </div>
        <div className="desktop-icons">
          {filtered.map((app) => (
            <AppIcon app={app} open={open} key={app.id} />
          ))}
        </div>
        {snapTarget && (
          <div className={`snap-preview snap-preview-${snapTarget}`} aria-hidden="true" />
        )}
        <AnimatePresence>
          {windowManager.windows.map((windowState) => {
            const app = apps.find((item) => item.id === windowState.id)!;
            return (
              <Window
                key={windowState.id}
                state={windowState}
                title={app.label}
                icon={app.icon}
                active={activeWindow?.id === windowState.id}
                desktopConstraints={desktopRef}
                focus={() => dispatch({ type: "focus", id: windowState.id })}
                close={() => close(windowState.id)}
                minimize={() => minimize(windowState.id)}
                maximize={() => update(windowState.id, { maximized: !windowState.maximized, snap: null })}
                move={(info) => handleMove(windowState.id, info)}
                snap={(info) => handleSnap(windowState.id, info)}
                snapPreview={handleSnapPreview}
                dragStart={() => update(windowState.id, { snap: null })}
                finished={(status) => dispatch({ type: "finish", id: windowState.id, status })}
              >
                <Suspense fallback={<AppSkeleton />}>{content(windowState.id)}</Suspense>
              </Window>
            );
          })}
        </AnimatePresence>
      </main>
      <nav className="dock" aria-label="Application dock">
        <DockItem
          icon={Grid2X2}
          label="Open launcher"
          launcher
          magnify={canMagnify && !reducedMotion}
          onClick={() => open("about")}
        />
        {apps
          .filter((app) => app.id !== "settings")
          .map((app) => {
            const isActive = windowManager.windows.some((window) => window.id === app.id && !window.minimized);
            return (
              <DockItem
                key={app.id}
                icon={app.icon}
                label={app.label}
                dataDockApp={app.id}
                active={isActive}
                magnify={canMagnify && !reducedMotion}
                onClick={(event) => toggleDockApp(app.id, event.currentTarget)}
              />
            );
          })}
        <span className="dock-divider" />
        <DockItem
          icon={Settings2}
          label="Settings"
          dataDockApp="settings"
          active={windowManager.windows.some((window) => window.id === "settings" && !window.minimized)}
          magnify={canMagnify && !reducedMotion}
          onClick={(event) => toggleDockApp("settings", event.currentTarget)}
        />
      </nav>
      <div className="search-launcher">
        <Search size={14} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t(language, "search")} aria-label={t(language, "search")} />
        {query && (
          <button onClick={() => setQuery("")} aria-label="Clear search">
            <X size={13} />
          </button>
        )}
        {query && filteredProjects.length > 0 && (
          <div className="launcher-project-results" role="listbox" aria-label="Project results">
            {filteredProjects.slice(0, 4).map((project) => (
              <button
                key={project.name}
                onClick={() => {
                  open("projects");
                  setSelected(project);
                  setQuery("");
                }}
              >
                <span>{project.name}</span><small>{project.category}</small>
              </button>
            ))}
          </div>
        )}
      </div>
      {selected && <ProjectModal project={selected} close={() => setSelected(null)} />}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          close={() => setContextMenu(null)}
          action={handleContextAction}
        />
      )}
      <div className="focus-indicator">
        ONLINE <span>·</span> {(activeWindow?.id ?? windowManager.focus).toUpperCase()}
      </div>
    </div>
  );
}
