import axios from "axios";
async function updateErrand(params: any) {
  const { data } = await axios.put("/api/errand/update", {
    ...params,
  });
  return data;
}
export default updateErrand;
