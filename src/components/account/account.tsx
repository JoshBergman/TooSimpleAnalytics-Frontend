import { useContext } from "react";
import { UserContext } from "../../store/user/user-context";

const Account = () => {
  const userCTX = useContext(UserContext).user;

  const logOutHandler = () => {
    userCTX.actions.logout();
  };

  return (
    <p>
      Logged in and manage account here{" "}
      <button onClick={logOutHandler}>Log Out</button>
    </p>
  );
};

export default Account;
