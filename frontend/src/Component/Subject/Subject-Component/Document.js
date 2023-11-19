import "../../../Assets/style/Subject/Subject-Component/Document.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faRemove } from "@fortawesome/free-solid-svg-icons";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

export default function Document() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [topic, setTopic] = useState("");
  const [syllabusFile, setSyllabusFile] = useState();
  const [quizFile, setQuizFile] = useState();
  const [lectureFile, setLectureFile] = useState();
  const [error, setError] = useState(null);

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  // handle submit for date and topic
  const handleSubmit = async () => {
    if (topic && selectedDate) {
      const response = await fetch("http://localhost:3030/testdate");
    }
  };
  // upload file
  const syllabusSubmit = async () => {
    if (syllabusFile) {
      const formData = new FormData();
      formData.append("userId", "user-1");
      formData.append("subj", "History");
      formData.append("file", syllabusFile); // use middleware to receive fileform
      console.log(formData);
      const response = await fetch("http://localhost:3030/upload/fileBasic", {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      }
    }
  };
  const quizSubmit = async () => {
    if (quizFile) {
      const formData = new FormData();
      formData.append("userId", "user-1");
      formData.append("subj", "History");
      formData.append("file", quizFile); // use middleware to receive file
      const response = await fetch("http://localhost:3030/upload/fileBasic", {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      }
    }
  };
  const lectureSubmit = async () => {
    if (lectureFile) {
      const formData = new FormData();
      formData.append("userId", "user-1");
      formData.append("subj", "History");
      formData.append("file", lectureFile); // use middleware to receive file
      const response = await fetch("http://localhost:3030/upload/fileSlides", {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      }
    }
  };

  return (
    <div className="document-page-container">
      <div>
        <div className="syllabus-document-container  d-flex align-items-center justify-content-between flex-column mt-5">
          <div className="syllabus-title mb-3 mt-2">
            <h2 className="mb-2">Syllabus</h2>
          </div>
          <div className="document-items-container mb-4 p-3">
            {/*map the items in here */}
          </div>

          <div className="row">
            <div className="col-11">
              <form
                className="d-flex flex-column"
                onSubmit={syllabusSubmit}
                onChange={(e) => {
                  setSyllabusFile(e.target.files[0]);
                }}
              >
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
          </div>

          <div className="row mb-5">
            <div className="col-11">
              <form
                className="d-flex flex-column"
                onSubmit={quizSubmit}
                onChange={(e) => {
                  setQuizFile(e.target.files[0]);
                }}
              >
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
        <div>
          <h2 className="d-flex justify-content-center mb-4">Test Date</h2>
          <form
            className="test-date-form d-flex align-items-center justify-content-center"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                className="test-date-input"
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={handleTopicChange}
              />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
            <button className="test-date-submit">Submit</button>
          </form>
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
                <input
                  className="form-control mb-3"
                  type="file"
                  onChange={(e) => {
                    setLectureFile(e.target.files[0]);
                  }}
                />
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