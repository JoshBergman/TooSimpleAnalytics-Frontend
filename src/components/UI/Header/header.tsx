import { Link } from "react-router-dom";
import Logo from "./header-components/logo";

import styles from "./styles/header.module.css";
import DarkButton from "./header-components/dark-button";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.leftSideHeader}>
        <Logo />
      </div>
      <div className={styles.rightSideHeader}>
        <DarkButton />
        <nav className={styles.nav}>
          <Link to="/projects" className={styles.navLink}>
            Projects
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
