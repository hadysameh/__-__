import { Schema, model, connect } from "mongoose";
import { IErrandTypeModel } from "../types";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const errandTypeSchema = new Schema<IErrandTypeModel>({
  errandType: { type: String, required: true },
});

// 3. Create a Model.
const ErrandType = model<IErrandTypeModel>("ErrandType", errandTypeSchema);
export default ErrandType;
