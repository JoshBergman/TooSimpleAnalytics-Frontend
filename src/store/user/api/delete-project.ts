import axios from "axios";
import { staticInfo } from "../../static-info";

export const deleteProject = (
  auth: string | null,
  projectName: string,
  addNotification: (type: string, msg: string) => void,
  refreshProjects: () => void
) => {
  if (!auth) {
    addNotification("error", "Failed to authenticate, please re-log.");
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
    .post(`${staticInfo.uri}/analytic/delete-project`, reqData, reqConfig)
    .then((response) => {
      if (response.status === 200) {
        addNotification("success", "Project successfully deleted.");
        refreshProjects();
      }
    })
    .catch((error) => {
      console.error(error);
      addNotification(
        "error",
        "Error deleting project. Please try again in one minute."
      );
    });
};
