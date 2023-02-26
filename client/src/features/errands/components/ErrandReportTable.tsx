import { useState, useEffect } from "react";
import Overlay from "../../../components/Overlay/Overlay";
import ErrandReportOverlayContent from "./ErrandReportOverlayContent";

interface IErrandData {
  id: any;
  destination: any;
  sequenceNumber: any;
  officerRank: any;
  officerName: any;
  errandType: any;
  fromDate: any;
  toDate: any;
  reason: any;
  branchChiefApproved: any;
  officersAffairsApproved: any;
  viceManagerApproved: any;
}
interface IProps {
  errandsData: IErrandData[];
}
function ErrandReportTable(props: IProps) {
  const [isOverLayOpen, setIsOverLayOpen] = useState<boolean>(false);
  const [errandIdToOpen, setErrandIdToOpen] = useState<string>("");

  return (
    <>
      {isOverLayOpen && (
        <Overlay isOpen={isOverLayOpen} setIsOverlayOpen={setIsOverLayOpen}>
          <ErrandReportOverlayContent errandId={errandIdToOpen} />
        </Overlay>
      )}
      <div className="d-flex justify-content-around ">
        <div className="d-flex my-2">
          <label className="fs-4">تم التصديق</label>

          <div
            className="bg-success mx-2"
            style={{ width: "20px", borderRadius: "5px" }}
          >
            .
          </div>
        </div>
        <div className="d-flex my-2">
          <label className="fs-4">جاري التصديق</label>

          <div
            className="bg-warning mx-2"
            style={{ width: "20px", borderRadius: "5px" }}
          >
            .
          </div>
        </div>
        <div className="d-flex my-2">
          <label className="fs-4">تم الرفض </label>

          <div
            className="bg-danger mx-2"
            style={{ width: "20px", borderRadius: "5px" }}
          >
            .
          </div>
        </div>
      </div>
      <hr />
      <table
        className="table table-hover fs-4 fw-bold"
        key={JSON.stringify(props.errandsData)}
      >
        <thead className={""}>
          <tr>
            <th scope="col" style={{ width: "10%" }}>
              رقم المأمورية
            </th>
            <th scope="col" style={{ width: "10%" }}>
              رتبة
            </th>
            <th scope="col" style={{ width: "15%" }}>
              اسم
            </th>
            <th scope="col" style={{ width: "17%" }}>
              نوع المأمورية
            </th>
            <th scope="col" style={{ width: "17%" }}>
              جهة المأمورية
            </th>
            <th scope="col" style={{ width: "15%" }}>
              من
            </th>
            <th scope="col" style={{ width: "15%" }}>
              الى
            </th>
          </tr>
        </thead>
        <tbody>
          {props.errandsData.map((errandData: IErrandData) => {
            const isWaiting =
              // vacationData.ManagerApproved == null &&
              errandData.officersAffairsApproved == null ||
              errandData.branchChiefApproved == null ||
              errandData.viceManagerApproved == null;
            const isAccepted =
              // vacationData.ManagerApproved === true &&
              // errandData.officersAffairsApproved === true &&
              // errandData.branchChiefApproved === true &&
              errandData.viceManagerApproved === true;
            let className = "";
            if (isAccepted) {
              className = "text-success";
            } else if (isWaiting) {
              className = "text-warning";
            } else {
              className = "text-danger";
            }
            // console.log({ isAccepted, isWaiting });
            return (
              <tr
                className={className}
                style={{ fontSize: "20px" }}
                onClick={() => {
                  setIsOverLayOpen(true);
                  setErrandIdToOpen(errandData.id);
                }}
                key={errandData.id}
              >
                <td>{errandData.sequenceNumber}</td>
                <td>{errandData.officerRank}</td>
                <td>{errandData.officerName}</td>
                <td>{errandData.errandType}</td>
                <td>{errandData.destination}</td>
                <td>{errandData.fromDate}</td>
                <td>{errandData.toDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default ErrandReportTable;
