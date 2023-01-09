
import Officer from "../../models/Officer";
import Rank from "../../models/Rank";
import { IUserModel } from "../../types";
import { Request, Response } from "express";
export default class OfficersRepo {
  static async getAllOfficers(req: any, res: Response): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let officers = await Officer.find().populate(['rank','branch']);
        resolve(officers)
      } catch (error) {
        reject(error);
      }
    });
  }
}
