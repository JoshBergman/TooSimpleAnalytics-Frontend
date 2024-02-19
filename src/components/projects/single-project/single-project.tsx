import { useState } from "react";

import { IUser } from "../../../interfaces/user";
import ProjectGraph from "./single-project-components/project-graph";
import SortData from "./single-project-components/sort/sort-data";

import styles from "./styles/single-project.module.css";
import { get_filtered_viewDates_from_config } from "./single-project-components/sort/helpers/project-info-from-config";
import {
  ISortConfigAndSortTallies,
  getDefaultSortConfig,
  parseViewDates,
} from "./single-project-components/sort/helpers/generate-config-options";

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
  const [sortConfig, setSortConfig] = useState(
    projectInfo.viewDates
      ? parseViewDates(projectInfo.viewDates)
      : getDefaultSortConfig()
  );

  const setConf = (newConf: ISortConfigAndSortTallies) => {
    setSortConfig(newConf);
    console.log("R");
  };

  const sortedInfo = get_filtered_viewDates_from_config(
    projectInfo,
    sortConfig.config
  );
  console.log(sortedInfo);
  console.log("E");

  return (
    <div className={styles.graphContainer}>
      <ProjectGraph
        projectName={projectName}
        projectInfo={sortedInfo}
        days={days}
        year={year}
      />
      <SortData
        rawInfo={projectInfo}
        setConfig={setConf}
        sortConfig={sortConfig}
      />
      <button
        onClick={() => {
          console.log(sortConfig);
        }}
      >
        print confurg
      </button>
    </div>
  );
};

export default SingleProject;
