import { useState, useEffect } from "react";

import styles from "./styles/single-project.module.css";
import { IUser } from "../../../interfaces/user";
import { get_filtered_viewDates_from_config } from "./single-project-components/sort/helpers/project-info-from-config";
import { cloneObject } from "./single-project-components/sort/helpers/clone-object";
import {
  ISortConfigAndSortTallies,
  getDefaultSortConfig,
  parseViewDates,
} from "./single-project-components/sort/helpers/generate-config-options";

import ProjectGraph from "./single-project-components/project-graph";
import SortData from "./single-project-components/sort/sort-data";

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

  useEffect(() => {
    setSortConfig(parseViewDates(projectInfo.viewDates));
    //Empty config from initial load-in/refresh on single projects page means that refreshing the page never renders the parseViewDates fn >
    // >that is needed to get sortedInfo and therefore render the graph. To fix: set config to parseViewDates on data retrieval.
  }, [projectInfo]);

  const setConf = (newConf: ISortConfigAndSortTallies) => {
    setSortConfig(newConf);
  };

  const sortedInfo = get_filtered_viewDates_from_config(
    cloneObject(projectInfo),
    sortConfig.config
  );

  return (
    <div className={styles.graphContainer}>
      <ProjectGraph
        projectName={projectName}
        projectInfo={sortedInfo as IUser["projects"]["x"]}
        days={days}
        year={year}
      />
      <button
        onClick={() => {
          console.log(projectInfo, sortedInfo);
        }}
      >
        Pringt
      </button>
      <SortData setConfig={setConf} sortConfig={sortConfig} />
    </div>
  );
};

export default SingleProject;
