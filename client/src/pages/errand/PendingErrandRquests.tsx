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

function PendingErrandRquests() {
  const userType = useSelector(selectUserType);

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [findPendingErrandsQuery, setFindPendingErrandsQuery] = useState({
    viceManagerApproved: null,

    OfficersAffairsApproved: null,

    branchChiefApproved: null,
  });

  useEffect(() => {
    let findParams: any = {};
    if (userType === userTypesEnum.viceManager) {
      findParams = {
        viceManagerApproved: null,
        officersAffairsApproved: true,
      };
    } else if (userType === userTypesEnum.officersAffairs) {
      findParams = {
        officersAffairsApproved: null,
        branchChiefApproved: true,
      };
    } else if (userType === userTypesEnum.branchChief) {
      findParams = {
        viceManagerApproved: null,
        officersAffairsApproved: null,
        branchChiefApproved: null,
      };
    } else if (userType === userTypesEnum.admin) {
      findParams = {};
    }

    setFindPendingErrandsQuery(findParams);
  }, [userType]);
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
      <h1>
        <u>طلبات مأموريات الضباط</u>
      </h1>
      <br />
      <ErrandsApprovalTable
        errandsData={pendingErrands.map((errand: any) => ({
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
        rowsLength={pendingErrands.length}
        rowsPerPage={rowsPerPage}
        setPageNumber={setPageNumber}
      />
    </>
  );
}
export default PendingErrandRquests;
