import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import HorizontalSpinner from "../../components/HorizontalSpinner";
import { selectOfficerId } from "../../features/auth";
import fetchOfficerVacationsCreditInYear from "../../features/vacationsCredit/serverServices/fetchOfficerVacationsCreditInYear";
import getCurrentYear from "../../_helpers/getCurrentYear";
import { useState, useEffect } from "react";
import socket from "../../services/socket-io";
function MyVacationsCredit() {
  const loggedOfficerId = useSelector(selectOfficerId);
  const [vacationsYear, setVacationsYear] = useState(getCurrentYear());
  const {
    data: officerVacationsCredit,
    isLoading: isVacationsCreditLoading,
    error: vacationsCreditError,
    refetch,
  } = useQuery(
    ["getOfficerVactionsCredit", vacationsYear],
    () => fetchOfficerVacationsCreditInYear(loggedOfficerId, vacationsYear),
    {
      staleTime: Infinity,
      cacheTime: 0,
    }
  );
  console.log({ officerVacationsCredit });
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
        <>
          {officerVacationsCredit.length ? (
            <div className="fs-3">
              <div className="row">
                <div className="col-xl-3 col-lg-6">
                  الرصيد الاساسي من العارضة:{" "}
                  {typeof Number(
                    officerVacationsCredit[0]?.erguntVacationsNumber
                  ) == "number"
                    ? officerVacationsCredit[0]?.erguntVacationsNumber
                    : unavailableDataElement}
                </div>
                <div className="col-xl-3 col-lg-6">
                  الرصيد المتبقي من العارضة:{" "}
                  {typeof Number(
                    officerVacationsCredit[0]?.remainingErguntVacationsNumber
                  ) == "number"
                    ? officerVacationsCredit[0]?.remainingErguntVacationsNumber
                    : unavailableDataElement}
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-xl-3 col-lg-6">
                  الرصيد الاساسي من الاجازات السنوية :{" "}
                  {typeof Number(
                    officerVacationsCredit[0]?.yearlyVacationsDaysNumber
                  ) == "number"
                    ? officerVacationsCredit[0]?.yearlyVacationsDaysNumber
                    : unavailableDataElement}
                </div>
                <div className="col-xl-3 col-lg-6">
                  الرصيد المتبقي من الاجازات السنوية :{" "}
                  {typeof Number(
                    officerVacationsCredit[0]
                      ?.remainingYearlyVacationsDaysNumber
                  ) == "number"
                    ? officerVacationsCredit[0]
                        ?.remainingYearlyVacationsDaysNumber
                    : unavailableDataElement}
                </div>
              </div>
              <br />
              <div>
                ايام تستحق بدل راحة:{" "}
                {officerVacationsCredit[0]?.daysToHaveVactionsInsteadOf
                  .length || unavailableDataElement}
                {officerVacationsCredit[0]?.daysToHaveVactionsInsteadOf.map(
                  (dayToHaveVactionInsteadOf: any) => (
                    <div key={dayToHaveVactionInsteadOf.date}>
                      بدلاً عن يوم :{dayToHaveVactionInsteadOf.date}
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <h1>لا يوجد لك رصيد من الاجازات</h1>
          )}
        </>
      )}
    </>
  );
}
export default MyVacationsCredit;
