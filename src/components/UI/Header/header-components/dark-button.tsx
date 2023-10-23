import { useContext } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { AppStateContext } from "../../../../store/app-state/app-state-context";

import styles from "../styles/dark-button.module.css";

const DarkButton = () => {
  const { isDarkMode, toggleDarkMode } = useContext(AppStateContext).appState;

  return (
    <button className={styles.darkButton} onClick={toggleDarkMode}>
      {isDarkMode ? (
        <BiSolidSun className={styles.iconSun} />
      ) : (
        <BiSolidMoon className={styles.iconMoon} />
      )}
    </button>
  );
};

export default DarkButton;
