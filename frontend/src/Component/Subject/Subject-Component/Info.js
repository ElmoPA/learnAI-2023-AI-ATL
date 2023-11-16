import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React from "react";
import { useMediaQuery } from "react-responsive";
import "../../../Assets/style/Subject/Subject-Component/Info.css";
import { CustomToolbar } from "../../Function-Component/CustomToolbar";
const localizer = momentLocalizer(moment);

export default function Info({ events }) {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1065px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1064px)" });
  return (
    <div className="subject-container">
      <div className="row">
        {isLargeScreen && (
          <div className="col-4 d-flex justify-content-center">
            <div className="today-container col-11 d-flex flex-column">
              <h2 className="mb-5">Today</h2>
              <div>
                <div className="quiz-container mb-5">
                  <h4>Quiz</h4>
                  <div className="quiz-set-container">
                    {/*map list of the quiz */}
                    <div className="each-quiz m-2">
                      <a className="link" href="/quiz/238">
                        Algebra
                      </a>
                    </div>
                    <div className="each-quiz m-2">
                      <a className="link" href="/quiz/2934">
                        Geometry
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flashcard-container">
                <h4 className="mb-3">Flash Card</h4>
                <div className="flashcard-set-container">
                  <div className=" m-2  each-flashcard ">
                    <a href="/flashcard/math" className="link">
                      Math
                    </a>
                  </div>
                  <div className=" m-2  each-flashcard ">
                    <a href="/flashcard/math" className="link">
                      Computer Science
                    </a>
                  </div>
                  <div className=" each-flashcard m-2">
                    <a href="/flashcard/math" className="link">
                      Social Studies
                    </a>
                  </div>
                  <div className=" m-2  each-flashcard ">
                    <a href="/flashcard/math" className="link">
                      Physics
                    </a>
                  </div>
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
                  <div className="each-flashcard m-2">
                    <h5>Computer Science</h5>
                  </div>
                  <div className="each-flashcard m-2">
                    <h5>Social Studies</h5>
                  </div>
                  <div className="each-flashcard m-2">
                    <h5>Physics</h5>
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
