import { VacationType } from "../../models";

class GetCreateVacationOptions {
  static async getCreateVacationOptions() {
    let vacationTypes = await VacationType.find().sort({
      _id: "asc",
    });
    const createVacationOptions = {
      vacationTypes,
    };
    return createVacationOptions;
  }
}
export default GetCreateVacationOptions;
