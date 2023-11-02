export const validateEmail = (
  email: string
): [valid: boolean, message: string] => {
  if (email.length <= 0 || email.length >= 70) {
    return [false, "Email too long. (Max 70)"];
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return [false, "Invalid email format."];
  }

  return [true, ""];
};
