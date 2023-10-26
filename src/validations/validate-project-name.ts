export const validateProjectName = (
  projectName: string
): [valid: boolean, message: string] => {
  if (projectName.length <= 0 || projectName.length >= 50) {
    return [false, "Name too long. (Max 50)"];
  }

  return [true, ""];
};
