import { useEffect, useState, useContext } from "react";

import { UserContext, userDefault } from "./user-context";
import { IUser } from "../../interfaces/user";
// import { getProjects } from "./api/get-projects"; Likely going to deprecate
import { AppStateContext } from "../app-state/app-state-context";
import { createProject } from "./api/create-project";
import { signup } from "./api/signup";
import { login } from "./api/login";
import { deleteAccount } from "./api/delete-account";
import { deleteProject } from "./api/delete-project";
import { createVerification } from "./api/create-verification";
import { callChangePassword } from "./api/change-password";
import { callPasswordVerification } from "./api/create-password-code";
import { getProjectsThumbnails } from "./api/get-project-thumbnails";
import { getProjectInfoByDate } from "./api/get-proj-info-by-date";

interface IProviderProps {
  children: React.ReactNode;
}

//once projects are queried it will set projects state to the queried projects. If it is empty then render a no projects found screen
const loadingProj: IUser["projects"]["x"] = { totalViews: 0, viewDates: {} };

export const UserContextProvider = ({ children }: IProviderProps) => {
  const [projects, setProjects] = useState<IUser["projects"]>({
    "Projects Loading...": loadingProj,
  });
  const [projectsID, setProjectsID] = useState<null | string>(null);
  const savedAuth: string | null = localStorage.getItem("jwt") || null;
  const [auth, setAuth] = useState(savedAuth);

  const appCTX = useContext(AppStateContext);
  const addNotification = appCTX.appState.addNotification;

  useEffect(() => {
    getProjectsThumbnails(auth, setProjects, setProjectsID);
  }, [auth]);
  //whenever projects are modified use refreshProjects to query projects.
  const refreshProjects = () => {
    getProjectsThumbnails(auth, setProjects, setProjectsID);
  };

  const getProjInfoByDate = (
    projectName: string,
    startDate: Date,
    endDate: Date
  ) => {
    getProjectInfoByDate(
      auth,
      projectName,
      startDate,
      endDate,
      setProjects,
      addNotification
    );
  };

  const addProject = (projectName: string) => {
    createProject(auth, addNotification, refreshProjects, projectName);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("jwt");
  };

  const createAccount = (
    email: string,
    password: string,
    verificationCode: string,
    onReqFinish: (success: boolean) => void
  ) => {
    signup(
      setAuth,
      addNotification,
      onReqFinish,
      email,
      password,
      verificationCode
    );
  };

  const sendVerification = (
    onReqFinish: (success: boolean) => void,
    email: string
  ) => {
    createVerification(addNotification, onReqFinish, email);
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

  const delProject = (projectName: string) => {
    deleteProject(auth, projectName, addNotification, refreshProjects);
  };

  const createPasswordCode = () => {
    callPasswordVerification(auth, addNotification);
  };

  const changePassword = (
    newPass: string,
    verification: string,
    onReqFinish: (success: boolean) => void
  ) => {
    callChangePassword(
      auth,
      setAuth,
      addNotification,
      onReqFinish,
      newPass,
      verification
    );
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
      delProject,
      sendVerification,
      createPasswordCode,
      changePassword,
      getProjInfoByDate,
    },
  };

  return (
    <UserContext.Provider value={{ user: finalUserData }}>
      {children}
    </UserContext.Provider>
  );
};
