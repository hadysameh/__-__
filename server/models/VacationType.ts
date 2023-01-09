import { Schema, model, connect } from "mongoose";
import { IVacationTypeModel } from "../types";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const vacationTypeSchema = new Schema<IVacationTypeModel>({
  vacationType: { type: String, required: true },
});

// 3. Create a Model.
const VacationType = model<IVacationTypeModel>("VacationType", vacationTypeSchema);
export default VacationType;
export {vacationTypeSchema}
