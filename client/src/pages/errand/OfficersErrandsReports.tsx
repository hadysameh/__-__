import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import HorizontalSpinner from "../../components/HorizontalSpinner";
import PagePagination from "../../components/PagePagination";
import ErrandReportTable from "../../features/errands/components/ErrandReportTable";
import getErrands from "../../features/errands/serverApis/get";
import socket from "../../services/socket-io";
import getOfficers from "../../features/officers/serverServices/get";
import Select from "react-select";
import getCreateErrandsOptions from "../../features/errands/serverApis/getCreateErrandsOptions";

function OfficersErrandsReports() {
  const [sequenceNumber, setSequenceNumber] = useState<number | undefined>();
  const [selectedOfficer, setSelectedOfficer] = useState<any>();
  const [selectedErrandType, setSelectedErrandType] = useState<any>();
  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const clearSerachParams = () => {
    setSequenceNumber(undefined);
    setSelectedOfficer({});
    setSelectedErrandType({});
    setFromDate(undefined);
    setToDate(undefined);
  };
  const {
    data: officersData,
    isLoading: isOfficersDataLoading,
    error: fetchingOfficersError,
  } = useQuery("fetchOfficers", getOfficers, {
    staleTime: Infinity,
    cacheTime: 0,
  });

  const {
    data: errandsTypesOptions,
    isLoading: isErrandsTypesLoading,
    error: fetchingErrandsTypesErrors,
  } = useQuery("fetchErrandsTypes", getCreateErrandsOptions, {
    staleTime: Infinity,
    cacheTime: 0,
  });
  const {
    data: errands,
    isLoading: isErrandsLoading,
    error,
    refetch,
  } = useQuery(
    [
      "fetchOfficersErrands",
      selectedOfficer,
      sequenceNumber,
      pageNumber,
      rowsPerPage,
      fromDate,
      toDate,
      selectedErrandType,
    ],
    () => {
      const errandsQuery: any = {
        sequenceNumber,
        viceManagerApproved: true,
        officer: selectedOfficer && selectedOfficer.value,
        fromDate,
        toDate,
        errandType: selectedErrandType && selectedErrandType.value,
        errnadsWithReportsOnly: true,
      };

      return getErrands(errandsQuery, pageNumber, rowsPerPage);
    },
    {
      staleTime: Infinity,
      cacheTime: 0,
      //   enabled: !!selectedOfficer?.value,
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
      <h1>
        <u>تقارير مأموريات ضابط</u>
      </h1>
      <div className="row border border-dark m-3 p-3 rounded">
        <div className="col-3 fs-3 ">
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
        {isOfficersDataLoading ? (
          <></>
        ) : (
          <div className="col-3 fs-3">
            <label className="form-label">اسم الضابط</label>

            <Select
              value={selectedOfficer}
              onChange={(officer: any) => {
                setSelectedOfficer(officer);
              }}
              options={officersData.map((officerData: any) => {
                return {
                  label: `${officerData.rank.rank + " / " + officerData.name}`,
                  value: officerData._id,
                };
              })}
            />
          </div>
        )}

        <div className="col-3 fs-3 ">
          <label className="form-label">تاريخ بداية المأمورية</label>
          <input
            type="date"
            className="form-control fs-4"
            onChange={(e) => {
              const errandFromDate = e.target.value;
              if (errandFromDate) {
                setFromDate(e.target.value);
              } else {
                setFromDate(undefined);
              }
            }}
          />
        </div>

        <div className="col-3 fs-3 ">
          <label className="form-label">تاريخ نهاية المأمورية</label>
          <input
            type="date"
            className="form-control fs-4"
            onChange={(e) => {
              const errandFromDate = e.target.value;
              if (errandFromDate) {
                setToDate(e.target.value);
              } else {
                setToDate(undefined);
              }
            }}
          />
        </div>

        {isErrandsTypesLoading ? (
          <></>
        ) : (
          <div className="col-3 fs-3">
            <label className="form-label">نوع المأمورية</label>

            <Select
              value={selectedErrandType}
              onChange={(errandType: any) => {
                setSelectedErrandType(errandType);
              }}
              options={errandsTypesOptions.errandsTypes.map(
                (errandType: any) => {
                  return {
                    label: errandType.errandType,
                    value: errandType._id,
                  };
                }
              )}
            />
          </div>
        )}
        <br />
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-lg btn-danger"
            onClick={() => {
              clearSerachParams();
            }}
          >
            الغاء
          </button>
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
export default OfficersErrandsReports;
