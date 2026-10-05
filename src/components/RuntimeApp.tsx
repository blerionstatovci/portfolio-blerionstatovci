import { useEffect, useState } from "react";
import { CalendarWidget } from "./CalendarWidget";
import { CityTimeWidget } from "./CityTimeWidget";
import { ContactForm } from "./ContactForm";
import { ControlCenter } from "./ControlCenter";
import { DesktopApp } from "./DesktopApp";
import { IosStatusBar } from "./IosStatusBar";
import { LockScreen } from "./LockScreen";
import { useClock } from "../hooks/useClock";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  getDefaultSettings,
  SETTINGS_STORAGE_KEY,
  SETTINGS_VERSION,
  wallpapers,
} from "../data/settings";
import type { AppSettings, Theme, WallpaperId } from "../data/settings";

export function RuntimeApp() {
  const [locked, setLocked] = useState(true);
  const time = useClock(30_000);
  const [contactOpen, setContactOpen] = useState(false);
  const [settings, setSettings] = useLocalStorage<AppSettings>(
    SETTINGS_STORAGE_KEY,
    getDefaultSettings(),
    SETTINGS_VERSION,
  );
  const [wallpaperTransition, setWallpaperTransition] = useState(0);
  const [previousWallpaper, setPreviousWallpaper] = useState(() => wallpapers[settings.wallpaper]);

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
  }, [settings.theme]);

  const updateSetting = <Key extends keyof AppSettings>(key: Key, value: AppSettings[Key]) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const setTheme = (theme: Theme) => updateSetting("theme", theme);
  const setWallpaper = (wallpaper: WallpaperId) => {
    if (wallpaper === settings.wallpaper) return;
    setPreviousWallpaper(wallpapers[settings.wallpaper]);
    setWallpaperTransition((current) => current + 1);
    updateSetting("wallpaper", wallpaper);
  };

  return (
    <div
      className={`os-runtime ${wallpaperTransition ? `wallpaper-transition-${wallpaperTransition % 2}` : ""} ${contactOpen ? "has-contact-form" : ""}`}
      style={{
        filter: `brightness(${settings.brightness})`,
        "--blerion-wallpaper": wallpapers[settings.wallpaper],
        "--blerion-wallpaper-previous": previousWallpaper,
      } as React.CSSProperties}
    >
      <IosStatusBar time={time} clock24={settings.clock24} />
      <DesktopApp
        accent={settings.accent}
        setAccent={(accent) => updateSetting("accent", accent)}
        reducedMotion={settings.reducedMotion}
        setReducedMotion={(reducedMotion) => updateSetting("reducedMotion", reducedMotion)}
        theme={settings.theme}
        setTheme={setTheme}
      />
      {locked && (
        <LockScreen
          time={time}
          reducedMotion={settings.reducedMotion}
          onUnlocked={() => setLocked(false)}
        />
      )}
      <CalendarWidget time={time} />
      <CityTimeWidget />
      <ControlCenter
        setLocked={setLocked}
        onContact={() => setContactOpen(true)}
        theme={settings.theme}
        setTheme={setTheme}
        wallpaper={settings.wallpaper}
        setWallpaper={setWallpaper}
        brightness={settings.brightness}
        setBrightness={(brightness) => updateSetting("brightness", brightness)}
        clock24={settings.clock24}
        setClock24={(clock24) => updateSetting("clock24", clock24)}
      />
      {contactOpen && <ContactForm close={() => setContactOpen(false)} />}
    </div>
  );
}
