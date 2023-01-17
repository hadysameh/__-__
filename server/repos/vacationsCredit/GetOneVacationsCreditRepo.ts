import { VacationsCredit } from "../../models";

class GetOneVacationsCreditRepo {
  static async getVacationCredit(id: any) {
    let vacation = await VacationsCredit.findOne({ _id: id });

    return vacation;
  }
}
export default GetOneVacationsCreditRepo;
