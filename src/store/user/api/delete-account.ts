import axios from "axios";
import { staticInfo } from "../../static-info";

export const deleteAccount = (
  setAuth: (newAuth: string | null) => void,
  addNotification: (type: string, msg: string) => void,
  auth: string | null
) => {
  if (!auth) {
    return;
  }

  const reqConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  axios
    .post(`${staticInfo.uri}/account/delete-account`, {}, reqConfig)
    .then((response) => {
      if (response.status === 200) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        setAuth(null);
        localStorage.removeItem("jwt");
        addNotification(
          "success",
          "Successfully deleted account and all related data. We'll miss you!"
        );
      } else {
        addNotification(
          "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `Failed to delete account: ${response.data.error}`
        );
        return;
      }
    })
    .catch((error) => {
      console.error(error);
      addNotification(
        "error",
        "Error deleting account. Please try again in one minute."
      );
    });
};
