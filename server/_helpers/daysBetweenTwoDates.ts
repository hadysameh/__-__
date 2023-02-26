function daysBetweenTwoDates(date1: string, date2: string) {
  var date1Obj = new Date(date1);
  var date2Obj = new Date(date2);

  // To calculate the time difference of two dates
  var Difference_In_Time = date2Obj.getTime() - date1Obj.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Difference_In_Days;
}
export default daysBetweenTwoDates;
