import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function CalendarWidget({ time }: { time: Date }) {
  const [cursor, setCursor] = useState(() => new Date(time.getFullYear(), time.getMonth(), 1));

  const calendar = useMemo(() => {
    const year = cursor.getFullYear();
    const monthIndex = cursor.getMonth();
    const leadingBlanks = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    return [
      ...Array.from({ length: leadingBlanks }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];
  }, [cursor]);

  const isCurrentMonth = cursor.getFullYear() === time.getFullYear() && cursor.getMonth() === time.getMonth();
  const monthLabel = cursor.toLocaleDateString([], { month: "long", year: "numeric" });

  const moveMonth = (offset: number) => {
    setCursor((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  };

  return (
    <aside className="calendar-widget" aria-label="Calendar">
      <div className="calendar-widget-top">
        <div>
          <span>CALENDAR</span>
          <b>{monthLabel}</b>
        </div>
        <div className="calendar-nav">
          <button type="button" onClick={() => moveMonth(-1)} aria-label="Previous month">
            <ChevronLeft size={13} />
          </button>
          <button type="button" onClick={() => moveMonth(1)} aria-label="Next month">
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
      <div className="calendar-week" aria-hidden="true">
        {weekdays.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>
      <div className="calendar-days">
        {calendar.map((day, index) => (
          <span
            className={day !== null && isCurrentMonth && day === time.getDate() ? "today" : ""}
            key={day === null ? `blank-${index}` : day}
            aria-current={day !== null && isCurrentMonth && day === time.getDate() ? "date" : undefined}
          >
            {day}
          </span>
        ))}
      </div>
    </aside>
  );
}
