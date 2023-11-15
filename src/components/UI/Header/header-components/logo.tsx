import { Link } from "react-router-dom";

import styles from "../styles/header-logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logoTextContainer}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 className={styles.logoText}>
          <img className={styles.img} src="/favicon.ico" alt="logo" />
          Too Simple Analytics
        </h2>
      </Link>
    </div>
  );
};

export default Logo;
