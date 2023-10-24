import { FormEvent } from "react";
import styles from "./styles/new-project-form.module.css";

interface INewProjectFormProps {
  setMakingNewProject: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewProjectForm = ({ setMakingNewProject }: INewProjectFormProps) => {
  const cancelHandler = (e: FormEvent) => {
    e.preventDefault();
    setMakingNewProject((prevNewProjState) => !prevNewProjState);
  };

  return (
    <div className={styles.modalContainer}>
      <form className={styles.form}>
        <div className={styles.headingContainer}>
          <h3 className={styles.heading}>Create New Project</h3>
          <button onClick={cancelHandler} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
        <input type="text" placeholder="Project Name" />
      </form>
    </div>
  );
};

export default NewProjectForm;
