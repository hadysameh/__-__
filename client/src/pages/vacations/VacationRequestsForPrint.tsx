import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import HorizontalSpinner from "../../components/HorizontalSpinner";
import getVacations from "../../features/vacations/serverApis/get";
import getTodaysDate from "../../_helpers/getTodaysDate";
const vacationDivId = "vacationToPrint";
const printVacationRequests = () => {
  const divToPrint = document.getElementById(vacationDivId);
  const WinPrint = window.open(
    "",
    "",
    "left=0,top=0,width=650,height=450,toolbar=no,scrollbars=0,status=0"
  );
  if (WinPrint && divToPrint) {
    const documentContent = `
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
        <title>اجازات الضباط التي تحتاج موافقة</title>
        <style>
        table, th, td {
          border: 1px solid;
          text-align:center;
          font-size:15px
        }
        </style>
    </head>
    <body>
        ${divToPrint.innerHTML}
    </body>
    </html>
    
    `;
    WinPrint.document.write(documentContent);
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  }
};
function VacationRequestsForPrint() {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const findPendingVacationsQuery = {
    branchChiefApproved: true,
    managerApproved: null,
    viceManagerApproved: null,
    from: { $gte: getTodaysDate() },
  };
  const {
    data: pendingVacations,
    isLoading: isVacationsLoading,
    refetch: refetchPendingVacations,
  } = useQuery(
    ["fetchPendingVacations", rowsPerPage, pageNumber],
    () => getVacations(findPendingVacationsQuery, pageNumber, rowsPerPage),
    {
      staleTime: Infinity,
      cacheTime: 0,
    }
  );
  if (isVacationsLoading) {
    return <HorizontalSpinner />;
  }
  return (
    <>
      <br />
      <div className="fs-3">
        طباعة طلبات الأجازة{" "}
        <button
          className="btn btn-lg btn-success fs-4"
          onClick={printVacationRequests}
        >
          طباعة
        </button>
      </div>
      <div id="vacationToPrint" dir="rtl">
        <table className="table fs-4" dir="rtl">
          <thead>
            <tr>
              <th scope="col" style={{ width: "8%" }}>
                رتبة
              </th>
              <th scope="col" style={{ width: "15%" }}>
                اسم
              </th>
              <th scope="col" style={{ width: "10%" }}>
                نوع الاجازة
              </th>
              <th scope="col" style={{ width: "10%" }}>
                من
              </th>
              <th scope="col" style={{ width: "10%" }}>
                الى
              </th>
              {/* <th scope="col" style={{ width: "10%" }}>
                موافقة رئيس الفرع
              </th>
              <th scope="col" style={{ width: "15%" }}>
                موافقة رئيس شئون الضباط
              </th> */}
              <th scope="col" style={{ width: "15%" }}>
                تصديق نائب المدير
              </th>
              <th scope="col" style={{ width: "15%" }}>
                تصديق المدير
              </th>
            </tr>
          </thead>
          <tbody>
            {pendingVacations.map((pendingVacation: any) => (
              <>
                <tr>
                  <td>{pendingVacation.officer.rank.rank}</td>
                  <td>{pendingVacation.officer.name}</td>
                  <td>{pendingVacation.type.vacationType}</td>
                  <td>{pendingVacation.from}</td>
                  <td>{pendingVacation.to}</td>
                  {/* here for the approval because we only fetch the appreved vacations */}
                  {/* <td>موافق</td>
                  <td>موافق</td> */}
                  <td></td>
                  <td></td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default VacationRequestsForPrint;
