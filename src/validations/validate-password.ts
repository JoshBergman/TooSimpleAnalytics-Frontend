export const validatePassword = (
  password: string
): [valid: boolean, message: string] => {
  if (password.length <= 0 || password.length >= 70) {
    return [false, "Password too long. (Max 70)"];
  }

  const passwordRegex = /^[a-zA-Z0-9\s`~!@#$%^&*()_+=-{}[]|:;"'<>,.?\/]+$`/;
  if (!passwordRegex.test(password)) {
    return [false, "Invalid password characters."];
  }

  return [true, ""];
};
