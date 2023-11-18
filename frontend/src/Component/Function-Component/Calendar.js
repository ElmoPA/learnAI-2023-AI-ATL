import { Calendar } from "react-calendar";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "../../Assets/style/Dashboard/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { CustomToolbar } from "./CustomToolbar";
const localizer = momentLocalizer(moment);

const calendarEvents = [
  {
    title: "Consequences of the War 30 minutes",
    start: "2023-11-18",
    end: "2023-11-18",
    allDay: true,
  },
  {
    title: "Major Events - Battle of Gettysburg 30 minutes",
    start: "2023-11-18",
    end: "2023-11-18",
    allDay: true,
  },
  {
    title: "Causes of the War 30 minutes",
    start: "2023-11-18",
    end: "2023-11-18",
    allDay: true,
  },
  {
    title: "Major Figures - Abraham Lincoln 30 minutes",
    start: "2023-11-18",
    end: "2023-11-18",
    allDay: true,
  },
  {
    title: "Consequences of the War 30 minutes",
    start: "2023-11-19",
    end: "2023-11-19",
    allDay: true,
  },
  {
    title: "Major Events - Battle of Gettysburg 30 minutes",
    start: "2023-11-19",
    end: "2023-11-19",
    allDay: true,
  },
  {
    title: "Causes of the War 30 minutes",
    start: "2023-11-19",
    end: "2023-11-19",
    allDay: true,
  },
  {
    title: "Major Figures - Abraham Lincoln 30 minutes",
    start: "2023-11-19",
    end: "2023-11-19",
    allDay: true,
  },
  {
    title: "Consequences of the War 30 minutes",
    start: "2023-11-20",
    end: "2023-11-20",
    allDay: true,
  },
  {
    title: "Major Events - Battle of Gettysburg 30 minutes",
    start: "2023-11-20",
    end: "2023-11-20",
    allDay: true,
  },
  {
    title: "Causes of the War 30 minutes",
    start: "2023-11-20",
    end: "2023-11-20",
    allDay: true,
  },
  {
    title: "Major Figures - Abraham Lincoln 30 minutes",
    start: "2023-11-20",
    end: "2023-11-20",
    allDay: true,
  },
  {
    title: "Consequences of the War 30 minutes",
    start: "2023-11-21",
    end: "2023-11-21",
    allDay: true,
  },
  {
    title: "Major Events - Battle of Gettysburg 30 minutes",
    start: "2023-11-21",
    end: "2023-11-21",
    allDay: true,
  },
  {
    title: "Causes of the War 30 minutes",
    start: "2023-11-21",
    end: "2023-11-21",
    allDay: true,
  },
  {
    title: "Review - Major Figures - Abraham Lincoln 30 minutes",
    start: "2023-11-21",
    end: "2023-11-21",
    allDay: true,
  },
  {
    title: "Flashcards - Major Figures - Abraham Lincoln 15 minutes",
    start: "2023-11-21",
    end: "2023-11-21",
    allDay: true,
  },
  {
    title: "Quiz - Major Figures - Abraham Lincoln 15 minutes",
    start: "2023-11-21",
    end: "2023-11-21",
    allDay: true,
  },
  {
    title: "Causes of the War 30 minutes",
    start: "2023-11-22",
    end: "2023-11-22",
    allDay: true,
  },
  {
    title: "Review - Consequences of the War 30 minutes",
    start: "2023-11-22",
    end: "2023-11-22",
    allDay: true,
  },
  {
    title: "Flashcards - Consequences of the War 15 minutes",
    start: "2023-11-22",
    end: "2023-11-22",
    allDay: true,
  },
  {
    title: "Quiz - Consequences of the War 15 minutes",
    start: "2023-11-22",
    end: "2023-11-22",
    allDay: true,
  },
  {
    title: "Review - Major Events - Battle of Gettysburg 30 minutes",
    start: "2023-11-22",
    end: "2023-11-22",
    allDay: true,
  },
  {
    title: "Flashcards - Major Events - Battle of Gettysburg 15 minutes",
    start: "2023-11-22",
    end: "2023-11-22",
    allDay: true,
  },
  {
    title: "Quiz - Major Events - Battle of Gettysburg 15 minutes",
    start: "2023-11-22",
    end: "2023-11-22",
    allDay: true,
  },
  {
    title: "Causes of the War 30 minutes",
    start: "2023-11-23",
    end: "2023-11-23",
    allDay: true,
  },
  {
    title: "Review - Major Figures - Abraham Lincoln 30 minutes",
    start: "2023-11-23",
    end: "2023-11-23",
    allDay: true,
  },
  {
    title: "Flashcards - Major Figures - Abraham Lincoln 15 minutes",
    start: "2023-11-23",
    end: "2023-11-23",
    allDay: true,
  },
  {
    title: "Quiz - Major Figures - Abraham Lincoln 15 minutes",
    start: "2023-11-23",
    end: "2023-11-23",
    allDay: true,
  },
  {
    title: "Review - Consequences of the War 30 minutes",
    start: "2023-11-24",
    end: "2023-11-24",
    allDay: true,
  },
  {
    title: "Flashcards - Consequences of the War 15 minutes",
    start: "2023-11-24",
    end: "2023-11-24",
    allDay: true,
  },
  {
    title: "Quiz - Consequences of the War 15 minutes",
    start: "2023-11-24",
    end: "2023-11-24",
    allDay: true,
  },
  {
    title: "Review - Major Events - Battle of Gettysburg 30 minutes",
    start: "2023-11-24",
    end: "2023-11-24",
    allDay: true,
  },
  {
    title: "Flashcards - Major Events - Battle of Gettysburg 15 minutes",
    start: "2023-11-24",
    end: "2023-11-24",
    allDay: true,
  },
  {
    title: "Quiz - Major Events - Battle of Gettysburg 15 minutes",
    start: "2023-11-24",
    end: "2023-11-24",
    allDay: true,
  },
  {
    title: "Review - Causes of the War 30 minutes",
    start: "2023-11-24",
    end: "2023-11-24",
    allDay: true,
  },
  {
    title: "Flashcards - Causes of the War 15 minutes",
    start: "2023-11-24",
    end: "2023-11-24",
    allDay: true,
  },
  {
    title: "Quiz - Causes of the War 15 minutes",
    start: "2023-11-24",
    end: "2023-11-24",
    allDay: true,
  },
  {
    title: "Review - Causes of the War 30 minutes",
    start: "2023-11-26",
    end: "2023-11-26",
    allDay: true,
  },
  {
    title: "Flashcards - Causes of the War 15 minutes",
    start: "2023-11-26",
    end: "2023-11-26",
    allDay: true,
  },
  {
    title: "Quiz - Causes of the War 15 minutes",
    start: "2023-11-26",
    end: "2023-11-26",
    allDay: true,
  },
  {
    title: "Review - Major Figures - Abraham Lincoln 30 minutes",
    start: "2023-11-27",
    end: "2023-11-27",
    allDay: true,
  },
  {
    title: "Flashcards - Major Figures - Abraham Lincoln 15 minutes",
    start: "2023-11-27",
    end: "2023-11-27",
    allDay: true,
  },
  {
    title: "Quiz - Major Figures - Abraham Lincoln 15 minutes",
    start: "2023-11-27",
    end: "2023-11-27",
    allDay: true,
  },
  {
    title: "Review - Consequences of the War 30 minutes",
    start: "2023-11-28",
    end: "2023-11-28",
    allDay: true,
  },
  {
    title: "Flashcards - Consequences of the War 15 minutes",
    start: "2023-11-28",
    end: "2023-11-28",
    allDay: true,
  },
  {
    title: "Quiz - Consequences of the War 15 minutes",
    start: "2023-11-28",
    end: "2023-11-28",
    allDay: true,
  },
  {
    title: "Review - Major Events - Battle of Gettysburg 30 minutes",
    start: "2023-11-28",
    end: "2023-11-28",
    allDay: true,
  },
  {
    title: "Flashcards - Major Events - Battle of Gettysburg 15 minutes",
    start: "2023-11-28",
    end: "2023-11-28",
    allDay: true,
  },
  {
    title: "Quiz - Major Events - Battle of Gettysburg 15 minutes",
    start: "2023-11-28",
    end: "2023-11-28",
    allDay: true,
  },
  {
    title: "Review - Causes of the War 30 minutes",
    start: "2023-11-30",
    end: "2023-11-30",
    allDay: true,
  },
  {
    title: "Flashcards - Causes of the War 15 minutes",
    start: "2023-11-30",
    end: "2023-11-30",
    allDay: true,
  },
  {
    title: "Quiz - Causes of the War 15 minutes",
    start: "2023-11-30",
    end: "2023-11-30",
    allDay: true,
  },
];

