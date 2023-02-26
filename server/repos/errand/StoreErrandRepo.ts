import Errand from "../../models/Errand";
import clearObjectFromUndefinedParams from "../../_helpers/clearObjectFromUndefinedParams";

class StoreErrandRepo {
  static async StoreErrand(params: any) {
    const cleanedParams = clearObjectFromUndefinedParams(params);
    
    let storedErrand = await Errand.create(cleanedParams);
    
    return storedErrand;
  }
}
export default StoreErrandRepo;
