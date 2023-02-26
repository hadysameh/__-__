import { Request, Response } from "express";
import StoreVacationRepo from "../../repos/vacations/StoreVacationRepo";
import UpdateVacationRepo from "../../repos/vacations/UpdateVacationRepo";
import DeleteVacationRepo from "../../repos/vacations/DeleteVacationRepo";
import { IOfficerModel, userTypesEnum } from "../../types";

import GetCreateVacationOptions from "../../repos/vacations/GetCreateVacationOptions";
import GetVacationsRepo from "../../repos/vacations/GetVacationsRepo";
import GetOneVacationsCreditRepo from "../../repos/vacationsCredit/GetOneVacationsCreditRepo";
import emitSocketEvent from "../../_helpers/socketIo";

import getOfficersRepo from "../../repos/officers/getOfficersRepo";
import GetOneVacationRepo from "../../repos/vacations/GetOneVacationRepo";
import getOfficerType from "../../repos/_helpers/getOfficerType";
import GetPendingVacationsToApproveCountRepo from "../../repos/vacations/GetPendingVacationsToApproveCount";
class VacationsController {
  static async getPendingVacationsToBeApprovedCount(
    req: Request,
    res: Response
  ) {
    try {
      const count = await GetPendingVacationsToApproveCountRepo.getCount(
        req.user
      );
      res.json(count);
    } catch (error) {
      console.log({ error });
    }
  }
  static async getVacationSearchOptions(req: Request, res: Response) {}

  static async getCreateVacationOptions(req: Request, res: Response) {
    try {
      let vacationsOptions = await GetCreateVacationOptions.getCreateVacationOptions();
      res.json(vacationsOptions);
    } catch (error) {
      console.log({ error });
    }
  }

  static async get(req: Request, res: Response) {
    let { vacationModelParams, pageNumber, rowsPerPage } = req.query;
    const userType = req.user.userType.userType;
    const userBranch = req.user.officer.branch;

    let modifiedParams = JSON.parse(String(vacationModelParams));

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

    const vacations = await GetVacationsRepo.getVacations(
      modifiedParams,
      pageNumber,
      rowsPerPage,
      req.user.userType.userType === userTypesEnum.manager
    );
    res.json(vacations);
  }

  static async getOne(req: Request, res: Response) {
    const { id } = req.query;
    const vacation = await GetOneVacationRepo.getVacation(id);
    const officerType = await getOfficerType(vacation?.get("officer"));
    res.json({ vacation, officerType });
  }

  static async store(req: Request, res: Response) {
    req.body;
    try {
      let vacationParams = req.body;

      let vacations = await StoreVacationRepo.storeVacation(vacationParams);
      emitSocketEvent("refetch-vacations-data");

      res.json(vacations);
    } catch (error) {
      console.log({ error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      let vacationParams = req.body;
      const { _id } = vacationParams;
      delete vacationParams["_id"];
      console.log({ vacationParams });

      let updatedVacation = await UpdateVacationRepo.updateVacation(
        _id,
        vacationParams
      );
      emitSocketEvent("refetch-vacations-data");
      res.json(updatedVacation);
    } catch (error) {
      console.log("vacationsController update", { error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      let vacationParams = req.body;

      let deletedVacation = await DeleteVacationRepo.deleteVacation(
        vacationParams.id
      );
      emitSocketEvent("refetch-vacations-data");

      res.json(deletedVacation);
    } catch (error) {
      console.log({ error });
    }
  }
}

export default VacationsController;
