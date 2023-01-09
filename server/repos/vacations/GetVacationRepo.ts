import { Request, Response } from "express";
import { Vacation } from "../../models";
import { IVacationModel } from "../../types";

class GetVacationRepo {
  static async getVacation(
    params: IVacationModel,
    pageNum: any,
    rowsPrePage: any
  ) {
    pageNum = pageNum - 1;
    console.log({ params, pageNum, rowsPrePage });
    let vacation = await Vacation.find(params ? params : {})
      .limit(Number(rowsPrePage))
      .skip(Number(pageNum) * Number(rowsPrePage))
      .sort({
        _id: "asc",
      });
    return vacation;
  }
}

export default GetVacationRepo;
