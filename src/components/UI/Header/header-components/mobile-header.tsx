import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import MobileMenu from "./mobile-menu";
import styles from "../styles/mobile-header.module.css";

interface IMobileHeaderProps {
  has_jwt: boolean;
}

const MobileHeader = ({ has_jwt }: IMobileHeaderProps) => {
  const [showingMenu, setShowingMenu] = useState(false);

  const toggleShowingMenu = () => {
    setShowingMenu((prevMenu) => !prevMenu);
  };

  return (
    <>
      <a href="/">
        <img className={styles.img} alt="logo" src="/logo192.png" />
      </a>
      <button className={styles.hamburger} onClick={toggleShowingMenu}>
        <GiHamburgerMenu className={styles.hamburgerIcon} />
      </button>
      {showingMenu && (
        <MobileMenu toggleShowingMenu={toggleShowingMenu} has_jwt={has_jwt} />
      )}
    </>
  );
};

export default MobileHeader;
