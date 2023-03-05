export interface IShiftRowData {
  date: string;
  dutyManagerOfficer: any;
  strategicDutyManagerOfficer: any;
  shiftOfficer: any;
}

export enum userTypes {
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

export interface IOfficerModel {
  _id?: any;
  id?: any;
  name?: string;
  rank?: string;
  height?: string;
  weight?: string;
  dateOfBirth?: string;
  address?: string;
  branch?: string;
}

export interface IVacationModelParams {
  type?: any;
  from?: any;
  to?: any;
  insteadOf?: string;
  officer?: any;
  dayToHaveVactionInsteadOf?: string;

  branchChiefApproved?: boolean | null;
  branchChiefNotice?: string | null;

  officersAffairsApproved?: boolean | null;
  officersAffairsNotice?: string | null;

  viceManagerApproved?: boolean | null;
  viceManagerNotice?: string | null;

  managerApproved?: boolean | null;
  managerNotice?: string | null;
}

export interface IVacationsCreditModelParams {
  year?: string;
  officer?: any;
  erguntVacationsNumber?: number;
  firstHalfyearlyVacationsDaysNumber?: number;
  secondHalfyearlyVacationsDaysNumber?: number;
  daysToHaveVactionsInsteadOf?: { date: string }[];
}

export enum userTypesEnum {
  admin = "admin",
  manager = "manager",
  viceManager = "viceManager",
  officersAffairs = "officersAffairs",
  branchChief = "branchChief",
  normalOfficer = "normalOfficer",
}
