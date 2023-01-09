import { Schema, model, connect } from "mongoose";
import { IInOutTrackingModel } from "../types";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const InOutTrackingSchema = new Schema<IInOutTrackingModel>({
  in: { type: Date, default: null },
  out: { type: Date, default: null },
  // will come from input type date
  day: { type: String, required: true },
  officer: {
    type: Schema.Types.ObjectId,
    ref: "Officer",
    index: true,
  },
});

// 3. Create a Model.
const InOutTracking = model<IInOutTrackingModel>(
  "InOutTracking",
  InOutTrackingSchema
);
export default InOutTracking;
