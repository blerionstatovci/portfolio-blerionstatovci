import { useClock } from "../hooks/useClock";
import { Globe2 } from "lucide-react";
import { formatPrishtinaTime } from "../utils/time";

export function CityTimeWidget() {
  const cityTime = useClock(1_000);
  const cityClock = formatPrishtinaTime(cityTime);

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
