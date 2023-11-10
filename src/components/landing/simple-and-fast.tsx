import styles from "./styles/simple-and-fast.module.css";

const SimpleAndFast = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Simple and Fast</h2>
      <p className={styles.p}>
        Be setup within a minute of creating your account
      </p>
      <h4 className={styles.subText}>It{"'"}s that easy!</h4>
    </div>
  );
};

export default SimpleAndFast;
