import { Request, Response } from "express";
import StoreVacationRepo from "../../repos/vacations/StoreVacationRepo";
import UpdateVacationRepo from "../../repos/vacations/UpdateVacationRepo";
import DeleteVacationRepo from "../../repos/vacations/DeleteVacationRepo";
import { IVacationModel } from "../../types";
import GetCreateVacationOptions from "../../repos/vacations/GetCreateVacationOptions";
import GetVacationsRepo from "../../repos/vacations/GetVacationsRepo";
import GetOneVacationsCreditRepo from "../../repos/vacationsCredit/GetOneVacationsCreditRepo";
import emitSocketEvent from "../../_helpers/socketIo";
class VacationsController {
  static async getVacationSearchOptions(req: Request, res: Response) {}

  // static async getMyVacations(req: Request, res: Response) {
  //   try {
  //     const officerId = req.user.officer._id;
  //     const { pageNumber, rowsPerPage } = req.query;

  //     const myvacations = await GetMyVacationsRepo.getMyVacations(
  //       officerId,
  //       pageNumber,
  //       rowsPerPage
  //     );
  //     res.json(myvacations);
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // }

  // static async getMyVacationsRequests(req: Request, res: Response) {
  //   //varys depending on user type
  //   try {
  //     const officerId = req.user.officer._id;
  //     const { pageNumber, rowsPerPage } = req.query;

  //     const myvacations = await GetMyVacationsRequetsRepo.getMyVacationsRequestsRepo(
  //       officerId,
  //       pageNumber,
  //       rowsPerPage
  //     );
  //     res.json(myvacations);
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // }

  // static async getPendingVacations(req: Request, res: Response) {
  //   try {
  //     const { pageNumber, rowsPerPage } = req.query;
  //     const pendingVacations = await GetPendingVacationsRepo.getPendingVacations(
  //       req.user.userType.userType,
  //       pageNumber,
  //       rowsPerPage
  //     );
  //     res.json(pendingVacations);
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // }

  static async getCreateVacationOptions(req: Request, res: Response) {
    try {
      let vacationsOptions = await GetCreateVacationOptions.getCreateVacationOptions();
      res.json(vacationsOptions);
    } catch (error) {
      console.log({ error });
    }
  }

  static async get(req: Request, res: Response) {
    const { vacationModelParams, pageNumber, rowsPerPage } = req.query;
    const vacations = await GetVacationsRepo.getVacations(
      vacationModelParams,
      pageNumber,
      rowsPerPage
    );
    res.json(vacations);
  }

  static async getOne(req: Request, res: Response) {
    const { id } = req.query;
    const vacationCredit = GetOneVacationsCreditRepo.getVacationCredit(id);
    res.json(vacationCredit);
  }

  static async store(req: Request, res: Response) {
    req.body;
    try {
      let vacationParams = {
        type: req.body.type,
        to: req.body.to,
        from: req.body.from,
        officer: req.user.officer.id,
        insteadOf: req.body.insteadOf,
      };

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
      let updatedVacation = await UpdateVacationRepo.updateVacation(
        vacationParams.id,
        vacationParams
      );
      emitSocketEvent("refetch-vacations-data");
      res.json(updatedVacation);
    } catch (error) {
      console.log({ error });
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
