export const getElapsedQueryDate = (
  startDate: Date,
  daysAgo: number,
  targetYear: number
) => {
  const msInADay = 86400000;
  const msInAYear = 31557600000;
  const msDaysAgo = msInADay * daysAgo;
  const msYearAgo = (startDate.getFullYear() - targetYear) * msInAYear;

  const earlyDate = startDate.getTime() - (msDaysAgo + msYearAgo);
  return new Date(earlyDate);
};
