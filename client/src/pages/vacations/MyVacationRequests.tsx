import VacationsTable from "../../features/vacations/components/VacationsTable";
import { useEffect, useState } from "react";
import getVacations from "../../features/vacations/serverApis/get";
import { useQuery } from "react-query";
import HorizontalSpinner from "../../components/HorizontalSpinner";
import socket from "../../services/socket-io";
import { useSelector } from "react-redux";
import { selectOfficerId } from "../../features/auth";
function MyVacationRequests() {
  const logedOfficerId = useSelector(selectOfficerId);

  const [rowsPerPage, setRowsPerPage] = useState("20");
  const [pageNumber, setpageNumber] = useState<any>("1");
  const {
    data: vacations,
    isLoading: isVacationsLoading,
    error,
    refetch,
  } = useQuery(
    ["fetchMyVacationsRequests", rowsPerPage, pageNumber],
    () =>
      getVacations(
        {
          officer: logedOfficerId,
        },
        pageNumber,
        rowsPerPage
      ),
    {
      staleTime: Infinity,
      cacheTime: 0,
    }
  );
  useEffect(() => {
    socket.on("refetch-vacations-data", refetch);
    return () => {
      socket.off("refetch-vacations-data", refetch);
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
        <u>طلبات الاجازة الخاصة بي</u>
      </h1>
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
          officersAffairsApproved: vacation.officersAffairsApproved,
          viceManagerApproved: vacation.viceManagerApproved,
          managerApproved: vacation.managerApproved,
        }))}
      />
      <nav aria-label="Page navigation example" className="fs-4">
        <ul className="pagination">
          {pageNumber > 1 && (
            <li className="page-item">
              <button
                className="page-link fs-3"
                onClick={() => {
                  setpageNumber(pageNumber - 1);
                }}
              >
                الصفحة السابقة
              </button>
            </li>
          )}
          {vacations.length >= rowsPerPage && (
            <li className="page-item">
              <button
                className="page-link fs-3"
                onClick={() => {
                  setpageNumber(pageNumber + 1);
                }}
              >
                الصفحةالتالية
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
export default MyVacationRequests;
