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
  from: { type: String, required: true },
  // will come from input type date
  to: { type: String, required: true },
  officer: {
    type: Schema.Types.ObjectId,
    ref: "Officer",
    required: true,
    index: true,
  },
  ManagerApproved: { type: Boolean, default: null, index: true },
  ManagerNotice: { type: String, default: null },
  viceManagerApproved: { type: Boolean, default: null, index: true },
  viceManagerNotice: { type: String, default: null },
  OfficersAffairsApproved: { type: Boolean, default: null, index: true },
  OfficersAffairsNotice: { type: String, default: null },
  branchChiefApproved: { type: Boolean, default: null, index: true },
  branchChiefNotice: { type: String, default: null },
});

// 3. Create a Model.
const Vacation = model<IVacationModel>("Vacation", vacationSchema);
export default Vacation;
