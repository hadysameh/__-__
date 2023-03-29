import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ErrandsApprovalTable from "../../features/errands/components/ErrandsApprovalTable";
import HorizontalSpinner from "../../components/HorizontalSpinner";
import getErrands from "../../features/errands/serverApis/get";
import { selectOfficerId, selectUserType } from "../../features/auth";
import { useSelector } from "react-redux";
import PagePagination from "../../components/PagePagination";
import { userTypesEnum } from "../../types";
import socket from "../../services/socket-io";

function MyErrandsRequests() {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const logedOfficerId = useSelector(selectOfficerId);
  const userType = useSelector(selectUserType);
  const {
    data: errands,
    isLoading: isErrandsLoading,
    error,
    refetch,
  } = useQuery(
    ["fetchMyErrands", rowsPerPage, pageNumber],
    () => {
      const errandsQuery: any = {
        officer: logedOfficerId,
      };

      return getErrands(errandsQuery, pageNumber, rowsPerPage);
    },
    {
      staleTime: Infinity,
      cacheTime: 0,
    }
  );
  console.log({ errands });
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
        <u>طلبات المأمورية</u>
      </h1>
      <br />
      <ErrandsApprovalTable
        errandsData={errands.map((errand: any) => ({
          id: errand._id,
          officerRank: errand.officer.rank.rank,
          sequenceNumber: errand.sequenceNumber,

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
  );
}
export default MyErrandsRequests;
