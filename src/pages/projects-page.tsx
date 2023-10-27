import { useState, useContext } from "react";

import Header from "../components/UI/header/header";
import ProjectsDisplay from "../components/projects/projects-overview/projects-display";
import styles from "./styles/projects-page.module.css";
import NewProjectForm from "../components/projects/projects-overview/new-project-form";
import { UserContext } from "../store/user/user-context";
import { AppStateContext } from "../store/app-state/app-state-context";

const WorkspacePage = () => {
  const [makingNewProject, setMakingNewProject] = useState(false);
  const auth = useContext(UserContext).user.auth;
  const createNotification =
    useContext(AppStateContext).appState.addNotification;

  const toggleNewProject = () => {
    if (typeof auth !== "string") {
      createNotification("error", "Login to create a project.");
      return;
    }
    setMakingNewProject((prevNewProjState) => !prevNewProjState);
  };
  return (
    <>
      <Header />
      <div className={styles.test}>
        {makingNewProject && (
          <NewProjectForm setMakingNewProject={setMakingNewProject} />
        )}
        <ProjectsDisplay setMakingNewProject={toggleNewProject} />
      </div>
    </>
  );
};

export default WorkspacePage;
