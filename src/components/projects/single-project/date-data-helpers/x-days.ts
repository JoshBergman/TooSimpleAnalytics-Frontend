import { IUser } from "../../../../interfaces/user";
import { getInfoFromDate } from "./get-info-from-date";

export const last_x_days = (
  viewDates: IUser["projects"]["x"]["viewDates"],
  xDays: number,
  viewingYear?: string
): [viewData: number[], labels: string[], lastXViews: number] => {
  const currYear = new Date().getFullYear();
  const viewYear = viewingYear ? parseInt(viewingYear) : currYear;
  const isViewingCurrentYear = currYear === viewYear;

  const lastXDates = isViewingCurrentYear
    ? getPastXDaysDates()
    : getDaysDatesFromYear(viewYear); //see functions for explanation
  const viewData = lastXDates.map((date) => getInfoFromDate(date, viewDates));
  const labels: string[] = lastXDates.map((date) => date.slice(5));

  let lastXViews = 0;
  viewData.forEach((viewNum) => (lastXViews += viewNum));

  return [viewData, labels, lastXViews];

  //when looking at previous years, this function will render all of the days for the year,
  //vs pastXDays fn, will be based off the current date and not accurately show previous years views
  function getDaysDatesFromYear(useYear: number): string[] {
    const startDate = new Date(useYear, 0, 0);
    const endDateTime = new Date(useYear + 1, 0, 0).getTime();
    const dates: string[] = [];

    while (startDate.getTime() < endDateTime) {
      startDate.setDate(startDate.getDate() + 1); //goes to the next day

      const year = startDate.getFullYear();
      const month = String(startDate.getMonth() + 1); // Month is 0-indexed
      const day = String(startDate.getDate());

      const formattedDate = `${year}/${month}/${day}`;
      dates.push(formattedDate);
    }

    return dates;
  }

  //gets the past x amount of days, important for labels to have all dates
  function getPastXDaysDates(): string[] {
    const today = new Date();
    const dates: string[] = [];

    for (let i = 0; i < xDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1); // Month is 0-indexed
      const day = String(date.getDate());

      const formattedDate = `${year}/${month}/${day}`;
      dates.unshift(formattedDate);
    }

    return dates;
  }
};
