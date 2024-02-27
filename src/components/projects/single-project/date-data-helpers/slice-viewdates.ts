import { IUser } from "../../../../interfaces/user";
import { cloneObject } from "../single-project-components/sort/helpers/clone-object";

export const sliceViewDates = (
  viewDates: IUser["projects"]["x"]["viewDates"],
  days: number,
  year: string
) => {
  const useYear = parseInt(year);
  const currYear = new Date().getFullYear();
  const returnViewDates: IUser["projects"]["x"]["viewDates"] = {};

  if (typeof viewDates !== "object") {
    return {};
  }

  if (useYear === currYear) {
    const today = new Date();
    for (let i = 0; i < days; i++) {
      const year = today.getFullYear();
      const month = today.getMonth() + 1; //viewdates isnt 0 indexed for month like date object is
      const day = today.getDate();

      if (
        viewDates[year] &&
        viewDates[year][month] &&
        viewDates[year][month][day]
      ) {
        //if viewDate has stored information for the day
        if (!returnViewDates[year]) {
          returnViewDates[year] = {};
        }
        if (!returnViewDates[year][month]) {
          returnViewDates[year][month] = {};
        }
        const viewDateDay = viewDates[year][month][day];
        returnViewDates[year][month][day] =
          typeof viewDateDay === "object"
            ? cloneObject(viewDateDay)
            : viewDateDay;
      }

      today.setDate(day - 1);
    }
  } else {
    returnViewDates[useYear] = cloneObject(viewDates[useYear]);
  }

  return returnViewDates;
};
