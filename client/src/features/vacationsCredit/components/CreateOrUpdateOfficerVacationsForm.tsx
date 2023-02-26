import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import HorizontalSpinner from "../../../components/HorizontalSpinner";
import Select from "react-select";
import get from "../../officers/serverServices/get";
import storeOrUpdateVacationsCredit from "../serverServices/storeOrUpdateVacationsCredit";
import getCurrentYear from "../../../_helpers/getCurrentYear";
import fetchOfficerVacationsCreditInYear from "../serverServices/fetchOfficerVacationsCreditInYear";
import socket from "../../../services/socket-io";

function CreatOrUpdateOfficerVacationsForm() {
  const navigate = useNavigate();

  const [vacationsCreditYear, setvacationsCreditYear] = useState(
    getCurrentYear()
  );
  const [selectedOfficer, setSelectedOfficer] = useState<{
    value: any;
    label: any;
  }>();
  const [erguntVacationsNumber, setErguntVacationsNumber] = useState<any>(0);
  const [
    firstHalfyearlyVacationsDaysNumber,
    setFirstyearlyVacationsDaysNumber,
  ] = useState<any>(0);
  const [
    secondHalfyearlyVacationsDaysNumber,
    setSecondyearlyVacationsDaysNumber,
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
  } = useQuery("fetchOfficers", get, {
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
        if (data) {
          setErguntVacationsNumber(data[0]?.erguntVacationsNumber);
          setFirstyearlyVacationsDaysNumber(
            data[0]?.firstHalfyearlyVacationsDaysNumber
          );
          setSecondyearlyVacationsDaysNumber(
            data[0]?.secondHalfyearlyVacationsDaysNumber
          );
          setDaysToHaveVactionsInsteadOf(
            data[0]?.daysToHaveVactionsInsteadOf || []
          );
        }
      },
    }
  );

  useEffect(() => {
    socket.on("refetch-vacations-data", refetchOfficerVacationsCreditData);
    return () => {
      socket.off("refetch-vacations-data", refetchOfficerVacationsCreditData);
    };
  }, []);
  const mutation = useMutation(storeOrUpdateVacationsCredit, {
    onSuccess: (data, variables, context) => {
      navigate("/vacations/");
    },
    onError: () => {
      alert("الرجاء التحقق من البيانات المدخلة");
    },
  });

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
        <div className="border m-4 p-4">
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
                      setvacationsCreditYear(e.target.value);
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
                            defaultValue={
                              officerVacationsCreditData[0]
                                ?.erguntVacationsNumber
                            }
                            onChange={(e) => {
                              setErguntVacationsNumber(Number(e.target.value));
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
                            defaultValue={
                              officerVacationsCreditData[0]
                                ?.remainingErguntVacationsNumber ||
                              officerVacationsCreditData[0]
                                ?.erguntVacationsNumber
                            }
                            onChange={(e) => {
                              setErguntVacationsNumber(Number(e.target.value));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-5">
                          <label className="form-label">
                            رصيد الاجازات السنوية الاساسي في النصف الاول
                          </label>
                          <input
                            type="number"
                            max={15}
                            min={0}
                            defaultValue={
                              officerVacationsCreditData[0]
                                ?.firstHalfyearlyVacationsDaysNumber
                            }
                            className="form-control fs-4"
                            onChange={(e) => {
                              setFirstyearlyVacationsDaysNumber(
                                Number(e.target.value)
                              );
                            }}
                          />
                        </div>
                        <div className="col-5">
                          <label className="form-label">
                            رصيد الاجازات السنوية المتبقي في النصف الاول
                          </label>
                          <input
                            type="number"
                            max={15}
                            min={0}
                            defaultValue={
                              officerVacationsCreditData[0]
                                ?.remainingFirstHalfyearlyVacationsDaysNumber ||
                              officerVacationsCreditData[0]
                                ?.firstHalfyearlyVacationsDaysNumber
                            }
                            className="form-control fs-4"
                            onChange={(e) => {
                              setFirstyearlyVacationsDaysNumber(
                                Number(e.target.value)
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-5">
                          <label className="form-label">
                            رصيد الاجازات السنويةالاساسي في النصف الثاني
                          </label>
                          <input
                            type="number"
                            max={15}
                            min={0}
                            defaultValue={
                              officerVacationsCreditData[0]
                                ?.secondHalfyearlyVacationsDaysNumber
                            }
                            className="form-control fs-4"
                            onChange={(e) => {
                              setSecondyearlyVacationsDaysNumber(
                                Number(e.target.value)
                              );
                            }}
                          />
                        </div>
                        <div className="col-5">
                          <label className="form-label">
                            رصيد الاجازات السنوية المتبقي في النصف الثاني
                          </label>
                          <input
                            type="number"
                            max={15}
                            min={0}
                            defaultValue={
                              officerVacationsCreditData[0]
                                ?.remainingSecondHalfyearlyVacationsDaysNumber ||
                              officerVacationsCreditData[0]
                                ?.secondHalfyearlyVacationsDaysNumber
                            }
                            className="form-control fs-4"
                            onChange={(e) => {
                              setSecondyearlyVacationsDaysNumber(
                                Number(e.target.value)
                              );
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
                                  // value={daysToHaveVactionsInsteadOf[index].date}
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
                      firstHalfyearlyVacationsDaysNumber &&
                      secondHalfyearlyVacationsDaysNumber &&
                      erguntVacationsNumber
                    )
                  ) {
                    alert("الرجاء التحقق من البيانات المدخلة");
                  } else {
                    mutation.mutate({
                      year: vacationsCreditYear,
                      officerId: selectedOfficer.value,
                      erguntVacationsNumber,
                      firstHalfyearlyVacationsDaysNumber,
                      secondHalfyearlyVacationsDaysNumber,
                      daysToHaveVactionsInsteadOf,
                    });
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
