import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import HorizontalSpinner from "../../components/HorizontalSpinner";
import fetchOfficers from "../../features/officers/serverServices/fetchOfficers";
import fetchOfficerVacationsCreditInYear from "../../features/vacationsCredit/serverServices/fetchOfficerVacationsCreditInYear";
import socket from "../../services/socket-io";
import getCurrentYear from "../../_helpers/getCurrentYear";

function OfficersVacationsCredit() {
  const [pageNumber, setSetpageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [selectedOfficer, setSelectedOfficer] = useState<any>();
  const [vacationsCreditYear, setVacationsCreditYear] = useState<any>(
    getCurrentYear
  );

  const {
    data: officersData,
    isLoading: isOfficersDataLoading,
    error: fetchingOfficersError,
  } = useQuery("fetchOfficers", fetchOfficers, {
    staleTime: Infinity,
    cacheTime: 0,
  });
  const {
    data: officerVacationsCreditData,
    isLoading: isOfficerVacationsCreditDataLoading,
    error: fetchingVacationsCreditError,
    refetch: refetchOfficerVacationsCredit,
  } = useQuery(
    ["fetchOfficerVacationsCredit", selectedOfficer, vacationsCreditYear],
    () =>
      fetchOfficerVacationsCreditInYear(
        selectedOfficer?.value,
        vacationsCreditYear
      ),
    {
      staleTime: Infinity,
      cacheTime: 0,
      enabled: !!selectedOfficer?.value,
    }
  );
  useEffect(() => {
    socket.on("refetch-vacations-data", refetchOfficerVacationsCredit);
    return () => {
      socket.off("refetch-vacations-data", refetchOfficerVacationsCredit);
    };
  }, []);
  const unavailableDataElement = (
    <span className="text-danger"> غير متوفر</span>
  );
  if (isOfficersDataLoading) {
    return (
      <>
        <br />
        <HorizontalSpinner></HorizontalSpinner>
      </>
    );
  }
  return (
    <div className="row fs-3">
      <div className="mb-3">
        <div className="col-5">
          <label className="form-label">الضابط </label>
          <Select
            value={selectedOfficer}
            onChange={(vacationType: any) => {
              setSelectedOfficer(vacationType);
            }}
            options={officersData.map((officerData: any) => {
              return {
                label: officerData.name,
                value: officerData._id,
              };
            })}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className="col-5">
          <label className="form-label">السنة</label>
          <input
            type="number"
            className="form-control fs-4"
            onChange={(e) => {
              setVacationsCreditYear(e.target.value);
            }}
            defaultValue={vacationsCreditYear}
          />
        </div>
      </div>

      {selectedOfficer &&
        (isOfficerVacationsCreditDataLoading ? (
          <HorizontalSpinner />
        ) : (
          <div className="fs-3">
            <div>
              الرصيد المتبقي من العارضة:{" "}
              {officerVacationsCreditData[0]?.erguntVacationsNumber ||
                unavailableDataElement}
            </div>
            <div>
              الرصيد المتبقي من الاجازات السنوية في النصف الأول:{" "}
              {officerVacationsCreditData[0]
                ?.firstHalfyearlyVacationsDaysNumber || unavailableDataElement}
            </div>
            <div>
              الرصيد المتبقي من الاجازات السنوية في النصف الأول:{" "}
              {officerVacationsCreditData[0]
                ?.secondHalfyearlyVacationsDaysNumber || unavailableDataElement}
            </div>
            <div>
              ايام تستحق بدل راحة:{" "}
              {officerVacationsCreditData[0]?.daysToHaveVactionsInsteadOf
                .length || unavailableDataElement}
              {officerVacationsCreditData[0]?.daysToHaveVactionsInsteadOf.map(
                (dayToHaveVactionInsteadOf: any) => (
                  <div key={dayToHaveVactionInsteadOf.date}>
                    بدلاً عن يوم :{dayToHaveVactionInsteadOf.date}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
export default OfficersVacationsCredit;
