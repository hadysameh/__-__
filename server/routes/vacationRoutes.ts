import AuthController from "../controllers/auth/AuthController";
import express from "express";
import isAuth from "../middelwares/auth/isAuth";
import VacationsController from "../controllers/vacations/VacationsController";

const vacationsRouter = express.Router();

vacationsRouter.get(
  "/vacation/getvacation",
  isAuth,
  VacationsController.getVacation
);

vacationsRouter.get(
  "/vacation/getcreatevacationoptions",
  isAuth,
  VacationsController.getCreateVacationOptions
);

vacationsRouter.get(
  "/vacation/getmyvacations",
  isAuth,
  VacationsController.getMyVacations
);

vacationsRouter.post(
  "/vacation/createvacation",
  isAuth,
  VacationsController.createVacation
);

vacationsRouter.put(
  "/vacation/updatevacation",
  isAuth,
  VacationsController.updateVacation
);
vacationsRouter.delete(
  "/vacation/deletevacation",
  isAuth,
  VacationsController.deleteVacation
);
export default vacationsRouter;
