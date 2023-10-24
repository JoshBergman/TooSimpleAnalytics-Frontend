import { useContext } from "react";
import { UserContext } from "../../store/user/user-context";
import { project } from "../../interfaces/user";

import styles from "./styles/projects-display.module.css";

const ProjectsDisplay = () => {
  const userCTX = useContext(UserContext).user;
  const projects: { [projectName: string]: project } = userCTX.projects;

  const renderProjects = () => {
    const projElements: React.ReactNode[] = [];
    const projKeys = Object.keys(projects);

    for (let i = 0; i < projKeys.length; i++) {
      const currProjName = projKeys[i];
      projElements.push(
        <div className={styles.project} key={currProjName}>
          {currProjName}
        </div>
      );
    }

    return projElements;
  };

  return (
    <div className={styles.projectsContainer}>
      {Object.keys(projects).length >= 1
        ? renderProjects()
        : "Loading... (Or no projects!)"}
    </div>
  );
};

export default ProjectsDisplay;
