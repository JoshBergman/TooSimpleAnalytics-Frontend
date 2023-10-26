import { useEffect, useState, useContext } from "react";

import { UserContext, userDefault } from "./user-context";
import { IUser } from "../../interfaces/user";
import { getProjects } from "./api/get-projects";
import { AppStateContext } from "../app-state/app-state-context";
import { createProject } from "./api/create-project";

interface IProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: IProviderProps) => {
  const [projects, setProjects] = useState<IUser["projects"]>({});
  const [projectsID, setProjectsID] = useState<null | string>(null);
  const auth: string | null = localStorage.getItem("jwt") || null;

  const appCTX = useContext(AppStateContext);
  const addNotification = appCTX.appState.addNotification;

  useEffect(() => {
    getProjects(auth, setProjects, setProjectsID, addNotification);
  }, [auth, addNotification]);

  const addProject = (projectName: string) => {
    //call api to create project, then refresh projects.
    const refreshProjects = () => {
      getProjects(auth, setProjects, setProjectsID, addNotification);
    };
    createProject(auth, addNotification, refreshProjects, projectName);
  };

  const authenticate = () => {};

  const finalUserData: IUser = {
    ...userDefault,
    projects,
    projectsID,
    auth,
    actions: {
      authenticate,
      addProject,
    },
  };

  return (
    <UserContext.Provider value={{ user: finalUserData }}>
      {children}
    </UserContext.Provider>
  );
};
