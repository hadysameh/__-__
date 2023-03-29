import VacationsTable from "../../features/vacations/components/VacationsTable";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import HorizontalSpinner from "../../components/HorizontalSpinner";
import getVacations from "../../features/vacations/serverApis/get";
import { useSelector } from "react-redux";
import { selectUserType } from "../../features/auth";
import { userTypesEnum } from "../../types";
import PagePagination from "../../components/PagePagination";
import socket from "../../services/socket-io";
import getTodaysDate from "../../_helpers/getTodaysDate";
import getPrintPageHtml from "../../_helpers/getPrintPageHtml";

function PendingVacationsRequests() {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [findPendingVacationsQuery, setFindPendingVacationsQuery] = useState({
    ManagerApproved: null,

    viceManagerApproved: null,

    OfficersAffairsApproved: null,

    branchChiefApproved: null,
  });
  const userType = useSelector(selectUserType);

  useEffect(() => {
    let findParams: any = {};
    if (userType === userTypesEnum.branchChief) {
      findParams = {
        managerApproved: null,

        viceManagerApproved: null,

        officersAffairsApproved: null,

        branchChiefApproved: null,
      };
    } else if (userType === userTypesEnum.officersAffairs) {
      findParams = {
        // officersAffairsApproved: null,
        branchChiefApproved: true,
        $or: [{ viceManagerApproved: null }, { viceManagerApproved: true }],
        // viceManagerApproved: { $or: [null, true] },
        managerApproved: null,
      };
    } else if (userType === userTypesEnum.viceManager) {
      findParams = {
        managerApproved: null,

        viceManagerApproved: null,

        officersAffairsApproved: true,
      };
    }
    if (userType === userTypesEnum.manager) {
      findParams = {
        managerApproved: null,

        viceManagerApproved: true,
      };
    } else if (userType === userTypesEnum.admin) {
      findParams = {};
    }
    findParams = { ...findParams, from: { $gte: getTodaysDate() } };

    setFindPendingVacationsQuery(findParams);
  }, [userType]);
  const printVacationRequests = () => {
    const vacationDivId = "vacationToPrint";

    const divToPrint = document.getElementById(vacationDivId);
    const WinPrint = window.open(
      "",
      "",
      "left=0,top=0,width=650,height=450,toolbar=no,scrollbars=0,status=0"
    );
    if (WinPrint && divToPrint) {
      const pageTitle = "طلبات الاجازات التي تحتاج موافقة";
      const documentContent = getPrintPageHtml(divToPrint.innerHTML, pageTitle);

      WinPrint.document.write(documentContent);
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    }
  };
  const {
    data: vacations,
    isLoading: isVacationsLoading,
    refetch: refetchPendingVacations,
  } = useQuery(
    [
      "fetchPendingVacations",
      findPendingVacationsQuery,
      rowsPerPage,
      pageNumber,
    ],
    () => getVacations(findPendingVacationsQuery, pageNumber, rowsPerPage),
    {
      staleTime: Infinity,
      cacheTime: 0,
    }
  );
  useEffect(() => {
    socket.on("refetch-vacations-data", refetchPendingVacations);
    return () => {
      socket.off("refetch-vacations-data", refetchPendingVacations);
    };
  }, []);
  if (isVacationsLoading)
    return (
      <>
        <br />
        <HorizontalSpinner></HorizontalSpinner>
      </>
    );
  return (
    <>
      <h1>
        <u>طلبات اجازات الضباط</u>
      </h1>
      <br />
      {userType === userTypesEnum.officersAffairs && (
        <div className="fs-3">
          طباعة طلبات الأجازة مجمعة
          <button
            className="btn btn-lg btn-success fs-4"
            onClick={printVacationRequests}
          >
            طباعة
          </button>
        </div>
      )}
      <br />
      <VacationsTable
        vacationsData={vacations.map((vacation: any) => ({
          id: vacation._id,
          officerRank: vacation.officer.rank.rank,
          officerName: vacation.officer.name,
          vacationType: vacation.type.vacationType,
          from: vacation.from,
          to: vacation.to,
          insteadOf: vacation.insteadOf,
          branchChiefApproved: vacation.branchChiefApproved,
          OfficersAffairsApproved: vacation.OfficersAffairsApproved,
          viceManagerApproved: vacation.viceManagerApproved,
          managerApproved: vacation.managerApproved,
        }))}
      />
      <PagePagination
        pageNumber={pageNumber}
        rowsLength={vacations.length}
        rowsPerPage={rowsPerPage}
        setPageNumber={setPageNumber}
      />
      {/* this just for printing it will not be rendered */}
      <div>
        <div id="vacationToPrint" dir="rtl" style={{ display: "none" }}>
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
              {vacations.map((pendingVacation: any) => (
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
      </div>
    </>
  );
}
export default PendingVacationsRequests;
