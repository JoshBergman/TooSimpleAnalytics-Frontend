import { useContext } from "react";
import { UserContext } from "../../../store/user/user-context";
import { IUser, project } from "../../../interfaces/user";

import styles from "./styles/projects-display.module.css";
import ProjectThumbnail from "./project-thumbnail";

interface IProjectsDisplayProps {
  setMakingNewProject: () => void;
}

const ProjectsDisplay = ({ setMakingNewProject }: IProjectsDisplayProps) => {
  const userCTX = useContext(UserContext).user;
  const projects: { [projectName: string]: project } = userCTX.projects;

  const renderProjects = () => {
    const projElements: React.ReactNode[] = [];
    const projKeys = Object.keys(projects);

    for (let i = 0; i < projKeys.length; i++) {
      const currProjName = projKeys[i];
      const currProjInfo: IUser["projects"]["x"] = projects[currProjName];
      projElements.push(
        <ProjectThumbnail
          projectName={currProjName}
          projectInfo={currProjInfo}
          key={currProjName}
        />
      );
    }

    return projElements;
  };

  return (
    <>
      <div className={styles.titleContainer}>
        <h4 className={styles.header}>My Projects: </h4>
        <button className={styles.newProjButton} onClick={setMakingNewProject}>
          New Project
        </button>
      </div>
      {Object.keys(projects).length >= 1 ? (
        <div className={styles.projectsContainer}>{renderProjects()}</div>
      ) : (
        <p className={styles.noProjText}>
          No projects found. Create a project to get started!
        </p>
      )}
    </>
  );
};

export default ProjectsDisplay;
