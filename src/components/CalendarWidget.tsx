export function CalendarWidget({ time }: { time: Date }) {
  const day = time.getDate();
  const month = time.toLocaleDateString([], { month: "long" });
  const year = time.getFullYear();
  const days = Array.from(
    { length: new Date(year, time.getMonth() + 1, 0).getDate() },
    (_, index) => index + 1,
  );

  return (
    <aside className="calendar-widget">
      <div className="calendar-widget-top">
        <span>CALENDAR</span>
        <b>
          {month} {year}
        </b>
      </div>
      <div className="calendar-week">
        <span>MON</span>
        <span>TUE</span>
        <span>WED</span>
        <span>THU</span>
        <span>FRI</span>
        <span>SAT</span>
        <span>SUN</span>
      </div>
      <div className="calendar-days">
        {days.map((number) => (
          <span className={number === day ? "today" : ""} key={number}>
            {number}
          </span>
        ))}
      </div>
    </aside>
  );
}
