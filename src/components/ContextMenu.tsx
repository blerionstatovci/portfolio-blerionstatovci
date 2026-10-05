import { Info, MonitorUp, RefreshCw, Terminal, Wallpaper } from "lucide-react";

export type ContextMenuAction = "refresh" | "wallpaper" | "terminal" | "about";

export function ContextMenu({
  x,
  y,
  close,
  action,
}: {
  x: number;
  y: number;
  close: () => void;
  action: (value: ContextMenuAction) => void;
}) {
  const items = [
    { id: "refresh" as const, label: "Refresh", icon: RefreshCw },
    { id: "wallpaper" as const, label: "Change wallpaper", icon: Wallpaper },
    { id: "terminal" as const, label: "Open Terminal", icon: Terminal },
    { id: "about" as const, label: "About BlerionOS", icon: Info },
  ];

  return (
    <div
      className="desktop-context-menu"
      role="menu"
      aria-label="Desktop actions"
      style={{ left: Math.min(x, window.innerWidth - 230), top: Math.min(y, window.innerHeight - 220) }}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div className="context-menu-heading"><MonitorUp size={13} /> Desktop</div>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button key={item.id} role="menuitem" onClick={() => { action(item.id); close(); }}>
            <Icon size={14} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
