import { useState, useContext } from "react";

import Header from "../components/UI/header/header";
import ProjectsDisplay from "../components/projects/projects-overview/projects-display";
import styles from "./styles/projects-page.module.css";
import NewProjectForm from "../components/projects/projects-overview/new-project-form";
import { UserContext } from "../store/user/user-context";

const WorkspacePage = () => {
  const [makingNewProject, setMakingNewProject] = useState(false);
  const auth = useContext(UserContext).user.auth;

  const toggleNewProject = () => {
    if (typeof auth !== "string") {
      return;
    }
    setMakingNewProject((prevNewProjState) => !prevNewProjState);
  };
  return (
    <>
      <Header />
      Projects Page
      <div className={styles.test}>
        {makingNewProject && (
          <NewProjectForm setMakingNewProject={setMakingNewProject} />
        )}
        <button onClick={toggleNewProject} className={styles.newProjectButton}>
          New Project
        </button>
        <ProjectsDisplay />
      </div>
    </>
  );
};

export default WorkspacePage;
