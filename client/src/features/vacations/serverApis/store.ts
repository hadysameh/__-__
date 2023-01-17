import axios from "axios";
import { IVacationModelParams } from "../../../types";
async function storeVacation(vacationModelParams: IVacationModelParams) {
  const { data } = await axios.post("/api/vacation/store", {
    ...vacationModelParams,
  });
  return data;
}
export default storeVacation;
