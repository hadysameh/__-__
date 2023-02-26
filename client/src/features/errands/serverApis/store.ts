import axios from "axios";
async function storeErrand(params: any) {
  const { data } = await axios.post("/api/errand/store", {
    ...params,
  });
  return data;
}
export default storeErrand;
