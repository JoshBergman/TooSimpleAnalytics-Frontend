import { IUser } from "../../../../interfaces/user";
import { getInfoFromDate } from "./get-info-from-date";

export const last_x_days = (
  viewDates: IUser["projects"]["x"]["viewDates"],
  xDays: number,
  useYear?: string
): [viewData: number[], labels: string[], lastXViews: number] => {
  const getPastXDaysDates = (): string[] => {
    const today = new Date();
    const dates: string[] = [];

    for (let i = 0; i < xDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
      const day = String(date.getDate()).padStart(2, "0");

      const formattedDate = `${useYear ? useYear : year}/${month}/${day}`;
      dates.unshift(formattedDate);
    }

    return dates;
  };

  const lastXDates = getPastXDaysDates();
  const viewData = lastXDates.map((date) => getInfoFromDate(date, viewDates));
  const labels: string[] = lastXDates.map((date) => date.slice(5));

  let lastXViews = 0;
  viewData.forEach((viewNum) => (lastXViews += viewNum));

  return [viewData, labels, lastXViews];
};
