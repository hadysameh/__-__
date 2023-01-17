import { useState, useEffect } from "react";
import Select from "react-select";
import { IShiftRowData } from "../../../../types";
import CircleSpinner from "../../../../components/CircleSpinner";

interface IPorps {
  setShiftRows(addShiftRows: IShiftRowData[]): void;
  shiftRows: IShiftRowData[];
  officersData: any;
  isOfficersDataLoading: boolean;
}
function ShiftsFormRow(props: IPorps) {
  const [shiftRow, setShiftRow] = useState<IShiftRowData>({
    date: "",
    //stores the id
    dutyManagerOfficer: null,
    //stores the id
    shiftOfficer: null,
    //stores the id
    strategicDutyManagerOfficer: null,
  });
  useEffect(() => {
    let shiftRowsWithoutCurrentShiftRow = props.shiftRows.filter(
      (singleShiftRow) =>
        singleShiftRow.date !== shiftRow.date && singleShiftRow.date !== ""
    );
    if (shiftRow.date) {
      props.setShiftRows([...shiftRowsWithoutCurrentShiftRow, shiftRow]);
    }
  }, [shiftRow]);

  var daysInArabic = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  const getDayNameInArabicFromDate = (date: string | undefined) => {
    if (!date) return;

    var d = new Date(date);
    var dayName = daysInArabic[d.getDay()];
    return dayName;
  };

  return (
    <>
      <tr>
        <td>{getDayNameInArabicFromDate(shiftRow.date)}</td>
        <td>
          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              style={{ fontSize: "17px" }}
              id="exampleInputEmail1"
              required
              onChange={(e) => {
                setShiftRow((shiftRow) => ({
                  ...shiftRow,
                  date: e.target.value,
                }));
              }}
              value={shiftRow.date}
            />
          </div>
        </td>
        <td>
          <div className="mb-3">
            {props.isOfficersDataLoading ? (
              <CircleSpinner />
            ) : (
              <Select
                onChange={(officerOption: any) => {
                  setShiftRow((shiftRow) => ({
                    ...shiftRow,
                    dutyManagerOfficer: officerOption.value,
                  }));
                }}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "grey" : "red",
                    fontSize: "17px",
                  }),
                }}
                options={props.officersData?.map(
                  (officerData: any, index: number) => {
                    return {
                      value: officerData._id,
                      label: officerData.rank.rank + "/" + officerData.name,
                    };
                  }
                )}
              />
            )}
          </div>
        </td>
        <td>
          <div className="mb-3">
            {props.isOfficersDataLoading ? (
              <CircleSpinner />
            ) : (
              <Select
                onChange={(officerOption: any) => {
                  setShiftRow((shiftRow) => ({
                    ...shiftRow,
                    strategicDutyManagerOfficer: officerOption.value,
                  }));
                }}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "grey" : "red",
                    fontSize: "17px",
                  }),
                }}
                options={props.officersData?.map(
                  (officerData: any, index: number) => {
                    return {
                      value: officerData._id,
                      label: officerData.rank.rank + "/" + officerData.name,
                    };
                  }
                )}
              />
            )}
          </div>
        </td>
        <td>
          <div className="mb-3">
            {props.isOfficersDataLoading ? (
              <CircleSpinner />
            ) : (
              <Select
                onChange={(officerOption: any) => {
                  setShiftRow((shiftRow) => ({
                    ...shiftRow,
                    shiftOfficer: officerOption.value,
                  }));
                }}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "grey" : "red",
                    fontSize: "17px",
                  }),
                }}
                options={props.officersData?.map(
                  (officerData: any, index: number) => {
                    return {
                      value: officerData._id,
                      label: officerData.rank.rank + "/" + officerData.name,
                    };
                  }
                )}
              />
            )}
          </div>
        </td>
      </tr>
    </>
  );
}
export default ShiftsFormRow;
