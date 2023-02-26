import axios from "axios";
async function getOneErrand(vacationId: any) {
  const { data } = await axios.get("/api/errand/getone", {
    params: { id: vacationId },
  });
  return data;
}
export default getOneErrand;
