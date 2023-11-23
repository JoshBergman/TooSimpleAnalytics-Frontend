import { useState, useRef, useContext, FormEvent, CSSProperties } from "react";

import { UserContext } from "../../store/user/user-context";
import { validatePassword } from "../../validations/validate-password";
import styles from "./styles/login-signup.module.css";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [password, setPassword] = useState("New Password");
  const [confirmPassword, setConfirmPassword] = useState("Confirm Password");
  const [verificationCode, setVerificationCode] = useState("");

  const [changingPassword, setChangingPassword] = useState(false);
  const userCTX = useContext(UserContext).user;

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const verificationCodeRef = useRef<HTMLInputElement>(null);

  const onClicker = (
    ref: React.RefObject<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    defaultValue: string
  ) => {
    if (!ref.current) {
      return;
    }
    const newValue = ref.current.value;
    if (newValue.toLowerCase() === defaultValue.toLowerCase()) {
      setState("");
    }
  };

  const onChanger = (
    ref: React.RefObject<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    validation?: (value: string) => [boolean, string]
  ) => {
    if (!ref.current) {
      return;
    }
    const newValue = ref.current.value;
    if (validation && !validation(newValue)[0] && newValue.length > 1) {
      return;
    }
    setPasswordsMatch(() => {
      if (newValue === password || newValue === confirmPassword) {
        return true;
      }
      return false;
    });
    setState(newValue);
  };

  const toggleChangingPassword = () => {
    setChangingPassword((prevChanging) => !prevChanging);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(userCTX.auth);
    // userCTX.actions.changePassword();
  };

  const passwordInputStyle: CSSProperties = {
    borderColor: passwordsMatch ? "inherit" : "red",
  };

  const passwordInputType = showPassword ? "text" : "password";

  return (
    <>
      {changingPassword ? (
        <form
          style={{
            border: "2px solid var(--gray-1)",
            padding: "20px 5px",
            margin: "20px 0",
            borderRadius: "20px",
            marginBottom: "30px",
          }}
          onSubmit={onSubmit}
        >
          <h3 className={styles.heading}>Change Password</h3>
          <button
            className={styles.showPass}
            type="button"
            onClick={(e: FormEvent) => {
              e.preventDefault();
              setShowPassword((prevShow) => !prevShow);
              setTimeout(() => passwordRef.current?.focus(), 2);
            }}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
          <p className={styles.sub} style={{ color: "red" }}>
            {passwordsMatch ? "" : "Passwords Do Not Match"}
          </p>
          <label htmlFor="newpass" className={styles.label}>
            New Password
          </label>
          <input
            id="newpass"
            type={passwordInputType}
            style={passwordInputStyle}
            ref={passwordRef}
            className={styles.input}
            value={password}
            onClick={() => {
              onClicker(passwordRef, setPassword, "New Password");
            }}
            onChange={() => {
              onChanger(passwordRef, setPassword, validatePassword);
            }}
          />
          <label htmlFor="confirmpass" className={styles.label}>
            Confirm Password
          </label>
          <input
            id="confirmpass"
            type={passwordInputType}
            style={passwordInputStyle}
            ref={confirmPasswordRef}
            className={styles.input}
            value={confirmPassword}
            onClick={() => {
              onClicker(
                confirmPasswordRef,
                setConfirmPassword,
                "Confirm Password"
              );
            }}
            onChange={() => {
              onChanger(confirmPasswordRef, setConfirmPassword);
            }}
          />
          <label htmlFor="verify" className={styles.label}>
            Verification Code{" "}
            <p className={styles.sub}>
              A verification code has been sent to your email
            </p>
          </label>
          <input
            id="verify"
            ref={verificationCodeRef}
            className={styles.input}
            value={verificationCode}
            onChange={() => {
              onChanger(verificationCodeRef, setVerificationCode);
            }}
            style={{ marginBottom: "40px" }}
          />
          <button
            type="submit"
            className="actionButton"
            style={{ marginBottom: "10px" }}
          >
            Submit
          </button>
          <button
            type="button"
            className="actionButton negative"
            style={{ marginBottom: "20px" }}
            onClick={toggleChangingPassword}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          className="actionButton"
          onClick={toggleChangingPassword}
          style={{ marginBottom: "20px" }}
        >
          Change Password
        </button>
      )}
    </>
  );
};

export default ChangePassword;
