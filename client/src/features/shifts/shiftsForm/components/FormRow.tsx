import { useState, useEffect } from "react";
import Select from "react-select";
import { IOfficerModel, IShiftRowData } from "../../../../types";
import CircleSpinner from "../../../../components/CircleSpinner";

interface IPorps {
  shiftRow: IShiftRowData;
  updateShiftRow: (index: any, newShiftDate: any) => void;
  officersData: any[];
  isOfficersDataLoading: boolean;
  removeShiftRow: (shiftDate: any) => void;
  rowIndex: any;
}
function ShiftsFormRow(props: IPorps) {
  const [date, setDate] = useState("");
  const [selectedDutyManagerOfficer, setSelectedDutyManagerOfficer] =
    useState<any>(null);

  const [
    selectedStrategicDutyManagerOfficer,
    setSelectedStrategicDutyManagerOfficer,
  ] = useState<any>(null);

  const [selectedShiftOfficer, setSelectedShiftOfficer] = useState<any>(null);
  var daysInArabic = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  const getOfficerDataById = (officerId: any) => {
    const officerData = props.officersData.find(
      (officerData: any) => officerData._id == officerId
    );
    return officerData;
  };
  useEffect(() => {
    const isShiftRowHasData =
      props.shiftRow.date ||
      props.shiftRow.strategicDutyManagerOfficer ||
      props.shiftRow.dutyManagerOfficer ||
      props.shiftRow.shiftOfficer;
    if (isShiftRowHasData) {
      setDate(props.shiftRow.date);
      const dutyManagerOfficerData = getOfficerDataById(
        props.shiftRow.dutyManagerOfficer?._id
      );
      const strategicDutyManagerOfficer = getOfficerDataById(
        props.shiftRow.strategicDutyManagerOfficer?._id
      );
      const shiftOfficer = getOfficerDataById(props.shiftRow.shiftOfficer?._id);

      if (dutyManagerOfficerData) {
        setSelectedDutyManagerOfficer({
          value: dutyManagerOfficerData._id,
          label:
            dutyManagerOfficerData.rank.rank +
            "/" +
            dutyManagerOfficerData.name,
        });
      }
      if (strategicDutyManagerOfficer) {
        setSelectedStrategicDutyManagerOfficer({
          value: strategicDutyManagerOfficer._id,
          label:
            strategicDutyManagerOfficer.rank.rank +
            "/" +
            strategicDutyManagerOfficer.name,
        });
      }
      if (shiftOfficer) {
        setSelectedShiftOfficer({
          value: shiftOfficer._id,
          label: shiftOfficer.rank.rank + "/" + shiftOfficer.name,
        });
      }
    }
  }, [props]);

  useEffect(() => {
    const updatedShiftRow = {
      date: date,
      dutyManagerOfficer: selectedDutyManagerOfficer?.value,
      strategicDutyManagerOfficer: selectedStrategicDutyManagerOfficer?.value,
      shiftOfficer: selectedShiftOfficer?.value,
    };
    props.updateShiftRow(props.rowIndex, updatedShiftRow);
  }, [
    selectedDutyManagerOfficer,
    selectedStrategicDutyManagerOfficer,
    selectedShiftOfficer,
    date,
    props,
  ]);

  const getDayNameInArabicFromDate = (date: string | undefined) => {
    if (!date) return;

    var d = new Date(date);
    var dayName = daysInArabic[d.getDay()];
    return dayName;
  };
  return (
    <>
      <tr>
        <td>{getDayNameInArabicFromDate(date)}</td>
        <td>
          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              style={{ fontSize: "17px" }}
              id="exampleInputEmail1"
              required
              onChange={(e) => {
                setDate(e.target.value);
              }}
              value={date}
            />
          </div>
        </td>
        <td>
          <div className="mb-3">
            {props.isOfficersDataLoading ? (
              <CircleSpinner />
            ) : (
              <Select
                value={selectedDutyManagerOfficer}
                onChange={setSelectedDutyManagerOfficer}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
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
                value={selectedStrategicDutyManagerOfficer}
                onChange={setSelectedStrategicDutyManagerOfficer}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
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
                value={selectedShiftOfficer}
                onChange={setSelectedShiftOfficer}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
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
          <button
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault();
              props.removeShiftRow(props.rowIndex);
            }}
          >
            حذف
          </button>
        </td>
      </tr>
    </>
  );
}
export default ShiftsFormRow;
