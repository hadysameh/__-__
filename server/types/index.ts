import { Model, Types } from "mongoose";
export interface IOfficerModel {
  _id: any;

  id: any;
  name: string;
  rank: Types.ObjectId;
  sequenceNumber: Number;
  height: string;
  weight: string;
  dateOfBirth: string;
  address: string;
  branch: Types.ObjectId;
}

export interface IRankModel {
  rank: string;
}

export interface IDailyShiftData {
  date: string;
  dutyManagerOfficer: string | null;
  strategicDutyManagerOfficer: string | null;
  shiftOfficer: string | null;
}
export interface IShiftModel {
  monthlyShift: IDailyShiftData[];
  month: string;
  year: string;
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
  id?: string;
  type: Types.ObjectId;
  from: string;
  to: string;
  insteadOf?: string;
  officer: Types.ObjectId;
  dayToHaveVactionInsteadOf: string;
  branchChiefApproved?: boolean;
  branchChiefNotice?: string | null;

  officersAffairsApproved?: boolean;
  officersAffairsNotice?: string | null;

  viceManagerApproved?: boolean;
  viceManagerNotice?: string | null;

  managerApproved?: boolean;
  managerNotice?: string | null;
}

export interface IVacationsCreditModel {
  id: string;
  year: string;
  officer: Types.ObjectId;
  erguntVacationsNumber: number;
  remainingErguntVacationsNumber: number;
  firstHalfyearlyVacationsDaysNumber: number;
  remainingFirstHalfyearlyVacationsDaysNumber: number;
  secondHalfyearlyVacationsDaysNumber: number;
  remainingSecondHalfyearlyVacationsDaysNumber: number;
  daysToHaveVactionsInsteadOf: { date: string }[];
}
// export interface IVacationStatusModel {
//   vacation: Types.ObjectId;
//   //موافقة شئون ضباط
//   OfficersAffairsApproved: boolean;
//   viceManagerApproved: boolean;
//   ManagerApproved: boolean;
//   branchChiefApproved: boolean;
// }

export interface IVacationTypeModel {
  id: string;
  _id: string;
  vacationType: string;
}

export interface IInOutTrackingModel {
  in: Date;
  out: Date;
  day: string;
  officer: Types.ObjectId;
}

export interface IErrandModel {
  sequenceNumber: any;
  fromDate: string;
  toDate: string;
  officer: Types.ObjectId;
  destination: string;
  reason: string;
  report: string;
  errandType: Types.ObjectId;
  branchChiefApproved?: boolean;
  branchChiefNotice?: string | null;

  officersAffairsApproved?: boolean;
  officersAffairsNotice?: string | null;

  viceManagerApproved?: boolean;
  viceManagerNotice?: string | null;
}

export interface IErrandTypeModel {
  id: string;
  _id: string;
  errandType: string;
}

export enum ErrandtypesEnum {
  outsideErrand = "outsideErrand",
  hospitalErrand = "hospitalErrand",
}
export enum userTypesEnum {
  admin = "admin",
  manager = "manager",
  viceManager = "viceManager",
  officersAffairs = "officersAffairs",
  branchChief = "branchChief",
  normalOfficer = "normalOfficer",
}

export enum vacationsTypesEnumInArabic {
  ergunt = "عارضة",
  yearly = "سنوية",
  emergencyCasual = "عارضة  طارئة",
  insteadOfVacation = "بدل راحة",
}
