import { Request, Response } from "express";
import GetVacationRepo from "../../repos/vacations/GetVacationRepo";
import CreateVacationRepo from "../../repos/vacations/CreateVacationRepo";
import UpdateVacationRepo from "../../repos/vacations/UpdateVacationRepo";
import DeleteVacationRepo from "../../repos/vacations/DeleteVacationRepo";
import GetCreateVacationOptions from "../../repos/vacations/GetCreateVacationOptions";
import GetMyVacationsRepo from "../../repos/vacations/GetMyVacationsRepo";

class VacationsController {
  static async getVacationSearchOptions(req: Request, res: Response) {}
  // for search
  static async getVacation(req: Request, res: Response) {
    try {
      const { pageNum, rowsPrePage, vacationParams } = req.body;
      const vacations = await GetVacationRepo.getVacation(
        vacationParams,
        pageNum,
        rowsPrePage
      );
      res.json(vacations);
    } catch (error) {
      console.log({ error });
    }
  }

  static async getMyVacations(req: Request, res: Response) {
    try {
      console.log({ reqBody: req.body, reqquery: req.query });

      const officerId = req.user.officer._id;
      const { pageNum, rowsPerPage } = req.query;

      const myvacations = await GetMyVacationsRepo.getMyVacationsRepo(
        officerId,
        pageNum,
        rowsPerPage
      );
      res.json(myvacations);
    } catch (error) {
      console.log({ error });
    }
  }

  static async getOngoingvacatiorequests(req: Request, res: Response) {
    try {
    } catch (error) {
      console.log({ error });
    }
  }

  static async getDeniedvacatiorequests(req: Request, res: Response) {
    try {
    } catch (error) {
      console.log({ error });
    }
  }

  static async getCreateVacationOptions(req: Request, res: Response) {
    try {
      let vacationsOptions = await GetCreateVacationOptions.getCreateVacationOptions();
      res.json(vacationsOptions);
    } catch (error) {
      console.log({ error });
    }
  }

  static async createVacation(req: Request, res: Response) {
    req.body;
    try {
      let vacationParams = {
        type: req.body.type,
        to: req.body.to,
        from: req.body.from,
        officer: req.user.officer._id,
      };
      let vacations = await CreateVacationRepo.createVacation(vacationParams);
      res.json(vacations);
    } catch (error) {
      console.log({ error });
    }
  }

  static async updateVacation(req: Request, res: Response) {
    try {
      let vacationParams = req.body;
      let updatedVacation = await UpdateVacationRepo.updateVacation(
        vacationParams.id,
        vacationParams
      );
      res.json(updatedVacation);
    } catch (error) {
      console.log({ error });
    }
  }

  static async deleteVacation(req: Request, res: Response) {
    try {
      let vacationParams = req.body;

      let deletedVacation = await DeleteVacationRepo.deleteVacation(
        vacationParams.id
      );
      res.json(deletedVacation);
    } catch (error) {
      console.log({ error });
    }
  }
}

export default VacationsController;
