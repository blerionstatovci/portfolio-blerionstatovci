import { useState } from "react";
import { CalendarWidget } from "./CalendarWidget";
import { CityTimeWidget } from "./CityTimeWidget";
import { ContactForm } from "./ContactForm";
import { ControlCenter } from "./ControlCenter";
import { DesktopApp } from "./DesktopApp";
import { IosStatusBar } from "./IosStatusBar";
import { LockScreen } from "./LockScreen";
import { useClock } from "../hooks/useClock";

export function RuntimeApp() {
  const [locked, setLocked] = useState(true);
  const time = useClock(30_000);
  const [reducedMotion] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState("studio");
  const [brightness, setBrightness] = useState(1);
  const [clock24, setClock24] = useState(true);
  const wallpapers: Record<string, string> = {
    studio: "url(https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=86)",
    mountains: "url(https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=2200&q=86)",
    coast: "url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=86)",
  };

  return (
    <div
      className={`os-runtime ${contactOpen ? "has-contact-form" : ""}`}
      style={{ filter: `brightness(${brightness})`, "--blerion-wallpaper": wallpapers[wallpaper] } as React.CSSProperties}
    >
      <IosStatusBar time={time} clock24={clock24} />
      <DesktopApp />
      {locked && <LockScreen time={time} reducedMotion={reducedMotion} onUnlocked={() => setLocked(false)} />}
      <CalendarWidget time={time} />
      <CityTimeWidget />
      <ControlCenter
        setLocked={setLocked}
        onContact={() => setContactOpen(true)}
        wallpaper={wallpaper}
        setWallpaper={setWallpaper}
        brightness={brightness}
        setBrightness={setBrightness}
        clock24={clock24}
        setClock24={setClock24}
      />
      {contactOpen && <ContactForm close={() => setContactOpen(false)} />}
    </div>
  );
}
