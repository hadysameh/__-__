import { Request, Response } from "express";
import { Vacation } from "../../models";

class DeleteVacationRepo {
  static async deleteVacation(id: any) {
    let deletedVacation = Vacation.deleteOne({ id });
    return deletedVacation;
  }
}

export default DeleteVacationRepo;
