import { useEffect, useState } from "react";
import { CalendarWidget } from "./CalendarWidget";
import { CityTimeWidget } from "./CityTimeWidget";
import { ContactForm } from "./ContactForm";
import { ControlCenter } from "./ControlCenter";
import { DesktopApp } from "./DesktopApp";
import { IosStatusBar } from "./IosStatusBar";
import { LockScreen } from "./LockScreen";
import { BootScreen } from "./BootScreen";
import { Analytics } from "./Analytics";
import { ToastProvider } from "./Toast";
import { useToast } from "../hooks/useToast";
import { useClock } from "../hooks/useClock";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  getDefaultSettings,
  SETTINGS_STORAGE_KEY,
  SETTINGS_VERSION,
  wallpapers,
} from "../data/settings";
import type { AppSettings, Language, Theme, WallpaperId } from "../data/settings";

const BOOT_SESSION_KEY = "blerion-os-booted-v1";

function shouldBoot() {
  try {
    return window.sessionStorage.getItem(BOOT_SESSION_KEY) !== "1";
  } catch {
    return true;
  }
}

function RuntimeShell() {
  const { showToast } = useToast();
  const [locked, setLocked] = useState(true);
  const time = useClock(30_000);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeAppName, setActiveAppName] = useState("Workspace");
  const [booting, setBooting] = useState(shouldBoot);
  const [settings, setSettings] = useLocalStorage<AppSettings>(
    SETTINGS_STORAGE_KEY,
    getDefaultSettings(),
    SETTINGS_VERSION,
  );
  const [wallpaperTransition, setWallpaperTransition] = useState(0);
  const [previousWallpaper, setPreviousWallpaper] = useState(() => wallpapers[settings.wallpaper]);
  const language: Language = settings.language === "sq" ? "sq" : "en";

  const completeBoot = () => {
    try {
      window.sessionStorage.setItem(BOOT_SESSION_KEY, "1");
    } catch {
      // Session storage can be disabled; the boot screen still remains skippable.
    }
    setBooting(false);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
  }, [settings.theme]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (!booting) return;
    const timer = window.setTimeout(completeBoot, 1200);
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") completeBoot();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [booting]);

  const updateSetting = <Key extends keyof AppSettings>(
    key: Key,
    value: AppSettings[Key],
    notify = false,
  ) => {
    setSettings((current) => ({ ...current, [key]: value }));
    if (notify) showToast("Settings saved.", "success");
  };

  const setTheme = (theme: Theme) => updateSetting("theme", theme, true);
  const setWallpaper = (wallpaper: WallpaperId) => {
    if (wallpaper === settings.wallpaper) return;
    setPreviousWallpaper(wallpapers[settings.wallpaper]);
    setWallpaperTransition((current) => current + 1);
    updateSetting("wallpaper", wallpaper, true);
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
      <Analytics />
      <IosStatusBar time={time} clock24={settings.clock24} activeAppName={activeAppName} />
      <DesktopApp
        accent={settings.accent}
        setAccent={(accent) => updateSetting("accent", accent, true)}
        reducedMotion={settings.reducedMotion}
        setReducedMotion={(reducedMotion) => updateSetting("reducedMotion", reducedMotion, true)}
        theme={settings.theme}
        setTheme={setTheme}
        language={language}
        setLanguage={(language: Language) => updateSetting("language", language, true)}
        onActiveAppChange={setActiveAppName}
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
        setClock24={(clock24) => updateSetting("clock24", clock24, true)}
      />
      {contactOpen && <ContactForm close={() => setContactOpen(false)} />}
      {booting && <BootScreen onSkip={completeBoot} reducedMotion={settings.reducedMotion} />}
    </div>
  );
}

export function RuntimeApp() {
  return (
    <ToastProvider>
      <RuntimeShell />
    </ToastProvider>
  );
}
