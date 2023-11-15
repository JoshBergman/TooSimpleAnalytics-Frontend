import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./header-components/logo";

import styles from "./styles/header.module.css";
import DarkButton from "./header-components/dark-button";
import Notifications from "../notifications/notifications";
import { UserContext } from "../../../store/user/user-context";
import MobileHeader from "./header-components/mobile-header";

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const userCTX = useContext(UserContext).user;
  const jwt = userCTX.auth;
  const has_jwt = !!jwt;
  const useMobileHeader = windowWidth < 900;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth((prevWidth) => {
        const newWidth = window.innerWidth;
        // Only update the state if the width has actually changed
        if (newWidth !== prevWidth) {
          return newWidth;
        }
        return prevWidth;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div className={styles.header}>
      {useMobileHeader && <MobileHeader has_jwt={has_jwt} />}
      {!useMobileHeader && (
        <>
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
        </>
      )}
      <Notifications />
    </div>
  );
};

export default Header;
