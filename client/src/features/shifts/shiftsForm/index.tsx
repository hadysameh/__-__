import { useEffect, useState, useCallback } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import fetchOfficers from "../../../services/fetchOfficers";
import { IShiftRowData } from "../../../types";
import getMonthlyShifts from "../serverServices/getMonthlyShifts";
import storeOrUpdateMonthlyShifts from "../serverServices/storeOrUpdateMonthlyShifts";
import ShiftsFormRow from "./components/FormRow";
interface IProps {
  month: any;
  year: any;
}
function ShiftsForm(props: IProps) {
  const navigate = useNavigate();
  const [shiftRows, setShiftRows] = useState<IShiftRowData[]>([]);
  const {
    data: officersData,
    isLoading: isOfficersDataLoading,
    error,
  } = useQuery("fetchOfficers", fetchOfficers, { staleTime: Infinity });

  const {
    data: storedMonthShiftsData,
    isLoading: isShiftsDataLoading,
    isSuccess,
  } = useQuery(
    ["fetchStoredShifts", props.month, props.year],
    () =>
      getMonthlyShifts({
        month: props.month,
        year: props.year,
      }),
    {
      staleTime: Infinity,
      cacheTime: 0,
    }
  );
  useEffect(() => {
    if (storedMonthShiftsData) {
      console.log({ storedMonthShiftsData });
      setShiftRows(storedMonthShiftsData.monthlyShift);
    } else {
      setShiftRows([
        {
          date: "",
          dutyManagerOfficer: null,
          shiftOfficer: null,
          strategicDutyManagerOfficer: null,
        },
      ]);
    }
  }, [storedMonthShiftsData]);

  const removeShiftRow = (rowIndexToRemove: any) => {
    let shiftRowsCopy = [...shiftRows];
    shiftRowsCopy = shiftRowsCopy.filter((shiftRow, index) => {
      const isElementNotToBeRemoved = index !== rowIndexToRemove;
      return isElementNotToBeRemoved;
    });

    setShiftRows(shiftRowsCopy);
  };

  const updateShiftRow = useCallback(
    (rowIndex: any, newShiftRowData: any) => {
      let updatedShiftsRows = shiftRows;
      updatedShiftsRows[rowIndex] = newShiftRowData;
      setShiftRows(updatedShiftsRows);
    },
    [shiftRows]
  );
  const mutation = useMutation(storeOrUpdateMonthlyShifts, {
    onSuccess: (data, variables, context) => {
      alert("???? ??????????");
      navigate("/shifts/");
    },
    onError: () => {
      alert("???????????? ???????????? ???? ???????????????? ??????????????");
    },
  });
  return (
    <>
      <div className="container text-center" style={{ fontSize: "10px" }}>
        <form action="">
          <table className="table table-hover fs-4">
            <thead className={""}>
              <tr>
                <th scope="col" style={{ width: "8%" }}>
                  ??????????
                </th>
                <th scope="col" style={{ width: "8%" }}>
                  ??????????????
                </th>
                <th scope="col" style={{ width: "28%" }}>
                  ???????? ????????
                </th>
                <th scope="col" style={{ width: "28%" }}>
                  ???????? ???????? ?????????????? ????????????????????????
                </th>
                <th scope="col" style={{ width: "28%" }}>
                  ???????? ????????????
                </th>
                <th scope="col" style={{ width: "28%" }}></th>
              </tr>
            </thead>
            <tbody>
              {shiftRows ? (
                shiftRows.map((shiftRow, index) => {
                  return (
                    <ShiftsFormRow
                      shiftRow={shiftRow}
                      updateShiftRow={updateShiftRow}
                      officersData={officersData}
                      isOfficersDataLoading={isOfficersDataLoading}
                      removeShiftRow={removeShiftRow}
                      rowIndex={index}
                      key={index}
                    ></ShiftsFormRow>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>{" "}
          <button
            className="btn btn-lg btn-success fs-3 m-2"
            onClick={(e) => {
              e.preventDefault();
              const shiftsRowsAfterAddingNewOne = [
                ...shiftRows,
                {
                  date: "",
                  dutyManagerOfficer: null,
                  shiftOfficer: null,
                  strategicDutyManagerOfficer: null,
                },
              ];
              console.log({ shiftsRowsAfterAddingNewOne });
              setShiftRows(() => {
                const newShiftRows = [
                  ...shiftRows,
                  {
                    date: "",
                    dutyManagerOfficer: null,
                    shiftOfficer: null,
                    strategicDutyManagerOfficer: null,
                  },
                ];
                console.log();
                return [
                  ...shiftRows,
                  {
                    date: "",
                    dutyManagerOfficer: null,
                    shiftOfficer: null,
                    strategicDutyManagerOfficer: null,
                  },
                ];
              });
            }}
          >
            ?????????? ?????? ????????
          </button>
          <button
            className="btn btn-lg btn-primary fs-3  m-2"
            onClick={(e) => {
              e.preventDefault();
              const dataToStore = {
                year: props.year,
                month: props.month,
                shiftRows,
              };
              console.log({ shiftRowsToStore: shiftRows });
              mutation.mutate(dataToStore);
            }}
          >
            ??????
          </button>
        </form>
      </div>
    </>
  );
}
export default ShiftsForm;
