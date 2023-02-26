import { Request, Response } from "express";
import {
  Officer,
  User,
  Vacation,
  VacationsCredit,
  VacationType,
} from "../../models";
import {
  IUserType,
  IVacationModel,
  IVacationsCreditModel,
  IVacationTypeModel,
  userTypesEnum,
  vacationsTypesEnumInArabic,
} from "../../types";
import daysBetweenTwoDates from "../../_helpers/daysBetweenTwoDates";
import getCurrentYear from "../../_helpers/getCurrentYear";
import StoreOrUpdateOfficerVacationsCredit from "../vacationsCredit/StoreOrUpdateVacationCreditRepo";
import getOfficerType from "../_helpers/getOfficerType";
class UpdateVacationRepo {
  static async updateVacation(_id: any, VacationParams: IVacationModel) {
    let vacationUpdate = await Vacation.updateOne(
      { _id },
      { ...VacationParams }
    );

    const updatedVacation = await Vacation.findOne({ _id }).populate<
      IVacationTypeModel
    >("type");

    const officerType = await getOfficerType(String(updatedVacation?.officer));

    const officerVacationsCredit = await VacationsCredit.findOne({
      officer: updatedVacation!.officer,
      year: getCurrentYear(),
    });

    const isVacationApproved = this.isVacationApproved(
      updatedVacation!,
      officerType
    );
    if (isVacationApproved) {
      await this.modifyVacationsCredit(
        updatedVacation!,
        officerVacationsCredit!
      );
    }
    return vacationUpdate;
  }

  static isVacationApproved(
    vacationRecord: IVacationModel,
    officerUserType: userTypesEnum
  ) {
    if (officerUserType === userTypesEnum.normalOfficer) {
      return vacationRecord.viceManagerApproved;
    } else {
      return vacationRecord.managerApproved;
    }
  }

  static async modifyVacationsCredit(
    vacation: any,
    vacationsCredit: IVacationsCreditModel
  ) {
    switch (vacation.type.vacationType) {
      case vacationsTypesEnumInArabic.ergunt:
        await this.decreaseRemainingEreguntVacation(
          vacationsCredit,
          daysBetweenTwoDates(vacation.from, vacation.to)
        );
        break;
      case vacationsTypesEnumInArabic.yearly:
        await this.decreaseRemainingYearlyVacation(vacation, vacationsCredit);
        break;
      case vacationsTypesEnumInArabic.insteadOfVacation:
        await this.decreaseInsteadOfDays(vacation, vacationsCredit);
        break;
      default:
        break;
    }
  }

  static isVacationOfCertainTypeInArabic(
    vacationParams: IVacationModel,
    vacationsTypes: IVacationTypeModel[],
    typeInArabic: string
  ) {
    const vacationType = vacationsTypes.find(
      (vacationType: IVacationTypeModel) =>
        vacationType.vacationType == typeInArabic
    );
    if (vacationType) {
      if (String(vacationType?._id) == String(vacationParams.type._id)) {
        return true;
      }
    }
    return false;
  }

  static async isErguntVacation(
    vacationParams: IVacationModel,
    vacationsTypes: IVacationTypeModel[]
  ) {
    const erguntTypeName = vacationsTypesEnumInArabic.ergunt;
    return this.isVacationOfCertainTypeInArabic(
      vacationParams,
      vacationsTypes,
      erguntTypeName
    );
  }

  static async decreaseRemainingYearlyVacation(
    vacation: IVacationModel,
    vacationsCredit: IVacationsCreditModel
  ) {
    const vacationsTypes = await VacationType.find({});

    const isFirstYearlyVacation = this.isFirstHalfyearlyVacation(
      vacation,
      vacationsTypes
    );
    const isSecondYearlyVacation = this.isSecondHalfyearlyVacation(
      vacation,
      vacationsTypes
    );
    const numberOfYearlyVacationsDays = daysBetweenTwoDates(
      vacation.from,
      vacation.to
    );

    if (isFirstYearlyVacation) {
      await this.decreaseRemainingFirstHalfyearlyVacation(
        vacationsCredit,
        numberOfYearlyVacationsDays
      );
    } else if (isSecondYearlyVacation) {
      await this.decreaseRemainingFirstHalfyearlyVacation(
        vacationsCredit,
        numberOfYearlyVacationsDays
      );
    }
  }

