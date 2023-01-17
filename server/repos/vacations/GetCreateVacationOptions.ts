import { VacationType } from "../../models";

class GetCreateVacationOptions {
  static async getCreateVacationOptions() {
    const vacationsTypes = await VacationType.find({});
    return vacationsTypes;
  }
}

export default GetCreateVacationOptions