import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import HorizontalSpinner from "../../components/HorizontalSpinner";
import { selectOfficerId } from "../../features/auth";
import fetchOfficerVacationsCreditInYear from "../../features/vacationsCredit/serverServices/fetchOfficerVacationsCreditInYear";
import getCurrentYear from "../../_helpers/getCurrentYear";
import { useState ,useEffect} from "react";
import socket from "../../services/socket-io";
function MyVacationsCredit() {
  const loggedOfficerId = useSelector(selectOfficerId);
  const [vacationsYear, setVacationsYear] = useState(getCurrentYear());
  const {
    data: vacationsCredit,
    isLoading: isVacationsCreditLoading,
    error: vacationsCreditError,
    refetch
  } = useQuery(
    ["getOfficerVactionsCredit", vacationsYear],
    () => fetchOfficerVacationsCreditInYear(loggedOfficerId, vacationsYear),
    {
      staleTime: Infinity,
      cacheTime: 0,
    }
  );
  const unavailableDataElement = (
    <span className="text-danger"> غير متوفر</span>
  );
  useEffect(() => {
    socket.on("refetch-vacations-data", refetch);
    return () => {
      socket.off("refetch-vacations-data", refetch);
    };
  }, []);
  return (
    <>
      <div className="mb-3">
        <div className="col-5">
          <label className="form-label fs-3">السنة</label>
          <input
            type="number"
            className="form-control fs-4"
            onChange={(e) => {
              setVacationsYear(e.target.value);
            }}
            defaultValue={vacationsYear}
          />
        </div>
      </div>
      {isVacationsCreditLoading ? (
        <HorizontalSpinner />
      ) : (
        <div className="fs-3">
          <div>
            الرصيد المتبقي من العارضة:{" "}
            {vacationsCredit[0]?.erguntVacationsNumber ||
              unavailableDataElement}
          </div>
          <div>
            الرصيد المتبقي من الاجازات السنوية في النصف الأول:{" "}
            {vacationsCredit[0]?.firstHalfyearlyVacationsDaysNumber ||
              unavailableDataElement}
          </div>
          <div>
            الرصيد المتبقي من الاجازات السنوية في النصف الأول:{" "}
            {vacationsCredit[0]?.secondHalfyearlyVacationsDaysNumber ||
              unavailableDataElement}
          </div>
          <div>
            ايام تستحق بدل راحة:{" "}
            {vacationsCredit[0]?.daysToHaveVactionsInsteadOf.length ||
              unavailableDataElement}
            {vacationsCredit[0]?.daysToHaveVactionsInsteadOf.map(
              (dayToHaveVactionInsteadOf: any) => (
                <div key={dayToHaveVactionInsteadOf.date}>
                  بدلاً عن يوم :{dayToHaveVactionInsteadOf.date}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default MyVacationsCredit;
