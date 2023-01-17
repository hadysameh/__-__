import { IVacationsCreditModel } from "../types";
import { Schema, model, connect } from "mongoose";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const vacationsCreditSchema = new Schema<IVacationsCreditModel>({
  year: { type: String, required: true, index: true },
  erguntVacationsNumber: { type: Number, required: true, index: true },
  firstHalfyearlyVacationsDaysNumber: {
    type: Number,
    required: true,
    index: true,
  },
  secondHalfyearlyVacationsDaysNumber: {
    type: Number,
    required: true,
    index: true,
  },
  daysToHaveVactionsInsteadOf: {
    date: [String],
    default: [],
  },
  officer: {
    type: Schema.Types.ObjectId,
    ref: "Officer",
    required: true,
    index: true,
  },
});

// 3. Create a Model.
const VacationsCredit = model<IVacationsCreditModel>(
  "VacationsCredit",  
  vacationsCreditSchema
);
export default VacationsCredit;
