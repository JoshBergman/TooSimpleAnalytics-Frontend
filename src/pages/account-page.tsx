import { useContext } from "react";

import { UserContext } from "../store/user/user-context";
import Header from "../components/UI/header/header";
import LoginSignup from "../components/account/login-signup";
import Account from "../components/account/account";

const AccountPage = () => {
  const userCTX = useContext(UserContext).user;
  const has_jwt = !!userCTX.auth;

  return (
    <>
      <Header />
      {has_jwt ? <Account /> : <LoginSignup />}
    </>
  );
};

export default AccountPage;
