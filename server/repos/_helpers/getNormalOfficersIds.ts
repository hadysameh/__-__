import { User, UserType } from "../../models";
import { userTypesEnum, IUserType } from "../../types";

async function getNormalOfficersIds() {
  const normalUserType = await UserType.findOne({
    userType: userTypesEnum.normalOfficer,
  });
  let normalOfficersIdsObj = await User.find({
    userType: normalUserType?.get("id"),
  }).select("officer");

  let normalOfficersIdsArr = normalOfficersIdsObj.map(
    (normalOfficersUsersIdsObj) => String(normalOfficersUsersIdsObj["officer"])
  );

  return normalOfficersIdsArr;
}
export default getNormalOfficersIds;
