import { useState, useContext, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../store/user/user-context";
import { validateEmail } from "../../validations/validate-email";
import { validatePassword } from "../../validations/validate-password";
import { AppStateContext } from "../../store/app-state/app-state-context";
import styles from "./styles/login-signup.module.css";

const LoginSignup = () => {
  const [isMakingReq, setIsMakingReq] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [email, setEmail] = useState("Email");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const userCTX = useContext(UserContext).user;
  const appCTX = useContext(AppStateContext).appState;

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    if (!emailValidation[0] || !passwordValidation[0]) {
      appCTX.addNotification("error", "Invalid email and/or password");
      return;
    }

    //if validations pass make req
    setIsMakingReq(true);

    //callback that is called when the req is finished
    const onReqFinish = (success: boolean) => {
      if (success) {
        navigate("/projects");
      }
      setIsMakingReq(false);
    };

    if (!isMakingReq) {
      if (isLoggingIn) {
        userCTX.actions.loginAccount(email, password, onReqFinish);
      } else {
        userCTX.actions.createAccount(email, password, onReqFinish);
      }
    }
  };

  const toggleLoggingIn = (e: FormEvent) => {
    e.preventDefault();
    setIsLoggingIn((prevLoggingInState) => !prevLoggingInState);
  };

  const clearDefault = () => {
    const newEmail = emailRef.current ? emailRef.current.value : email;
    if (newEmail.toLowerCase() === "email") {
      setEmail("");
    }
  };

  const emailChangeHandler = () => {
    const newEmail = emailRef.current ? emailRef.current.value : email;
    setEmail(newEmail.trim());
  };

  const passwordChangeHandler = () => {
    const newPassword = passwordRef.current
      ? passwordRef.current.value
      : password;
    setPassword(newPassword.trim());
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <h1 className={styles.heading}>{isLoggingIn ? "Log In" : "Signup"}</h1>
      <label className={styles.label} htmlFor="email">
        Email:{" "}
      </label>
      <input
        className={styles.input}
        style={
          validateEmail(email)[0] ||
          email.length < 2 ||
          email.toLocaleLowerCase() === "email"
            ? {}
            : { borderColor: "red" }
        }
        onClick={clearDefault}
        value={email}
        onChange={emailChangeHandler}
        ref={emailRef}
        id="email"
        type="email"
      />
      <label className={styles.label} htmlFor="password">
        Password:{" "}
      </label>
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
      <input
        className={styles.input}
        style={
          validatePassword(password)[0] || password.length < 2
            ? {}
            : { borderColor: "red" }
        }
        value={password}
        onChange={passwordChangeHandler}
        ref={passwordRef}
        id="password"
        type={showPassword ? "text" : "password"}
      />
      <button className={styles.actionButton} type="submit">
        {isLoggingIn ? "Log In" : "Sign Up"}
      </button>
      <p>
        {isLoggingIn ? "Don't have an account? " : "Already have an account? "}
        <button className={styles.altButton} onClick={toggleLoggingIn}>
          {isMakingReq ? "Loading..." : isLoggingIn ? "Sign Up" : "Log In"}
        </button>
      </p>
    </form>
  );
};

export default LoginSignup;
