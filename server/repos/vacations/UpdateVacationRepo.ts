import { Request, Response } from "express";
import { Vacation } from "../../models";
import { IVacationModel } from "../../types";

class UpdateVacationRepo {
  static async updateVacation(id: any, params: IVacationModel) {
    let updatedVacation = await Vacation.updateOne({ id, ...params });
    return updatedVacation;
  }
}

export default UpdateVacationRepo;
