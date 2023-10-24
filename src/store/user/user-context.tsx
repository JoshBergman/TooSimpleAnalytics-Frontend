import React from "react";
import { IUser } from "../../interfaces/user";

export const userDefault: IUser = {
  projects: {},
  projectsID: null,
  auth: null,
  actions: {
    authenticate: () => {},
  },
};

export const UserContext = React.createContext({
  user: userDefault,
});
