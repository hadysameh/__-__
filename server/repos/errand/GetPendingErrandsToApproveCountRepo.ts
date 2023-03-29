import { Errand } from "../../models";
import { userTypesEnum } from "../../types";
import getTodaysDate from "../../_helpers/getTodaysDate";
import getOfficersRepo from "../officers/getOfficersRepo";
import getNormalOfficersIds from "../_helpers/getNormalOfficersIds";

class GetPendingErrandsToApproveCountRepo {
  static async getCount(user: any) {
    const userType = user.userType.userType;
    const userBranch = user.officer.branch;

    let queryParams: any = {};
    if (userType == userTypesEnum.manager) {
      queryParams["managerApproved"] = null;
      queryParams["officersAffairsApproved"] = true;
    } else if (userType == userTypesEnum.viceManager) {
      queryParams["viceManagerApproved"] = null;
      queryParams["officersAffairsApproved"] = true;
    } else if (userType == userTypesEnum.officersAffairs) {
      queryParams["officersAffairsApproved"] = null;
      queryParams["branchChiefApproved"] = true;
    } else if (userType == userTypesEnum.branchChief) {
      const brachOfficers = await getOfficersRepo.getOfficers({
        branch: userBranch,
      });
      const brachOfficersId = brachOfficers.map(
        (brachOfficer) => brachOfficer.id
      );
      queryParams["officer"] = { $in: brachOfficersId };
      queryParams["managerApproved"] = null;
      queryParams["viceManagerApproved"] = null;
      queryParams["officersAffairsApproved"] = null;
      queryParams["branchChiefApproved"] = null;
    }
    queryParams = { ...queryParams, fromDate: { $gte: getTodaysDate() } };
    let errandsToBeApprovedCount = await Errand.count(queryParams);

    return errandsToBeApprovedCount;
  }
}

export default GetPendingErrandsToApproveCountRepo;
