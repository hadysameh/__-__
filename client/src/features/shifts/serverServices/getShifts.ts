import axios from "axios";

async function get(
  params: any = {},
  pageNumber: any = 1,
  rowsPerPage: any = 100
) {
  const { data } = await axios.get("/api/getshifts", {
    params: { params, pageNumber, rowsPerPage },
  });
  return data;
}
export default get;
