import Card from "../../components/Card";
import { selectUserType } from "../../features/auth";
import { useSelector } from "react-redux";
import { userTypesEnum } from "../../types";

function VacationsHome() {
  const userType = useSelector(selectUserType);

  return (
    <>
      <div className="text-center fs-1">
        <br />
        <u>الأجازات</u>
      </div>
      <div className="" style={{ height: "80vh" }}>
        <div className="container" dir="rtl">
          <div className="row py-3 pt-3">
            <div className="col-xl-3 col-lg-6">
              <Card
                cardTitle="اجازاتي "
                backgroundColor=""
                textColor=""
                link="/vacations/myvacations"
              />
            </div>
            {userType !== ""}
            <div className="col-xl-3 col-lg-6">
              <Card
                cardTitle=" طلبات الأجازة الخاصة بي"
                backgroundColor=""
                textColor=" "
                link="/vacations/myvacationRequests"
              />
            </div>

            <div className="col-xl-3 col-lg-6">
              <Card
                cardTitle="إنشاء طلب أجازة"
                link="/vacations/create"
                backgroundColor=""
                textColor=""
              />
            </div>
            <div className="col-xl-3 col-lg-6">
              <Card
                cardTitle=" رصيدي من الأجازات"
                link="/vacationscredit/myvacationscredit"
                backgroundColor=""
                textColor=""
              />
            </div>
          </div>
          <div className="row py-3 pt-3">
            {userType !== "normalOfficer" && (
              <div className="col-xl-3 col-lg-6">
                <Card
                  cardTitle="طلبات اجازة تنتظر الموافقة"
                  link="/vacations/pendingvacationstoapprove"
                  backgroundColor="#ffa700"
                  textColor="white"
                />
              </div>
            )}
            {userType !== userTypesEnum.normalOfficer && (
              <div className="col-xl-3 col-lg-6">
                <Card
                  cardTitle=" ارصدة اجازات الضباط"
                  backgroundColor=""
                  textColor=""
                  link="/vacationscredit/officersvacationscredit"
                />
              </div>
            )}
            {(userType === userTypesEnum.officersAffairs ||
              userType === userTypesEnum.admin) && (
              <div className="col-xl-3 col-lg-6">
                <Card
                  cardTitle=" اضافة او تعديل ارصدة اجازات الضباط"
                  backgroundColor=""
                  textColor=""
                  link="/vacationscredit/createorupdate"
                />
              </div>
            )}
            {userType !== userTypesEnum.normalOfficer && (
              <div className="col-xl-3 col-lg-6">
                <Card
                  cardTitle=" اجازات الضباط"
                  backgroundColor=""
                  textColor=""
                  link="/vacations/officersvacations"
                />
              </div>
            )}
          </div>
          <div className="row py-3 pt-3">
            {/* {userType === userTypesEnum.officersAffairs && (
              <div className="col-xl-3 col-lg-6">
                <Card
                  cardTitle=" انشاء طلب اجازة لضابط"
                  backgroundColor=""
                  textColor=""
                  link="/vacations/createvacationsforofficer"
                />
              </div>
            )} */}
            {/* {userType == userTypesEnum.officersAffairs && (
              <div className="col-xl-3 col-lg-6">
                <Card
                  cardTitle="طباعة طلبات الاجازت مجمعة"
                  backgroundColor=""
                  textColor=""
                  link="/vacations/vacationsrequestsforprint"
                />
              </div>
            )} */}
          </div>

          <div className="row py-3 pt-3"></div>
        </div>

        <div
          className="d-flex align-items-center flex-column mt-4"
          style={{ marginTop: "100px" }}
        >
          {/* <img src="./edaraLogo.png" style={{ width: "25vw" }} /> */}
        </div>
      </div>
    </>
  );
}
export default VacationsHome;
