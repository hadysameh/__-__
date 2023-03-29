import { Shift, Vacation, Errand, Officer } from "../../models";
import getCurrentYear from "../../_helpers/getCurrentYear";
import getTodaysDate from "../../_helpers/getTodaysDate";

const monthNamesOptions = [
  { value: "0", label: "يناير" },
  { value: "1", label: "فبراير" },
  { value: "2", label: "مارس" },
  { value: "3", label: "ابريل" },
  { value: "4", label: "مايو" },
  { value: "5", label: "يوليو" },
  { value: "6", label: "يونيو" },
  { value: "7", label: "اغسطس" },
  { value: "8", label: "سبتمبر" },
  { value: "9", label: "اكتوبر" },
  { value: "10", label: "نوفمبر" },
  { value: "11", label: "ديسمبر" },
];
class GetDailyAttendanceRepo {
  static async getDailyAttendance() {
    const todaysVacations = await Vacation.find({
      to: { $gte: getTodaysDate() },
      from: { $lte: getTodaysDate() },
      viceManagerApproved: true,
    })
      .populate({
        path: "officer",
        model: "Officer",
        populate: {
          path: "rank",
          model: "Rank",
        },
      })
      .populate({
        path: "type",
        model: "VacationType",
      });
    let officersInVacationIds = [];
    for (let index = 0; index < todaysVacations.length; index++) {
      const todaysOfficerVacation = todaysVacations[index];
      officersInVacationIds.push(todaysOfficerVacation.officer._id);
    }
    // todaysVacations.reduce()
    const todaysErrands = await Errand.find({
      toDate: { $gte: getTodaysDate() },
      fromDate: { $lte: getTodaysDate() },
      viceManagerApproved: true,
    })
      .populate({
        path: "officer",
        model: "Officer",
        populate: {
          path: "rank",
          model: "Rank",
        },
      })
      .populate({
        path: "errandType",
        model: "ErrandType",
      })
      .sort("sequenceNumber");
    let officersInErrandsIds = [];
    for (let index = 0; index < todaysErrands.length; index++) {
      const todaysOfficerErrand = todaysErrands[index];
      officersInErrandsIds.push(todaysOfficerErrand.officer._id);
    }
    const currentMonthIndex = new Date().getMonth();

    const currentMonthShifts = await Shift.findOne({
      year: getCurrentYear(),
      month: currentMonthIndex,
    })
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
      });

    const AvailableOfficers = await Officer.find({
      _id: { $nin: [...officersInErrandsIds, ...officersInVacationIds] },
    })
      .populate<any>({
        path: "rank",
        model: "Rank",
      })
      .populate<any>({
        path: "branch",
        model: "Branch",
      })
      .sort("sequenceNumber");
    const { monthlyShift } = currentMonthShifts;
    const results = {
      todaysVacations,
      todaysErrands,
      AvailableOfficers,
      monthlyShift,
    };
    return results;
  }
}
export default GetDailyAttendanceRepo;
