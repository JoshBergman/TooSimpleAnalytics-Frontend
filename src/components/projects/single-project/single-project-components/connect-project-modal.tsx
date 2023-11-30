import ConnectProjectMethods from "./connect-project-methods";
import styles from "../styles/connect-project-modal.module.css";

interface IConnectProjectModalProps {
  toggleShowing: () => void;
  projName: string;
}

const ConnectProjectModal = ({
  toggleShowing,
  projName,
}: IConnectProjectModalProps) => {
  const containerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modal} onClick={toggleShowing}>
      <div className={styles.container} onClick={containerClick}>
        <h2 className={styles.heading}>Connect Project</h2>
        <ConnectProjectMethods projName={projName} />
        <button className="actionButton" onClick={toggleShowing}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ConnectProjectModal;
