import { useEffect, useState, useCallback } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import getMonthlyShifts from "../../features/shifts/serverServices/getMonthlyShifts";
import Select from "react-select";
import getCurrentYear from "../../_helpers/getCurrentYear";
import getPrintPageHtml from "../../_helpers/getPrintPageHtml";
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
var daysInArabic = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
const shiftsDivId = "shifts-table";
const currentMonthNumber = new Date().getMonth();
const currentYear = getCurrentYear();
function ShowShifts() {
  const navigate = useNavigate();
  const [monthNumber, setMonthNumber] = useState(currentMonthNumber);
  const [year, setYear] = useState(currentYear);
  const {
    data: storedMonthShiftsData,
    isLoading: isShiftsDataLoading,
    isSuccess,
    isFetched: isMonthShiftsDataFetched,
  } = useQuery(
    ["fetchStoredShifts", monthNumber, year],
    () =>
      getMonthlyShifts({
        month: monthNumber,
        year,
      }),
    {
      staleTime: Infinity,
      cacheTime: 0,
    }
  );
  const getDayNameInArabicFromDate = (date: string | undefined) => {
    if (!date) return;

    var d = new Date(date);
    var dayName = daysInArabic[d.getDay()];
    return dayName;
  };

  const printShifts = () => {
    const divToPrint = document.getElementById(shiftsDivId);
    const WinPrint = window.open(
      "",
      "",
      "left=0,top=0,width=650,height=450,toolbar=no,scrollbars=0,status=0"
    );
    if (WinPrint && divToPrint) {
      const pageTitle = "طلبات الاجازات التي تحتاج موافقة";
      const printPageHtm = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <base href="/" />
         <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ادارة البحوث الفنية</title>
        <style>
        h2{
          text-align:center
        }
         table{
          margin:5px
        }
        table, th, td {
          border: 1px solid;
         
        }
         body {
          height:98vh;
          width:100vw;
          border: 2px solid black;
        }
       
        </style>
    </head>
    <body>
        <h2>
            النوبتجيات
        </h2>
        <div style="display:flex;flex-direction:column;align-self:center;width:95vw">
    ${divToPrint.innerHTML}
        
        </div>
      
    </body>
    </html>
    
    `;
      const documentContent = printPageHtm;
      getPrintPageHtml(divToPrint.innerHTML, pageTitle);

      WinPrint.document.write(documentContent);
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    }
  };
  return (
    <>
      <div className="fs-3" style={{ width: "200px" }}>
        الشهر
        <br />
        <Select
          onChange={(monthNameOption: any) => {
            // console.log({ monthNameOption });
            setMonthNumber(() => monthNameOption.value);
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
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
      <br />
      <div className="fs-3">
        طباعة النوبتجيات
        <button
          className="btn btn-lg btn-success"
          onClick={() => {
            printShifts();
          }}
        >
          طباعة
        </button>
      </div>
      <div
        className="container text-center"
        style={{ fontSize: "10px" }}
        id="shifts-table"
      >
        <form action="">
          <table className="table table-hover fs-4" dir="rtl">
            <thead className={""}>
              <tr>
                <th scope="col" style={{ width: "10%" }}>
                  اليوم
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  التاريخ
                </th>
                <th scope="col" style={{ width: "25%" }}>
                  مدير منوب
                </th>
                <th scope="col" style={{ width: "25%" }}>
                  مدير منوب القيادة الإستراتيجية
                </th>
                <th scope="col" style={{ width: "25%" }}>
                  ضابط نوبتجي
                </th>
              </tr>
            </thead>
            <tbody>
              {isMonthShiftsDataFetched &&
              storedMonthShiftsData?.monthlyShift ? (
                storedMonthShiftsData.monthlyShift.map(
                  (shiftRow: any, index: any) => {
                    return (
                      <>
                        <tr>
                          <td>{getDayNameInArabicFromDate(shiftRow.date)}</td>
                          <td>
                            <div className="mb-3">{shiftRow.date}</div>
                          </td>
                          <td>
                            <div className="mb-3">
                              {shiftRow.dutyManagerOfficer.rank.rank +
                                "/" +
                                shiftRow.dutyManagerOfficer.name}
                            </div>
                          </td>
                          <td>
                            <div className="mb-3">
                              {shiftRow.strategicDutyManagerOfficer &&
                                shiftRow.strategicDutyManagerOfficer.rank.rank +
                                  "/" +
                                  shiftRow.strategicDutyManagerOfficer.name}
                            </div>
                          </td>
                          <td>
                            <div className="mb-3">
                              {shiftRow.shiftOfficer.rank.rank +
                                "/" +
                                shiftRow.shiftOfficer.name}
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  }
                )
              ) : (
                <></>
              )}
            </tbody>
          </table>{" "}
        </form>
      </div>
    </>
  );
}

export default ShowShifts;
