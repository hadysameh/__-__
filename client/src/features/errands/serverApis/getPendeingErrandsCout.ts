import axios from "axios";
async function getPendeingErrandsCout() {
  const { data } = await axios.get("/api/errand/geterrandstobeapprovedcount");
  return data;
}
export default getPendeingErrandsCout;
