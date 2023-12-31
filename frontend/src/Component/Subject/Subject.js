import { useState } from "react";
import "../../Assets/style/Subject/Subject.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faChartColumn,
  faCalendar,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import CalendarSubject from "./Subject-Component/CalendarSubject";
import { useMediaQuery } from "react-responsive";
import Info from "./Subject-Component/Info";
import AllQuiz from "./Subject-Component/AllQuiz";
import Document from "./Subject-Component/Document";

const events = [
  {
    title: "Math Meeting",
    start: new Date(2023, 3, 20, 10, 0), // Year, Month (0-based), Day, Hours, Minutes
    end: new Date(2023, 3, 20, 12, 0),
    allDay: false,
  },
  // ... more events
];

export default function Subject() {
  const [tab, setTab] = useState("subject");
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1065px)" });
  // fetch item by Id from backend
  return (
    <div className="subject-page-container">
      <div className="tab">
        <button
          className={tab === "subject" ? "tab-button-click" : "tab-button"}
          onClick={() => {
            setTab("subject");
          }}
        >
          <FontAwesomeIcon icon={faBook} className="icon"></FontAwesomeIcon>
          Subject
        </button>
        <button
          className={tab === "statistics" ? "tab-button-click" : "tab-button"}
          onClick={() => {
            setTab("statistics");
          }}
        >
          <FontAwesomeIcon
            icon={faChartColumn}
            className="icon"
          ></FontAwesomeIcon>
          Quiz
        </button>
        <button
          className={tab === "documents" ? "tab-button-click" : "tab-button"}
          onClick={() => {
            setTab("documents");
          }}
        >
          <FontAwesomeIcon
            icon={faNewspaper}
            className="icon"
          ></FontAwesomeIcon>
          Document
        </button>
        {isSmallScreen && (
          <button
            className={tab === "calendar" ? "tab-button-click" : "tab-button"}
            onClick={() => {
              setTab("calendar");
            }}
          >
            <FontAwesomeIcon
              icon={faCalendar}
              className="icon"
            ></FontAwesomeIcon>
            Schedule
          </button>
        )}
      </div>
      <div>
        {tab === "subject" && <Info events={events} />}
        {tab === "statistics" && <AllQuiz />}
        {tab === "documents" && <Document />}
        {isSmallScreen && tab === "calendar" && (
          <CalendarSubject events={events} />
        )}
      </div>
    </div>
  );
}
