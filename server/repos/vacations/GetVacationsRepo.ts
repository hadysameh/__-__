import { Request, Response } from "express";
import { Vacation } from "../../models";
import { IOfficerModel, IVacationModel, IVacationTypeModel } from "../../types";
import getNormalOfficersIds from "../_helpers/getNormalOfficersIds";

class GetVacationsRepo {
  static async getVacations(
    queryParams: any = {},
    pageNumber: any = 1,
    rowsPerPage: any = 2000,
    isRequestingUserOfManagerType: boolean = false
  ) {
    if (typeof queryParams == "string") {
      queryParams = JSON.parse(queryParams);
    }
    pageNumber = pageNumber - 1;
    let normalOfficersIds: any = [];
    // if (isRequestingUserOfManagerType) {
    //   normalOfficersIds = await getNormalOfficersIds();
    //   queryParams["officer"] = { $nin: normalOfficersIds };
    // }
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
        _id: "desc",
      })
      .populate<IVacationTypeModel>("type");
    return vacations;
  }
}

export default GetVacationsRepo;
