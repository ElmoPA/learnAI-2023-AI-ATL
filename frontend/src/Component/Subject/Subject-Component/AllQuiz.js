import "../../../Assets/style/Subject/Subject-Component/AllQuiz.css";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";

const quiz_list = [
  { name: "Algebra", time: "Tomorrow", progress: 50 },
  { name: "Arithmetic", time: "Next two days", progress: 80 },
  { name: "Probability", time: "Next week", progress: 20 },
  { name: "Geometry", time: "Next month", progress: 40 },
  { name: "Permutations", time: "Next month", progress: 70 },
];

function randomColor(index) {
  const setColor = ["#fcf75e", "#f7a072", "#b5e2fa", "#0fa3b1"];
  return setColor[index % setColor.length];
}

const BorderLinearProgress = styled(LinearProgress)(({ theme, barcolor }) => ({
  height: 20,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: barcolor,
  },
}));

function LinearProgressWithLabel({ value, randomColor }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= value) {
          clearInterval(interval);
          return value;
        }
        return Math.min(prevProgress + value / 100, value);
      });
    }, 5);

    return () => {
      clearInterval(interval);
    };
  }, [value]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        ml: 0,
      }}
    >
      <Typography
        variant="body2"
        color="#1d1d1f"
        sx={{ fontSize: "1.25rem", width: "5%" }}
      >
        {`${Math.round(progress)}%`}
      </Typography>
      <BorderLinearProgress
        variant="determinate"
        value={progress}
        barcolor={randomColor}
        style={{ width: "100%" }}
      />
    </Box>
  );
}

export default function AllQuiz() {
  return (
    <div className="statistics-page-container py-4 px-4">
      <h2 className="mb-4  mt-3">Quiz List</h2>
      <div className="d-flex flex-column">
        {/**map of the all the quiz */}
        {quiz_list.map((quiz, index) => (
          <a
            href="/quiz/230482304"
            className="all-subject-link allquiz-each-quiz"
          >
            {/*link of each subject */}
            <h4>{quiz.name}</h4>
            <div className="col-2 mb-3">{quiz.time}</div>
            <Box className="col-10" sx={{ width: "100%" }}>
              <LinearProgressWithLabel
                value={quiz.progress}
                randomColor={randomColor(index)}
              />
            </Box>
          </a>
        ))}
      </div>
    </div>
  );
}
