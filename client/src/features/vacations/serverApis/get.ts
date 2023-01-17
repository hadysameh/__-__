import axios from "axios";
import { IVacationModelParams } from "../../../types";
async function getVacations(
  vacationModelParams: IVacationModelParams,
  pageNumber: any,
  rowsPerPage: any
) {
  const { data } = await axios.get("/api/vacation/", {
    params: { vacationModelParams, pageNumber, rowsPerPage },
  });
  return data;
}
export default getVacations;
