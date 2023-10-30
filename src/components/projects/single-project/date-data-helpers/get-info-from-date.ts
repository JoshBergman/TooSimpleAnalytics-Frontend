import { IUser } from "../../../../interfaces/user";

export const getInfoFromDate = (
  date: string,
  viewDates: IUser["projects"]["x"]["viewDates"]
): number => {
  const dates = date.split("/");
  if (
    viewDates &&
    viewDates[dates[0]] &&
    viewDates[dates[0]][dates[1]] &&
    viewDates[dates[0]][dates[1]][dates[2]]
  ) {
    return viewDates[dates[0]][dates[1]][dates[2]];
  }
  return 0;
};
