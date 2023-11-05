export const staticInfo = {
  uri: "https://tsa-real-765f9ae13226.herokuapp.com",
};

export const get_connect_methods = (
  connect_method: string,
  projLink: string,
  keys?: boolean
) => {
  const connect_methods: { [index: string]: React.ReactNode } = {
    "Recommended (JS)": `export const addSiteView = () => {
  const milliseconds_Until_Next_View_Counts = 86400000; //1 day in milliseconds
  const viewUrl = "${projLink}";

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
      fetch(viewUrl);
      saveDate();
    } catch (err) {
      console.error(err);
    }
  }
};`,
    "Raw Link": `${projLink}`,
  };

  if (keys) {
    return Object.keys(connect_methods);
  }

  return connect_methods[connect_method];
};
