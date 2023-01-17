import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../../models/User";
import UserType from "../../models/UserType";
import { IOfficerModel, IUserType } from "../../types";

export default async function isAuth(req: any, res: Response, next: any) {
  try {
    let privateKey = String(process.env.jwtKey);
    let token = req.headers["authorization"];
    token = token.replace("Bearer ", "");

    if (token === "token") {
      console.log("token = null");
      res.status(403).json({ msg: "unautherized" });
    } else if (token) {
      var decoded = jwt.verify(token, privateKey);
      let user = await User.findOne({
        _id: decoded,
      })
        .populate<IUserType>("userType")
        .populate<IOfficerModel>({
          path: "officer",
          populate: {
            path: "rank",
            model: "Rank",
          },
        })
        .catch(() => {
          return null;
        });
      if (user) {
        req.user = user;
        next();
      } else {
        console.log("!user");

        res.status(403).json({ msg: "unautherized" });
      }
    } else {

      res.status(403).json({ msg: "unautherized" });
    }
  } catch (error) {

    console.log("middleware isAuth",error);
  }

  // console.log(decoded.foo)
}
