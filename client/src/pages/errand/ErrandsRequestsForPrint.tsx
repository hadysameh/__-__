import ErrandsApprovalTable from "../../features/errands/components/ErrandsApprovalTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserType } from "../../features/auth";
import { userTypesEnum } from "../../types";
import { useQuery } from "react-query";
import socket from "../../services/socket-io";
import PagePagination from "../../components/PagePagination";
import getErrands from "../../features/errands/serverApis/get";
import HorizontalSpinner from "../../components/HorizontalSpinner";
import getTodaysDate from "../../_helpers/getTodaysDate";
import getPrintPageHtml from "../../_helpers/getPrintPageHtml";

function ErrandsRequestsForPrint() {
  const userType = useSelector(selectUserType);

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const printVacationRequests = () => {
    const errandsDivId = "errandsToPrint";
    const divToPrint = document.getElementById(errandsDivId);
    const WinPrint = window.open(
      "",
      "",
      "left=0,top=0,width=650,height=450,toolbar=no,scrollbars=0,status=0"
    );
    if (WinPrint && divToPrint) {
      const pageTitle = "طلبات المأموريات التي تحتاج موافقة";
      const documentContent = getPrintPageHtml(divToPrint.innerHTML, pageTitle);

      WinPrint.document.write(documentContent);
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    }
  };
  const findPendingErrandsQuery = {
    branchChiefApproved: true,
    managerApproved: null,
    viceManagerApproved: null,
    fromDate: { $gte: getTodaysDate() },
  };

  const {
    data: pendingErrands,
    isLoading: isErrandsLoading,
    refetch: refetchPendingErrands,
  } = useQuery(
    ["fetchPendingErrands", findPendingErrandsQuery, rowsPerPage, pageNumber],
    () => getErrands(findPendingErrandsQuery, pageNumber, rowsPerPage),
    {
      staleTime: Infinity,
      cacheTime: 0,
    }
  );
  useEffect(() => {
    socket.on("refetch-errands-data", refetchPendingErrands);
    return () => {
      socket.off("refetch-errands-data", refetchPendingErrands);
    };
  }, []);
  if (isErrandsLoading)
    return (
      <>
        <br />
        <HorizontalSpinner></HorizontalSpinner>
      </>
    );
  return (
    <>
      <br />
      <div className="fs-3">
        طباعة طلبات المأموريات{" "}
        <button
          className="btn btn-lg btn-success fs-4"
          onClick={printVacationRequests}
        >
          طباعة
        </button>
      </div>
      <div id="errandsToPrint" dir="rtl">
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
                جهة المأمورية
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
            {pendingErrands.map((pendingERrand: any) => (
              <>
                <tr>
                  <td>{pendingERrand.officer.rank.rank}</td>
                  <td>{pendingERrand.officer.name}</td>
                  <td>{pendingERrand.destination}</td>
                  <td>{pendingERrand.fromDate}</td>
                  <td>{pendingERrand.toDate}</td>
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
export default ErrandsRequestsForPrint;
