import { useContext } from "react";
import { CiLight, CiDark } from "react-icons/ci";
import { AppStateContext } from "../../../../store/app-state/app-state-context";

const DarkButton = () => {
  const { isDarkMode, toggleDarkMode } = useContext(AppStateContext).appState;

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? <CiDark /> : <CiLight />}
    </button>
  );
};

export default DarkButton;
