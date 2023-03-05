import axios from "axios";

async function getMonthlyShifts(
  params: any = {},
  pageNumber: any = 1,
  rowsPerPage: any = 100
) {
  const { data } = await axios.get("/api/shifts/getone", {
    params: { params, pageNumber, rowsPerPage },
  });
  return data;
}
export default getMonthlyShifts;
