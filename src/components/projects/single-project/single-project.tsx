import { IUser } from "../../../interfaces/user";
import ProjectGraph from "./project-graph";

import styles from "./styles/single-project.module.css";

interface ISingleProjectProps {
  projectName: string;
  projectInfo: IUser["projects"]["x"];
}

const SingleProject = ({ projectName, projectInfo }: ISingleProjectProps) => {
  return (
    <div className={styles.graphContainer}>
      Total Views: {projectInfo.totalViews}
      <ProjectGraph projectName={projectName} projectInfo={projectInfo} />
    </div>
  );
};

export default SingleProject;
