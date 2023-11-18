import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React from "react";
import { useMediaQuery } from "react-responsive";
import "../../../Assets/style/Subject/Subject-Component/Info.css";
import { CustomToolbar } from "../../Function-Component/CustomToolbar";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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

export default function Info({ events }) {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1065px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1064px)" });
  return (
    <div className="subject-container">
      <div className="row">
        {isLargeScreen && (
          <div className="col-4 d-flex justify-content-center">
            <div className="today-container col-11 d-flex flex-column">
              <div>
                <div className="quiz-container mb-5">
                  <h4 className="mb-3">Upcoming Quiz</h4>
                  <a className="recently-subject-link" href="/quiz/280384308">
                    {" "}
                    {/*the link oer her*/}
                    <div className="card d-flex flex-column p-4 rounded-4">
                      <div>
                        <h4>{upcoming_quiz.name}</h4>
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
                    href="/flashcard/23408203948" // card.id after flashcard
                    className=" each-flashcard"
                  >
                    <h5>Math {/**card topic */}</h5>
                    <p>10 cards</p>
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
              <h2 className="mb-3">Today</h2>
              <div className="quiz-container mb-5">
                <h5>Quiz</h5>
                {/*map list of the quiz */}
                <li>Algebra</li>
                <li>Geometry</li>
              </div>
              <div className="flashcard-container">
                <h4 className="mb-3">Flash Card</h4>
                <div className="flashcard-set-container">
                  <div className="each-flashcard m-2">
                    <h5>Math</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLargeScreen && (
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
        )}
      </div>
    </div>
  );
}
