import { useState } from "react";

import { IUser } from "../../../interfaces/user";
import ProjectGraph from "./single-project-components/project-graph";
import SortData from "./single-project-components/sort/sort-data";

import styles from "./styles/single-project.module.css";

interface ISingleProjectProps {
  projectName: string;
  projectInfo: IUser["projects"]["x"];
  days: number;
  year: string;
}

const SingleProject = ({
  projectName,
  projectInfo,
  days,
  year,
}: ISingleProjectProps) => {
  const [sortedInfo, setSortedInfo] = useState(projectInfo);

  return (
    <div className={styles.graphContainer}>
      <ProjectGraph
        projectName={projectName}
        projectInfo={sortedInfo}
        days={days}
        year={year}
      />
      <SortData rawInfo={projectInfo} setSortedInfo={setSortedInfo} />
    </div>
  );
};

export default SingleProject;
