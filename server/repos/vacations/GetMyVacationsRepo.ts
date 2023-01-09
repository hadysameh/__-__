import { Vacation } from "../../models";
import { IOfficerModel, IVacationTypeModel } from "../../types";

class GetMyVacationsRepo {
  static async getMyVacationsRepo(
    officerId: string,
    pageNum: any,
    rowsPrePage: any
  ) {
    pageNum = pageNum - 1;

    const myVactions = await Vacation.find({ officer: officerId })
      .populate<IOfficerModel>({
        path: "officer",
        populate: {
          path: "rank",
          model: "Rank",
        },
      })
      .populate<IVacationTypeModel>('type')
      .limit(Number(rowsPrePage))
      .skip(Number(pageNum) * Number(rowsPrePage))
      .sort({
        _id: "asc",
      });
    return myVactions;
  }
}
export default GetMyVacationsRepo;
