import axios from "axios";
import { staticInfo } from "../../static-info";

export const createVerification = (
  addNotification: (type: string, msg: string) => void,
  onReqFinish: (success: boolean) => void,
  email: string
) => {
  const reqData = {
    email,
  };

  axios
    .post(`${staticInfo.uri}/account/create-verification`, reqData)
    .then((response) => {
      if (response.status === 200) {
        onReqFinish(true);
      } else {
        onReqFinish(false);
        addNotification(
          "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `Error verifying: ${response.data.error + ""}`
        );
        return;
      }
    })
    .catch((error) => {
      console.error(error);
      onReqFinish(false);
      addNotification(
        "error",
        "Error verifying. Please try again in one minute."
      );
    });
};
