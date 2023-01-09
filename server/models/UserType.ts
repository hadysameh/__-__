import { Schema, model, connect } from "mongoose";
import { IUserType } from "../types";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUserType>({
  userType: { type: String, required: true },
  premissons: {
    type: [String],
    default: [],
  },
});

// 3. Create a Model.
const UserType = model<IUserType>("UserType", userSchema);
export default UserType;
