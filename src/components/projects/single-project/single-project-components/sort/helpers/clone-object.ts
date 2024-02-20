/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
interface IObj {
  [key: string]: any;
}

export const cloneObject = (objectToClone: IObj) => {
  const returnObject = {};
  clone(objectToClone, returnObject);

  return returnObject;

  function clone(obj: IObj, returnObj: IObj) {
    for (const property in obj) {
      if (typeof obj[property] === "object") {
        returnObj[property] = {};
        clone(obj[property], returnObj[property]);
      } else {
        returnObj[property] = obj[property];
      }
    }
  }
};
