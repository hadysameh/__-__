import Errand from "../../models/Errand";

class GetErrandsRepo {
  static async getErrands(
    queryParams: any = {},
    pageNumber: any = 1,
    rowsPerPage: any = 2000
  ) {
    pageNumber = pageNumber - 1;

    if (queryParams["errnadsWithReportsOnly"]) {
      queryParams["report"] = {
        $ne: null,
      };
      delete queryParams["errnadsWithReportsOnly"];
    }
    let errands = await Errand.find(queryParams ? queryParams : {})
      .limit(Number(rowsPerPage))
      .skip(Number(pageNumber) * Number(rowsPerPage))
      .populate<any>({
        path: "officer",
        populate: {
          path: "rank",
          model: "Rank",
        },
      })
      .populate<any>("errandType")
      .sort({
        _id: "desc",
      });
    return errands;
  }
}
export default GetErrandsRepo;
