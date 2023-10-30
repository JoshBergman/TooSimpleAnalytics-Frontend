import { useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

import styles from "./styles/project-thumbnail.module.css";
import { IUser } from "../../../interfaces/user";
import { getDatesArray } from "./last-week";
import { Link } from "react-router-dom";

interface IProjectThumbnailProps {
  projectName: string;
  projectInfo: IUser["projects"]["x"];
}

const ProjectThumbnail = ({
  projectName,
  projectInfo,
}: IProjectThumbnailProps) => {
  //! This useless state makes the graph responsive. I dont know how I fixed this bug or why it works. It only works when used as a button
  //! as seen in the jsx. (Completely hidden but still exists in the dom)
  const [statefull, setStatefull] = useState(false);

  const viewDates = projectInfo.viewDates;
  const lastWeekDates = getDatesArray();
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

  const getInfoFromDate = (date: string): number => {
    const dates = date.split("/");
    if (
      viewDates &&
      viewDates[dates[0]] &&
      viewDates[dates[0]][dates[1]] &&
      viewDates[dates[0]][dates[1]][dates[2]]
    ) {
      return viewDates[dates[0]][dates[1]][dates[2]];
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
    <Link className={styles.link} to={`/projects/${projectName}`}>
      <div className={styles.thumbnailContainer}>
        <button
          className={styles.hide}
          onClick={() => {
            setStatefull((prev) => !prev);
          }}
        >
          State Change!: {statefull + ""}
        </button>
        <h5 className={styles.projectName}>{projectName}</h5>
        <Line
          style={{ width: "100% !important" }}
          options={options}
          data={data}
        />
      </div>
    </Link>
  );
};

export default ProjectThumbnail;
