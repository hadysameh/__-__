import Errand from "../../models/Errand";

class GetOneErrandRepo {
  static async getOneErrand(id: any) {
    let errand = await Errand.findOne({ _id: id })
      .populate<any>({
        path: "officer",
        populate: {
          path: "rank",
          model: "Rank",
        },
      })
      .populate<any>("errandType");

    return errand;
  }
}
export default GetOneErrandRepo;
