import React from "react";
import { IUser } from "../../interfaces/user";

// eslint-disable-next-line react-refresh/only-export-components
export const userDefault: IUser = {
  projects: {},
  projectsID: null,
  auth: null,
  actions: {
    createAccount: (email: string, password: string) => {
      email;
      password;
    },
    addProject: (projectName: string) => {
      projectName;
    },
    logout: () => {},
  },
};

export const UserContext = React.createContext({
  user: userDefault,
});
