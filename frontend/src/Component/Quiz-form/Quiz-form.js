import "../../Assets/style/Quiz-form/Quiz.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Quiz() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quiz, setQuiz] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [isSummited, setIsSummited] = useState(false);
  let location = useLocation();
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
      let searchParams = new URLSearchParams(location.search);
      let userId = searchParams.get("userId");
      let subj = searchParams.get("subj");
      const response = await fetch(
        `http://localhost:3030/quiz/display?userId=${userId}&subj=${subj}`
      );
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setQuiz(json.questions);
      }
      if (!response.ok) {
        console.log(json.error);
      }
    };
    getQuiz();
  }, []);

  // submit all the answers
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Selected option:", selectedOptions);
    const response = await fetch("http://localhost:3030/quiz/submitQuiz", {
      method: "POST",
      body: JSON.stringify({ answer: selectedOptions }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (response.ok) {
      setAnswer(json.questions);
      setIsSummited(true);
    }
  };
  return (
    <div className="quiz-form-container">
      {quiz && (
        <div>
          {/* <div className="title-part-container">
            <h1>
              
            </h1>
          </div> */}
          <form onSubmit={handleSubmit}>
            <div className="question-section">
              {quiz.map((q, qIndex) => {
                let borderColor = "";
                let each_answer = "";
                if (isSummited && answer && answer[qIndex]) {
                  borderColor = answer[qIndex].correct
                    ? "border-right"
                    : "border-wrong";
                  if (answer[qIndex].correct) {
                    each_answer = "You got it!";
                  } else {
                    each_answer = `The answer is ${answer[qIndex].correct_answer}`;
                  }
                }
                if (q.type === "multiple_choice") {
                  return (
                    <div
                      className={`each-question mb-3 ${borderColor}`}
                      key={qIndex}
                    >
                      <h4 className="question-text mb-3">{q.question}</h4>
                      {q.options.map((answer, aIndex) => (
                        <div key={aIndex}>
                          <label className="radio-label">
                            <input
                              type="radio"
                              value={answer}
                              name={`question-${qIndex}`}
                              checked={selectedOptions[qIndex] === answer}
                              onChange={() =>
                                handleOptionChange(qIndex, answer)
                              }
                              className="option"
                            />
                            {answer}
                          </label>
                          <br />
                        </div>
                      ))}
                      <div>{each_answer}</div>
                    </div>
                  );
                }
                if (q.type === "open_ended") {
                  let borderColor = "";
                  let each_answer = "";
                  if (isSummited && answer && answer[qIndex]) {
                    borderColor = answer[qIndex].correct
                      ? "border-right"
                      : "border-wrong";
                    if (answer[qIndex].correct) {
                      each_answer = "You got it!";
                    } else {
                      each_answer = `The answer is ${answer[qIndex].correct_answer}`;
                    }
                  }

                  return (
                    <div
                      className={`each-question mb-4 ${borderColor}`}
                      key={qIndex}
                    >
                      <h4 className="question-text mb-3">{q.question}</h4>

                      <textarea
                        class="form-control form-scroll"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        onChange={(e) =>
                          handleOptionChange(qIndex, e.target.value)
                        }
                      ></textarea>
                      <div>{each_answer}</div>
                    </div>
                  );
                }
                if (q.type === "true_false") {
                  let borderColor = "";
                  let each_answer = "";
                  if (isSummited && answer && answer[qIndex]) {
                    borderColor = answer[qIndex].correct
                      ? "border-right"
                      : "border-wrong";
                    if (answer[qIndex].correct) {
                      each_answer = "You got it!";
                    } else {
                      each_answer = `The answer is ${answer[qIndex].correct_answer}`;
                    }
                  }
                  return (
                    <div
                      className={`each-question mb-4 ${borderColor}`}
                      key={qIndex}
                    >
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
                      <div>{each_answer}</div>
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
      )}
    </div>
  );
}