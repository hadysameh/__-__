import AuthController from "../controllers/auth/AuthController";
import express from "express";
import isAuth from "../middelwares/auth/isAuth";
import VacationsController from "../controllers/vacations/VacationsController";
import ShiftsController from "../controllers/shifts/ShiftsController";

const shiftsRouter = express.Router();

shiftsRouter.get("/shifts/getone", isAuth, ShiftsController.getOne);

shiftsRouter.post(
  "/shifts/storeorupdate",
  isAuth,
  ShiftsController.storeOrUpdate
);
export default shiftsRouter;
