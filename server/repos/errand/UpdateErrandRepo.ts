import Errand from "../../models/Errand";

class UpdateErrandRepo {
  static async updateErrand(_id: any, ErrandParams: any) {
    const updatedErrand = await Errand.updateOne(
      { _id },
      {
        ...ErrandParams,
      }
    );

    return updatedErrand;
  }
}
export default UpdateErrandRepo;
