import { useContext } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { AppStateContext } from "../../../../store/app-state/app-state-context";

import styles from "../styles/dark-button.module.css";

interface IDarkButtonProps {
  style?: React.CSSProperties;
}

const DarkButton = ({ style }: IDarkButtonProps) => {
  const { isDarkMode, toggleDarkMode } = useContext(AppStateContext).appState;

  return (
    <button
      style={style}
      className={styles.darkButton}
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <BiSolidSun className={styles.iconSun} />
      ) : (
        <BiSolidMoon className={styles.iconMoon} />
      )}
    </button>
  );
};

export default DarkButton;
