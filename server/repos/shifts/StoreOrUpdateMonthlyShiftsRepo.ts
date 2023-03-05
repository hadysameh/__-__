import { Shift } from "../../models";
class StoreOrUpdateMonthlyShiftsRepo {
  static async storeOrUpdateMonthlyShifts(
    monthlyShift: any,
    month: any,
    year: any
  ) {
    let query = {
      year,
      month,
    };

    let dataToUpdateOrCreate = {
      monthlyShift,
      month,
      year,
    };

    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    let updatedMonthlyShifts = await Shift.findOneAndUpdate(
      query,
      dataToUpdateOrCreate,
      options
    );
    return updatedMonthlyShifts;
  }
}
export default StoreOrUpdateMonthlyShiftsRepo;
