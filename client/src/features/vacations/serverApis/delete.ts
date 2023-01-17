import axios from "axios";
import { IVacationModelParams } from "../../../types";
async function deleteOneVacation(id: any) {
  const { data } = await axios.delete("/api/vacation/delete", {
    data: { id },
  });
  return data;
}
export default deleteOneVacation;
