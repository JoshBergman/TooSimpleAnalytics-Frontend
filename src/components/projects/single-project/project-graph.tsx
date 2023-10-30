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
import { getDatesArray } from "../projects-overview/last-week";

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
}

const ProjectGraph = ({ projectName, projectInfo }: IProjectGraphProps) => {
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
    <Line style={{ width: "100% !important" }} options={options} data={data} />
  );
};

export default ProjectGraph;
