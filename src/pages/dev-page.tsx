//dev page is used by devs to test features do not include in production
import { useContext } from "react";
import { AppStateContext } from "../store/app-state/app-state-context";
import Header from "../components/UI/header/header";

const DevPage = () => {
  const appStateCTX = useContext(AppStateContext);

  const addNotificationHandler = (type: string, msg: string) => {
    appStateCTX.appState.addNotification(type, msg);
  };

  return (
    <div>
      <Header />
      Welcome to the DEV PAGE!!!
      <button onClick={() => addNotificationHandler("error", "Error Popup!")}>
        Add Error Notifciation
      </button>
      <button onClick={() => addNotificationHandler("info", "Info Popup")}>
        Add Info Notifciation
      </button>
      <button
        onClick={() => addNotificationHandler("success", "Successful action!")}
      >
        Add Success Notifciation
      </button>
    </div>
  );
};

export default DevPage;
