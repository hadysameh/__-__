import VacationsTable from "../../features/vacations/components/VacationsTable";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import HorizontalSpinner from "../../components/HorizontalSpinner";
import getVacations from "../../features/vacations/serverApis/get";
import { selectOfficerId, selectUserType } from "../../features/auth";
import { useSelector } from "react-redux";
import PagePagination from "../../components/PagePagination";
import socket from "../../services/socket-io";
import { userTypesEnum } from "../../types";

function MyVacations() {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const logedOfficerId = useSelector(selectOfficerId);
  const userType = useSelector(selectUserType);

  const {
    data: vacations,
    isLoading: isVacationsLoading,
    error,
    refetch,
  } = useQuery(
    ["fetchMyVacations", rowsPerPage, pageNumber],
    () => {
      const vacationsQuery: any = {
        officer: logedOfficerId,
        viceManagerApproved: true,
      };
      if (userType !== userTypesEnum.normalOfficer) {
        vacationsQuery["managerApproved"] = true;
      }
      return getVacations(vacationsQuery, pageNumber, rowsPerPage);
    },
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
          officersAffairsApproved: vacation.officersAffairsApproved,
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
    </>
  );
}
export default MyVacations;
