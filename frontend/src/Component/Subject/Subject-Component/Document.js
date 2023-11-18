import "../../../Assets/style/Subject/Subject-Component/Document.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faRemove } from "@fortawesome/free-solid-svg-icons";

export const quiz_list = [
  { subject: "Algebra" },
  { subject: "Geometry" },
  { subject: "Probability" },
  { subject: "Statistics" },
];

export default function Document() {
  const syllabusSubmit = () => {};
  const quizSubmit = () => {};
  const lectureSubmit = () => {};
  return (
    <div className="document-page-container">
      <div>
        <div className="syllabus-document-container  d-flex align-items-center justify-content-between flex-column mt-5">
          <div className="syllabus-title mb-3 mt-5">
            <h2 className="mb-2">Syllabus</h2>
          </div>
          <div className="document-items-container mb-4 p-3">
            {/*map the items in here */}
          </div>

          <div className="row">
            <div className="col-11">
              <form className="d-flex flex-column" onSubmit={syllabusSubmit}>
                <input className="form-control mb-3" type="file" />
                <button className="upload-submit-button col-12">Upload</button>
              </form>
            </div>
            <div className="col-1">
              <button className="trash_button">
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="quiz-document-container  d-flex align-items-center justify-content-between flex-column mt-5">
          <div className="quiz-title mb-3 mt-5">
            <h2 className="mb-2">Quiz/Exam</h2>
          </div>
          <div className="document-items-container mb-4 p-3">
            {/*map the items in here */}

            {quiz_list.map((quiz, index) => (
              <div
                className="each-quiz-container d-flex justify-content-between"
                key={index}
              >
                <span>{quiz.subject}</span>
                <span>
                  <FontAwesomeIcon icon={faRemove} className="remove-icon" />
                </span>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-11">
              <form className="d-flex flex-column" onSubmit={quizSubmit}>
                <input className="form-control mb-3" type="file" />
                <button className="upload-submit-button col-12">Upload</button>
              </form>
            </div>
            <div className="col-1">
              <button className="trash_button">
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="lecture-document-container  d-flex align-items-center justify-content-between flex-column mt-5">
          <div className="quiz-title mb-3 mt-5">
            <h2 className="mb-2">Lecture notes</h2>
          </div>
          <div className="document-items-container mb-4">
            {/*map the items in here */}
            <div className="quiz-exam-container mb-2 px-3"></div>
          </div>

          <div className="row">
            <div className="col-11">
              <form className=" d-flex flex-column" onSubmit={lectureSubmit}>
                <input className="form-control mb-3" type="file" />
                <button className="upload-submit-button col-12">Upload</button>
              </form>
            </div>
            <div className="col-1">
              <button className="trash_button">
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
