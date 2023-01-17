import axios from "axios";

function storeOrUpdateVacationsCredit(vacationsCreditData: any) {
  return axios.post(
    "/api/vacationscredit/storeorupdate",
    vacationsCreditData
  );
}
export default storeOrUpdateVacationsCredit;
