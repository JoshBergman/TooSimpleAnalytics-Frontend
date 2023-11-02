import { useState, useContext, useRef, FormEvent } from "react";
import { UserContext } from "../../store/user/user-context";

const LoginSignup = () => {
  const [isMakingReq, setIsMakingReq] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [email, setEmail] = useState("Email");
  const [password, setPassword] = useState("");
  const userCTX = useContext(UserContext).user;

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setIsMakingReq(true);

    //todo add validation for email and password

    //todo add visiblitity button for password

    //callback that is called when the req is finished
    const onReqFinish = (success: boolean) => {
      if (success) {
        //navigate user to projects page or next logical area upon successfull signup
        //! When user is authed on the account page they are taken to account manage screen
        //! decide if user should be navigated to projects
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
    setEmail(newEmail);
  };

  const passwordChangeHandler = () => {
    const newPassword = passwordRef.current
      ? passwordRef.current.value
      : password;
    setPassword(newPassword);
  };

  return (
    <form onSubmit={submitHandler}>
      <h1>{isLoggingIn ? "Log In" : "Signup"}</h1>
      <label htmlFor="email">Email: </label>
      <input
        onClick={clearDefault}
        value={email}
        onChange={emailChangeHandler}
        ref={emailRef}
        id="email"
        type="email"
      />
      <label htmlFor="password">Password: </label>
      <input
        value={password}
        onChange={passwordChangeHandler}
        ref={passwordRef}
        id="password"
        type="password"
      />
      <button type="submit">{isLoggingIn ? "Log In" : "Sign Up"}</button>
      <p>
        {isLoggingIn ? "Don't have an account? " : "Already have an account? "}
        <button onClick={toggleLoggingIn}>
          {isMakingReq ? "Loading..." : isLoggingIn ? "Sign Up" : "Log In"}
        </button>
      </p>
    </form>
  );
};

export default LoginSignup;
