import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import fetchOfficers from "../../../services/fetchOfficers";
import { IShiftRowData } from "../../../types";
import ShiftsFormRow from "./components/FormRow";

function ShiftsForm() {
  const [shiftRows, setShiftRows] = useState<IShiftRowData[]>([]);
  const [rowsCount, setRowsCount] = useState<number>(1);
  const {
    data: officersData,
    isLoading: isOfficersDataLoading,
    error,
  } = useQuery("fetchOfficers", fetchOfficers);
  useEffect(() => {
    console.log({ shiftRows });
  }, [shiftRows]);
  return (
    <>
      <div className="container text-center" style={{ fontSize: "10px" }}>
        <form action="">
          <table className="table table-hover fs-4">
            <thead className={""}>
              <tr>
                <th scope="col" style={{ width: "8%" }}>
                  اليوم
                </th>
                <th scope="col" style={{ width: "8%" }}>
                  التاريخ
                </th>
                <th scope="col" style={{ width: "28%" }}>
                  مدير منوب
                </th>
                <th scope="col" style={{ width: "28%" }}>
                  مدير منوب القيادة الإستراتيجية
                </th>
                <th scope="col" style={{ width: "28%" }}>
                  ضابط نوبتجي
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(rowsCount)].map((elementInArray, index) => (
                <ShiftsFormRow
                  shiftRows={shiftRows}
                  setShiftRows={setShiftRows}
                  officersData={officersData}
                  isOfficersDataLoading={isOfficersDataLoading}
                  key={index}
                ></ShiftsFormRow>
              ))}
            </tbody>
          </table>{" "}
          <button
            className="btn btn-success"
            onClick={(e) => {
              e.preventDefault();
              setRowsCount((rowsCount) => rowsCount + 1);
            }}
          >
            اضافة سطر جديد
          </button>
        </form>
      </div>
    </>
  );
}
export default ShiftsForm;
