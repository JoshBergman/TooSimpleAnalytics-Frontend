export const getDatesArray = (): string[] => {
  const currentDate = new Date();
  const datesArray: string[] = [];

  // Push the current date
  datesArray.push(formatDate(currentDate));

  // Push the previous 6 days
  for (let i = 1; i <= 6; i++) {
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - i);
    datesArray.unshift(formatDate(previousDate));
  }

  return datesArray;
};

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  return `${year}/${month}/${day}`;
}
