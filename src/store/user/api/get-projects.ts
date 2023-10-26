import axios from "axios";
import { IUser } from "../../../interfaces/user";
import { staticInfo } from "../../static-info";

export const getProjects = (
  auth: string | null,
  setProjects: (newProjects: IUser["projects"]) => void,
  setProjectsID: (newID: string) => void,
  addNotification: (type: string, msg: string) => void
) => {
  if (!auth) {
    return;
  }
  const reqConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  axios
    .get(`${staticInfo.uri}/analytic/projects`, reqConfig)
    .then((response) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { projects, projectsID } = response.data;

      setProjects(projects as IUser["projects"]);
      setProjectsID(projectsID as string);
    })
    .catch((error) => {
      console.error(error);
      addNotification(
        "error",
        "Error loading projects. Please try again in one minute."
      );
    });
};
