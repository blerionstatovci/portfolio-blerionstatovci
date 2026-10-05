import { useEffect, useState } from "react";
import { Bluetooth, Grid2X2, Wifi } from "lucide-react";

export function IosStatusBar({
  time,
  clock24,
  activeAppName = "Workspace",
}: {
  time: Date;
  clock24: boolean;
  activeAppName?: string;
}) {
  const [battery, setBattery] = useState<number | null>(null);
  const date = time.toLocaleDateString([], { weekday: "short", day: "2-digit", month: "short" });
  const clock = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: !clock24 });

  useEffect(() => {
    let source: (EventTarget & { level: number }) | undefined;
    let update: (() => void) | undefined;

    const load = async () => {
      const getBattery = (navigator as Navigator & {
        getBattery?: () => Promise<EventTarget & { level: number }>;
      }).getBattery;
      if (!getBattery) return;
      source = await getBattery.call(navigator);
      update = () => setBattery(source?.level ?? null);
      update();
      source.addEventListener("levelchange", update);
    };

    load();
    return () => {
      if (source && update) source.removeEventListener("levelchange", update);
    };
  }, []);

  const level = battery === null ? 1 : battery;

  return (
    <header className="ios-status-bar">
      <button className="ios-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <span className="ios-brand-mark">BS</span>
        <span>
          <b>BlerionOS</b>
          <small>Personal developer system</small>
        </span>
      </button>
      <div className="ios-workspace">
        <Grid2X2 size={14} /> <span className="ios-active-app">{activeAppName}</span> <span>/</span> Main
      </div>
      <div className="ios-status-right">
        <div className="ios-status-left" aria-label="Decorative connectivity indicators">
          <Wifi size={25} strokeWidth={2.4} aria-hidden="true" />
          <Bluetooth size={17} strokeWidth={2.4} aria-hidden="true" />
          <span className="ios-percent">{battery === null ? "—" : `${Math.round(level * 100)}%`}</span>
          <span className="ios-battery" style={{ "--battery-level": level } as React.CSSProperties}>
            <i />
          </span>
        </div>
        <time>
          {date} &nbsp; {clock}
        </time>
      </div>
    </header>
  );
}
