import DailyAttendanceController from "../controllers/dailyAttendance/DailyAttendanceController";
import express from "express";
import isAuth from "../middelwares/auth/isAuth";

const dailyAttendanceRouter = express.Router();

dailyAttendanceRouter.get(
  "/dailyattendance",
  isAuth,
  DailyAttendanceController.getDailyAttendance
);

export default dailyAttendanceRouter;
