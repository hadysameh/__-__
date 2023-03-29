import VacationsTable from "../../features/vacations/components/VacationsTable";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import HorizontalSpinner from "../../components/HorizontalSpinner";
import getVacations from "../../features/vacations/serverApis/get";
import { selectOfficerId, selectUserType } from "../../features/auth";
import { useSelector } from "react-redux";
import PagePagination from "../../components/PagePagination";
import socket from "../../services/socket-io";
import Select from "react-select";
import getOfficers from "../../features/officers/serverServices/get";
import { userTypesEnum } from "../../types";

function MyVacations() {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const logedOfficerId = useSelector(selectOfficerId);
  const [selectedOfficer, setSelectedOfficer] = useState<any>();
  const userType = useSelector(selectUserType);

  const {
    data: officersData,
    isLoading: isOfficersDataLoading,
    error: fetchingOfficersError,
  } = useQuery("fetchOfficers", getOfficers, {
    staleTime: Infinity,
    cacheTime: 0,
  });

  const {
    data: vacations,
    isLoading: isVacationsLoading,
    error,
    refetch,
  } = useQuery(
    ["fetchVacations", selectedOfficer, rowsPerPage, pageNumber],
    () => {
      const query: any = {
        officer: selectedOfficer.value,
        viceManagerApproved: true,
      };
      if (userType !== userTypesEnum.normalOfficer) {
        query["managerApproved"] = true;
      }
      return getVacations(query, pageNumber, rowsPerPage);
    },
    {
      staleTime: Infinity,
      cacheTime: 0,
      enabled: !!selectedOfficer?.value,
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
        <u>اجازات الضباط </u>
      </h1>
      <br />
      {isOfficersDataLoading ? (
        <HorizontalSpinner></HorizontalSpinner>
      ) : (
        <div className="fs-3">
          <Select
            value={selectedOfficer}
            onChange={(vacationType: any) => {
              setSelectedOfficer(vacationType);
            }}
            options={officersData.map((officerData: any) => {
              return {
                label: officerData.name,
                value: officerData._id,
              };
            })}
          />
        </div>
      )}

      <br />
      {vacations ? (
        isVacationsLoading ? (
          <HorizontalSpinner></HorizontalSpinner>
        ) : (
          <>
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
        )
      ) : (
        <></>
      )}
    </>
  );
}
export default MyVacations;
