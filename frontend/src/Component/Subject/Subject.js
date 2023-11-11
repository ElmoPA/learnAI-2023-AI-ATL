import { useState } from "react";
import "../../Assets/style/Subject/Subject.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faChartColumn } from "@fortawesome/free-solid-svg-icons";
import Info from "./Subject-Component/Info";
import Statistics from "./Subject-Component/Statistics";
export default function Subject() {
  const [tab, setTab] = useState("subject");

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
          Statistics
        </button>
      </div>
      {tab === "subject" && <Info />}
      {tab === "statistics" && <Statistics />}
    </div>
  );
}
