import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import HorizontalSpinner from "../../components/HorizontalSpinner";
import Select from "react-select";
import getCreateVacationsOptions from "../../features/vacations/serverApis/getCreateVacationsOptions";
import storeOrUpdateVacationsCredit from "../../features/vacationsCredit/serverServices/storeOrUpdateVacationsCredit";
import fetchOfficerVacationsCreditInYear from "../../features/vacationsCredit/serverServices/fetchOfficerVacationsCreditInYear";
import { selectOfficerId, selectUserType } from "../../features/auth";
import { useSelector } from "react-redux";
import getCurrentYear from "../../_helpers/getCurrentYear";
import {
  vacationsTypesEnumInArabic,
  IVacationsCreditModelParams,
  userTypesEnum,
} from "../../types";
import storeVacation from "../../features/vacations/serverApis/store";
import socket from "../../services/socket-io";
import calculateDiffreneceBetweenDates from "../../_helpers/calculateDiffreneceBetweenDates";
import getVacations from "../../features/vacations/serverApis/get";
import getTodaysDate from "../../_helpers/getTodaysDate";

function CreateVacationRequest() {
  const navigate = useNavigate();
  const userType = useSelector(selectUserType);

  const loggedOfficerId = useSelector(selectOfficerId);
  const [
    isOfficerAlreadyHasPendingVacationRequestsToday,
    setIsOfficerAlreadyHasPendingVacationRequestsToday,
  ] = useState<boolean>(true);
  const [selectedVacationType, setSelectedVacationType] = useState<any>();
  const [selectedInsteadOfDay, setSelectedInsteadOfDay] = useState<any>();
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [
    remainingErguntVacationsNumber,
    setRemainingErguntVacationsNumber,
  ] = useState(0);
  const [
    remainingYearlyVacationsDaysNumber,
    setOfficerRemainingYearlyVacationsDaysNumber,
  ] = useState(0);

  const unavailableDataElement = (
    <span className="text-danger"> غير متوفر</span>
  );
  //the idea of using this query is if the officer has vacation request that wasn't approved or denied he can't apply for another request
  //becasue 2 parallel requests can be accpeted and that will damage the vacationCredit in database
  const findOfficerPendingVacationsQuery = {
    $and: [
      { branchChiefApproved: { $ne: false } },
      { officersAffairsApproved: { $ne: false } },
      { viceManagerApproved: { $ne: false } },
      { managerApproved: { $nin: [true, false] } },
    ],
    from: { $gte: getTodaysDate() },
    officer: loggedOfficerId,
  };
  const {
    data: myPendingVacations,
    isLoading: isVacationsLoading,
    refetch: refetchPendingVacations,
    isSuccess: isFetchingOfficerPendingVacationDataSucceeded,
  } = useQuery(
    ["fetchPendingVacations"],
    () => getVacations(findOfficerPendingVacationsQuery, 1, 20),
    {
      // staleTime: Infinity,
      // cacheTime: 0,
      onSuccess(data) {
        console.log({ data });
        if (data.length) {
          setIsOfficerAlreadyHasPendingVacationRequestsToday(true);
        } else {
          setIsOfficerAlreadyHasPendingVacationRequestsToday(false);
        }
      },
    }
  );
  const {
    data: vacationOptions,
    isLoading: isVacationOptionsLoading,
    error,
  } = useQuery("getCreateVacationOptions", getCreateVacationsOptions, {
    staleTime: Infinity,
    cacheTime: 0,
    enabled: isFetchingOfficerPendingVacationDataSucceeded,
  });

  const {
    data: officerVacationsCredit,
    isLoading: isVacationsCreditLoading,
    error: vacationsCreditError,
    refetch: refetchVacationsCredit,
  } = useQuery(
    "getOfficerVactionsCredit",
    () => fetchOfficerVacationsCreditInYear(loggedOfficerId, getCurrentYear()),
    {
      staleTime: Infinity,
      cacheTime: 0,
      enabled: isFetchingOfficerPendingVacationDataSucceeded,
      onSuccess(data) {
        if (data.length) {
          setRemainingErguntVacationsNumber(
            Number(data[0].remainingErguntVacationsNumber)
          );
          setOfficerRemainingYearlyVacationsDaysNumber(
            data[0].remainingYearlyVacationsDaysNumber
          );
        }
      },
    }
  );
  useEffect(() => {
    socket.on("refetch-vacations-data", refetchVacationsCredit);
    return () => {
      socket.off("refetch-vacations-data", refetchVacationsCredit);
    };
  }, []);
  const mutation = useMutation(storeVacation, {
    onSuccess: (data, variables, context) => {
      navigate("/vacations/myvacationrequests");
    },
    onError: () => {
      alert("الرجاء التحقق من البيانات المدخلة");
    },
  });

  if (isVacationOptionsLoading) {
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
            <u>إنشاء طلب أجازة </u>
          </div>
          <div>
            {officerVacationsCredit ? (
              isVacationsCreditLoading ? (
                <HorizontalSpinner></HorizontalSpinner>
              ) : (
                <>
                  <div className="fs-4">
                    <div>
                      <u>الرصيد قبل التصديق</u>
                    </div>
                    <div>
                      الرصيد المتبقي من العارضة:{" "}
                      {remainingErguntVacationsNumber}
                    </div>
                    <div>
                      المتبقي من الاجازات السنوية :{" "}
                      {remainingYearlyVacationsDaysNumber}
                    </div>

                    <div>
                      ايام تستحق بدل راحة:{" "}
                      {officerVacationsCredit[0]?.daysToHaveVactionsInsteadOf
                        .length || unavailableDataElement}
                    </div>
                  </div>
                </>
              )
            ) : (
              <div className="fs-3">لايوجد رصيد اجازات</div>
            )}
          </div>
          <br />
          {officerVacationsCredit && officerVacationsCredit.length ? (
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
                    <label className="form-label">نوع الأجازة </label>
                    <Select
                      value={selectedVacationType}
                      onChange={(vacationType: any) => {
                        setSelectedVacationType(vacationType);
                      }}
                      options={vacationOptions.map((vacationType: any) => {
                        return {
                          label: vacationType.vacationType,
                          value: vacationType._id,
                        };
                      })}
                    />
                  </div>
                </div>
              </div>
              {selectedVacationType &&
                selectedVacationType.label ===
                  vacationsTypesEnumInArabic.insteadOfVacation && (
                  <div className="row">
                    <div className="mb-3">
                      <div className="col-5">
                        <label className="form-label">بدلاً عن يوم </label>
                        <Select
                          value={selectedInsteadOfDay}
                          onChange={(vacationType: any) => {
                            setSelectedInsteadOfDay(vacationType);
                          }}
                          options={officerVacationsCredit[0].daysToHaveVactionsInsteadOf.map(
                            (dayToHaveVactionInsteadOf: any) => {
                              return {
                                label: dayToHaveVactionInsteadOf.date,
                                value: dayToHaveVactionInsteadOf.date,
                              };
                            }
                          )}
                          required={true}
                        />
                      </div>
                    </div>
                  </div>
                )}
              <div className="row">
                <div className="mb-3">
                  <div className="col-5">
                    <label className="form-label">تاريخ بداية الأجازة</label>
                    <input
                      type="date"
                      className="form-control fs-4"
                      onChange={(e) => {
                        setFrom(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="col-5">
                    <label className="form-label">تاريخ نهاية الأجازة</label>
                    <input
                      min={from}
                      type="date"
                      className="form-control fs-4"
                      onChange={(e) => {
                        setTo(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary fs-2"
                  onClick={() => {
                    const diffrenceBetweenFromAndToDates = calculateDiffreneceBetweenDates(
                      to,
                      from
                    );
                    if (isOfficerAlreadyHasPendingVacationRequestsToday) {
                      alert(
                        `عفوا لديك بالفعل طلب اجازة جاري الرجاء انتظار الموافقة او الرفض قبل تقديم طلب اخر`
                      );
                    } else if (
                      selectedVacationType &&
                      selectedVacationType.label ===
                        vacationsTypesEnumInArabic.insteadOfVacation &&
                      !selectedInsteadOfDay
                    ) {
                      alert("الرجاء اختيار يوم بدل الراحة");
                    } else if (!(selectedVacationType?.value && to && from)) {
                      alert(
                        "الرجاء اكمال البيانات المطلوبة او التحقق من البيانات المدخلة"
                      );
                    } else if (
                      selectedVacationType.label ===
                        vacationsTypesEnumInArabic.ergunt &&
                      Number(
                        officerVacationsCredit[0].remainingErguntVacationsNumber
                      ) === 0
                    ) {
                      alert("لا يوجد لك رصيد متبقي من العارضة");
                    } else if (
                      selectedVacationType.label ===
                        vacationsTypesEnumInArabic.ergunt &&
                      diffrenceBetweenFromAndToDates > 0
                    ) {
                      alert("طلب الاجازة العارضة لا يمكن ان يكون اكثر من يوم");
                    } else if (diffrenceBetweenFromAndToDates < 0) {
                      alert(
                        "تاريخ النهاية يجب إن يكون بعد او يساوى تاريخ البداية"
                      );
                    } else if (
                      selectedVacationType.label ===
                        vacationsTypesEnumInArabic.yearly &&
                      Number(
                        officerVacationsCredit[0]
                          .remainingYearlyVacationsDaysNumber
                      ) < diffrenceBetweenFromAndToDates
                    ) {
                      alert("لا يوجد لك رصيد متبقي من الاجازات السنوية");
                    } else {
                      const objToStore: any = {
                        type: selectedVacationType.value,
                        to,
                        from,
                        insteadOf: selectedInsteadOfDay?.label || null,
                        officer: loggedOfficerId,
                      };
                      if (userType === userTypesEnum.branchChief) {
                        objToStore["branchChiefApproved"] = true;
                      } else if (userType === userTypesEnum.officersAffairs) {
                        objToStore["branchChiefApproved"] = true;
                        objToStore["officersAffairsApproved"] = true;
                      } else if (userType === userTypesEnum.viceManager) {
                        objToStore["viceManagerApproved"] = true;
                      }

                      mutation.mutate(objToStore);
                    }
                  }}
                >
                  إنشاء
                </button>
              </div>
            </form>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}
export default CreateVacationRequest;
