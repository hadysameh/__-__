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
        managerApproved: null,
        viceManagerApproved: null,
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
export default PendingVacationsRequests;
