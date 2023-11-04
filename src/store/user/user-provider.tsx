import { useEffect, useState, useContext } from "react";

import { UserContext, userDefault } from "./user-context";
import { IUser } from "../../interfaces/user";
import { getProjects } from "./api/get-projects";
import { AppStateContext } from "../app-state/app-state-context";
import { createProject } from "./api/create-project";
import { signup } from "./api/signup";
import { login } from "./api/login";
import { deleteAccount } from "./api/delete-account";

interface IProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: IProviderProps) => {
  const [projects, setProjects] = useState<IUser["projects"]>({});
  const [projectsID, setProjectsID] = useState<null | string>(null);
  const savedAuth: string | null = localStorage.getItem("jwt") || null;
  const [auth, setAuth] = useState(savedAuth);

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

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("jwt");
  };

  const createAccount = (
    email: string,
    password: string,
    onReqFinish: (success: boolean) => void
  ) => {
    signup(setAuth, addNotification, onReqFinish, email, password);
  };

  const loginAccount = (
    email: string,
    password: string,
    onReqFinish: () => void
  ) => {
    login(setAuth, addNotification, onReqFinish, email, password);
  };

  const delAccount = () => {
    deleteAccount(setAuth, addNotification, auth);
  };

  const finalUserData: IUser = {
    ...userDefault,
    projects,
    projectsID,
    auth,
    actions: {
      createAccount,
      loginAccount,
      addProject,
      logout,
      delAccount,
    },
  };

  return (
    <UserContext.Provider value={{ user: finalUserData }}>
      {children}
    </UserContext.Provider>
  );
};
