import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import HorizontalSpinner from "../../components/HorizontalSpinner";
import PagePagination from "../../components/PagePagination";
import { selectOfficerId } from "../../features/auth";
import ErrandReportTable from "../../features/errands/components/ErrandReportTable";
import getErrands from "../../features/errands/serverApis/get";
import socket from "../../services/socket-io";

function AddErrandReport() {
  const loggedOfficerId = useSelector(selectOfficerId);
  const [sequenceNumber, setSequenceNumber] = useState<number | undefined>();
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: errands,
    isLoading: isErrandsLoading,
    error,
    refetch,
  } = useQuery(
    ["fetchMyErrands", sequenceNumber, pageNumber, rowsPerPage],
    () => {
      const errandsQuery: any = {
        sequenceNumber,
        viceManagerApproved: true,
        officer: loggedOfficerId,
      };

      return getErrands(errandsQuery, pageNumber, rowsPerPage);
    },
    {
      staleTime: Infinity,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    socket.on("refetch-errands-data", refetch);
    return () => {
      socket.off("refetch-errands-data", refetch);
    };
  }, []);

  return (
    <>
      <div className="mb-3 fs-3">
        <div className="col-2">
          <label className="form-label">رقم المأمورية</label>
          <input
            type="number"
            className="form-control fs-4"
            onChange={(e) => {
              const SequenceNumber = Number(e.target.value);
              if (SequenceNumber) {
                setSequenceNumber(SequenceNumber);
              } else {
                setSequenceNumber(undefined);
              }
            }}
          />
        </div>
      </div>
      {errands ? (
        isErrandsLoading ? (
          <HorizontalSpinner></HorizontalSpinner>
        ) : (
          <>
            <ErrandReportTable
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
export default AddErrandReport;
