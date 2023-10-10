import { useContext } from "react";
import BetterLink from "../../Utility/Navigation/BetterLink";

import styles from "./styles/header.module.css";
import { AppStateContext } from "../../../store/app-state/app-state-context";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useContext(AppStateContext).appState;

  return (
    <div className={styles.header}>
      <h2>
        <BetterLink to="/">TSA</BetterLink>
      </h2>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      </button>
      <nav>
        <a href="/projects">Projects</a>
      </nav>
    </div>
  );
};

export default Header;
