import { useEffect, useState } from "react";

import { UserContext, userDefault } from "./user-context";
import { IUser } from "../../interfaces/user";
import { getProjects } from "./api/get-projects";

interface IProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: IProviderProps) => {
  const [projects, setProjects] = useState<IUser["projects"]>({});
  const [projectsID, setProjectsID] = useState<null | string>(null);
  const auth: string | null = localStorage.getItem("jwt") || null;

  useEffect(() => {
    getProjects(auth, setProjects, setProjectsID);
  }, [auth]);

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
