import VacationsCredit from "../../models/VacationsCredit";

class StoreOrUpdateOfficerVacationsCredit {
  static async storeOfficerVacationsCredit(
    year: any,
    officerId: any,
    erguntVacationsNumber: any,
    remainingErguntVacationsNumber: any,
    yearlyVacationsDaysNumber: number,
    remainingYearlyVacationsDaysNumber: any,
    daysToHaveVactionsInsteadOf: []
  ) {
    let findQuery = {
      year,
      officer: officerId,
    };

    let fieldsToUpdateOrCreate = {
      erguntVacationsNumber,
      remainingErguntVacationsNumber,
      yearlyVacationsDaysNumber,
      remainingYearlyVacationsDaysNumber,
      daysToHaveVactionsInsteadOf,
    };

    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    let myVacationsCredit = await VacationsCredit.findOneAndUpdate(
      findQuery,
      fieldsToUpdateOrCreate,
      options
    );
    return myVacationsCredit;
  }
}
export default StoreOrUpdateOfficerVacationsCredit;
