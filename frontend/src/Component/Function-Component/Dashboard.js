import React from "react";
import { useState, useEffect } from "react";
import "../../Assets/style/Dashboard/Dashboard.css";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

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
        sx={{ fontSize: "1.25rem", width: "30%" }}
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
export default function Dashboard({ list }) {
  const [progressValues, setProgressValues] = useState(list.map(() => 0));
  useEffect(() => {
    const updateProgress = () => {
      setProgressValues(list.map((item) => item.progress));
    };

    const timer = setTimeout(updateProgress, 0);
    return () => clearTimeout(timer);
  }, [list]);
  return (
    <div className="row custom-gap">
      <div className="items-container">
        <div className="row gx-5">
          {list.map((item, index) => (
            <div
              className="col-sm-12 col-md-6 col-lg-4 mb-5 glass-effect"
              key={index}
            >
              <a
                className="link-each-item"
                href={`/subject?userId=user-1&subj=History`}
              >
                <div className="each-item">
                  <div className="top-part d-flex flex-column mb-4">
                    <h3 className="d-flex">{item.subject}</h3>
                  </div>
                  <div className="bottom-part mb-4">
                    <h5>
                      {/*fetch the amount of task and put it here */}
                      {item.task} Task
                    </h5>
                  </div>
                  <div className="row d-flex align-items-center">
                    <Box sx={{ width: "100%" }}>
                      <LinearProgressWithLabel
                        value={progressValues[index]}
                        randomColor={randomColor(index)}
                      />
                    </Box>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
