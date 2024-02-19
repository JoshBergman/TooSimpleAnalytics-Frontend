import { project } from "../../../../../../interfaces/user";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO Properly type this monster, originally made in javascript due to types being a pita.

export const get_filtered_viewDates_from_config = (
  viewDatesObj: { [property: string]: any },
  config: { [property: string]: any }
) => {
  const obj = { ...viewDatesObj }; //todo creates copy of viewdates object (Havent tested this it might not xD)
  //these functions mutate appropiate changes onto obj
  filter_viewDates_from_config(obj.viewDates); //Changes the data to represent config rules
  calculate_filtered_view_totals(obj); //adds up the new data that now represents config rules and updates the daily and total view counts

  //   console.log("New Data In Function: ");
  //   console.log(obj);
  //   console.log("Config In FN: ");
  //   console.log(config);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return obj as project;
  function filter_viewDates_from_config(obj: { [property: string]: any }) {
    const filterDayData = (
      sourceObj: { [property: string]: any },
      config: { [property: string]: any }
    ) => {
      const sourceKeys = Object.keys(sourceObj);
      sourceKeys.forEach((key) => {
        if (typeof sourceObj[key] !== "object" && key !== "views") {
          //case when looking at the properties with data
          if (!config) {
            sourceObj[key] = 0;
          }
          if (!config[key]) {
            sourceObj[key] = 0;
          }
        } else {
          //case when looking at another nested object within a date
          if (config[key]) {
            filterDayData(sourceObj[key], config[key]);
          }
        }
      });
    };

    const keys = Object.keys(obj);
    keys.forEach((key) => {
      if (Number.isInteger(parseInt(key))) {
        filter_viewDates_from_config(obj[key]);
      } else {
        filterDayData(obj, config);
      }
    });
  }

  function calculate_filtered_view_totals(configged_view_dates: {
    [property: string]: any;
  }) {
    const getDayViews = (dayData: { [property: string]: any }) => {
      //getDayViews tallies each category and adds it up, it then returns the smallest estimated total views
      // (This total functionality will never fully be accurate as its not practical to store each view session)
      //! FOR ANY NEW CATEGORY OF DATA, IT MUST BE MANUALLY ENTERED HERE ON HOW TO READ THAT CATEGORY
      const addDayViews = (dayData: { [property: string]: any }) => {
        let currTotal = 0;
        for (const property in dayData) {
          if (typeof dayData[property] === "number") {
            currTotal += dayData[property];
          } else {
            currTotal += addDayViews(dayData[property]);
          }
        }

        return currTotal;
      };

      let browserTotal = 0,
        deviceTotal = 0,
        locationsTotal = 0;
      if (dayData.agent) {
        if (dayData.agent.browser) {
          browserTotal = addDayViews(dayData.agent.browser);
        }
        if (dayData.agent.device) {
          deviceTotal = addDayViews(dayData.agent.device);
        }
      }
      if (dayData.locations) {
        locationsTotal = addDayViews(dayData.locations);
      }
      const sortedDayData = [browserTotal, deviceTotal, locationsTotal].sort(
        (a, b) => a - b
      );
      const smallest = sortedDayData[0];

      return smallest;
    };

    let total = 0;
    const viewDates = configged_view_dates.viewDates;
    for (const year in viewDates) {
      for (const month in viewDates[year]) {
        for (const day in viewDates[year][month]) {
          const dayData = viewDates[year][month][day];
          if (dayData.views) {
            const dayTotal = getDayViews(dayData);
            viewDates[year][month][day].views = dayTotal;
            total += dayData.views;
          } else {
            // dayData.views = 0;
          }
        }
      }
    }
    configged_view_dates.totalViews = total; //! After the implementation of the queried view dates the totals will no longer be accurate for filtered data, as only
    //! the queried data will be considered
  }
};
