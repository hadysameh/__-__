import { useSelector } from "react-redux";
import { userTypes } from "../../../types";
import { selectUserType } from "../../auth";
import ApprovalBlock from "./ApprovalBlock";

function VacationApprovalOverlayContent() {
  const userType = useSelector(selectUserType);

  return (
    <>
      <div className="bg-white container d-flex flex-column justify-center">
        <hr />
        <h1>التفاصيل</h1>
        <hr />
        <ApprovalBlock
          enabled={
            userType === userTypes.branchChief || userType === userTypes.admin
          }
          title="موافقة رئيس الفرع"
        />
        <hr />
        <ApprovalBlock
          enabled={
            userType === userTypes.officersAffairs ||
            userType === userTypes.admin
          }
          title="موافقة رئيس فرع شئون الضباط"
        />
        <hr />
        <ApprovalBlock
          enabled={
            userType === userTypes.viceManager || userType === userTypes.admin
          }
          title="موافقة نائب المدير"
        />
        <hr />
        <ApprovalBlock
          enabled={
            userType === userTypes.manager || userType === userTypes.admin
          }
          title="موافقة المدير"
        />
      </div>
    </>
  );
}
export default VacationApprovalOverlayContent;
