import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../../../store/user/user-context";
import Modal from "../../../UI/ui-components/modal";
import styles from "../styles/delete-project-button.module.css";

interface IDeleteProjectButton {
  projectName: string | undefined;
}

const DeleteProjectButton = ({ projectName }: IDeleteProjectButton) => {
  const [deletingProject, setDeletingProject] = useState(false);
  const userCTX = useContext(UserContext).user;
  const navigate = useNavigate();

  const toggleDeleting = () => {
    setDeletingProject((prevDelProj) => !prevDelProj);
  };

  const onDeleteProject = () => {
    userCTX.actions.delProject(projectName);
    navigate("/projects");
  };

  return (
    <>
      {deletingProject && (
        <Modal closeModal={toggleDeleting}>
          <div className={styles.container}>
            <h2 className={styles.heading}>Delete Project</h2>
            <div className={styles.buttons}>
              <button
                onClick={onDeleteProject}
                className="actionButton negative"
              >
                Delete Project
              </button>
              <button onClick={toggleDeleting} className="actionButton">
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
      <button
        style={{ width: "25%" }}
        className="actionButton negative"
        onClick={toggleDeleting}
      >
        Delete Project
      </button>
    </>
  );
};

export default DeleteProjectButton;
