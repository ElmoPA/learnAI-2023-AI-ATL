import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faDashboard } from "@fortawesome/free-solid-svg-icons";
import "../Assets/style/Dashboard/Dashboard.css";
import { useState } from "react";
import Dashboard from "./Function-Component/Dashboard";
import Calendar from "./Function-Component/Calendar";

/*integrate data from backend */
const list = [
  {
    subject: "Math",
    chart: [
      ["Task", "Math"],
      ["homework", 10],
      ["quiz", 20],
      ["test", 70],
    ],
    quiz: "Math quiz",
  },
  {
    subject: "Science",
    chart: [
      ["Task", "Science"],
      ["homework", 10],
      ["quiz", 20],
      ["test", 70],
    ],
    quiz: "Science quiz",
  },
  {
    subject: "History",
    chart: [
      ["Task", "History"],
      ["homework", 10],
      ["quiz", 20],
      ["test", 70],
    ],
    quiz: "History quiz",
  },
  {
    subject: "Computer Science",
    chart: [
      ["Task", "Computer Science"],
      ["homework", 10],
      ["quiz", 20],
      ["test", 70],
    ],
    quiz: "Math quiz",
  },
  {
    subject: "English",
    chart: [
      ["Task", "Math"],
      ["homework", 10],
      ["quiz", 20],
      ["test", 70],
    ],
    quiz: "Math quiz",
  },
  {
    subject: "Social Studies",
    chart: [
      ["Task", "Math"],
      ["homework", 10],
      ["quiz", 20],
      ["test", 70],
    ],
    quiz: "Math quiz",
  },
];

const options = {
  pieHole: 0.4,
  is3D: false,
  pieSliceText: "none",
  legend: {
    position: "bottom",
    alignment: "center",
  },
  colors: ["fffd82", "#ff9b71", "#e84855", "#2d3047"],
};

export default function Function() {
  const [tab, setTab] = useState("dashboard");
  // integrate the list of subject from backend

  return (
    <div className="dashboard-container">
      <div className="top-part d-flex justify-content-start  mb-4">
        <button
          className={tab === "dashboard" ? "tab-button-click" : "tab-button"}
          onClick={() => {
            setTab("dashboard");
          }}
        >
          <FontAwesomeIcon
            icon={faDashboard}
            className="calendar-icon"
          ></FontAwesomeIcon>
          Dashboard
        </button>

        <button
          onClick={() => {
            setTab("calendar");
          }}
          className={tab === "calendar" ? "tab-button-click" : "tab-button"}
        >
          <FontAwesomeIcon
            icon={faCalendar}
            className="calendar-icon"
          ></FontAwesomeIcon>
          <span>Schedule</span>
        </button>
      </div>
      {tab === "dashboard" && <Dashboard list={list} options={options} />}
      {tab === "calendar" && <Calendar />}
    </div>
  );
}
