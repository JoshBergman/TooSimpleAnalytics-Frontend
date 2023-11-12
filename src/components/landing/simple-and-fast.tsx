import easyDemo from "../../../public/easy-setup.mp4";
import styles from "./styles/simple-and-fast.module.css";

const SimpleAndFast = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Simple and Fast</h2>
      <p className={styles.p}>
        Be setup within a minute of creating your account
      </p>
      <h4 className={styles.subText}>It{"'"}s that easy!</h4>
      <video className={styles.video} autoPlay={true} loop={true}>
        <source src={easyDemo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default SimpleAndFast;
