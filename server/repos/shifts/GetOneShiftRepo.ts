import { Shift } from "../../models";

class GetOneShiftRepo {
  static async getShifts(
    queryParams: any = {},
    pageNumber: any = 1,
    rowsPerPage: any = 2000
  ) {
    pageNumber = pageNumber - 1;

    let errands = await Shift.findOne(queryParams ? queryParams : {})
      .limit(Number(rowsPerPage))
      .skip(Number(pageNumber) * Number(rowsPerPage))
      .populate<any>({
        path: "monthlyShift",
        populate: {
          path: "dutyManagerOfficer",
          model: "Officer",
          populate: {
            path: "rank",
            model: "Rank",
          },
        },
      })
      .populate<any>({
        path: "monthlyShift",
        populate: {
          path: "strategicDutyManagerOfficer",
          model: "Officer",
          populate: {
            path: "rank",
            model: "Rank",
          },
        },
      })
      .populate<any>({
        path: "monthlyShift",
        populate: {
          path: "shiftOfficer",
          model: "Officer",
          populate: {
            path: "rank",
            model: "Rank",
          },
        },
      })
      .sort({
        _id: "desc",
      });
    return errands;
  }
}
export default GetOneShiftRepo;
