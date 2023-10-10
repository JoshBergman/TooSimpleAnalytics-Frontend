import { useState } from "react";
import { AppStateContext } from "./app-state-context";
import { IAppState } from "../../interfaces/app-state";

interface IProviderProps {
  children: React.ReactNode;
}

export const AppStateContextProvider = ({ children }: IProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = () => {
    setIsDarkMode((prevIsDarkModeState) => {
      const newIsDarkMode = !prevIsDarkModeState;
      localStorage.setItem("theme", newIsDarkMode ? "dark" : "light");

      return newIsDarkMode;
    });
  };

  const finalAppState: IAppState = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <AppStateContext.Provider value={{ appState: finalAppState }}>
      {children}
    </AppStateContext.Provider>
  );
};
