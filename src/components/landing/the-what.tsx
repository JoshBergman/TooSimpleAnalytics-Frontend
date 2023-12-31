import { useNavigate } from "react-router-dom";

import styles from "./styles/the-what.module.css";

const TheWhat = () => {
  const navigate = useNavigate();

  const getStartedHandler = () => {
    navigate("/account");
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h2 className={styles.heading}>Simple. Fast. Private.</h2>
        <h3 className={styles.tagline}>Setup view-tracking within 2 minutes</h3>
        <button onClick={getStartedHandler} className={styles.signupBtn}>
          Get Started
        </button>
      </div>
      <div className={styles.subContainer}>
        <video
          className={styles.video}
          autoPlay={true}
          loop={true}
          muted={true}
        >
          <source src="/landing-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default TheWhat;
