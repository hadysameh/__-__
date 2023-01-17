export interface IShiftRowData {
  date: string;
  dutyManagerOfficer: string | null;
  strategicDutyManagerOfficer: string | null;
  shiftOfficer: string | null;
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

export interface IVacationModelParams {
  type?: any;
  from?: string;
  to?: string;
  insteadOf?: string;
  officer?: any;
  dayToHaveVactionInsteadOf?: string;
  
  branchChiefApproved?: boolean | null;
  branchChiefNotice?: string | null;

  OfficersAffairsApproved?: boolean | null;
  OfficersAffairsNotice?: string | null;

  viceManagerApproved?: boolean | null;
  viceManagerNotice?: string | null;

  ManagerApproved?: boolean | null;
  ManagerNotice?: string | null;
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
