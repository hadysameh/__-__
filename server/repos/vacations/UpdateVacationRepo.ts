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

    const updatedVacation = await Vacation.findOne({
      _id,
    }).populate<IVacationTypeModel>("type");

    const officerVacationsCredit = await VacationsCredit.findOne({
      officer: updatedVacation!.officer,
      year: getCurrentYear(),
    });

    const isVacationApproved = this.isVacationApproved(updatedVacation!);
    if (isVacationApproved) {
      await this.modifyVacationsCredit(
        updatedVacation!,
        officerVacationsCredit!
      );
    }
    return vacationUpdate;
  }

  static isVacationApproved(vacationRecord: IVacationModel) {
    return vacationRecord.managerApproved;
  }

  static async modifyVacationsCredit(
    vacation: any,
    vacationsCredit: IVacationsCreditModel
  ) {
    switch (vacation.type.vacationType) {
      case vacationsTypesEnumInArabic.ergunt:
        await this.decreaseRemainingEreguntVacation(
          vacationsCredit,
          daysBetweenTwoDates(vacation.from, vacation.to) + 1
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
    const numberOfRequestedYearlyVacationsDays =
      daysBetweenTwoDates(vacation.from, vacation.to) + 1;

    const remainingDaysAfterAfterDecreasingDays =
      vacationsCredit.remainingYearlyVacationsDaysNumber -
      numberOfRequestedYearlyVacationsDays;
    console.log({ remainingDaysAfterAfterDecreasingDays });

    await VacationsCredit.updateOne(
      { _id: vacationsCredit.id },
      {
        remainingYearlyVacationsDaysNumber: remainingDaysAfterAfterDecreasingDays,
      }
    );
  }

  static async decreaseRemainingEreguntVacation(
    vacationsCredit: IVacationsCreditModel,
    amountOfDays: number
  ) {
    const remianingEreguntVacations =
      vacationsCredit.remainingErguntVacationsNumber;

    let remainingDaysAfterAfterDecreasingDays =
      remianingEreguntVacations - amountOfDays;
    console.log({ remianingEreguntVacations });
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
