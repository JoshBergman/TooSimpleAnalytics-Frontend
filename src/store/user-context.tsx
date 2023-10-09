import React from "react";
import { IUser } from "../interfaces/user";

export const userDefault: IUser = {
  item: "placeholder",
  actions: {
    authenticate: () => {},
    deauthenticate: () => {},
    setAuthToken: () => {},
    setLocalStoragePreference: () => {},
  },
};

export const UserContext = React.createContext({
  user: userDefault,
});
