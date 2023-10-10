import ProjectsDisplay from "../components/projects/projects-display";
import styles from "./styles/projects-page.module.css";

const WorkspacePage = () => {
  return (
    <>
      Projects Page
      <div className={styles.test}>
        This is a div with content
        <ProjectsDisplay />
      </div>
    </>
  );
};

export default WorkspacePage;
