import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import HorizontalSpinner from "../../components/HorizontalSpinner";
import getOfficers from "../../features/officers/serverServices/get";
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
  } = useQuery("fetchOfficers", getOfficers, {
    staleTime: Infinity,
    cacheTime: 0,
  });
  const {
    data: officerVacationsCredit,
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
                      ? officerVacationsCredit[0]
                          ?.remainingErguntVacationsNumber
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
              <h1>
                لا يوجد رصيد من الاجازات للضابط في عام {vacationsCreditYear}
              </h1>
            )}
          </>
        ))}
    </div>
  );
}
export default OfficersVacationsCredit;
