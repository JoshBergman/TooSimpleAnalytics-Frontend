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
              <strong className={styles.strongDesc}>2.5k</strong> Views/Day
            </li>
            <li className={styles.li}>
              <FaLongArrowAltRight className={styles.arrow} />
              <strong className={styles.strongDesc}>5</strong> Projects
            </li>
            <li className={styles.li}>
              <FaLongArrowAltRight className={styles.arrow} />
              <strong className={styles.strongDesc}>
                Integration Script
              </strong>{" "}
              ( JS / TS )
            </li>
            <li className={styles.li}>
              <FaLongArrowAltRight className={styles.arrow} />
              <strong className={styles.strongDesc}>Fast</strong> &{" "}
              <strong className={styles.strongDesc}>Simple</strong> Setup
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tiers;
