import { Request, Response } from "express";
import { Officer } from "../../models";
import { IOfficerModel, IVacationModel, IVacationTypeModel } from "../../types";

class getOfficersRepo {
  static async getOfficers(
    queryParams: any = {},
    pageNumber: any = 1,
    rowsPerPage: any = 2000
  ) {
    if (typeof queryParams == "string") {
      queryParams = JSON.parse(queryParams);
    }
    if (pageNumber) {
      pageNumber = pageNumber - 1;
    } else {
      pageNumber = 1;
    }

    if (!rowsPerPage) {
      rowsPerPage = 1000;
    }
    let officers = await Officer.find({ ...queryParams })
      .populate(["rank", "branch"])
      .limit(Number(rowsPerPage))
      .skip(Number(pageNumber) * Number(rowsPerPage));

    return officers;
  }
}

export default getOfficersRepo;
