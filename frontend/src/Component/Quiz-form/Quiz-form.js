import "../../Assets/style/Quiz-form/Quiz.css";

import { useState } from "react";

// json structure

export const quiz = {
  title: "Math quiz",
  questions: [
    {
      question: "Question 1",
      type: "choice",
      answers: ["option 1", "option 2", "option 3", "option 4"],
    },
    {
      question: "Question 2",
      type: "choice",
      answers: ["option 1", "option 2", "option 3", "option 4"],
    },
    {
      question: "Question 3",
      type: "text",
    },
  ],
};

export default function Quiz() {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (questionIndex, answer) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: answer,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected option:", selectedOptions);
    // Handle the submission (e.g., send to server)
  };
  return (
    <div className="quiz-form-container">
      <div className="title-part-container">
        <h1>
          {/**put the quiz title over here */}
          {quiz.title}
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="question-section">
          {/**map all the questions over here */}
          {quiz.questions.map((q, qIndex) => {
            if (q.type === "choice") {
              return (
                <div className="each-question mb-3" key={qIndex}>
                  <h4 className="question-text mb-3">{q.question}</h4>
                  {q.answers.map((answer, aIndex) => (
                    <div key={aIndex}>
                      <label className="radio-label">
                        <input
                          type="radio"
                          value={answer}
                          name={`question-${qIndex}`}
                          checked={selectedOptions[qIndex] === answer}
                          onChange={() => handleOptionChange(qIndex, answer)}
                          className="option"
                        />
                        {answer}
                      </label>
                      <br />
                    </div>
                  ))}
                </div>
              );
            }
            if (q.type === "text") {
              return (
                <div className="each-question mb-4" key={qIndex}>
                  <h4 className="question-text mb-3">{q.question}</h4>

                  <textarea
                    class="form-control form-scroll"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    onChange={(e) => handleOptionChange(qIndex, e.target.value)}
                  ></textarea>
                </div>
              );
            }
          })}
        </div>
        <div className="submit-answer-section">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
