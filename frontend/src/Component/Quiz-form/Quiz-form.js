import "../../Assets/style/Quiz-form/Quiz.css";

import { useEffect, useState } from "react";

// json structure

// export const quiz = {
//   title: "Math quiz",
//   questions: [
//     {
//       question: "Question 1",
//       type: "choice",
//       answers: ["option 1", "option 2", "option 3", "option 4"],
//     },
//     {
//       question: "Question 2",
//       type: "choice",
//       answers: ["option 1", "option 2", "option 3", "option 4"],
//     },
//     {
//       question: "Question 3",
//       type: "text",
//     },
//   ],
// };

export default function Quiz() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quiz, setQuiz] = useState([]);

  // change the answer
  const handleOptionChange = (questionIndex, answer) => {
    setSelectedOptions([
      ...selectedOptions,
      { id: questionIndex, answer: answer },
    ]);
  };
  useEffect(() => {
    // fetch quiz
    const getQuiz = async () => {
      const response = await fetch("/quiz/display?userId=${}&subj=${}");
      const json = await response.json();
      if (response.ok) {
        setQuiz(json.question);
      }
      if (!response.ok) {
        console.log(json.error);
      }
    };
    getQuiz();
  });

  // submit all the answers
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Selected option:", selectedOptions);
    const response = await fetch("quiz/submitQuiz", {
      method: "POST",
      body: JSON.stringify({ answer: selectedOptions }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
    }
  };
  return (
    <div className="quiz-form-container">
      <div className="title-part-container">
        <h1>
          {/**put the quiz title over here */}
          {/* {quiz.title} */}
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="question-section">
          {/**map all the questions over here */}
          {quiz.map((q, qIndex) => {
            if (q.type === "multiple_choice") {
              return (
                <div className="each-question mb-3" key={qIndex}>
                  <h4 className="question-text mb-3">{q.question}</h4>
                  {q.options.map((answer, aIndex) => (
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
            if (q.type === "open_ended") {
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
            if (q.type === "true_false") {
              return (
                <div className="each-question mb-4" key={qIndex}>
                  <h4 className="question-text mb-3">{q.question}</h4>
                  <label className="radio-label">
                    <input
                      type="radio"
                      value={true}
                      name={`question-${qIndex}`}
                      checked={selectedOptions[qIndex] === true}
                      onChange={() => handleOptionChange(qIndex, true)}
                      className="option"
                    />
                    True
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      value={false}
                      name={`question-${qIndex}`}
                      checked={selectedOptions[qIndex] === false}
                      onChange={() => handleOptionChange(qIndex, false)}
                      className="option"
                    />
                    False
                  </label>
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
