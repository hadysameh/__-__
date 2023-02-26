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

function CreateVacationRequest() {
  const navigate = useNavigate();
  const userType = useSelector(selectUserType);

  const loggedOfficerId = useSelector(selectOfficerId);
  const [selectedVacationType, setSelectedVacationType] = useState<any>();
  const [selectedInsteadOfDay, setSelectedInsteadOfDay] = useState<any>();
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const unavailableDataElement = (
    <span className="text-danger"> غير متوفر</span>
  );
  const {
    data: vacationOptions,
    isLoading: isVacationOptionsLoading,
    error,
  } = useQuery("getCreateVacationOptions", getCreateVacationsOptions, {
    staleTime: Infinity,
    cacheTime: 0,
  });

  const {
    data: vacationsCredit,
    isLoading: isVacationsCreditLoading,
    error: vacationsCreditError,
    refetch: refetchVacationsCredit,
  } = useQuery(
    "getOfficerVactionsCredit",
    () => fetchOfficerVacationsCreditInYear(loggedOfficerId, getCurrentYear()),
    {
      staleTime: Infinity,
      cacheTime: 0,
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
            {vacationsCredit ? (
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
                      {vacationsCredit[0]?.remainingErguntVacationsNumber ||
                        vacationsCredit[0]?.erguntVacationsNumber ||
                        unavailableDataElement}
                    </div>
                    <div>
                      الرصيد المتبقي من الاجازات السنوية في النصف الأول:{" "}
                      {vacationsCredit[0]
                        ?.remainingFirstHalfyearlyVacationsDaysNumber ||
                        vacationsCredit[0]
                          ?.firstHalfyearlyVacationsDaysNumber ||
                        unavailableDataElement}
                    </div>
                    <div>
                      الرصيد المتبقي من الاجازات السنوية في النصف الأول:{" "}
                      {vacationsCredit[0]
                        ?.remainingSecondHalfyearlyVacationsDaysNumber ||
                        vacationsCredit[0]
                          ?.secondHalfyearlyVacationsDaysNumber ||
                        unavailableDataElement}
                    </div>
                    <div>
                      ايام تستحق بدل راحة:{" "}
                      {vacationsCredit[0]?.daysToHaveVactionsInsteadOf.length ||
                        unavailableDataElement}
                    </div>
                  </div>
                </>
              )
            ) : (
              <div className="fs-3">لايوجد رصيد اجازات</div>
            )}
          </div>
          <br />
          {vacationsCredit && vacationsCredit.length ? (
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
                          options={vacationsCredit[0].daysToHaveVactionsInsteadOf.map(
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
                    if (
                      selectedVacationType &&
                      selectedVacationType.label ===
                        vacationsTypesEnumInArabic.insteadOfVacation &&
                      !selectedInsteadOfDay
                    ) {
                      alert("الرجاء اختيار يوم بدل الراحة");
                    } else if (!(selectedVacationType?.value && to && from)) {
                      alert("الرجاء التحقق من البيانات المدخلة");
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
