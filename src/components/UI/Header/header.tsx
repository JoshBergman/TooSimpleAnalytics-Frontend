import { useContext } from "react";

import styles from "./styles/header.module.css";
import { AppStateContext } from "../../../store/app-state/app-state-context";
import { Link } from "react-router-dom";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useContext(AppStateContext).appState;

  return (
    <div className={styles.header}>
      <h2>
        <Link to="/">TSA</Link>
      </h2>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      </button>
      <nav>
        <Link to="/projects">Projects</Link>
      </nav>
    </div>
  );
};

export default Header;
