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
import { cloneObject } from "./single-project-components/sort/helpers/clone-object";

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
    cloneObject(projectInfo),
    sortConfig.config
  );

  //! URGENT BUG
  //TODO: bug status: original is being mutated during original filter step despite using 3 different attempts to copy the obj. Perhaps I must make a manual object copy algorithm
  console.log("E");

  return (
    <div className={styles.graphContainer}>
      <ProjectGraph
        projectName={projectName}
        projectInfo={sortedInfo}
        days={days}
        year={year}
      />
      <SortData setConfig={setConf} sortConfig={sortConfig} />
      <button
        onClick={() => {
          console.log(sortConfig.config);
        }}
      >
        print confurg
      </button>
      <button
        onClick={() => {
          console.log(projectInfo);
        }}
      >
        print raw info
      </button>
      <button
        onClick={() => {
          console.log(sortedInfo);
        }}
      >
        print filtered info
      </button>
    </div>
  );
};

export default SingleProject;
