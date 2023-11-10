import { Calendar } from "react-calendar";

import { useState } from "react";

import "../../Assets/style/Dashboard/Calendar.css";

export default function _Calendar() {
  const [value, onChange] = useState(new Date());
  return (
    <div className="calendar-tab-container">
      <div className="row">
        <div className="left-component  py-3 col-3 d-flex">
          <div className="col-11 ">
            <Calendar onChange={onChange} value={value} className="calendar" />
          </div>
          <div className="vertical-line" />
        </div>
        <div></div>
      </div>
    </div>
  );
}
