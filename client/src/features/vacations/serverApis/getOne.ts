import axios from "axios";
import { IVacationModelParams } from "../../../types";
async function getOneVacation(vacationId: any) {
  const { data } = await axios.get("/api/vacation/getone", {
    params: { id: vacationId },
  });
  return data;
}
export default getOneVacation;
