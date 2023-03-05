import { ShiftsForm } from "../../features/shifts";
import { useState } from "react";
import getCurrentYear from "../../_helpers/getCurrentYear";
import Select from "react-select";
const monthNamesOptions = [
  { value: "0", label: "يناير" },
  { value: "1", label: "فبراير" },
  { value: "2", label: "مارس" },
  { value: "3", label: "ابريل" },
  { value: "4", label: "مايو" },
  { value: "5", label: "يوليو" },
  { value: "6", label: "يونيو" },
  { value: "7", label: "اغسطس" },
  { value: "8", label: "سبتمبر" },
  { value: "9", label: "اكتوبر" },
  { value: "10", label: "نوفمبر" },
  { value: "11", label: "ديسمبر" },
];
const currentMonthNumber = new Date().getMonth();
const currentYear = getCurrentYear();

function CreateShifts() {
  const [monthNumber, setMonth] = useState(currentMonthNumber);
  const [year, setYear] = useState(currentYear);

  return (
    <>
      <div className="fs-3" style={{ width: "200px" }}>
        الشهر
        <br />
        <Select
          onChange={(monthNameOption: any) => {
            setMonth(() => monthNameOption.value);
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              // borderColor: state.isFocused ? "grey" : "red",
              fontSize: "17px",
            }),
          }}
          defaultValue={monthNamesOptions[currentMonthNumber]}
          options={monthNamesOptions}
        />
      </div>

      <div className="fs-3" style={{ width: "200px" }}>
        السنة
        <br />
        <input
          type="number"
          defaultValue={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
          max={currentYear}
        />
      </div>
      <ShiftsForm year={year} month={monthNumber} />
    </>
  );
}
export default CreateShifts;
