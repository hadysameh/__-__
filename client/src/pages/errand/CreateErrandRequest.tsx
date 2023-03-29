import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import HorizontalSpinner from "../../components/HorizontalSpinner";
import { selectOfficerId, selectUserType } from "../../features/auth";
import { useSelector } from "react-redux";
import getCurrentYear from "../../_helpers/getCurrentYear";
import storeErrand from "../../features/errands/serverApis/store";
import { userTypesEnum } from "../../types";
import getCreateErrandsOptions from "../../features/errands/serverApis/getCreateErrandsOptions";
import Select from "react-select";

function CreateErrandRequest() {
  const navigate = useNavigate();
  const userType = useSelector(selectUserType);
  const [selectedErrandType, setSelectedErrandType] = useState<any>();

  const loggedOfficerId = useSelector(selectOfficerId);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [destination, setDestination] = useState("");
  const [reason, setReason] = useState("");

  const {
    data: errandOptions,
    isLoading: isErrandOptionsLoading,
    error,
  } = useQuery("getCreateErrandOptions", getCreateErrandsOptions, {
    staleTime: Infinity,
    cacheTime: 0,
  });
  const mutation = useMutation(storeErrand, {
    onSuccess: (data, variables, context) => {
      navigate("/errands/myerrandsrequests");
    },
    onError: () => {
      alert("الرجاء التحقق من البيانات المدخلة");
    },
  });
  if (isErrandOptionsLoading) {
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
            <u>إنشاء طلب مأمورية </u>
          </div>
          <div className="row">
            <div className="mb-3 fs-3">
              <div className="col-5">
                <label className="form-label">جهة المأمورية</label>
                <input
                  type="text"
                  className="form-control fs-4"
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row fs-3">
              <div className="mb-3">
                <div className="col-5">
                  <label className="form-label">نوع المأمورية </label>
                  <Select
                    value={selectedErrandType}
                    onChange={(errandType: any) => {
                      setSelectedErrandType(errandType);
                    }}
                    options={errandOptions.errandsTypes.map(
                      (errandType: any) => {
                        return {
                          label: errandType.errandType,
                          value: errandType._id,
                        };
                      }
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3 fs-3">
              <div className="col-5">
                <label className="form-label">سبب المأمورية</label>
                <input
                  type="text"
                  className="form-control fs-4"
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mb-3 fs-3">
              <div className="col-5">
                <label className="form-label ">تاريخ بداية المأمورية</label>
                <input
                  type="date"
                  className="form-control fs-4"
                  onChange={(e) => {
                    setFromDate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mb-3 fs-3">
              <div className="col-5">
                <label className="form-label">تاريخ نهاية المأمورية</label>
                <input
                  type="date"
                  className="form-control fs-4"
                  min={fromDate}
                  onChange={(e) => {
                    setToDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary fs-2"
              onClick={() => {
                if (
                  !fromDate ||
                  !toDate ||
                  !reason ||
                  !destination ||
                  !selectedErrandType
                ) {
                  alert(" الرجاء ادخال البيانات المطلوبة");
                } else {
                  const objToStore: any = {
                    fromDate,
                    toDate,
                    reason,
                    errandType: selectedErrandType.value,
                    destination,
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
        </div>
      </>
    );
  }
}
export default CreateErrandRequest;
