import Errand from "../../models/Errand";

class DeleteErrandRepo {
  static async deleteErrand(id: any) {
    let deletedErrand = Errand.deleteOne({ _id: id });
    return deletedErrand;
  }
}
export default DeleteErrandRepo;
