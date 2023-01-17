import axios from "axios";
import { IVacationModelParams } from "../../../types";
async function getCreateVacationsOptions() {
  const { data } = await axios.get("/api/vacation/getcreatevacationoptions");
  return data;
}
export default getCreateVacationsOptions;
