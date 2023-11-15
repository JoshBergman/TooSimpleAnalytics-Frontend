import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import Modal from "../../ui-components/modal";

import styles from "../styles/mobile-menu.module.css";
import DarkButton from "./dark-button";

interface IMobileMenuProps {
  toggleShowingMenu: () => void;
  has_jwt: boolean;
}

const MobileMenu = ({ toggleShowingMenu, has_jwt }: IMobileMenuProps) => {
  const linkClickHandler = () => {
    toggleShowingMenu();
  };

  return (
    <>
      {createPortal(
        <Modal closeModal={toggleShowingMenu}>
          <div className={styles.container}>
            <nav className={styles.nav}>
              <div className={styles.logoContainer}>
                <img className={styles.img} src="/favicon.ico" />
                <h2 className={styles.heading}>Too Simple Analytics</h2>
              </div>
              <DarkButton style={{ fontSize: "0.8em", marginTop: "10px" }} />
              {has_jwt && (
                <Link
                  onClick={linkClickHandler}
                  to="/projects"
                  className={styles.navLink}
                >
                  Projects
                </Link>
              )}
              <Link
                onClick={linkClickHandler}
                to="/account"
                className={styles.navLink}
              >
                {has_jwt ? "Account" : "Sign up"}
              </Link>
            </nav>
            <button className="actionButton">Close</button>
          </div>
        </Modal>,
        document.getElementById("app-root") as HTMLElement,
        "mobile-menu"
      )}
    </>
  );
};

export default MobileMenu;
