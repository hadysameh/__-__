import { useQuery } from "react-query";
import HorizontalSpinner from "../../../components/HorizontalSpinner";
import getCurrentYear from "../../../_helpers/getCurrentYear";
import fetchOfficerVacationsCreditInYear from "../serverServices/fetchOfficerVacationsCreditInYear";

interface IProps {
  officerId: string;
}
const currentYear = getCurrentYear();
function OfficerRemainingVacationsCredit({ officerId }: IProps) {
  const unavailableDataElement = (
    <span className="text-danger"> غير متوفر</span>
  );
  const {
    data: officerVacationsCreditData,
    isLoading: isOfficerVacationsCreditDataLoading,
    error: fetchingVacationsCreditError,
    refetch: refetchOfficerVacationsCredit,
  } = useQuery(
    ["fetchOfficerVacationsCredit"],
    () => fetchOfficerVacationsCreditInYear(officerId, currentYear),
    {
      staleTime: Infinity,
      cacheTime: 0,
    }
  );

  return (
    <>
      {isOfficerVacationsCreditDataLoading ? (
        <HorizontalSpinner />
      ) : (
        <div className="fs-3">
          <div className="row">
            <div className=" col-lg-6">
              الرصيد المتبقي من العارضة قبل التصديق:{" "}
              {typeof Number(
                officerVacationsCreditData[0]?.remainingErguntVacationsNumber
              ) == "number"
                ? officerVacationsCreditData[0]?.remainingErguntVacationsNumber
                : unavailableDataElement}
            </div>
          </div>
          <br />
          <div className="row">
            <div className=" col-lg-6">
              الرصيد المتبقي من الاجازات السنوية قبل التصديق :{" "}
              {
                officerVacationsCreditData[0]
                  ?.remainingYearlyVacationsDaysNumber
              }
            </div>
          </div>

          <br />
        </div>
      )}
    </>
  );
}
export default OfficerRemainingVacationsCredit;
