import { PaperDoneIcon, PaperNewIcon, StarIcon } from "@/assets/img";
import { LineChart } from "@mui/x-charts";

export default function Overview() {
  return (
    <div className="container overview-wrapper">
      <div className="overview-chart">
        <div className="chart-header">
          <h3>
            <StarIcon />
            Task Completed
          </h3>

          <span>08</span>
        </div>
        <div className="chart">
          <LineChart
            series={[
              {
                data: [1, 2, 1.7, 2.2, 1.5, 2.5, 2.2],
                showMark: false,
                color: "#5051F9",
              },
            ]}
          />
          <p>
            <span>8+</span> more <br />
            from last week
          </p>
        </div>
      </div>
      <div className="overview-chart">
        <div className="chart-header">
          <h3>
            <PaperNewIcon />
            New Task
          </h3>

          <span>10</span>
        </div>
        <div className="chart">
          <LineChart
            series={[
              {
                data: [1, 2, 1.7, 2.2, 1.5, 2.5, 2.2],
                showMark: false,
                color: "#1EA7FF",
              },
            ]}
          />
          <p>
            <span>10+</span> more <br />
            from last week
          </p>
        </div>
      </div>
      <div className="overview-chart">
        <div className="chart-header">
          <h3>
            <PaperDoneIcon />
            Project Done
          </h3>

          <span>10</span>
        </div>
        <div className="chart">
          <LineChart
            series={[
              {
                data: [1, 2, 1.7, 2.2, 1.5, 2.5, 2.2],
                showMark: false,
                color: "#FF614C",
              },
            ]}
          />
          <p>
            <span>10+</span> more <br />
            from last week
          </p>
        </div>
      </div>
      <div className="overview-chart chart-full">
        <div className="chart-header">
          <h3>
            <PaperDoneIcon />
            Project Done
          </h3>

          <span>10</span>
        </div>
        <LineChart
          // xAxis={[{ data: [0, 100, 200, 300, 400] }]}
          yAxis={[
            {
              data: [
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
                "Jan",
                "Feb",
                "Mar",
                "Apr",
              ],
            },
          ]}
          series={[
            {
              data: [1, 2, 1.7, 2.2, 1.5, 2.5, 2.2, 1.2, 1.6],
            },
          ]}
          height={300}
        />
      </div>
    </div>
  );
}
