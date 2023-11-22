import { useContext, useState, useRef, FormEvent } from "react";

import Modal from "../UI/ui-components/modal";
import { UserContext } from "../../store/user/user-context";

import styles from "./styles/login-signup.module.css";

interface IVerifyAndPasswordProps {
  email: string;
  password: string;
  closeModal: () => void;
  onReqFinish: (success: boolean) => void;
}

const VerificationModal = ({
  email,
  password,
  closeModal,
  onReqFinish,
}: IVerifyAndPasswordProps) => {
  const [verificationCode, setVerificationCode] = useState("Verification Code");
  const userCTX = useContext(UserContext).user;

  const verificationCodeRef = useRef<HTMLInputElement>(null);

  const onVerifySubmit = (e: FormEvent) => {
    e.preventDefault();
    //Creates account given the verification string is correct
    userCTX.actions.createAccount(
      email,
      password,
      verificationCode,
      onReqFinish
    );
  };

  const clearDefault = () => {
    const newVerificationCode = verificationCodeRef.current
      ? verificationCodeRef.current.value
      : verificationCode;
    if (newVerificationCode.toLowerCase() === "verification code") {
      setVerificationCode("");
    }
  };

  const codeChangeHandler = () => {
    const newVerificationCode = verificationCodeRef.current
      ? verificationCodeRef.current.value
      : verificationCode;
    setVerificationCode(newVerificationCode.trim().toUpperCase());
  };

  return (
    <Modal closeModal={() => {}}>
      <form
        onSubmit={onVerifySubmit}
        style={{
          padding: "40px",
          border: "2px solid var(--subtle-gray)",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ margin: "0" }} className={styles.heading}>
          Verify Email
        </h1>
        <p style={{ textAlign: "center" }}>
          A 6-digit verification code was sent to your email address
        </p>
        <label className={styles.label} htmlFor="verify">
          Verification Code:{" "}
        </label>
        <input
          className={styles.input}
          onClick={clearDefault}
          value={verificationCode}
          onChange={codeChangeHandler}
          ref={verificationCodeRef}
          id="verify"
          type="text"
        />
        <button
          style={{ margin: "20px 0" }}
          className="actionButton"
          type="submit"
        >
          Verify
        </button>
        <button
          className="actionButton negative"
          type="button"
          onClick={(e: FormEvent) => {
            e.preventDefault();
            closeModal();
          }}
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default VerificationModal;
