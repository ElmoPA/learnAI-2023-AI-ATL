import "../../../Assets/style/Subject/Subject-Component/Document.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const quiz_list = [
  { subject: "Math" },
  { subject: "Science" },
  { subject: "Social Studies" },
  { subject: "History" },
];

export default function Document() {
  const syllabusSubmit = () => {};
  const quizSubmit = () => {};
  return (
    <div className="document-page-container">
      <div className="syllabus-container d-flex align-items-center justify-content-between flex-column mt-5">
        <div className="syllabus-title mb-3">
          <h2>Syllabus</h2>
        </div>
        <div className="syllabus-items-container mb-4">
          {/*map the items in here */}
        </div>
        <div className="row">
          <div className="col-11">
            <form
              className="medium-part d-flex flex-column"
              onSubmit={syllabusSubmit}
            >
              <input className="form-control mb-3" type="file" />
              <button className="upload-submit-button col-12">Submit</button>
            </form>
          </div>
          <div className="col-1">
            <button className="trash_button">
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="bottom-part  d-flex align-items-center justify-content-between flex-column mt-5">
          <div className="quiz-title mb-3">
            <h2>Quiz/Exam</h2>
          </div>
          <div className="quiz-items-container mb-4">
            {/*map the items in here */}
          </div>
          <div className="quiz-exam-container">
            {quiz_list.map((item, index) => {
              <div className="each-quiz-container" key={index}>
                {item.subject}
              </div>;
            })}
          </div>
          <div className="row">
            <div className="col-11">
              <form
                className="medium-part d-flex flex-column"
                onSubmit={quizSubmit}
              >
                <input className="form-control mb-3" type="file" />
                <button className="upload-submit-button col-12">Submit</button>
              </form>
            </div>
            <div className="col-1">
              <button className="trash_button">
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
