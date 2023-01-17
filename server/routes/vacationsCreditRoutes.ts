import express from "express";
import vacationsCreditController from "../controllers/vacationsCredit/vacationsCreditController";
import isAuth from "../middelwares/auth/isAuth";
import GetVacationsCreditRepo from "../repos/vacationsCredit/GetVacationsCreditRepo";

const vacationsCreditRouter = express.Router();

vacationsCreditRouter.get(
  "/vacationscredit/",
  isAuth,
  vacationsCreditController.get
);

vacationsCreditRouter.get(
  "/vacationscredit/getone",
  isAuth,
  vacationsCreditController.getOne
);

vacationsCreditRouter.post(
  "/vacationscredit/storeorupdate",
  isAuth,
  vacationsCreditController.storeOrUpdate
);
export default vacationsCreditRouter;
