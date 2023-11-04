import { useContext, useState } from "react";

import styles from "./styles/connect-project-method.module.css";
import { get_connect_methods } from "../../../store/static-info";
import { UserContext } from "../../../store/user/user-context";

interface IConnectProjectMethodsProps {
  projName: string;
}

const ConnectProjectMethods = ({ projName }: IConnectProjectMethodsProps) => {
  const methods: string[] = get_connect_methods("", "", true);
  const [methodShowing, setMethodShowing] = useState("recommended");
  const userCTX = useContext(UserContext).user;
  const projLink = `https://tsa-real-765f9ae13226.herokuapp.com/analytic/view/${userCTX.projectsID}-${projName}`;

  return (
    <div className={styles.container}>
      <div className={styles.tabsContainer}>
        <button
          className={styles.tab}
          onClick={() => {
            setMethodShowing("recommended");
            //dynamically render these using keys from connect_methods
          }}
        >
          Recommended
        </button>
      </div>
      <div className={styles.methodContainer}>
        {get_connect_methods(methodShowing, projLink)}
      </div>
    </div>
  );
};

export default ConnectProjectMethods;
