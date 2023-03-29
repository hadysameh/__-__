import axios from "axios";
import { IVacationModelParams } from "../../../types";
async function getVacations(
  vacationModelParams: any = {},
  pageNumber: any = 1,
  rowsPerPage: any = 200
) {
  const { data } = await axios.get("/api/vacation/", {
    params: { vacationModelParams, pageNumber, rowsPerPage },
  });
  return data;
}
export default getVacations;
