import axios from "axios";
async function storeOrUpdateMonthlyShifts(params: any) {
  const { data } = await axios.post("/api/shifts/storeorupdate", {
    ...params,
  });
  return data;
}
export default storeOrUpdateMonthlyShifts;
