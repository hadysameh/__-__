import axios from "axios";
import { IVacationModelParams } from "../../../types";
async function getAttendance() {
  const { data } = await axios.get("/api/dailyattendance");
  return data;
}
export default getAttendance;
