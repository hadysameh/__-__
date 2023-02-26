import VacationsCredit from "../../models/VacationsCredit";
import { IOfficerModel, IVacationTypeModel } from "../../types";
import getCurrentYear from "../../_helpers/getCurrentYear";

class GetVacationsCreditRepo {
  static async getVacationsCredit(
    queryParamsObj: any = {},
    pageNumber: any = 1,
    rowsPerPage: any = 2000
  ) {
    pageNumber = pageNumber - 1;
    if (typeof queryParamsObj == "string") {
      queryParamsObj = JSON.parse(queryParamsObj);
    }
    const myVacationsCredit = await VacationsCredit.find(queryParamsObj)
      .populate<IOfficerModel>({
        path: "officer",
        populate: {
          path: "rank",
          model: "Rank",
        },
      })
      .limit(Number(rowsPerPage))
      .skip(Number(pageNumber) * Number(rowsPerPage))
      .sort({
        _id: "asc",
      });
    return myVacationsCredit;
  }
}
export default GetVacationsCreditRepo;
