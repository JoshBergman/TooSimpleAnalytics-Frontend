export const addSiteView = () => {
  const milliseconds_Until_Next_View_Counts = 86400000; //1 day in milliseconds
  const viewUrl =
    "https://tsa-real-765f9ae13226.herokuapp.com/analytic/view/waOVG6gLds1700055514-Too-Simple-Analytics";

  const saveDate = () => {
    const thisDateAsString = new Date().getTime() + "";
    localStorage.setItem("viewed", thisDateAsString);
  };

  const retrieveLastViewDate = () => {
    const storedValue = localStorage.getItem("viewed");
    if (storedValue == null) {
      return 0;
    }
    const storedDate = parseInt(storedValue);
    return storedDate;
  };

  const getNextViewTime = () => {
    const lastViewTime = retrieveLastViewDate();
    const timeTillNextView = lastViewTime + milliseconds_Until_Next_View_Counts;
    return timeTillNextView;
  };

  const nextViewTime = getNextViewTime();
  const currentTime = new Date().getTime();

  if (currentTime >= nextViewTime) {
    try {
      //fetches view, then saves the time the view was added to local storage
      fetch(viewUrl).catch(() => {});
      saveDate();
    } catch (err) {
      console.error(err);
    }
  }
};
