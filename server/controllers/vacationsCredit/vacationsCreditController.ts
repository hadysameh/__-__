import { Request, Response } from "express";
import GetOneVacationsCreditRepo from "../../repos/vacationsCredit/GetOneVacationsCreditRepo";
import GetVacationsCreditRepo from "../../repos/vacationsCredit/GetVacationsCreditRepo";
import GetRepo from "../../repos/vacationsCredit/GetVacationsCreditRepo";
import StoreOrUpdateRepo from "../../repos/vacationsCredit/StoreOrUpdateVacationCreditRepo";
import emitSocketEvent from "../../_helpers/socketIo";

class vacationsCreditController {
  static async get(req: Request, res: Response) {
    const { pageNumber, rowsPerPage, vacationCreditParams } = req.query;
    const vacationsCredit = await GetVacationsCreditRepo.getVacationsCredit(
      vacationCreditParams,
      pageNumber,
      rowsPerPage
    );
    res.json(vacationsCredit);
  }

  static async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const vacationsCredit = await GetOneVacationsCreditRepo.getVacationCredit(
      id
    );
    res.json(vacationsCredit);
  }

  static async storeOrUpdate(req: Request, res: Response) {
    try {
      const {
        year,
        officerId,
        erguntVacationsNumber,
        remainingErguntVacationsNumber,
        yearlyVacationsDaysNumber,
        remainingYearlyVacationsDaysNumber,
        daysToHaveVactionsInsteadOf,
      } = req.body;

      const myvacations = await StoreOrUpdateRepo.storeOfficerVacationsCredit(
        year,
        officerId,
        erguntVacationsNumber,
        remainingErguntVacationsNumber,
        yearlyVacationsDaysNumber,
        remainingYearlyVacationsDaysNumber,
        daysToHaveVactionsInsteadOf
      );
      emitSocketEvent("refetch-vacations-data");

      res.json(myvacations);
    } catch (error) {
      console.log({ error });
    }
  }
}
export default vacationsCreditController;
