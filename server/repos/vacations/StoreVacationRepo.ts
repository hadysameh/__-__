import { Request, Response } from "express";
import { Vacation } from "../../models";
import { IVacationModel } from "../../types";
import clearObjectFromUndefinedParams from "../../_helpers/clearObjectFromUndefinedParams";

class StoreVacationRepo {
  static async storeVacation(params: {
    type: string;
    to: string;
    from: string;
    insteadOf?: string;
  }) {
    const cleanedParams = clearObjectFromUndefinedParams(params);
    let vacation = await Vacation.create(cleanedParams);
    return vacation;
  }
}

export default StoreVacationRepo;
