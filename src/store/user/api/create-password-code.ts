import axios from "axios";
import { staticInfo } from "../../static-info";

export const callPasswordVerification = (
  auth: string | null,
  addNotification: (type: string, msg: string) => void
) => {
  if (!auth) {
    addNotification("error", "Failed to authenticate, please re-log.");
    return;
  }

  const reqConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  axios
    .post(`${staticInfo.uri}/account/password-verify`, {}, reqConfig)
    .then((response) => {
      if (response.status === 200) {
        addNotification(
          "success",
          `A password verification code has been sent to your email.`
        );
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        addNotification("error", `Error: ${response.data.error}`);
      }
    })
    .catch((error) => {
      console.error(error);
      addNotification(
        "error",
        "Error sending password change verification. Please try again in one minute."
      );
    });
};
