import { Request, Response } from "express";
import GetOneShiftRepo from "../../repos/shifts/GetOneShiftRepo";
import StoreOrUpdateMonthlyShiftsRepo from "../../repos/shifts/StoreOrUpdateMonthlyShiftsRepo";

class ShiftsController {
  static async get(req: Request, res: Response) {
    try {
      let { month, year } = req.query;
    } catch (error) {}
  }
  static async getOne(req: Request, res: Response) {
    try {
      let { params } = req.query;
      if (typeof params == "string") {
        params = JSON.parse(params);
      }
      const monthShifts = await GetOneShiftRepo.getShifts(params);
      res.json(monthShifts);
    } catch (error) {
      console.log("ShiftsController.get", { error });
    }
  }

  static async storeOrUpdate(req: Request, res: Response) {
    try {
      let { shiftRows, month, year } = req.body;
      const updatedMonthlyShifts = await StoreOrUpdateMonthlyShiftsRepo.storeOrUpdateMonthlyShifts(
        shiftRows,
        month,
        year
      );
      res.json(updatedMonthlyShifts);
    } catch (error) {
      console.log("ShiftsController.storeOrUpdate", { error });
    }
  }
}
export default ShiftsController;
