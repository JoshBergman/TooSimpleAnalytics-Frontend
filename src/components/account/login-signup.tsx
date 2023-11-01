import { useState, useRef, FormEvent } from "react";

const LoginSignup = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [email, setEmail] = useState("Email");
  const [password, setPassword] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
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

  console.log("Rendering login-signup");

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
          {isLoggingIn ? "Sign Up" : "Log In"}
        </button>
      </p>
    </form>
  );
};

export default LoginSignup;
