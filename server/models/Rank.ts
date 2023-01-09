import { Schema, model, connect } from "mongoose";
import { IRankModel } from "../types";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const rankSchema = new Schema<IRankModel>({
  rank: { type: String, required: true },
});

// 3. Create a Model.
const Rank = model<IRankModel>("Rank", rankSchema);
export default Rank;
