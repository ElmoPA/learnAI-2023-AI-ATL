export const CustomToolbar = ({ date, onNavigate, onView, view, label }) => {
  return (
    <div className="rbc-toolbar calendar-theme">
      <span className="rbc-btn-group">
        <button type="button" onClick={() => onNavigate("TODAY")}>
          Today
        </button>
        <button type="button" onClick={() => onNavigate("PREV")}>
          Back
        </button>
        <button type="button" onClick={() => onNavigate("NEXT")}>
          Next
        </button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">
        <button
          type="button"
          onClick={() => onView("month")}
          className={view === "month" ? "active" : ""}
        >
          Month
        </button>
        <button
          type="button"
          onClick={() => onView("week")}
          className={view === "week" ? "active" : ""}
        >
          Week
        </button>
        <button
          type="button"
          onClick={() => onView("day")}
          className={view === "day" ? "active" : ""}
        >
          Day
        </button>
        <button
          type="button"
          onClick={() => onView("agenda")}
          className={view === "agenda" ? "active" : ""}
        >
          Agenda
        </button>
      </span>
    </div>
  );
};
