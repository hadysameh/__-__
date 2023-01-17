import axios from "axios";

async function fetchOfficerVacationsCreditInYear(officerId: string, year: any) {
  const { data } = await axios.get("/api/vacationscredit/", {
    params: {
      vacationCreditParams: { officer: officerId, year },
      pageNumber: 1,
      rowsPerPage: 1,
    },
  });
  return data;
}
export default fetchOfficerVacationsCreditInYear;
