const calculateDiffreneceBetweenDates = (date1: string, date2: string) => {
  const date_1 = new Date(date1);
  const date_2 = new Date(date2);
  const difference = date_1.getTime() - date_2.getTime();
  return Math.ceil(difference / (1000 * 3600 * 24));
};

export default calculateDiffreneceBetweenDates;
