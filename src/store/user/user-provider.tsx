import { useEffect, useState, useContext } from "react";

import { UserContext, userDefault } from "./user-context";
import { IUser } from "../../interfaces/user";
import { getProjects } from "./api/get-projects";
import { AppStateContext } from "../app-state/app-state-context";

interface IProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: IProviderProps) => {
  const [projects, setProjects] = useState<IUser["projects"]>({});
  const [projectsID, setProjectsID] = useState<null | string>(null);
  const auth: string | null = localStorage.getItem("jwt") || null;

  const appCTX = useContext(AppStateContext);

  useEffect(() => {
    getProjects(
      auth,
      setProjects,
      setProjectsID,
      appCTX.appState.addNotification
    );
    // console.log("effect running");
  }, [auth, appCTX]);

  const authenticate = () => {};

  const finalUserData: IUser = {
    ...userDefault,
    projects,
    projectsID,
    auth,
    actions: {
      authenticate,
    },
  };

  return (
    <UserContext.Provider value={{ user: finalUserData }}>
      {children}
    </UserContext.Provider>
  );
};
