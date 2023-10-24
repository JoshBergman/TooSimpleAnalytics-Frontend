// Notifications are the informational pop-ups for errors, success msgs, and/or additional information
// currently this is mounted to the header and may require some refactoring to be re-usable
import { useContext } from "react";
import { AppStateContext } from "../../../store/app-state/app-state-context";

import styles from "./styles/notifications.module.css";

const Notifications = () => {
  const notifications = useContext(AppStateContext).appState.notifications;
  //notifications === [type of notification ("info", "error", "success"), msg][]

  const renderNotifications = (): React.ReactNode[] => {
    const renderedNotifications: React.ReactNode[] = [];

    for (let i = 0; i < notifications.length; i++) {
      const thisNotificationType = notifications[i][0];
      const thisNotificationMsg = notifications[i][1];
      const thisNotificationID = notifications[i][2];
      renderedNotifications.push(
        <div
          className={styles[`notification-${thisNotificationType}`]}
          key={thisNotificationID}
        >
          {thisNotificationMsg}
        </div>
      );
    }
    return renderedNotifications;
  };
  return (
    <div className={styles.notificationsContainer}>{renderNotifications()}</div>
  );
};

export default Notifications;
