import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { GoCopy } from "react-icons/go";

import styles from "./styles/copy-button.module.css";

interface ICopyButtonProps {
  copyContents: string;
}

const CopyButton = ({ copyContents }: ICopyButtonProps) => {
  const [copyBtnClicked, setCopyBtnClicked] = useState(false);

  const copyBtnHandler = () => {
    navigator.clipboard
      .writeText(copyContents)
      .then(() => {
        setCopyBtnClicked(true);
        setTimeout(() => {
          setCopyBtnClicked(false);
        }, 3400);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getStyle = () => {
    if (copyBtnClicked) {
      return {
        backgroundColor: "#2ade1a32",
        color: "green",
      };
    } else {
      return {};
    }
  };

  return (
    <button
      className={styles.copyBtn}
      onClick={copyBtnHandler}
      style={getStyle()}
    >
      {copyBtnClicked ? (
        <AiOutlineCheck className={styles.icon} />
      ) : (
        <GoCopy className={styles.icon} />
      )}
    </button>
  );
};

export default CopyButton;
