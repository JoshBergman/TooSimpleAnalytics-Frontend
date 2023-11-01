import { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "./header-components/logo";

import styles from "./styles/header.module.css";
import DarkButton from "./header-components/dark-button";
import Notifications from "../notifications/notifications";
import { UserContext } from "../../../store/user/user-context";

const Header = () => {
  const userCTX = useContext(UserContext).user;
  const jwt = userCTX.auth;
  const has_jwt = !!jwt;

  return (
    <div className={styles.header}>
      <div className={styles.leftSideHeader}>
        <Logo />
      </div>
      <div className={styles.rightSideHeader}>
        <DarkButton />
        <nav className={styles.nav}>
          {has_jwt && (
            <Link to="/projects" className={styles.navLink}>
              Projects
            </Link>
          )}
          <Link to="/account" className={styles.navLink}>
            {has_jwt ? "Account" : "Sign up"}
          </Link>
        </nav>
      </div>
      <Notifications />
    </div>
  );
};

export default Header;
