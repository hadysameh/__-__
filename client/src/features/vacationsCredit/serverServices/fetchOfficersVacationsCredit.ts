import axios from "axios";

async function fetchOfficerVacationsCreditForAYear(
  pageNumber: any,
  rowsPerPage: any
) {
  const { data } = await axios.get(
    "/api/vacationscredit/getofficervacationscredit",
    {
      params: {
        pageNumber,
        rowsPerPage,
      },
    }
  );
  return data;
}
export default fetchOfficerVacationsCreditForAYear;
