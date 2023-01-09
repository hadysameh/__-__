import { Schema, model, connect } from "mongoose";
import { IBranchModel } from "../types";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const branchSchema = new Schema<IBranchModel>({
  branchName: { type: String, required: true },
});

// 3. Create a Model.
const Branch = model<IBranchModel>("Branch", branchSchema);
export default Branch;
