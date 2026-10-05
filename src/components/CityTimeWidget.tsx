import { useClock } from "../hooks/useClock";
import { Globe2 } from "lucide-react";

export function CityTimeWidget() {
  const cityTime = useClock(1_000);
  const cityClock = new Intl.DateTimeFormat([], {
    timeZone: "Europe/Belgrade",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(cityTime);

  return (
    <aside className="city-time-widget">
      <span className="eyebrow">LOCAL TIME</span>
      <strong>{cityClock}</strong>
      <div>
        <Globe2 size={13} /> Prishtina, Kosovo
      </div>
    </aside>
  );
}
