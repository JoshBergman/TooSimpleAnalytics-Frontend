import React from "react";
import { IAppState } from "../../interfaces/app-state";

const appStateDefault: IAppState = {
  isDarkMode: true,
  toggleDarkMode: () => {},
};

export const AppStateContext = React.createContext({
  appState: appStateDefault,
});
