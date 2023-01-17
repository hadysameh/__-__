import axios from "axios";
 
async function fetchOfficers() {
  const { data } = await axios.get("/api/getofficers");
  return data;
}
export default fetchOfficers;
