import { Request, Response } from "express";
import { Vacation } from "../../models";
import { IOfficerModel, IVacationModel, IVacationTypeModel } from "../../types";

class GetOneVacationRepo {
  static async getVacation(id: any) {
    let vacation = await Vacation.findOne({ _id: id })
      .populate<IOfficerModel>({
        path: "officer",
        populate: {
          path: "rank",
          model: "Rank",
        },
      })
      .populate<IVacationTypeModel>("type");
    return vacation;
  }
}

export default GetOneVacationRepo;
