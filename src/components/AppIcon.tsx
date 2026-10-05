import type { AppDefinition, AppId } from "../types/app";

export function AppIcon({
  app,
  open,
}: {
  app: AppDefinition;
  open: (id: AppId, source?: HTMLElement) => void;
}) {
  const Icon = app.icon;

  return (
    <button
      className="desktop-icon"
      onClick={(event) => open(app.id, event.currentTarget)}
      aria-label={`Open ${app.label}`}
    >
      <span className={`app-icon ${app.color}`}>
        <Icon size={24} />
      </span>
      <b>{app.label}</b>
      <small>{app.hint}</small>
    </button>
  );
}
