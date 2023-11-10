import { useState } from "react";
import { AppStateContext } from "./app-state-context";
import { IAppState } from "../../interfaces/app-state";
import { generateRandomId } from "./generate-id";

interface IProviderProps {
  children: React.ReactNode;
}

export const AppStateContextProvider = ({ children }: IProviderProps) => {
  const [notifications, setNotifications] = useState<string[][]>([]);
  const [isDarkMode, setIsDarkMode] = useState(
    !(localStorage.getItem("theme") === "light")
  );

  const toggleDarkMode = () => {
    setIsDarkMode((prevIsDarkModeState) => {
      const newIsDarkMode = !prevIsDarkModeState;
      localStorage.setItem("theme", newIsDarkMode ? "dark" : "light");

      return newIsDarkMode;
    });
  };

  const addNotification = (type: string, msg: string) => {
    const newNotificationID = generateRandomId(4);
    setNotifications((prevNotifications) => {
      const newNotifications = [
        ...prevNotifications,
        [type, msg, newNotificationID],
      ];
      return newNotifications;
    });
    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((x) => x[2] !== newNotificationID)
      );
    }, 4000);
  };

  const finalAppState: IAppState = {
    notifications,
    addNotification,
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <AppStateContext.Provider value={{ appState: finalAppState }}>
      {children}
    </AppStateContext.Provider>
  );
};
