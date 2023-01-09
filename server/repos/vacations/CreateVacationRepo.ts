import { Request, Response } from "express";
import { Vacation } from "../../models";
import { IVacationModel } from "../../types";

class CreateVacationRepo {
  static async createVacation(params: {
    type: string;
    to: string;
    from: string;
  }) {
    // console.log({ vacationParams: params });
    let vacation = await Vacation.create(params);
    return vacation;
  }
}

export default CreateVacationRepo;
