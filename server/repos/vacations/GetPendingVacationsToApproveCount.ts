import { Vacation } from "../../models";
import { userTypesEnum } from "../../types";
import getTodaysDate from "../../_helpers/getTodaysDate";
import getOfficersRepo from "../officers/getOfficersRepo";
import getNormalOfficersIds from "../_helpers/getNormalOfficersIds";

class GetPendingVacationsToApproveCountRepo {
  static async getCount(user: any) {
    const userType = user.userType.userType;
    const userBranch = user.officer.branch;

    let normalOfficersIds: any[] = [];
    let queryParams: any = {};
    if (userType == userTypesEnum.manager) {
      normalOfficersIds = await getNormalOfficersIds();
      // queryParams["officer"] = { $nin: normalOfficersIds };
      queryParams["managerApproved"] = null;
      queryParams["viceManagerApproved"] = true;
    } else if (userType == userTypesEnum.viceManager) {
      queryParams["viceManagerApproved"] = null;
      queryParams["officersAffairsApproved"] = true;
    } else if (userType == userTypesEnum.officersAffairs) {
      //we need all vacations that wasn't fully approved
      queryParams["managerApproved"] = null;
      queryParams["branchChiefApproved"] = true;
    } else if (userType == userTypesEnum.branchChief) {
      const brachOfficers = await getOfficersRepo.getOfficers({
        branch: userBranch,
      });
      const brachOfficersId = brachOfficers.map(
        (brachOfficer) => brachOfficer.id
      );
      queryParams["officer"] = { $in: brachOfficersId };
      // queryParams["managerApproved"] = null;
      // queryParams["viceManagerApproved"] = null;
      // queryParams["officersAffairsApproved"] = null;
      queryParams["branchChiefApproved"] = null;
    }
    queryParams = { ...queryParams, from: { $gte: getTodaysDate() } };

    let vacationToBeApprovedCount = await Vacation.count(queryParams);

    return vacationToBeApprovedCount;
  }
}

export default GetPendingVacationsToApproveCountRepo;
