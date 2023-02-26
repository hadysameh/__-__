import { Request, Response } from "express";
import StoreErrandRepo from "../../repos/errand/StoreErrandRepo";
import emitSocketEvent from "../../_helpers/socketIo";
import clearObjectFromUndefinedParams from "../../_helpers/clearObjectFromUndefinedParams";
import GetCreateErrandOptions from "../../repos/errand/GetCreateErrandOptions";
import { userTypesEnum } from "../../types";
import getOfficersRepo from "../../repos/officers/getOfficersRepo";
import GetErrandsRepo from "../../repos/errand/GetErrandsRepo";
import GetOneErrandRepo from "../../repos/errand/GetOneErrandRepo";
import UpdateErrandRepo from "../../repos/errand/UpdateErrandRepo";
import GetPendingErrandsToApproveCountRepo from "../../repos/errand/GetPendingErrandsToApproveCountRepo";
class ErrandsController {
  static async getPendingErrandsToBeApprovedCount(req: Request, res: Response) {
    try {
      const count = await GetPendingErrandsToApproveCountRepo.getCount(
        req.user
      );
      res.json(count);
    } catch (error) {
      console.log({ error });
    }
  }
  static async getCreateErrandOptions(req: Request, res: Response) {
    try {
      let errandOptions = await GetCreateErrandOptions.getCreateErrandOptions();
      res.json(errandOptions);
    } catch (error) {
      console.log({ error });
    }
  }
  static async get(req: Request, res: Response) {
    let { errandModelParams, pageNumber, rowsPerPage } = req.query;
    const userType = req.user.userType.userType;
    const userBranch = req.user.officer.branch;

    let modifiedParams = JSON.parse(String(errandModelParams));

    if (userType == userTypesEnum.branchChief) {
      const brachOfficers = await getOfficersRepo.getOfficers({
        branch: userBranch,
      });
      const brachOfficersId = brachOfficers.map(
        (brachOfficer) => brachOfficer.id
      );
      if (!modifiedParams["officer"]) {
        modifiedParams["officer"] = { $in: brachOfficersId };
      }
    }

    const errands = await GetErrandsRepo.getErrands(
      modifiedParams,
      pageNumber,
      rowsPerPage
    );
    res.json(errands);
  }
  static async getOne(req: Request, res: Response) {
    const { id } = req.query;
    const errand = await GetOneErrandRepo.getOneErrand(id);
    // const officerType = await getOfficerType(vacation?.get("officer"));
    // res.json({ vacation, officerType });
    res.json(errand);
  }
  static async store(req: Request, res: Response) {
    try {
      const errandParams = req.body;
      const cleanedParams = clearObjectFromUndefinedParams(errandParams);

      const storedErrand = await StoreErrandRepo.StoreErrand(cleanedParams);
      emitSocketEvent("refetch-errands-data");
      res.json(storedErrand);
    } catch (error) {
      console.log({ error });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      let errandParams = req.body;
      const { _id } = errandParams;
      delete errandParams["_id"];

      let updatedErrand = await UpdateErrandRepo.updateErrand(
        _id,
        errandParams
      );
      emitSocketEvent("refetch-errands-data");
      res.json(updatedErrand);
    } catch (error) {}
  }

  static async delete(req: Request, res: Response) {}
}
export default ErrandsController;
