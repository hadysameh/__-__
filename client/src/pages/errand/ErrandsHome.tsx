import Card from "../../components/Card";
import { selectUserType } from "../../features/auth";
import { useSelector } from "react-redux";
import { userTypesEnum } from "../../types";

function ErrandsHome() {
  const userType = useSelector(selectUserType);

  return (
    <>
      <div className="text-center fs-1">
        <br />
        <u>المأموريات</u>
      </div>
      <div className="" style={{ height: "80vh" }}>
        <div className="container" dir="rtl">
          <div className="row py-3 pt-3">
            <div className="col-xl-3 col-lg-6">
              <Card
                cardTitle="المأموريات الموافق عليها  "
                backgroundColor=""
                textColor=""
                link="/errands/myerrands"
              />
            </div>
            <div className="col-xl-3 col-lg-6">
              <Card
                cardTitle=" طلبات المأمورية الخاصة بي"
                backgroundColor=""
                textColor=" "
                link="/errands/myerrandsrequests"
              />
            </div>

            <div className="col-xl-3 col-lg-6">
              <Card
                cardTitle="إنشاء طلب مأمورية"
                link="/errands/create"
                backgroundColor=""
                textColor=""
              />
            </div>

            <div className="col-xl-3 col-lg-6">
              <Card
                cardTitle="اضافة تقرير مأمورية"
                link="/errands/adderrandreport"
                backgroundColor=""
                textColor=""
              />
            </div>
          </div>
          <div className="row py-3 pt-3">
            {userType !== "normalOfficer" &&
              userType !== userTypesEnum.manager && (
                <div className="col-xl-3 col-lg-6">
                  <Card
                    cardTitle="طلبات مأمورية تنتظر الموافقة"
                    link="/errands/pendingerrandstoapprove"
                    backgroundColor="#ffa700"
                    textColor="white"
                  />
                </div>
              )}

            {userType !== userTypesEnum.normalOfficer && (
              <>
                <div className="col-xl-3 col-lg-6">
                  <Card
                    cardTitle=" جمع مأموريات الضباط"
                    backgroundColor=""
                    textColor=""
                    link="/errands/officerserrand"
                  />
                </div>
              </>
            )}
            {userType !== userTypesEnum.normalOfficer && (
              <div className="col-xl-3 col-lg-6">
                <Card
                  cardTitle="تقارير مأموريات الضباط"
                  link="/errands/officerserrandsreports"
                  backgroundColor=""
                  textColor=""
                />
              </div>
            )}
            {userType == userTypesEnum.officersAffairs && (
              <div className="col-xl-3 col-lg-6">
                <Card
                  cardTitle="طباعة طلبات الماموريات مجمعة"
                  backgroundColor=""
                  textColor=""
                  link="/errands/errandsrequestsforprint"
                />
              </div>
            )}
          </div>
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
export default ErrandsHome;
