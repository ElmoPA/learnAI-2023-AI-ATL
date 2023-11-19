import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { CustomToolbar } from "../../Function-Component/CustomToolbar";
const localizer = momentLocalizer(moment);

export default function CalendarSubject({ events }) {
  return (
    <div>
      <div className="mt-3">
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
  );
}