const transformEvents = (events) => {
  return events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
};

const CustomDayView = ({ date, events }) => {
  // Filter events for the selected date
  const dayStart = moment(date).startOf("day");
  const dayEnd = moment(date).endOf("day");

  const dayEvents = events.filter((event) => {
    const start = moment(event.start);
    const end = moment(event.end);
    return start.isSameOrAfter(dayStart) && end.isSameOrBefore(dayEnd);
  });

  return (
    <div>
      {dayEvents.length > 0 ? (
        dayEvents.map((event, idx) => (
          <div key={idx} className="custom-day-event">
            <strong>{event.title}</strong>
            {/* Add more details here if needed */}
          </div>
        ))
      ) : (
        <div>No events</div>
      )}
    </div>
  );
};

const transformedCalendarEvents = transformEvents(calendarEvents);

export default function _Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1065px)" });
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  const handleNavigate = (newDate) => {
    setSelectedDate(newDate);
  };
  return (
    <div className="calendar-tab-container">
      {!isSmallScreen && (
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
              events={transformedCalendarEvents}
              startAccessor="start"
              endAccessor="end"
              components={{
                toolbar: CustomToolbar,
              }}
              style={{ height: 500 }}
              date={selectedDate}
              defaultDate={selectedDate}
              onNavigate={handleNavigate}
              views={{
                month: true,
                week: true,
                day: CustomDayView,
                agenda: true,
              }}
            />
          </div>
        </div>
      )}
      {isSmallScreen && (
        <div className="row">
          <div className="rigth component col-12">
            <BigCalendar
              localizer={localizer}
              events={calendarEvents}
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
      )}
    </div>
  );
}
