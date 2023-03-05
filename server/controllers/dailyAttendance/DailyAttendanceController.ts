import { Request, Response } from "express";
import GetDailyAttendanceRepo from "../../repos/attendance/GetDailyAttendanceRepo";

class DailyAttendanceController {
  static async getDailyAttendance(req: Request, res: Response) {
    const dailyAttandance = await GetDailyAttendanceRepo.getDailyAttendance();
    res.json(dailyAttandance);
  }
}
export default DailyAttendanceController;
