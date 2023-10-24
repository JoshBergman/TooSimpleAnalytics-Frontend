import axios from "axios";
import { IUser } from "../../../interfaces/user";

export const getProjects = (
  auth: string | null,
  setProjects: (newProjects: IUser["projects"]) => void,
  setProjectsID: (newID: string) => void
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
    .get(
      "https://tsa-real-765f9ae13226.herokuapp.com/analytic/projects",
      reqConfig
    )
    .then((response) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { projects, projectsID } = response.data;

      setProjects(projects as IUser["projects"]);
      setProjectsID(projectsID as string);
    })
    .catch((error) => console.error(error));
};
