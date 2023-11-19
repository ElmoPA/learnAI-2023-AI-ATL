import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React from "react";
import { useMediaQuery } from "react-responsive";
import "../../../Assets/style/Subject/Subject-Component/Info.css";
import { CustomToolbar } from "../../Function-Component/CustomToolbar";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const localizer = momentLocalizer(moment);

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" component="div" color="textSecondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const upcoming_quiz = { name: "Algebra", time: "Tomorrow", progress: 80 };

export default function Info() {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1065px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1064px)" });
  const [info, setInfo] = useState(null);
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  let location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const subj = searchParams.get("subj");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3030/dashboard/subject?userId=${userId}&subj=${subj}`
        );
        const json = await response.json(); // Add 'await' here

        if (response.ok) {
          setInfo(json);
          const transformEvents = (events) => {
            return events.map((event) => ({
              ...event,
              start: new Date(event.start),
              end: new Date(event.end),
            }));
          };

          const transformedCalendarEvents = transformEvents(json.Calendar);
          setEvent(transformedCalendarEvents);
        } else {
          setError(json.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error);
      }
    };
    fetchData();
  }, [userId, subj]);
  return (
    <div className="subject-container">
      <div className="row">
        {isLargeScreen && info && (
          <div className="col-4 d-flex justify-content-center">
            <div className="today-container col-11 d-flex flex-column">
              <div>
                <div className="quiz-container mb-5">
                  <h4 className="mb-3">Upcoming Quiz</h4>
                  <a
                    className="recently-subject-link"
                    href={`/quiz?userId=${userId}&subj=${subj}`}
                  >
                    {" "}
                    {/*the link oer her*/}
                    <div className="card d-flex flex-column p-4 rounded-4">
                      <div>
                        <h4>{info.Quiz[0]}</h4>
                      </div>
                      <div>
                        <h6 className="mb-4">Time : {upcoming_quiz.time}</h6>
                      </div>
                      <div className="d-flex justify-content-center">
                        <CircularProgressWithLabel
                          value={upcoming_quiz.progress}
                          size={150}
                          thickness={10}
                        />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="flashcard-container">
                <h4 className="mb-3">Flash Card</h4>
                <div className="flashcard-set-container">
                  <a
                    href={`/flashcard?userId=${userId}&subj=${subj}`} // card.id after flashcard
                    className=" each-flashcard"
                  >
                    <h5>{info.Flashcards[0]}</h5>
                  </a>
                </div>
              </div>
            </div>
            <div className="vertical-line-subject text-end" />
          </div>
        )}
        {isSmallScreen && (
          <div className="col-12 d-flex justify-content-center">
            <div className="today-container col-11 d-flex flex-column">
              <div className="quiz-container mb-5">
                <h4>Upcoming Quiz</h4>
                <div>
                  <h4>{info.Quiz[0]}</h4>
                </div>
                <div>
                  <h6 className="mb-4">Time : {upcoming_quiz.time}</h6>
                </div>
                <div className="d-flex justify-content-center">
                  <CircularProgressWithLabel
                    value={upcoming_quiz.progress}
                    size={150}
                    thickness={10}
                  />
                </div>
              </div>
              <div className="flashcard-container">
                <h4 className="mb-3">Flash Card</h4>
                <div className="flashcard-set-container">
                  <div className="each-flashcard m-2">
                    <h5>{info.Flashcards[0]}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLargeScreen && event && (
          <div className="col-lg-8">
            <BigCalendar
              localizer={localizer}
              components={{
                toolbar: CustomToolbar,
              }}
              events={event}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}