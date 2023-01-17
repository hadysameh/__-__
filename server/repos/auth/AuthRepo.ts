import User from "../../models/User";
import UserType from "../../models/UserType";
import Officer from "../../models/Officer";
import Rank from "../../models/Rank";
import { IOfficerModel, IUserModel, IUserType } from "../../types";
export default class AuthRepo {
  static async storeUser(useData: IUserModel): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let storedUser = await User.create({
          userName: useData.userName,
          password: useData.password,
          userType: useData.userType,
          officer: useData.officer,
        });
        resolve(storedUser);
      } catch (error) {
        console.log("AuthRepo.storeUser",error);

        reject(error);
      }
    });
  }
  static async getUserByUserName(userName: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOne({
          userName: userName,
        })
          .populate<IUserType>("userType")
          .populate<IOfficerModel>({
            path: "officer",
            populate: {
              path: "rank",
              model: "Rank",
            },
          });
        resolve(user);
      } catch (error) {
        
        console.log("AuthRepo.getUserByUserName",error);
        reject(error);
      }
    });
  }
  static async editUser(): Promise<any> {}
  static async deleteUser(id: string) {}
}
