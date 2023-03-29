import { userTypesEnum } from "../../types";
import { selectUserType } from "../../features/auth";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
function ShiftsHome() {
  const userType = useSelector(selectUserType);

  return (
    <>
      <div className="text-center fs-1">
        <br />
        <u>النوبتجيات</u>
        <div className="" style={{ height: "80vh" }}>
          <div className="container" dir="rtl">
            <div className="row py-3 pt-3">
              {(userType === userTypesEnum.officersAffairs ||
                userType === userTypesEnum.admin) && (
                <div className="col-xl-3 col-lg-6">
                  <Card
                    cardTitle="اضافة او تعديل النوبتجيات"
                    backgroundColor=""
                    textColor=""
                    link="/shifts/createorupdate"
                  />
                </div>
              )}
              {userType !== ""}
              <div className="col-xl-3 col-lg-6">
                <Card
                  cardTitle="عرض النوبتجيات"
                  backgroundColor=""
                  textColor=" "
                  link="/shifts/show"
                />
              </div>
            </div>
          </div>

          <div
            className="d-flex align-items-center flex-column mt-4"
            style={{ marginTop: "100px" }}
          ></div>
        </div>
      </div>
    </>
  );
}
export default ShiftsHome;
