import { useSelector } from "react-redux";
import { userTypes } from "../../../types";
import { selectUserType } from "../../auth";
import ApprovalBlock from "./ApprovalBlock";
import { useEffect } from "react";
import socket from "../../../services/socket-io";
import getOneVacation from "../serverApis/getOne";
import { useQuery } from "react-query";
import HorizontalSpinner from "../../../components/HorizontalSpinner";
import fetchOfficerVacationsCreditInYear from "../../vacationsCredit/serverServices/fetchOfficerVacationsCreditInYear";
import getCurrentYear from "../../../_helpers/getCurrentYear";
import OfficerRemainingVacationsCredit from "../../vacationsCredit/components/OfficerRemainingVacationsCredit";
import calculateDiffreneceBetweenDates from "../../../_helpers/calculateDiffreneceBetweenDates";
interface IProps {
  vacationId: string;
}

function VacationApprovalOverlayContent(props: IProps) {
  const userType = useSelector(selectUserType);
  const {
    data: storedVacationData,
    isLoading: isVacationsLoading,
    error: vacationError,
    refetch: refetchVacations,
  } = useQuery("getOneVacation", () => getOneVacation(props.vacationId), {
    staleTime: Infinity,
    cacheTime: 0,
    enabled: !!props.vacationId,
  });
  const {
    data: officerVacationCredit,
    isLoading: isOfficerVacationCredit,
    error: officerVacationCreditError,
  } = useQuery(
    "getOfficerVacationCredit",
    () =>
      fetchOfficerVacationsCreditInYear(
        storedVacationData.officer,
        getCurrentYear()
      ),
    {
      cacheTime: 0,
      enabled: !!storedVacationData,
    }
  );
  useEffect(() => {
    socket.on("refetch-vacations-data", refetchVacations);
    return () => {
      socket.off("refetch-vacations-data", refetchVacations);
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
            {storedVacationData.vacation.officer.rank.rank +
              "/" +
              storedVacationData.vacation.officer.name}
          </div>
          <br />
          <div className="row">
            نوع الاجازة:
            {storedVacationData.vacation.type.vacationType}
          </div>
          <br />
          <div className="row">
            المدة:
            {(() => {
              const diffBetweenFromAndTo = calculateDiffreneceBetweenDates(
                storedVacationData.vacation.to,
                storedVacationData.vacation.from
              );
              return diffBetweenFromAndTo + 1;
            })()}
          </div>
          <br />
          <div className="row">
            من:
            {storedVacationData.vacation.from}
          </div>
          <br />
          <div className="row">
            الى:
            {storedVacationData.vacation.to}
          </div>
          {storedVacationData.vacation.dayToHaveVactionInsteadOf && (
            <div className="row">
              بدلاً عن:
              {storedVacationData.vacation.dayToHaveVactionInsteadOf}
            </div>
          )}
        </div>
        <hr />
        <ApprovalBlock
          id={props.vacationId}
          enabled={true}
          title="موافقة رئيس الفرع"
          allowedUserTypes={[userTypes.branchChief]}
          updateLink="api/vacation/update"
          approvalPropertyName="branchChiefApproved"
          noticePropertyName="branchChiefNotice"
          storedData={storedVacationData}
        />
        <hr />
        <ApprovalBlock
          id={props.vacationId}
          enabled={true}
          title="موافقة رئيس فرع شئون الضباط"
          allowedUserTypes={[userTypes.officersAffairs]}
          updateLink="api/vacation/update"
          approvalPropertyName="officersAffairsApproved"
          noticePropertyName="officersAffairsNotice"
          storedData={storedVacationData}
        >
          <OfficerRemainingVacationsCredit
            officerId={storedVacationData.vacation.officer._id}
          />
        </ApprovalBlock>
        <hr />
        <ApprovalBlock
          id={props.vacationId}
          enabled={true}
          title="موافقة نائب المدير"
          // allowedUserType={userTypes.viceManager || userTypes.admin}
          allowedUserTypes={[userTypes.viceManager, userTypes.officersAffairs]}
          updateLink="api/vacation/update"
          approvalPropertyName="viceManagerApproved"
          noticePropertyName="viceManagerNotice"
          storedData={storedVacationData}
        />
        <hr />
        <ApprovalBlock
          id={props.vacationId}
          enabled={true}
          allowedUserTypes={[userTypes.manager, userTypes.officersAffairs]}
          title="موافقة المدير"
          updateLink="api/vacation/update"
          approvalPropertyName="managerApproved"
          noticePropertyName="managerNotice"
          storedData={storedVacationData}
        />
      </div>
    </>
  );
}
export default VacationApprovalOverlayContent;