  static isFirstHalfyearlyVacation(
    vacationParams: IVacationModel,
    vacationsTypes: IVacationTypeModel[]
  ) {
    return !this.isSecondHalfyearlyVacation(vacationParams, vacationsTypes);
  }

  static isSecondHalfyearlyVacation(
    vacationParams: IVacationModel,
    vacationsTypes: IVacationTypeModel[]
  ) {
    const yearlyTypeName = vacationsTypesEnumInArabic.yearly;
    const isYearlyVacation = this.isVacationOfCertainTypeInArabic(
      vacationParams,
      vacationsTypes,
      yearlyTypeName
    );
    const currentYear = getCurrentYear();
    const isToInSecondtHalfYear = vacationParams.to > `${currentYear}-06-1`;

    return isYearlyVacation && isToInSecondtHalfYear;
  }

  static async decreaseRemainingEreguntVacation(
    vacationsCredit: IVacationsCreditModel,
    amountOfDays: number
  ) {
    amountOfDays = amountOfDays == 0 ? 1 : amountOfDays;
    const remianingEreguntVacations =
      vacationsCredit.remainingErguntVacationsNumber !== null
        ? vacationsCredit.remainingErguntVacationsNumber
        : vacationsCredit.erguntVacationsNumber;

    let remainingDaysAfterAfterDecreasingDays =
      remianingEreguntVacations - amountOfDays;

    await VacationsCredit.updateOne(
      { _id: vacationsCredit.id },
      {
        remainingErguntVacationsNumber: remainingDaysAfterAfterDecreasingDays,
      }
    );
  }

  static async isInsteadOfVacation(
    vacationParams: IVacationModel,
    vacationsTypes: IVacationTypeModel[]
  ) {
    const erguntTypeName = vacationsTypesEnumInArabic.insteadOfVacation;
    return this.isVacationOfCertainTypeInArabic(
      vacationParams,
      vacationsTypes,
      erguntTypeName
    );
  }

  static async decreaseRemainingFirstHalfyearlyVacation(
    vacationsCredit: IVacationsCreditModel,
    amountOfDays: number
  ) {
    const remianingFirstHalfYearlyVacations =
      vacationsCredit.remainingFirstHalfyearlyVacationsDaysNumber !== null
        ? vacationsCredit.remainingFirstHalfyearlyVacationsDaysNumber
        : vacationsCredit.firstHalfyearlyVacationsDaysNumber;

    const remainingDaysAfterAfterDecreasingDays =
      remianingFirstHalfYearlyVacations - amountOfDays;

    await VacationsCredit.updateOne(
      { _id: vacationsCredit.id },
      {
        remainingFirstHalfyearlyVacationsDaysNumber: remainingDaysAfterAfterDecreasingDays,
      }
    );
  }

  static async decreaseRemainingSecondHalfyearlyVacation(
    vacationsCredit: IVacationsCreditModel,
    amountOfDays: number
  ) {
    const remianingSecondHalfYearlyVacations =
      vacationsCredit.remainingSecondHalfyearlyVacationsDaysNumber !== null
        ? vacationsCredit.remainingSecondHalfyearlyVacationsDaysNumber
        : vacationsCredit.secondHalfyearlyVacationsDaysNumber;

    const remainingDaysAfterAfterDecreasingDays =
      remianingSecondHalfYearlyVacations - amountOfDays;

    await VacationsCredit.updateOne(
      { _id: vacationsCredit.id },
      {
        remainingSecondHalfyearlyVacationsDaysNumber: remainingDaysAfterAfterDecreasingDays,
      }
    );
  }

  static async decreaseInsteadOfDays(
    vacation: IVacationModel,
    vacationsCredit: IVacationsCreditModel
  ) {
    const insteadOfVacationDate = vacation.insteadOf;
    const daysToHaveVactionsInsteadOf = vacationsCredit.daysToHaveVactionsInsteadOf.filter(
      (dayToHaveVactionInsteadOf: { date: string }) =>
        dayToHaveVactionInsteadOf.date != insteadOfVacationDate
    );

    await VacationsCredit.updateOne(
      { _id: vacationsCredit.id },
      {
        daysToHaveVactionsInsteadOf,
      }
    );
  }
}

export default UpdateVacationRepo;
