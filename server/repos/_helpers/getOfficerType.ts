import { User } from "../../models";
import { IUserType, userTypesEnum } from "../../types";

async function getOfficerType(officerId: string): Promise<userTypesEnum> {
  const officerUser = await User.findOne({
    officer: officerId,
  }).populate<IUserType>({ path: "userType" });
  //@ts-ignore
  const userType = officerUser?.userType.userType;
  return userType;
}

export default getOfficerType;
