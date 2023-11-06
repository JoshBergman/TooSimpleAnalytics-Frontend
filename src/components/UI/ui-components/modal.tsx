import styles from "./styles/modal.module.css";

interface IModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

const Modal = ({ children, closeModal }: IModalProps) => {
  const onContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onBackgroundClick = () => {
    closeModal();
  };

  return (
    <div className={styles.modal} onClick={onBackgroundClick}>
      <div className={styles.container} onClick={onContainerClick}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
