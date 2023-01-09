import { Schema, Types, model, connect } from "mongoose";
import { IOfficerModel } from "../types";
// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const officerSchema = new Schema<IOfficerModel>({
  name: { type: String, required: true, index: true },
  rank: {
    type: Schema.Types.ObjectId,
    ref: "Rank",
  },
  height: { type: String, required: false },
  dateOfBirth: { type: String, required: false },
  address: { type: String, required: false },
  branch: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
    index: true,
  },
});

// 3. Create a Model.
const Officer = model<IOfficerModel>("Officer", officerSchema);
export default Officer;
