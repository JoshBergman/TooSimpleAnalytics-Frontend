import { useContext, useState } from "react";
import { UserContext } from "../../store/user/user-context";

import loginStyles from "./styles/login-signup.module.css";
import styles from "./styles/account.module.css";

const Account = () => {
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const userCTX = useContext(UserContext).user;

  const logOutHandler = () => {
    userCTX.actions.logout();
  };

  const toggleDeletingAccount = () => {
    setIsDeletingAccount((prevDelAcc) => !prevDelAcc);
  };

  const deleteAccountHandler = () => {
    userCTX.actions.delAccount();
    toggleDeletingAccount();
    //todo call logout on successful deletion of account
  };

  return (
    <div className={loginStyles.form}>
      <h1 className={loginStyles.heading}>Manage Account</h1>

      <button
        style={{ marginBottom: "20px" }}
        className={loginStyles.actionButton}
        onClick={logOutHandler}
      >
        Log Out
      </button>
      {isDeletingAccount ? (
        <div className={styles.delAccDiv}>
          <button className={styles.halfButton} onClick={deleteAccountHandler}>
            Confirm Delete Account
          </button>
          <button className={styles.halfButton} onClick={toggleDeletingAccount}>
            Cancel
          </button>
        </div>
      ) : (
        <button
          className={loginStyles.actionButton}
          onClick={toggleDeletingAccount}
        >
          Delete Account
        </button>
      )}
    </div>
  );
};

export default Account;
