import { useSelector } from "react-redux";
import { userTypes } from "../../../types";
import { selectUserType } from "../../auth";
import ApprovalBlock from "./ApprovalBlock";
import { useEffect } from "react";
import socket from "../../../services/socket-io";
import getOneErrand from "../serverApis/getOne";
import { useQuery } from "react-query";
import HorizontalSpinner from "../../../components/HorizontalSpinner";
interface IProps {
  errandId: string;
}

function ErrandApprovalOverlayContent(props: IProps) {
  const userType = useSelector(selectUserType);
  const {
    data: storedErrandsData,
    isLoading: isVacationsLoading,
    error: vacationError,
    refetch: refetchErrands,
  } = useQuery("getOneErrand", () => getOneErrand(props.errandId), {
    staleTime: Infinity,
    cacheTime: 0,
    enabled: !!props.errandId,
  });
  useEffect(() => {
    socket.on("refetch-errands-data", refetchErrands);
    return () => {
      socket.off("refetch-errands-data", refetchErrands);
    };
  }, []);

  if (isVacationsLoading) {
    return <HorizontalSpinner></HorizontalSpinner>;
  }

  return (
    <>
      <div className="bg-white container d-flex flex-column justify-center">
        <hr />
        <h1>التفاصيل</h1>

        <hr />
        <div id="vacation-data" className="fs-3 p-3">
          <div className="row">
            الضابط:
            {storedErrandsData.officer.rank.rank +
              "/" +
              storedErrandsData.officer.name}
          </div>
          <br />
          <div className="row">
            الجهة:
            {storedErrandsData.destination}
          </div>
          <br />
          <div className="row">
            السبب:
            {storedErrandsData.reason}
          </div>
          <br />
          <div className="row">
            من:
            {storedErrandsData.fromDate}
          </div>
          <br />
          <div className="row">
            الى:
            {storedErrandsData.toDate}
          </div>
        </div>
        <hr />
        <ApprovalBlock
          id={props.errandId}
          enabled={true}
          title="موافقة رئيس الفرع"
          allowedUserTypes={[userTypes.branchChief]}
          updateLink="api/errand/update"
          approvalPropertyName="branchChiefApproved"
          noticePropertyName="branchChiefNotice"
          storedData={storedErrandsData}
        />
        <hr />
        <ApprovalBlock
          id={props.errandId}
          enabled={true}
          title="موافقة رئيس فرع شئون الضباط"
          allowedUserTypes={[userTypes.officersAffairs]}
          updateLink="api/errand/update"
          approvalPropertyName="officersAffairsApproved"
          noticePropertyName="officersAffairsNotice"
          storedData={storedErrandsData}
        />
        <hr />
        <ApprovalBlock
          id={props.errandId}
          enabled={true}
          title="موافقة نائب المدير"
          allowedUserTypes={[userTypes.officersAffairs, userTypes.viceManager]}
          // allowedUserType={userTypes.viceManager || userTypes.admin}
          updateLink="api/errand/update"
          approvalPropertyName="viceManagerApproved"
          noticePropertyName="viceManagerNotice"
          storedData={storedErrandsData}
        />
      </div>
    </>
  );
}
export default ErrandApprovalOverlayContent;
