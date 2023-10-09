import { UserContext, userDefault } from "./UserContext";
import { IUser } from "../interfaces/user";

interface IProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: IProviderProps) => {
  const authenticate = () => {};

  const finalUserData: IUser = {
    item: "placeholder",
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
