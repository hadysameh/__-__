import axios from "axios";
import { IVacationModelParams } from "../../../types";
async function getCreateErrandsOptions() {
  const { data } = await axios.get("/api/errand/getcreateerrandoptions");
  return data;
}
export default getCreateErrandsOptions;
