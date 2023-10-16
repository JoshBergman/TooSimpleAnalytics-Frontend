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
      "Gay Calculator": {
        totalViews: 69,
        dated_views: {},
      },
      "Ben Toolin": {
        totalViews: 420,
        dated_views: {},
      },
      Ballun: {
        totalViews: 420,
        dated_views: {},
      },
      Nashville: {
        totalViews: 420,
        dated_views: {},
      },
      Corkland: {
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
