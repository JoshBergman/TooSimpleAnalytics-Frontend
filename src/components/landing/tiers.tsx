import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

import styles from "./styles/tiers.module.css";

const Tiers = () => {
  const navigate = useNavigate();

  const getStandardHandler = () => {
    navigate("/account");
  };

  return (
    <div className={styles.container}>
      <div className={styles.tiersContainer}>
        <div className={styles.tier}>
          <h5 className={styles.tierHeading}>Standard</h5>
          <p className={styles.tierDesc}>
            All the basics. Perfect for small-medium sized projects.
          </p>
          <h5 className={styles.monthly}>
            <strong className={styles.strong}>$0</strong>/month
          </h5>
          <h6 className={styles.yearly}>$0/year</h6>
          <button onClick={getStandardHandler} className="actionButton">
            Get Standard
          </button>
          <ul className={styles.ul}>
            <h6 className={styles.tierDesc}>Whats Included:</h6>
            <li className={styles.li}>
              <FaLongArrowAltRight className={styles.arrow} />
              2.5k Views/Day
            </li>
            <li className={styles.li}>
              <FaLongArrowAltRight className={styles.arrow} />5 Projects
            </li>
            <li className={styles.li}>
              <FaLongArrowAltRight className={styles.arrow} />
              JS/TS View Script
            </li>
            <li className={styles.li}>
              <FaLongArrowAltRight className={styles.arrow} />
              Fast & Simple Setup
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tiers;
