import { motion } from "framer-motion";
import { Maximize2, Minimize2, Minus, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { WindowState } from "../types/app";

export function Window({
  state,
  title,
  icon: Icon,
  children,
  focus,
  close,
  minimize,
  maximize,
  finished = () => undefined,
}: {
  state: WindowState;
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  focus: () => void;
  close: () => void;
  minimize: () => void;
  maximize: () => void;
  finished?: (status: "open" | "minimized") => void;
}) {
  const origin = state.origin;
  const minimizeTarget = { opacity: 0, scale: origin.scale, x: origin.x, y: origin.y };
  const visibleTarget = { opacity: 1, scale: 1, x: 0, y: 0 };
  const isMinimized =
    state.minimized ||
    state.status === "minimized" ||
    state.status === "minimizing" ||
    state.status === "closing";
  const target = isMinimized ? minimizeTarget : visibleTarget;

  return (
    <motion.section
      layout
      initial={state.status === "opening" ? minimizeTarget : visibleTarget}
      animate={target}
      transition={{ type: "spring", stiffness: 250, damping: 27, mass: 0.7 }}
      onAnimationComplete={() => {
        if (state.status === "minimizing") finished("minimized");
        if (state.status === "opening") finished("open");
      }}
      className={`os-window native-app-window ${state.maximized ? "maximized" : ""} ${state.status}`}
      data-window-id={state.id}
      style={{ zIndex: state.z, pointerEvents: isMinimized ? "none" : "auto" }}
      onMouseDown={focus}
    >
      <header className="window-bar">
        <div className="window-controls">
          <button className="close" onClick={close} aria-label={`Close ${title}`}>
            <X size={11} />
          </button>
          <button onClick={minimize} aria-label={`Minimize ${title}`}>
            <Minus size={11} />
          </button>
          <button onClick={maximize} aria-label={`Maximize ${title}`}>
            {state.maximized ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
          </button>
        </div>
        <span className="window-title">
          <Icon size={14} />
          {title}
        </span>
        <span className="window-status">{isMinimized ? "MINIMIZED" : "ACTIVE"}</span>
      </header>
      <div className="window-body">{children}</div>
    </motion.section>
  );
}
