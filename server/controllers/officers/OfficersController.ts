import { Request, Response } from "express";
import getOfficersRepo from "../../repos/officers/getOfficersRepo";
import { userTypesEnum } from "../../types";

export default class OfficersController {
  static async getAllOfficers(req: Request, res: Response): Promise<any> {
    try {
      const { officersModelParams, pageNumber, rowsPerPage } = req.query;
      const userType = req.user.userType.userType;
      const userBranch = req.user.officer.branch;

      let modifiedParams: any = {};
      if (officersModelParams) {
        modifiedParams = JSON.parse(String(officersModelParams));
      }

      if (userType == userTypesEnum.branchChief) {
        const brachOfficers = await getOfficersRepo.getOfficers({
          branch: userBranch,
        });
        const brachOfficersId = brachOfficers.map(
          (brachOfficer) => brachOfficer.id
        );
        if (!modifiedParams["_id"] || !modifiedParams["id"]) {
          modifiedParams["_id"] = { $in: brachOfficersId };
        }
      }

      let officers = await getOfficersRepo.getOfficers(
        modifiedParams,
        pageNumber,
        rowsPerPage
      );
      res.json(officers);
    } catch (error) {
      console.log({ error });
    }
  }
}
