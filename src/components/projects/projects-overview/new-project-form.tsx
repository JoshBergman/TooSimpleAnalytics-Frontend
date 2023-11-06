import { FormEvent, useRef, useState, useContext } from "react";

import { UserContext } from "../../../store/user/user-context";
import { AppStateContext } from "../../../store/app-state/app-state-context";
import { validateProjectName } from "../../../validations/validate-project-name";
import Modal from "../../UI/ui-components/modal";

import styles from "./styles/new-project-form.module.css";
import loginStyles from "../../account/styles/login-signup.module.css";

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
      const newName = projectNameRef.current.value;

      //if the new character is whitespace replace it with a slash
      if (newName[newName.length - 1].trim() === "") {
        setProjNameState((prevProjName) => prevProjName + "-");
      } else {
        setProjNameState(projectNameRef.current.value);
      }
    }
  };

  const toggleMakingNewProject = () => {
    setMakingNewProject((prevNewProjState) => !prevNewProjState);
  };

  const cancelHandler = (e: FormEvent) => {
    e.preventDefault();
    toggleMakingNewProject();
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    //weed out duplicate names and suggest a new name
    if (projectNames.includes(projNameState)) {
      makeNotification(
        "error",
        `A project with the name ${projNameState} already exists. Please use a different name.`
      );
      setProjNameState((prevName) => `copy-of-${prevName}`);
      return;
    }

    //validation of name
    const nameValidation = validateProjectName(projNameState);
    if (!nameValidation[0]) {
      makeNotification("error", nameValidation[1]);
      return;
    }

    //add projects to db then refreshes queried projects
    userCTX.user.actions.addProject(projNameState.trim());
    makeNotification(
      "info",
      "Creating project, may take a up to twenty seconds to populate."
    );
    cancelHandler(e); // closes add project window
  };

  return (
    <Modal closeModal={toggleMakingNewProject}>
      <form
        onSubmit={submitHandler}
        id="new-project-form"
        className={styles.form}
      >
        <div className={styles.headingContainer}>
          <h3 className={styles.heading}>Create New Project</h3>
          <button
            type="button"
            onClick={cancelHandler}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
        <label htmlFor="projNameInput" className={loginStyles.label}>
          New Project Name:{" "}
        </label>
        <input
          className={loginStyles.input}
          onChange={onProjNameChange}
          id="projNameInput"
          ref={projectNameRef}
          type="text"
          value={projNameState}
          onClick={() =>
            projNameState === "Project Name" ? setProjNameState("") : () => {}
          }
        />
        <button className="actionButton" type="submit">
          Create Project
        </button>
      </form>
    </Modal>
  );
};

export default NewProjectForm;
