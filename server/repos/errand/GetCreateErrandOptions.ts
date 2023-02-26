import ErrandType from "../../models/ErrandType";

class GetCreateErrandOptions {
  static async getCreateErrandOptions() {
    const errandsTypes = await ErrandType.find({});
    return { errandsTypes };
  }
}
export default GetCreateErrandOptions;
