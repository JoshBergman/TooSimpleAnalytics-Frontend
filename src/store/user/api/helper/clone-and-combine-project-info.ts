import { IUser } from "../../../../interfaces/user";

export const clone_and_combine_project_info = (
  sourceObj: IUser["projects"],
  newProjObj: IUser["projects"],
  projectName: string
) => {
  const source: IUser["projects"] = {};
  modifiedCloneObject(sourceObj, source);
  modifiedCloneObject(newProjObj[projectName], source[projectName]);

  return source;
};

interface IObj {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

//overwrites source object with info from objectToClone
function modifiedCloneObject(objectToClone: IObj, source: IObj) {
  clone(objectToClone, source);

  function clone(obj: IObj, returnObj: IObj) {
    for (const property in obj) {
      if (typeof obj[property] === "object") {
        if (!returnObj[property]) {
          returnObj[property] = {};
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        clone(obj[property], returnObj[property]);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        returnObj[property] = obj[property];
      }
    }
  }
}
