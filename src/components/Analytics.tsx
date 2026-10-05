import { useEffect } from "react";

export function Analytics() {
  useEffect(() => {
    const domain = import.meta.env.VITE_ANALYTICS_DOMAIN as string | undefined;
    if (!domain || document.querySelector("script[data-blerion-analytics]")) return;
    const script = document.createElement("script");
    script.defer = true;
    script.src = `https://${domain}/js/script.js`;
    script.dataset.domain = window.location.hostname;
    script.dataset.blerionAnalytics = "true";
    document.head.appendChild(script);
  }, []);

  return null;
}
