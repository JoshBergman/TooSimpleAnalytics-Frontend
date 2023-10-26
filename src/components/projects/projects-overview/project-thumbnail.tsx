import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

import styles from "./styles/project-thumbnail.module.css";
import { IUser } from "../../../interfaces/user";
import { getDatesArray } from "./last-week";

interface IProjectThumbnailProps {
  projectName: string;
  projectInfo: IUser["projects"]["x"]["dateYear"];
}

const ProjectThumbnail = ({
  projectName,
  projectInfo,
}: IProjectThumbnailProps) => {
  const lastWeekDates = getDatesArray();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: projectName,
      },
    },
  };

  const getInfoFromDate = (date: string): number => {
    const dates = date.split("/");
    if (
      projectInfo &&
      projectInfo[dates[0]] &&
      projectInfo[dates[0]][dates[1]] &&
      projectInfo[dates[0]][dates[1]][dates[2]]
    ) {
      return projectInfo[dates[0]][dates[1]][dates[2]];
    }
    return 0;
  };

  const viewData = lastWeekDates.map((date) => getInfoFromDate(date));
  const labels = lastWeekDates.map((date) => date.slice(5));
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
    <div className={styles.thumbnailContainer}>
      <Line
        style={{ width: "100% !important" }}
        options={options}
        data={data}
      />
    </div>
  );
};

export default ProjectThumbnail;
