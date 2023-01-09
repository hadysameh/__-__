import { Schema, model, connect } from "mongoose";
import { IShiftData, IShiftModel } from "../types";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const ShiftSchema = new Schema<IShiftData>({
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
  date: { type: Date, required: true },
});
const shiftSchema = new Schema<IShiftModel>({
  audit: [ShiftSchema],
});

// 3. Create a Model.
const Shift = model<IShiftModel>("Shift", shiftSchema);
export default Shift;
