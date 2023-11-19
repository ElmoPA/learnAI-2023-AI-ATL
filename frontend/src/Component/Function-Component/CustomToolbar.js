import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../../Assets/style/Dashboard/CustomToolBar.css";
export const CustomToolbar = ({ date, onNavigate, onView, view, label }) => {
  const handleViewChange = (event) => {
    onView(event.target.value);
  };
  return (
    <div className="rbc-toolbar calendar-theme">
      <span className="rbc-btn-group">
        <button
          className="today-button"
          type="button"
          onClick={() => onNavigate("TODAY")}
        >
          Today
        </button>
        <button
          className="arrow-button"
          type="button"
          onClick={() => onNavigate("PREV")}
        >
          <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
        </button>
        <button
          className="arrow-button"
          type="button"
          onClick={() => onNavigate("NEXT")}
        >
          <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
        </button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>

      <div className="view-dropdown">
        <button disabled={view} className="view-button">
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </button>
        <div className="view-menu">
          <div onClick={() => onView("month")}>Month</div>
          <div onClick={() => onView("week")}>Week</div>
          <div onClick={() => onView("day")}>Day</div>
          <div onClick={() => onView("agenda")}>Agenda</div>
        </div>
      </div>
    </div>
  );
};
