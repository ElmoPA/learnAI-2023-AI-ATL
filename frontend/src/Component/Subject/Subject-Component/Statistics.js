import { Chart } from "react-google-charts";
export const data = [
  ["Date", "Score"],
  ["12-03-2022", 1290],
  ["13-03-2022", 1420],
  ["14-03-2022", 1490],
  ["15-03-2022", 1550],
];

export const options = {
  title: "Score",
  titleTextStyle: {
    fontSize: 30,
  },
  curveType: "function",
  legend: { position: "bottom" },
};

export default function Statistics() {
  return (
    <div className="statistics-page-container py-4">
      <div className="row">
        <div className="col-8 d-flex flex-start">
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}
