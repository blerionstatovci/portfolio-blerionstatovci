import { useEffect, useState } from "react";

type VersionedValue<T> = {
  version: number;
  value: T;
};

export function useLocalStorage<T>(key: string, initialValue: T, version = 1) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored === null) return initialValue;
      const parsed = JSON.parse(stored) as VersionedValue<T>;
      return parsed.version === version ? parsed.value : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify({ version, value } satisfies VersionedValue<T>));
    } catch {
      // Storage can be unavailable in private or restricted browsing contexts.
    }
  }, [key, value, version]);

  return [value, setValue] as const;
}
