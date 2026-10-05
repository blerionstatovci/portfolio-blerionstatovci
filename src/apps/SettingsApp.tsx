import { Monitor, Zap } from "lucide-react";

export function SettingsApp({
  accent,
  setAccent,
  reducedMotion,
  setReducedMotion,
}: {
  accent: string;
  setAccent: (value: string) => void;
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
}) {
  return (
    <div className="content-app settings">
      <span className="eyebrow">SYSTEM PREFERENCES</span>
      <h2>Settings</h2>
      <label>
        <span>
          <Zap size={15} /> Accent color
        </span>
        <select value={accent} onChange={(event) => setAccent(event.target.value)}>
          <option value="cyan">Arctic cyan</option>
          <option value="violet">Soft violet</option>
          <option value="green">Signal green</option>
        </select>
      </label>
      <label>
        <span>
          <Monitor size={15} /> Reduced motion
        </span>
        <input type="checkbox" checked={reducedMotion} onChange={(event) => setReducedMotion(event.target.checked)} />
      </label>
    </div>
  );
}
