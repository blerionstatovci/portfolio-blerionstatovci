import { useEffect, useRef, useState } from "react";
import { motion, useDragControls, type PanInfo } from "framer-motion";
import { Maximize2, Minimize2, Minus, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { WindowState } from "../types/app";

export function Window({
  state,
  title,
  icon: Icon,
  children,
  active,
  desktopConstraints,
  focus,
  close,
  minimize,
  maximize,
  move,
  snap,
  snapPreview,
  dragStart,
  finished = () => undefined,
}: {
  state: WindowState;
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  active: boolean;
  desktopConstraints: React.RefObject<HTMLDivElement | null>;
  focus: () => void;
  close: () => void;
  minimize: () => void;
  maximize: () => void;
  move: (info: PanInfo) => void;
  snap: (info: PanInfo) => void;
  snapPreview: (info: PanInfo) => void;
  dragStart: () => void;
  finished?: (status: "open" | "minimized") => void;
}) {
  const dragControls = useDragControls();
  const mobilePointerStart = useRef<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(() => typeof window === "undefined" || window.innerWidth >= 768);
  const origin = state.origin;
  const minimizeTarget = { opacity: 0, scale: origin.scale, x: origin.x, y: origin.y };
  const visibleTarget = { opacity: 1, scale: 1, x: 0, y: 0 };
  const isMinimized =
    state.minimized ||
    state.status === "minimized" ||
    state.status === "minimizing" ||
    state.status === "closing";
  const target = isMinimized ? minimizeTarget : visibleTarget;

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleTitlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    focus();
    if (!isDesktop) {
      mobilePointerStart.current = event.pointerType === "mouse" ? null : event.clientY;
      return;
    }
    if (!state.maximized) dragControls.start(event);
  };

  const handleTitlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (isDesktop || mobilePointerStart.current === null) return;
    const distance = event.clientY - mobilePointerStart.current;
    mobilePointerStart.current = null;
    if (distance > 48) minimize();
  };

  return (
    <motion.section
      layout
      initial={state.status === "opening" ? minimizeTarget : visibleTarget}
      animate={target}
      transition={{ type: "spring", stiffness: 250, damping: 27, mass: 0.7 }}
      drag={isDesktop && !state.maximized && !isMinimized}
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={desktopConstraints}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={() => {
        focus();
        dragStart();
      }}
      onDrag={(_, info) => snapPreview(info)}
      onDragEnd={(_, info) => {
        snap(info);
        move(info);
      }}
      onAnimationComplete={() => {
        if (state.status === "minimizing") finished("minimized");
        if (state.status === "opening") finished("open");
      }}
      className={`os-window native-app-window ${state.maximized ? "maximized" : ""} ${state.snap ? `snapped-${state.snap}` : ""} ${active ? "window-active" : "window-inactive"} ${state.status}`}
      data-window-id={state.id}
      style={{
        zIndex: state.z,
        pointerEvents: isMinimized ? "none" : "auto",
        ...(isDesktop && state.x !== undefined && state.y !== undefined && !state.maximized && !state.snap
          ? { left: state.x, top: state.y }
          : {}),
      }}
      onPointerDown={focus}
    >
      <header
        className="window-bar"
        onPointerDown={handleTitlePointerDown}
        onPointerUp={handleTitlePointerUp}
        onPointerCancel={() => {
          mobilePointerStart.current = null;
        }}
        onDoubleClick={(event) => {
          if ((event.target as HTMLElement).closest("button")) return;
          event.preventDefault();
          maximize();
        }}
      >
        <div className="window-controls">
          <button className="close" onPointerDown={(event) => event.stopPropagation()} onClick={close} aria-label={`Close ${title}`}>
            <X size={11} />
          </button>
          <button onPointerDown={(event) => event.stopPropagation()} onClick={minimize} aria-label={`Minimize ${title}`}>
            <Minus size={11} />
          </button>
          <button onPointerDown={(event) => event.stopPropagation()} onClick={maximize} aria-label={`Maximize ${title}`}>
            {state.maximized ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
          </button>
        </div>
        <span className="window-title">
          <Icon size={14} />
          {title}
        </span>
        <span className="window-status">{isMinimized ? "MINIMIZED" : active ? "ACTIVE" : "OPEN"}</span>
      </header>
      <div className="window-body">{children}</div>
    </motion.section>
  );
}
