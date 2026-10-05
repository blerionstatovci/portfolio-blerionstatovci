export type Theme = "dark" | "light";
export type WallpaperId = "studio" | "mountains" | "coast" | "graphite" | "paper";

export type AppSettings = {
  theme: Theme;
  wallpaper: WallpaperId;
  brightness: number;
  clock24: boolean;
  accent: string;
  reducedMotion: boolean;
};

export const SETTINGS_STORAGE_KEY = "blerion-os-settings-v1";
export const SETTINGS_VERSION = 1;

export const wallpapers: Record<WallpaperId, string> = {
  studio:
    "url(https://images.unsplash.com/photo-1751200065687-a126e7c304da?auto=format&fit=crop&w=2400&q=85)",
  mountains:
    "linear-gradient(135deg, rgba(13, 22, 35, .82), rgba(39, 61, 83, .58)), url('/dark-productivity.jfif')",
  coast:
    "linear-gradient(135deg, rgba(8, 33, 38, .76), rgba(17, 64, 66, .46)), url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=86)",
  graphite: "linear-gradient(135deg, #090b0c 0%, #25292b 48%, #0b0c0d 100%)",
  paper: "linear-gradient(135deg, #d9ddd7 0%, #f4f1e8 48%, #c3cbc4 100%)",
};

export function getDefaultSettings(): AppSettings {
  const prefersLight =
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches;

  return {
    theme: prefersLight ? "light" : "dark",
    wallpaper: "studio",
    brightness: 1,
    clock24: true,
    accent: "cyan",
    reducedMotion: false,
  };
}
