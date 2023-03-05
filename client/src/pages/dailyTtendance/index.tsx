import { useQuery } from "react-query";
import getAttendance from "../../features/attendance/serverServices/getAttendance";

function DailyAttendance() {
  const {
    data: dailyAttendance,
    isLoading: isErrandsLoading,
    error,
    refetch,
  } = useQuery(["dailyAttendance"], getAttendance, {
    staleTime: Infinity,
    cacheTime: 0,
  });
  console.log({ dailyAttendance });
  return <></>;
}
export default DailyAttendance;
