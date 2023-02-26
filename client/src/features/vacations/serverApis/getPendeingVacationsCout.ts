import axios from "axios";
async function getPendeingVacationsCout() {
  const { data } = await axios.get("/api/errand/getvacationstobeapprovedcount");
  return data;
}
export default getPendeingVacationsCout;
