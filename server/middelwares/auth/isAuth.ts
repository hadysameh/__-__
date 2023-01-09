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
        where: {
          id: decoded,
        },
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
        // console.log({ user: JSON.stringify(user) });
        req.user = user;
        next();
      } else {
        console.log("!user");

        res.status(403).json({ msg: "unautherized" });
      }
    } else {
      console.log("!token");

      res.status(403).json({ msg: "unautherized" });
    }
  } catch (error) {
    console.log(error);
  }

  // console.log(decoded.foo)
}
