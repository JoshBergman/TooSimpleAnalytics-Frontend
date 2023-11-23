import axios from "axios";
import { staticInfo } from "../../static-info";

export const callChangePassword = (
  auth: string | null,
  setAuth: (newAuth: string) => void,
  addNotification: (type: string, msg: string) => void,
  onReqFinish: (success: boolean) => void,
  newPass: string,
  verification: string
) => {
  if (!auth) {
    addNotification("error", "Failed to authenticate, please re-log.");
    return;
  }

  const reqData = {
    password: newPass,
    verification,
  };

  const reqConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  axios
    .post(`${staticInfo.uri}/account/change-password`, reqData, reqConfig)
    .then((response) => {
      if (response.status === 200) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const token = response.data.token;
        setAuth(token as string);
        localStorage.setItem("jwt", token + "");
        addNotification("success", "Password Changed");
        onReqFinish(true);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        addNotification("error", `Error: ${response.data.error}`);
        onReqFinish(false);
      }
    })
    .catch((error) => {
      console.error(error);
      addNotification(
        "error",
        "Error Changing Password. Please try again in one minute."
      );
      onReqFinish(false);
    });
};
