import axios from "axios";
import { staticInfo } from "../../static-info";

export const createProject = (
  auth: string | null,
  addNotification: (type: string, msg: string) => void,
  refreshProjects: () => void,
  projectName: string
) => {
  if (!auth) {
    addNotification("error", "Login to add a project.");
    return;
  }

  const reqData = {
    projectName,
  };

  const reqConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  axios
    .post(`${staticInfo.uri}/analytic/create-project`, reqData, reqConfig)
    .then((response) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (response.status === 200) {
        refreshProjects();
        return;
      } else {
        addNotification(
          "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `Error adding project: ${response.data.message}`
        );
        return;
      }
    })
    .catch((error) => {
      console.error(error);
      addNotification(
        "error",
        "Error loading projects. Please try again in one minute."
      );
    });
};
