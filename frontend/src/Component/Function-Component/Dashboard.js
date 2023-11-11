import { Chart } from "react-google-charts";

export default function Dashboard({ list, options }) {
  return (
    <div className="row">
      <div className="items-container">
        <div className="row gx-5">
          {list.map((item, index) => (
            <div className="col-sm-12 col-md-6 col-lg-3 mb-5" key={index}>
              <div className="each-item">
                <a
                  className="link-each-item"
                  href={`/subject/${item.subjectId}`}
                >
                  <div className="top-part d-flex flex-column">
                    <h3 className="d-flex justify-content-center">
                      {item.subject}
                    </h3>
                    <Chart
                      chartType="PieChart"
                      data={item.chart}
                      width="100%"
                      height="300px"
                      options={options}
                    />
                  </div>
                  <hr />
                  <div className="bottom-part">
                    <h4>Task</h4>
                    {item.quiz}
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="add-item-container d-flex flex-column col-sm-2 col-md-0 col-lg-0 p-3">
        <div className="add-item-title">
          <h5 className="mb-3 text-center">Add Items</h5>
        </div>

        <div className="add-list-part">
          {list.map((item, index) => (
            <li
              className="list-add d-flex mb-2 d-flex align-items-center"
              key={index}
            >
              <button className="add-button">+</button>
              <div className="subject-text flex-grow-1 text-center">
                {item.subject}
              </div>
            </li>
          ))}
        </div>
      </div> */}
    </div>
  );
}
