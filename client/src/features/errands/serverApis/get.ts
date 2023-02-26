import axios from "axios";
import { IVacationModelParams } from "../../../types";
async function getErrands(
  errandModelParams: IVacationModelParams = {},
  pageNumber: any = 1,
  rowsPerPage: any = 200
) {
  const { data } = await axios.get("/api/errand/", {
    params: { errandModelParams, pageNumber, rowsPerPage },
  });
  return data;
}
export default getErrands;
