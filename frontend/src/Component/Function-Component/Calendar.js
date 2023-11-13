import { Calendar } from "react-calendar";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import { useState } from "react";
import "../../Assets/style/Dashboard/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { CustomToolbar } from "./CustomToolbar";
const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Meeting with Team",
    start: new Date(2023, 11, 14, 10, 0), // Year, Month (0-based), Day, Hours, Minutes
    end: new Date(2023, 3, 20, 12, 0),
    allDay: false,
  },
  {
    title: "Lunch with Client",
    start: new Date(2023, 3, 21, 13, 0),
    end: new Date(2023, 3, 21, 14, 0),
    allDay: false,
  },
  {
    title: "Conference",
    start: new Date(2023, 3, 25),
    end: new Date(2023, 3, 28),
    allDay: true,
  },
  // ... more events
];

export default function _Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  const handleNavigate = (newDate) => {
    setSelectedDate(newDate);
  };
  return (
    <div className="calendar-tab-container">
      <div className="row">
        <div className="left-component  py-3 col-lg-3 d-flex">
          <div className="col-11 ">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="calendar"
            />
          </div>
          <div className="vertical-line" />
        </div>
        <div className="rigth component col-lg-9">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            components={{
              toolbar: CustomToolbar,
            }}
            style={{ height: 500 }}
            date={selectedDate}
            defaultDate={selectedDate}
            onNavigate={handleNavigate}
          />
        </div>
      </div>
    </div>
  );
}
