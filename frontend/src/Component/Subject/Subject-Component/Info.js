import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../../Assets/style/Subject/Subject-Component/Info.css";
import { CustomToolbar } from "../../Function-Component/CustomToolbar";
const localizer = momentLocalizer(moment);
const events = [
  {
    title: "Math Meeting",
    start: new Date(2023, 3, 20, 10, 0), // Year, Month (0-based), Day, Hours, Minutes
    end: new Date(2023, 3, 20, 12, 0),
    allDay: false,
  },
  // ... more events
];

export default function Info() {
  return (
    <div className="subject-container">
      <div className="row">
        <div className="col-lg-4 d-flex justify-content-center">
          <div className="today-container col-11 d-flex flex-column">
            <h2 className="mb-3">Today</h2>
            <div className="quiz-container">
              <h5>Quiz</h5>
              {/*map list of the quiz */}
              <li>Algebra</li>
              <li>Geometry</li>
            </div>
          </div>
          <div className="vertical-line-subject text-end" />
        </div>
        <div className="col-lg-8">
          <BigCalendar
            localizer={localizer}
            components={{
              toolbar: CustomToolbar,
            }}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </div>
    </div>
  );
}
