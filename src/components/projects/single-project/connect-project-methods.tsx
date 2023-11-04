import { useContext, useState } from "react";

import styles from "./styles/connect-project-method.module.css";
import { get_connect_methods, staticInfo } from "../../../store/static-info";
import { UserContext } from "../../../store/user/user-context";

interface IConnectProjectMethodsProps {
  projName: string;
}

const ConnectProjectMethods = ({ projName }: IConnectProjectMethodsProps) => {
  const methods: string[] = get_connect_methods("", "", true) as string[];
  const [methodShowing, setMethodShowing] = useState(methods[0]);
  const userCTX = useContext(UserContext).user;
  const projLink = `${staticInfo.uri}/analytic/view/${userCTX.projectsID}-${projName}`;

  const getTabs = () => {
    const tabs: React.ReactNode[] = methods.map((method) => {
      const currTab = (
        <button
          className={styles.tab}
          key={method + "-tab"}
          style={
            method === methodShowing
              ? {
                  backgroundColor: "var(--text-default)",
                  color: "var(--background-1)",
                  borderColor: "var(--brand-1)",
                }
              : {}
          }
          onClick={() => {
            setMethodShowing(method);
          }}
        >
          {method}
        </button>
      );
      return currTab;
    });

    return tabs;
  };

  return (
    <div className={styles.container}>
      <h5 className={styles.subText}>
        A view is counted each time a GET request is sent to this projects
        endpoint.
      </h5>
      <div className={styles.tabsContainer}>{getTabs()}</div>
      <div className={styles.methodContainer}>
        <pre className={styles.snippetPre}>
          <code className={styles.codeSnippet}>
            {get_connect_methods(methodShowing, projLink) as string}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default ConnectProjectMethods;
