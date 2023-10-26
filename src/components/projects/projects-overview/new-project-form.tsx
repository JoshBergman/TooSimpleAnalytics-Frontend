import { FormEvent, useRef, useState, useContext } from "react";
import styles from "./styles/new-project-form.module.css";
import { UserContext } from "../../../store/user/user-context";
import { AppStateContext } from "../../../store/app-state/app-state-context";

interface INewProjectFormProps {
  setMakingNewProject: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewProjectForm = ({ setMakingNewProject }: INewProjectFormProps) => {
  const [projNameState, setProjNameState] = useState("Project Name");
  const projectNameRef = useRef<HTMLInputElement>(null);

  const makeNotification = useContext(AppStateContext).appState.addNotification;
  const userCTX = useContext(UserContext);
  const projectNames = Object.keys(userCTX.user.projects);

  const onProjNameChange = () => {
    if (projectNameRef.current && projectNameRef.current.value) {
      setProjNameState(projectNameRef.current.value);
    }
  };

  const cancelHandler = (e: FormEvent) => {
    e.preventDefault();
    setMakingNewProject((prevNewProjState) => !prevNewProjState);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (projectNames.includes(projNameState)) {
      makeNotification(
        "error",
        `A project with the name ${projNameState} already exists. Please use a different name.`
      );
      setProjNameState((prevName) => `copy-of-${prevName}`);
      return;
    }
    //todo API call to create project, then get projects again. (Don't manually create a new project in context in case of failure to add in db)
  };

  return (
    <div className={styles.modalContainer}>
      <form
        onSubmit={submitHandler}
        id="new-project-form"
        className={styles.form}
      >
        <div className={styles.headingContainer}>
          <h3 className={styles.heading}>Create New Project</h3>
          <button onClick={cancelHandler} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
        <label htmlFor="projNameInput" className={styles.inputLabel}>
          New Project Name:{" "}
        </label>
        <input
          onChange={onProjNameChange}
          id="projNameInput"
          ref={projectNameRef}
          type="text"
          value={projNameState}
          onClick={() =>
            projNameState === "Project Name" ? setProjNameState("") : () => {}
          }
        />
        <button className={styles.submitButton} type="submit">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default NewProjectForm;
