import { UserContext, userDefault } from "./user-context";
import { IUser } from "../../interfaces/user";

interface IProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: IProviderProps) => {
  const authenticate = () => {};

  const finalUserData: IUser = {
    ...userDefault,
    projects: {
      "Gay Sex Calculator": {
        totalViews: 69,
        dated_views: {},
      },
      "Ben Toolin": {
        totalViews: 420,
        dated_views: {},
      },
    },
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
