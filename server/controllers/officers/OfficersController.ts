import { Request, Response } from "express";
import OfficersRepo from "../../repos/officers/OfficersRepo";

export default class OfficersController {
  static async getAllOfficers(req: Request, res: Response): Promise<any> {
    try {
      let officers = await OfficersRepo.getAllOfficers(req, res);
      res.json(officers);
    } catch (error) {
      console.log({ error });
    }
  }
}
