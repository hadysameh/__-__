import AuthController from "../controllers/auth/AuthController";
import express from "express";
import isAuth from "../middelwares/auth/isAuth";
import OfficersController from "../controllers/officers/OfficersController";

const officersRouter = express.Router();

officersRouter.get(
  "/officers/getofficers",
  isAuth,
  OfficersController.getAllOfficers
);
export default officersRouter;
