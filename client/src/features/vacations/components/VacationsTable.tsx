import { useState, useEffect } from "react";
import Overlay from "../../../components/Overlay/Overlay";
import VacationApprovalOverlayContent from "./VacationApprovalOverlayContent";

interface IVacationData {
  id: any;
  officerRank: any;
  officerName: any;
  vacationType: any;
  from: any;
  to: any;
  branchChiefApproved: any;
  OfficersAffairsApproved: any;
  insteadOf: any;
  viceManagerApproved: any;
  ManagerApproved: any;
}
interface IProps {
  vacationsData: IVacationData[];
}
function VacationsTable(props: IProps) {
  const [isOverLayOpen, setIsOverLayOpen] = useState<boolean>(false);
  const [vactionIdToOpen, setVactionIdToOpen] = useState<string>("");

  return (
    <>
      <Overlay isOpen={isOverLayOpen} setIsOverlayOpen={setIsOverLayOpen}>
        <VacationApprovalOverlayContent />
      </Overlay>
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
        className="table table-hover fs-4"
        key={JSON.stringify(props.vacationsData)}
      >
        <thead className={""}>
          <tr>
            <th scope="col" style={{ width: "10%" }}>
              رتبة
            </th>
            <th scope="col" style={{ width: "15%" }}>
              اسم
            </th>
            <th scope="col" style={{ width: "15%" }}>
              نوع الاجازة
            </th>
            <th scope="col" style={{ width: "17%" }}>
              من
            </th>
            <th scope="col" style={{ width: "17%" }}>
              الى
            </th>
            <th scope="col" style={{ width: "17%" }}>
              بدلاً عن
            </th>
            <th scope="col" style={{ width: "10%" }}>
              التفاصيل
            </th>
          </tr>
        </thead>
        <tbody>
          {props.vacationsData.map((vacationData: IVacationData) => {
            console.log({vacationData})
            const isWaiting =
              // vacationData.ManagerApproved == null &&
              vacationData.OfficersAffairsApproved == null &&
              vacationData.branchChiefApproved == null &&
              vacationData.viceManagerApproved == null;
            const isAccepted =
              // vacationData.ManagerApproved === true &&
              vacationData.OfficersAffairsApproved === true &&
              vacationData.branchChiefApproved === true &&
              vacationData.viceManagerApproved === true;
            let className = "";
            if (isAccepted) {
              className = "text-success";
            } else if (isWaiting) {
              className = "text-warning";
            } else {
              className = "text-danger";
            }
            return (
              <tr
                className={className}
                style={{ fontSize: "20px" }}
                onClick={() => {
                  setIsOverLayOpen(true);
                  setVactionIdToOpen(vacationData.id);
                }}
                key={vacationData.id}
              >
                <td style={{ width: "10%" }}>{vacationData.officerRank}</td>
                <td style={{ width: "15%" }}>{vacationData.officerName}</td>
                <td style={{ width: "15%" }}>{vacationData.vacationType}</td>
                <td style={{ width: "17%" }}>{vacationData.from}</td>
                <td style={{ width: "17%" }}>{vacationData.to}</td>
                <td style={{ width: "17%" }}>{vacationData.insteadOf}</td>
                <td style={{ width: "10%" }}>
                  <button
                    className="btn btn-lg btn-secondary"
                    onClick={() => {
                      setIsOverLayOpen(true);
                      setVactionIdToOpen(vacationData.id);
                    }}
                  >
                    التفاصيل
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default VacationsTable;
