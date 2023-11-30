import { IUser } from "../../../interfaces/user";
import ProjectGraph from "./single-project-components/project-graph";

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
  return (
    <div className={styles.graphContainer}>
      <ProjectGraph
        projectName={projectName}
        projectInfo={projectInfo}
        days={days}
        year={year}
      />
    </div>
  );
};

export default SingleProject;
