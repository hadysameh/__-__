import { Request, Response } from "express";
import { Vacation } from "../../models";
import { IOfficerModel, IVacationModel, IVacationTypeModel } from "../../types";

class GetVacationsRepo {
  static async getVacations(
    queryParams: any,
    pageNumber: any,
    rowsPerPage: any
  ) {
    if (typeof queryParams == "string") {
      queryParams = JSON.parse(queryParams);
    }
    pageNumber = pageNumber - 1;
    let vacations = await Vacation.find(queryParams ? queryParams : {})
      .limit(Number(rowsPerPage))
      .skip(Number(pageNumber) * Number(rowsPerPage))
      .populate<IOfficerModel>({
        path: "officer",
        populate: {
          path: "rank",
          model: "Rank",
        },
      })
      .sort({
        _id: "asc",
      })
      .populate<IVacationTypeModel>("type");
    console.log({ vacations });
    return vacations;
  }
}

export default GetVacationsRepo;
