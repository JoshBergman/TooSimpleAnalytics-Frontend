import axios from "axios";
import { IUser } from "../../../interfaces/user";
import { staticInfo } from "../../static-info";
import { clone_and_combine_project_info } from "./helper/clone-and-combine-project-info";

export const getProjectInfoByDate = (
  auth: string | null,
  projName: string,
  startDate: Date,
  endDate: Date,
  setProjects: (newProjects: IUser["projects"]) => void,
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

  const reqData = {
    projectName: projName,
    startDate: startDate.getTime(),
    endDate: endDate.getTime(),
  };

  axios
    .post(`${staticInfo.uri}/analytic/projects/by-date`, reqData, reqConfig)
    .then((response) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { projects } = response.data;
      // @ts-expect-error type glitch possibly, likely due to my wonderful respect for typing in this file. Fix later
      setProjects((existingProjInfo) => {
        //clone the project into the same object
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newProjectsInfo = clone_and_combine_project_info(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          existingProjInfo,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          projects,
          projName
        );
        return newProjectsInfo;
      });
    })
    .catch((error) => {
      console.error(error);
      addNotification(
        "error",
        "Error loading projects. Please try again in one minute."
      );
    });
};
