import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { IUser } from "../../../interfaces/user";
import { last_x_days } from "./date-data-helpers/x-days";

import styles from "./styles/project-graph.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

interface IProjectGraphProps {
  projectName: string;
  projectInfo: IUser["projects"]["x"];
  days: number;
  year: string;
}

const ProjectGraph = ({
  projectName,
  projectInfo,
  days,
  year,
}: IProjectGraphProps) => {
  const viewDates = projectInfo.viewDates;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      redraw: true,
      title: {
        display: true,
        text: projectName,
      },
    },
  };

  const [viewData, labels, lastXViews] = last_x_days(viewDates, days, year);
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Views",
        data: viewData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <h6 className={styles.viewsText}>
        Total Views: {projectInfo.totalViews}
      </h6>
      <h6 className={styles.viewsText}>
        Last {days} Days Views: {lastXViews ? lastXViews : 0}
      </h6>
      <Line
        style={{ width: "100% !important" }}
        options={options}
        data={data}
      />
    </>
  );
};

export default ProjectGraph;
