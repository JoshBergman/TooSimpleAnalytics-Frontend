import axios from "axios";
import { staticInfo } from "../../static-info";

export const signup = (
  setAuth: (newAuth: string) => void,
  addNotification: (type: string, msg: string) => void,
  onReqFinish: (success: boolean) => void,
  email: string,
  password: string
) => {
  const reqData = {
    email,
    password,
  };

  axios
    .post(`${staticInfo.uri}/account/create`, reqData)
    .then((response) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const token = response.data.token;
      if (response.status === 200) {
        setAuth(token as string);
        localStorage.setItem("jwt", token + "");
        onReqFinish(true);
      } else {
        onReqFinish(false);
        addNotification(
          "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `Error signing up: ${response.data.message}`
        );
        return;
      }
    })
    .catch((error) => {
      console.error(error);
      onReqFinish(false);
      addNotification(
        "error",
        "Error signing up. Please try again in one minute."
      );
    });
};
