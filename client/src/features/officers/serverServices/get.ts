import axios from "axios";
import { IOfficerModel } from "../../../types";

async function get(
  officersModelParams: any={},
  pageNumber: any=1,
  rowsPerPage: any=100
) {
  const { data } = await axios.get("/api/getofficers", {
    params: { officersModelParams, pageNumber, rowsPerPage },
  });
  return data;
}
export default get;
