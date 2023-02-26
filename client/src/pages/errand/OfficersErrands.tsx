import VacationsTable from "../../features/vacations/components/VacationsTable";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import HorizontalSpinner from "../../components/HorizontalSpinner";
import getErrands from "../../features/errands/serverApis/get";
import { selectOfficerId } from "../../features/auth";
import { useSelector } from "react-redux";
import PagePagination from "../../components/PagePagination";
import socket from "../../services/socket-io";
import Select from "react-select";
import getOfficers from "../../features/officers/serverServices/get";
import ErrandsApprovalTable from "../../features/errands/components/ErrandsApprovalTable";

function OfficersErrands() {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const logedOfficerId = useSelector(selectOfficerId);
  const [selectedOfficer, setSelectedOfficer] = useState<any>();

  const {
    data: officersData,
    isLoading: isOfficersDataLoading,
    error: fetchingOfficersError,
  } = useQuery("fetchOfficers", getOfficers, {
    staleTime: Infinity,
    cacheTime: 0,
  });

  const {
    data: errands,
    isLoading: isErrandsLoading,
    error,
    refetch,
  } = useQuery(
    ["fetchErrands", selectedOfficer, rowsPerPage, pageNumber],
    () =>
      getErrands(
        {
          officer: selectedOfficer.value,
          viceManagerApproved: true,
        },
        pageNumber,
        rowsPerPage
      ),
    {
      staleTime: Infinity,
      cacheTime: 0,
      enabled: !!selectedOfficer?.value,
    }
  );

  useEffect(() => {
    socket.on("refetch-errands-data", refetch);
    return () => {
      socket.off("refetch-errands-data", refetch);
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
      <h1>
        <u>عرض مأموريات ضابط</u>
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
      {errands ? (
        isErrandsLoading ? (
          <HorizontalSpinner></HorizontalSpinner>
        ) : (
          <>
            <ErrandsApprovalTable
              errandsData={errands.map((errand: any) => ({
                id: errand._id,
                sequenceNumber: errand.sequenceNumber,
                officerRank: errand.officer.rank.rank,
                officerName: errand.officer.name,
                errandType: errand.errandType.errandType,
                fromDate: errand.fromDate,
                toDate: errand.toDate,
                destination: errand.destination,
                reason: errand.reason,
                branchChiefApproved: errand.branchChiefApproved,
                OfficersAffairsApproved: errand.OfficersAffairsApproved,
                viceManagerApproved: errand.viceManagerApproved,
              }))}
            />
            <PagePagination
              pageNumber={pageNumber}
              rowsLength={errands.length}
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
export default OfficersErrands;
