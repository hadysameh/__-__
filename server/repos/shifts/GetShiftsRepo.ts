import { Shift } from "../../models";

class GetShiftsRepo {
  static async getShifts(
    queryParams: any = {},
    pageNumber: any = 1,
    rowsPerPage: any = 2000
  ) {
    pageNumber = pageNumber - 1;

    let errands = await Shift.find(queryParams ? queryParams : {})
      .limit(Number(rowsPerPage))
      .skip(Number(pageNumber) * Number(rowsPerPage))
      .populate<any>({
        path: "monthlyShift",
        populate: {
          path: "dutyManagerOfficer",
          model: "Officer",
        },
      })
      .populate<any>({
        path: "monthlyShift",
        populate: {
          path: "strategicDutyManagerOfficer",
          model: "Officer",
        },
      })
      .populate<any>({
        path: "monthlyShift",
        populate: {
          path: "shiftOfficer",
          model: "Officer",
        },
      })
      .sort({
        _id: "desc",
      });
    return errands;
  }
}
export default GetShiftsRepo;
