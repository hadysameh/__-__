import { Schema, model, connect } from "mongoose";
import { IOfficerModel, IUserModel } from "../types";
import bcrypt from "bcrypt";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.

const userSchema = new Schema<IUserModel>({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: {
    type: Schema.Types.ObjectId,
    ref: "UserType",
    index: true,
  },
  officer: {
    type: Schema.Types.ObjectId,
    ref: "Officer",
    index: true,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    try {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        user.password = hash;
        // console.log(user)
        next();
      });
    } catch (e) {
      console.log(e);
    }
  });
});

userSchema.pre("findOneAndUpdate", function (next) {
  const user = this;
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    try {
      const userUpdate = user.getUpdate();
      //@ts-ignore
      const { $set } = userUpdate;

      bcrypt.hash($set.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        $set.password = hash;
        next();
      });
    } catch (e) {
      console.log(e);
    }
  });
});
// 3. Create a Model.
const User = model<IUserModel>("User", userSchema);
export default User;
