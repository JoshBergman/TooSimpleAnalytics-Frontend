export const validateProjectName = (
  projectName: string
): [valid: boolean, message: string] => {
  if (projectName.length <= 1) {
    return [false, "Name too short! (Min 2)"];
  }

  if (projectName.length >= 51) {
    return [false, "Name too long. (Max 50)"];
  }

  return [true, ""];
};
