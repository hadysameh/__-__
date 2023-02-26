import AuthController from "../controllers/auth/AuthController";
import express from "express";
import isAuth from "../middelwares/auth/isAuth";
import VacationsController from "../controllers/vacations/VacationsController";

const vacationsRouter = express.Router();

// vacationsRouter.get(
//   "/vacation/getvacation",
//   isAuth,
//   VacationsController.getVacation
// );

vacationsRouter.get(
  "/vacation/getcreatevacationoptions",
  isAuth,
  VacationsController.getCreateVacationOptions
);

// vacationsRouter.get(
//   "/vacation/getmyvacations",
//   isAuth,
//   VacationsController.getMyVacations
// );

// vacationsRouter.get(
//   "/vacation/getmyvacationsrequests",
//   isAuth,
//   VacationsController.getMyVacationsRequests
// );

// vacationsRouter.get(
//   "/vacation/getpendingvacations",
//   isAuth,
//   VacationsController.getPendingVacations
// );
vacationsRouter.get(
  "/errand/getvacationstobeapprovedcount",
  isAuth,
  VacationsController.getPendingVacationsToBeApprovedCount
);
vacationsRouter.get("/vacation", isAuth, VacationsController.get);

vacationsRouter.get("/vacation/getone", isAuth, VacationsController.getOne);

vacationsRouter.post("/vacation/store", isAuth, VacationsController.store);

vacationsRouter.put("/vacation/update", isAuth, VacationsController.update);

vacationsRouter.delete("/vacation/delete", isAuth, VacationsController.delete);

export default vacationsRouter;
