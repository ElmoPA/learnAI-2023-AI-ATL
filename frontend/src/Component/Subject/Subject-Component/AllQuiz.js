import "../../../Assets/style/Subject/Subject-Component/AllQuiz.css";

const quiz_list = [
  { name: "Algebra", time: "Tomorrow", progress: 50 },
  { name: "Arithmetic", time: "Next two days", progress: 80 },
  { name: "Probability", time: "Next week", progress: 20 },
  { name: "Geometry", time: "Next month", progress: 40 },
  { name: "Permutations", time: "Next month", progress: 70 },
];

export default function AllQuiz() {
  return (
    <div className="statistics-page-container py-4 px-4">
      <h1 className="mb-4">Quiz List</h1>
      <div className="d-flex flex-column">
        {/**map of the all the quiz */}
        {quiz_list.map((quiz, index) => (
          <div className="allquiz-each-quiz">
            <h4>{quiz.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
