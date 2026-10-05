export function formatPrishtinaTime(date: Date, locale = "en-GB") {
  return new Intl.DateTimeFormat(locale, {
    timeZone: "Europe/Belgrade",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}
