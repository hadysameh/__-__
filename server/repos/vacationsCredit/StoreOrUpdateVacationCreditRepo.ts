import VacationsCredit from "../../models/VacationsCredit";

class StoreOrUpdateOfficerVacationsCredit {
  static async storeOfficerVacationsCredit( 
    year: any,
    officerId: any,
    erguntVacationsNumber: any,
    firstHalfyearlyVacationsDaysNumber: any,
    secondHalfyearlyVacationsDaysNumber: any,
    daysToHaveVactionsInsteadOf: []
  ) {
    let query = {
      year,
      officer: officerId,
    };

    let updateOrCreate = {
      officer: officerId,
      daysToHaveVactionsInsteadOf,
      erguntVacationsNumber,
      firstHalfyearlyVacationsDaysNumber,
      secondHalfyearlyVacationsDaysNumber,
    };

    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    let myVacationsCredit = await VacationsCredit.findOneAndUpdate(
      query,
      updateOrCreate,
      options
    );
    return myVacationsCredit;
  }
}
export default StoreOrUpdateOfficerVacationsCredit;
