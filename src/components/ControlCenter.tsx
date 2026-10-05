import { useEffect, useState } from "react";
import { Grid2X2, LockKeyhole, Mail, Moon, Settings2, Sun, X } from "lucide-react";
import type { Theme, WallpaperId } from "../data/settings";

export function ControlCenter({
  setLocked,
  onContact,
  theme,
  setTheme,
  wallpaper,
  setWallpaper,
  brightness,
  setBrightness,
  clock24,
  setClock24,
}: {
  setLocked: (value: boolean) => void;
  onContact: () => void;
  theme: Theme;
  setTheme: (value: Theme) => void;
  wallpaper: WallpaperId;
  setWallpaper: (value: WallpaperId) => void;
  brightness: number;
  setBrightness: (value: number) => void;
  clock24: boolean;
  setClock24: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    document.addEventListener("blerion:open-control-center", onOpen);
    return () => document.removeEventListener("blerion:open-control-center", onOpen);
  }, []);

  return (
    <>
      <button className="control-center-trigger" onClick={() => setOpen(!open)} aria-label="Open control center">
        <Grid2X2 size={16} />
        <span>Control Center</span>
      </button>
      {open && (
        <div className="control-center-panel">
          <div className="control-center-heading">
            <div>
              <span className="eyebrow">BLERION OS</span>
              <h3>Control Center</h3>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close control center">
              <X size={15} />
            </button>
          </div>
          <div className="control-grid">
            <button className="control-tile active" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
              <span>Theme</span>
              <small>{theme === "dark" ? "Dark" : "Light"}</small>
            </button>
            <button className="control-tile" onClick={() => setLocked(true)}>
              <LockKeyhole size={16} />
              <span>Lock</span>
              <small>Lock screen</small>
            </button>
            <button className="control-tile" onClick={onContact}>
              <Mail size={16} />
              <span>Contact</span>
              <small>Open form</small>
            </button>
          </div>
          <p className="control-note">Wi-Fi and Bluetooth icons are decorative status indicators.</p>
          <div className="control-sliders">
            <label className="control-slider">
              <span>
                Brightness <b>{Math.round(brightness * 100)}%</b>
              </span>
              <input
                type="range"
                min=".65"
                max="1"
                step=".01"
                value={brightness}
                onChange={(event) => setBrightness(Number(event.target.value))}
              />
            </label>
          </div>
          <label className="control-select">
            <span>Wallpaper</span>
            <select value={wallpaper} onChange={(event) => setWallpaper(event.target.value as WallpaperId)}>
              <option value="studio">Studio desk</option>
              <option value="mountains">Soft mountains</option>
              <option value="coast">Coastline</option>
              <option value="graphite">Graphite gradient</option>
              <option value="paper">Paper gradient</option>
            </select>
          </label>
          <label className="control-select">
            <span>Clock format</span>
            <select value={clock24 ? "24" : "12"} onChange={(event) => setClock24(event.target.value === "24")}>
              <option value="24">24-hour</option>
              <option value="12">12-hour</option>
            </select>
          </label>
          <button className="control-settings" onClick={() => setOpen(false)}>
            <Settings2 size={14} /> Wallpaper and display settings
          </button>
        </div>
      )}
    </>
  );
}
