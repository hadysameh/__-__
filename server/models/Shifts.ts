import { Schema, model, connect } from "mongoose";
import { IDailyShiftData, IShiftModel } from "../types";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const DailyShiftSchema = new Schema<IDailyShiftData>({
  dutyManagerOfficer: {
    type: Schema.Types.ObjectId,
    ref: "Officer",
    required: true,
    index: true,
  },
  strategicDutyManagerOfficer: {
    type: Schema.Types.ObjectId,
    ref: "Officer",
    index: true,
  },
  shiftOfficer: {
    type: Schema.Types.ObjectId,
    ref: "Officer",
    required: true,
    index: true,
  },
  date: { type: String, required: true },
});
const monthlyShift = new Schema<IShiftModel>({
  monthlyShift: [DailyShiftSchema],
  month: { type: String, required: true },
  year: { type: String, required: true },
});

// 3. Create a Model.
const Shift = model<IShiftModel>("Shift", monthlyShift);
export default Shift;
