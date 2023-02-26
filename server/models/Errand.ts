import mongoose, { Schema, model, connect } from "mongoose";
import { IErrandModel } from "../types";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const errandSchema = new Schema<IErrandModel>({
  sequenceNumber: { type: Number, required: true, index: true, default: 0 },
  // will come from input type date
  fromDate: { type: String, required: true, index: true },
  // will come from input type date
  toDate: { type: String, required: true, index: true },

  officer: {
    type: Schema.Types.ObjectId,
    ref: "Officer",
    required: true,
    index: true,
  },

  errandType: {
    type: Schema.Types.ObjectId,
    ref: "ErrandType",
    required: true,
    index: true,
  },
  destination: { type: String, required: true, index: true, default: null },
  reason: { type: String, required: true, index: true, default: null },
  report: { type: String, required: false, index: true, default: null },

  viceManagerApproved: { type: Boolean, default: null, index: true },
  viceManagerNotice: { type: String, default: null },
  officersAffairsApproved: { type: Boolean, default: null, index: true },
  officersAffairsNotice: { type: String, default: null },
  branchChiefApproved: { type: Boolean, default: null, index: true },
  branchChiefNotice: { type: String, default: null },
});
const AutoIncrement = require("mongoose-sequence")(mongoose);

errandSchema.plugin(AutoIncrement, { inc_field: "sequenceNumber" });
// 3. Create a Model.
const Errand = model<IErrandModel>("Errand", errandSchema);
export default Errand;
