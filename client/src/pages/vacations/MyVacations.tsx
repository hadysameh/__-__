import VacationsTable from "../../features/vacations/components/VacationsTable";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import HorizontalSpinner from "../../components/HorizontalSpinner";
import getVacations from "../../features/vacations/serverApis/get";
import { selectOfficerId } from "../../features/auth";
import { useSelector } from "react-redux";
import PagePagination from "../../components/PagePagination";

function MyVacations() {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const logedOfficerId = useSelector(selectOfficerId);

  const { data: vacations, isLoading: isVacationsLoading, error } = useQuery(
    ["fetchMyVacationsRequests", rowsPerPage, pageNumber],
    () =>
      getVacations(
        {
          officer: logedOfficerId,
          viceManagerApproved: true,
          OfficersAffairsApproved:true,
          branchChiefApproved:true
        },
        pageNumber,
        rowsPerPage
      )
  );
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
        <u>اجازاتي </u>
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
          OfficersAffairsApproved: vacation.OfficersAffairsApproved,
          viceManagerApproved: vacation.ManagerApproved,
          ManagerApproved: vacation.ManagerApproved,
        }))}
      />
      <PagePagination
        pageNumber={pageNumber}
        rowsLength={vacations.length}
        rowsPerPage={rowsPerPage}
        setPageNumber={setPageNumber}
      />
    </>
  );
}
export default MyVacations;
