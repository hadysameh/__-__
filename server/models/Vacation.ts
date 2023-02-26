import { Schema, model, connect } from "mongoose";
import { IVacationModel } from "../types";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const vacationSchema = new Schema<IVacationModel>({
  type: {
    type: Schema.Types.ObjectId,
    ref: "VacationType",
    index: true,
  },
  // will come from input type date
  from: { type: String, required: true, index: true },
  // will come from input type date
  to: { type: String, required: true, index: true },
  insteadOf: { type: String, required: false, index: true, default: null },
  dayToHaveVactionInsteadOf: {
    type: String,
    required: false,
    default: null,
    index: true,
  },
  officer: {
    type: Schema.Types.ObjectId,
    ref: "Officer",
    required: true,
    index: true,
  },
  managerApproved: { type: Boolean, default: null, index: true },
  managerNotice: { type: String, default: null },
  viceManagerApproved: { type: Boolean, default: null, index: true },
  viceManagerNotice: { type: String, default: null },
  officersAffairsApproved: { type: Boolean, default: null, index: true },
  officersAffairsNotice: { type: String, default: null },
  branchChiefApproved: { type: Boolean, default: null, index: true },
  branchChiefNotice: { type: String, default: null },
});

// 3. Create a Model.
const Vacation = model<IVacationModel>("Vacation", vacationSchema);
export default Vacation;
