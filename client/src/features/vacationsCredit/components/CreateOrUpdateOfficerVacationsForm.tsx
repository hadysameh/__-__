import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import HorizontalSpinner from "../../../components/HorizontalSpinner";
import Select from "react-select";
import getOfficers from "../../officers/serverServices/get";
import storeOrUpdateVacationsCredit from "../serverServices/storeOrUpdateVacationsCredit";
import getCurrentYear from "../../../_helpers/getCurrentYear";
import fetchOfficerVacationsCreditInYear from "../serverServices/fetchOfficerVacationsCreditInYear";
import socket from "../../../services/socket-io";

function CreatOrUpdateOfficerVacationsForm() {
  const navigate = useNavigate();

  const [vacationsCreditYear, setVacationsCreditYear] = useState(
    getCurrentYear()
  );
  const [selectedOfficer, setSelectedOfficer] = useState<{
    value: any;
    label: any;
  }>();
  const [
    officerErguntVacationsNumber,
    setOfficerErguntVacationsNumber,
  ] = useState<any>(0);
  const [
    officerRemainingErguntVacationsNumber,
    setOfficerRemainingErguntVacationsNumber,
  ] = useState<any>(0);
  const [
    officerYearlyVacationsDaysNumber,
    setOfficerYearlyVacationsDaysNumber,
  ] = useState<any>(0);
  const [
    officerRemainingYearlyVacationsDaysNumber,
    setOfficerRemainingYearlyVacationsDaysNumber,
  ] = useState<any>(0);

  const [
    daysToHaveVactionsInsteadOf,
    setDaysToHaveVactionsInsteadOf,
  ] = useState<
    {
      date: string;
    }[]
  >([]);

  const {
    data: officersData,
    isLoading: isOfficersDataLoading,
    error: fetchingOfficersError,
  } = useQuery("fetchOfficers", getOfficers, {
    staleTime: Infinity,
    cacheTime: 0,
  });
  const {
    data: officerVacationsCreditData,
    isLoading: isOfficerVacationsCreditDataLoading,
    error: fetchingVacationsCreditError,
    refetch: refetchOfficerVacationsCreditData,
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
      onSuccess(data) {
        if (data.length) {
          setOfficerErguntVacationsNumber(data[0]?.erguntVacationsNumber);

          setOfficerRemainingErguntVacationsNumber(
            data[0].remainingErguntVacationsNumber
          );

          setOfficerYearlyVacationsDaysNumber(
            data[0]?.yearlyVacationsDaysNumber
          );
          setOfficerRemainingYearlyVacationsDaysNumber(
            data[0]?.remainingYearlyVacationsDaysNumber
          );

          setDaysToHaveVactionsInsteadOf(
            data[0]?.daysToHaveVactionsInsteadOf || []
          );
        } else {
          setOfficerErguntVacationsNumber(0);
          setOfficerRemainingErguntVacationsNumber(0);
          setOfficerYearlyVacationsDaysNumber(0);
          setOfficerRemainingYearlyVacationsDaysNumber(0);
          setDaysToHaveVactionsInsteadOf([]);
        }
      },
    }
  );
  useEffect(() => {
    socket.on("refetch-vacations-data", refetchOfficerVacationsCreditData);
    return () => {
      socket.off("refetch-vacations-data", refetchOfficerVacationsCreditData);
    };
  });
  const mutation = useMutation(storeOrUpdateVacationsCredit, {
    onSuccess: (data, variables, context) => {
      navigate("/vacations/");
    },
    onError: () => {
      alert("الرجاء التحقق من البيانات المدخلة");
    },
  });

  // useEffect(() => {
  //   if (!isOfficersDataLoading && !officerVacationsCreditData.length) {
  //     setOfficerRemainingErguntVacationsNumber(officerErguntVacationsNumber);
  //     setOfficerRemainingYearlyVacationsDaysNumber(
  //       officerYearlyVacationsDaysNumber
  //     );
  //   }
  // }, [
  //   officerErguntVacationsNumber,
  //   officerYearlyVacationsDaysNumber,
  //   secondHalfyearlyVacationsDaysNumber,
  // ]);

  if (isOfficersDataLoading) {
    return (
      <>
        <br />
        <HorizontalSpinner></HorizontalSpinner>
      </>
    );
  } else {
    return (
      <>
        <div
          className="border m-4 p-4"
          key={vacationsCreditYear + vacationsCreditYear}
        >
          <div className="fs-2">
            <u>تعديل او اضافة ارصدة الاجازات </u>
          </div>

          <br />
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="fs-3"
          >
            <div className="row">
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
            </div>
            <div className="row">
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
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-5">
                          <label className="form-label">
                            رصيد الأجازات الأساسي من العارضة
                          </label>
                          <input
                            type="number"
                            className="form-control fs-4"
                            min={0}
                            value={officerErguntVacationsNumber}
                            onChange={(e) => {
                              const newOfficerErguntVacationsNumber = Number(
                                e.target.value
                              );
                              if (
                                newOfficerErguntVacationsNumber <
                                officerRemainingErguntVacationsNumber
                              ) {
                                alert(
                                  `الرصيد المتبقي لايمكن ان يكون اكبر من الرصيد الاساسي`
                                );
                              } else {
                                setOfficerErguntVacationsNumber(
                                  newOfficerErguntVacationsNumber
                                );
                              }
                            }}
                          />
                        </div>
                        <div className="col-5">
                          <label className="form-label">
                            رصيد الأجازات المتبقي من العارضة
                          </label>
                          <input
                            type="number"
                            className="form-control fs-4"
                            min={0}
                            max={officerErguntVacationsNumber}
                            value={officerRemainingErguntVacationsNumber}
                            onChange={(e) => {
                              const newOfficerRemainingErguntVacationsNumber = Number(
                                e.target.value
                              );
                              if (
                                newOfficerRemainingErguntVacationsNumber >
                                officerErguntVacationsNumber
                              ) {
                                alert(
                                  `الرصيد المتبقي لايمكن ان يكون اكبر من الرصيد الاساسي`
                                );
                              } else {
                                setOfficerRemainingErguntVacationsNumber(
                                  newOfficerRemainingErguntVacationsNumber
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-5">
                          <label className="form-label">
                            رصيد الاجازات السنوية الاساسي
                          </label>
                          <input
                            type="number"
                            min={0}
                            value={officerYearlyVacationsDaysNumber}
                            className="form-control fs-4"
                            onChange={(e) => {
                              const newOfficerYearlyVacationsDaysNumber = Number(
                                e.target.value
                              );
                              if (
                                newOfficerYearlyVacationsDaysNumber <
                                officerRemainingYearlyVacationsDaysNumber
                              ) {
                                alert(
                                  `الرصيد المتبقي لايمكن ان يكون اكبر من الرصيد الاساسي`
                                );
                              } else {
                                setOfficerYearlyVacationsDaysNumber(
                                  newOfficerYearlyVacationsDaysNumber
                                );
                              }
                            }}
                          />
                        </div>
                        <div className="col-5">
                          <label className="form-label">
                            رصيد الاجازات السنوية المتبقي
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={officerYearlyVacationsDaysNumber}
                            value={officerRemainingYearlyVacationsDaysNumber}
                            className="form-control fs-4"
                            onChange={(e) => {
                              const newOfficerRemainingYearlyVacationsDaysNumber = Number(
                                e.target.value
                              );
                              if (
                                newOfficerRemainingYearlyVacationsDaysNumber >
                                officerYearlyVacationsDaysNumber
                              ) {
                                alert(
                                  `الرصيد المتبقي لايمكن ان يكون اكبر من الرصيد الاساسي`
                                );
                              } else {
                                setOfficerRemainingYearlyVacationsDaysNumber(
                                  newOfficerRemainingYearlyVacationsDaysNumber
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label"> ايام تستحق بدل راحة</label>

                      <div className="col-5">
                        {daysToHaveVactionsInsteadOf &&
                          daysToHaveVactionsInsteadOf.map(
                            (dayToHaveVactionInsteadOf, index) => (
                              <div
                                className="my-2 d-flex"
                                key={
                                  JSON.stringify(dayToHaveVactionInsteadOf) +
                                  index
                                }
                              >
                                <input
                                  type="date"
                                  className="form-control fs-4"
                                  defaultValue={
                                    daysToHaveVactionsInsteadOf[index].date
                                  }
                                  onChange={(e) => {
                                    const newDaysToHaveVactionsInsteadOf = daysToHaveVactionsInsteadOf;
                                    newDaysToHaveVactionsInsteadOf[index] = {
                                      date: e.target.value,
                                    };

                                    setDaysToHaveVactionsInsteadOf(
                                      newDaysToHaveVactionsInsteadOf
                                    );
                                  }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger fs-3 mx-2"
                                  onClick={() => {
                                    setDaysToHaveVactionsInsteadOf(
                                      (daysToHaveVactionsInsteadOf) =>
                                        daysToHaveVactionsInsteadOf.filter(
                                          (_, sidx) => index !== sidx
                                        )
                                    );
                                  }}
                                >
                                  حذف
                                </button>
                              </div>
                            )
                          )}

                        <br />
                        <button
                          type="button"
                          className="btn btn-lg btn-success fs-3"
                          onClick={() => {
                            setDaysToHaveVactionsInsteadOf(
                              (daysToHaveVactionsInsteadOf) =>
                                daysToHaveVactionsInsteadOf.concat([
                                  { date: "" },
                                ])
                            );
                          }}
                        >
                          اضافة يوم بدل راحة
                        </button>
                      </div>
                    </div>
                  </>
                ))}
            </div>

            <br />
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary fs-2"
                onClick={() => {
                  if (
                    !(
                      selectedOfficer?.value &&
                      // firstHalfyearlyVacationsDaysNumber &&
                      // secondHalfyearlyVacationsDaysNumber &&
                      officerErguntVacationsNumber
                    )
                  ) {
                    alert("الرجاء التحقق من البيانات المدخلة");
                  } else {
                    const dataToStore = {
                      year: vacationsCreditYear,
                      officerId: selectedOfficer.value,
                      erguntVacationsNumber: officerErguntVacationsNumber,
                      remainingErguntVacationsNumber: officerRemainingErguntVacationsNumber,
                      yearlyVacationsDaysNumber: officerYearlyVacationsDaysNumber,
                      remainingYearlyVacationsDaysNumber: officerRemainingYearlyVacationsDaysNumber,
                      daysToHaveVactionsInsteadOf,
                    };

                    mutation.mutate(dataToStore);
                  }
                }}
              >
                إنشاء
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
export default CreatOrUpdateOfficerVacationsForm;
