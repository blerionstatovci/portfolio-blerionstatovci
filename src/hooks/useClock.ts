import { useEffect, useState } from "react";

export function useClock(interval = 30_000) {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), interval);
    return () => window.clearInterval(timer);
  }, [interval]);

  return time;
}
