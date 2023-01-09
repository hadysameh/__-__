import { Types } from "mongoose";
export interface IOfficerModel {
  _id: any;
  name: string;
  rank: Types.ObjectId;
  height: string;
  dateOfBirth: string;
  address: string;
  branch: Types.ObjectId;
}

export interface IRankModel {
  rank: string;
}

export interface IShiftData {
  date: Date;
  dutyManagerOfficer: string | null;
  strategicDutyManagerOfficer: string | null;
  shiftOfficer: string | null;
}
export interface IShiftModel {
  audit: IShiftData[];
}

export interface IUserModel {
  userName: string;
  password: string;
  userType: Types.ObjectId;
  officer: Types.ObjectId;
}
export interface IUserType {
  userType: string;
  premissons: string[];
}
export interface IPremissionModel {
  premission: string;
}

export interface IBranchModel {
  branchName: string;
}

export interface IVacationModel {
  type: Types.ObjectId;
  from: string;
  to: string;
  officer: Types.ObjectId;

  branchChiefApproved?: boolean;
  branchChiefNotice?: string | null;

  OfficersAffairsApproved?: boolean;
  OfficersAffairsNotice?: string | null;

  viceManagerApproved?: boolean;
  viceManagerNotice?: string | null;

  ManagerApproved?: boolean;
  ManagerNotice?: string | null;
}

export interface IVacationStatusModel {
  vacation: Types.ObjectId;
  //موافقة شئون ضباط
  OfficersAffairsApproved: boolean;
  viceManagerApproved: boolean;
  ManagerApproved: boolean;
  branchChiefApproved: boolean;
}

export interface IVacationTypeModel {
  vacationType: string;
}

export interface IInOutTrackingModel {
  in: Date;
  out: Date;
  day: string;
  officer: Types.ObjectId;
}

export interface IErrandModel {
  in: Date;
  out: Date;
  day: string;
  officer: Types.ObjectId;
}
