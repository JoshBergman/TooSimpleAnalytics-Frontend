import React from "react";
import { IAppState } from "../../interfaces/app-state";

const appStateDefault: IAppState = {
  notifications: [],
  addNotification: () => {},
  isDarkMode: true,
  toggleDarkMode: () => {},
};

export const AppStateContext = React.createContext({
  appState: appStateDefault,
});
