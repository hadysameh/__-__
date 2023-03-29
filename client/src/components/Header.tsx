import { Link } from "react-router-dom";
import HasAccessToShowComponent from "../middlewares/componentsGaurds/HasAccessToShowComponent";
import { useSelector } from "react-redux";
import {
  selectUserType,
  selectOfficerName,
  selectToken,
  selectOfficerRank,
} from "../features/auth/stores/userSlice";
// import { socketIoEvent } from "../types";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import getPendeingVacationsCout from "../features/vacations/serverApis/getPendeingVacationsCout";
import getPendeingErrandsCout from "../features/errands/serverApis/getPendeingErrandsCout";
import socket from "../services/socket-io";
import { userTypesEnum } from "../types";
function Header() {
  const token = useSelector(selectToken);
  const officerName = useSelector(selectOfficerName);
  const userType = useSelector(selectUserType);
  const officerRank = useSelector(selectOfficerRank);
  const audioRef = useRef<any>();
  const {
    data: pendingVacationsCount,
    isLoading: isPendingVacationsCountLoading,
    error: pendingVacationsCountError,
    refetch: refetchPendingVacationsCount,
  } = useQuery(
    ["fetchVacationsCount"],
    () => {
      return getPendeingVacationsCout();
    },
    {
      // staleTime: Infinity,
      // cacheTime: 0,
    }
  );

  const {
    data: pendingErrandsCount,
    isLoading: isPendingErrandsCountLoading,
    error: pendingErrandsCountError,
    refetch: refetchPendingErrandsCount,
  } = useQuery(
    ["fetchErrandsCount"],
    () => {
      return getPendeingErrandsCout();
    },
    {
      staleTime: Infinity,
      cacheTime: 0,
    }
  );
  useEffect(() => {
    socket.on("refetch-vacations-data", refetchPendingVacationsCount);
    return () => {
      socket.off("refetch-vacations-data", refetchPendingVacationsCount);
    };
  });

  useEffect(() => {
    socket.on("refetch-errands-data", refetchPendingErrandsCount);
    return () => {
      socket.off("refetch-errands-data", refetchPendingErrandsCount);
    };
  });
  return (
    <>
      <div className="container mt-4">
        <div className=" fs-2 d-flex justify-content-between fw-bold">
          <div>
            ادارة البحوث الفنية والتطوير
            <br />
            منــظومـــة شـئـــون الضـبــاط
          </div>
          <div>
            <img src="./edaraLogo.png" width={"90px"} />
          </div>
        </div>
      </div>

      <audio src="./notificationSound.mkv" ref={audioRef}></audio>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-primary mt-3"
        style={{ marginBottom: "0" }}
      >
        <div className="collapse navbar-collapse container fs-3" id="navbarNav">
          <ul className="navbar-nav ">
            {token && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link active text-white">
                    الصفحة الرئيسية
                  </Link>
                </li>
                {userType === "admin" && (
                  <li className="nav-item">
                    <a
                      href="http://localhost:3125/admin"
                      className="nav-link active text-white "
                      target={"_blank"}
                    >
                      admin panel
                    </a>
                  </li>
                )}
                <li className="nav-item dropdown text-right ">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    الأجازات
                    {userType !== userTypesEnum.normalOfficer ? (
                      <span className="bg-danger">{pendingVacationsCount}</span>
                    ) : (
                      <></>
                    )}
                  </a>
                  <ul
                    className="dropdown-menu fs-3"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li className="nav-item">
                      <Link to="/vacations/" className="nav-link active ">
                        صفحة الاجازات
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/vacations/myvacations"
                        className="nav-link active "
                      >
                        أجازاتي
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/vacations/myvacationrequests"
                        className="nav-link active "
                      >
                        طلبات الأجازة الخاصة بي
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/vacations/create" className="nav-link active ">
                        انشاء طلب اجازة
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/vacationscredit/myvacationscredit"
                        className="nav-link active "
                      >
                        رصيدي من الأجازات
                      </Link>
                    </li>
                    {userType !== "normalOfficer" && (
                      <>
                        <li className="nav-item">
                          <Link
                            to="/vacations/pendingvacationstoapprove"
                            className="nav-link active "
                          >
                            طلبات اجازة تنتظر الموافقة
                            {userType !== userTypesEnum.normalOfficer ? (
                              <span className="bg-danger">
                                {pendingVacationsCount}
                              </span>
                            ) : (
                              <></>
                            )}
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/vacationscredit/officersvacationscredit"
                            className="nav-link active "
                          >
                            ارصدة اجازات الضباط
                          </Link>
                        </li>
                        {(userType === userTypesEnum.officersAffairs ||
                          userType === userTypesEnum.admin) && (
                          <li className="nav-item">
                            <Link
                              to="/vacationscredit/createorupdate"
                              className="nav-link active "
                            >
                              اضافة او تعديل ارصدة اجازات الضباط
                            </Link>
                          </li>
                        )}
                        <li className="nav-item">
                          <Link
                            to="/vacations/officersvacations"
                            className="nav-link active "
                          >
                            اجازات الضباط
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="vacations/createvacationsforofficer"
                            className="nav-link active "
                          >
                            انشاء طلب اجازة لضابط
                          </Link>
                        </li>
                        {userType == userTypesEnum.officersAffairs && (
                          <li className="nav-item">
                            <Link
                              to="/vacations/vacationsrequestsforprint"
                              className="nav-link active "
                            >
                              طباعة طلبات الاجازت مجمعة{" "}
                            </Link>
                          </li>
                        )}
                      </>
                    )}
                  </ul>
                </li>

                <li className="nav-item dropdown text-right ">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    المأموريات
                    {userType !== userTypesEnum.normalOfficer &&
                    userType !== userTypesEnum.manager ? (
                      <span className="bg-danger">{pendingErrandsCount}</span>
                    ) : (
                      <></>
                    )}
                  </a>
                  <ul
                    className="dropdown-menu fs-3"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li className="nav-item">
                      <Link to="/errands/" className="nav-link active ">
                        صفحة المأموريات
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/errands/myerrands"
                        className="nav-link active "
                      >
                        المأموريات الموافق عليها
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/errands/myerrandsrequests"
                        className="nav-link active "
                      >
                        طلبات المأموريات الخاصة بي
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/errands/create" className="nav-link active ">
                        انشاء طلب مأمورية
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/errands/adderrandreport"
                        className="nav-link active "
                      >
                        اضافة تقرير مأمورية
                      </Link>
                    </li>
                    {userType !== userTypesEnum.normalOfficer &&
                      userType !== userTypesEnum.manager && (
                        <li className="nav-item">
                          <Link
                            to="/errands/pendingerrandstoapprove"
                            className="nav-link active "
                          >
                            طلبات مأمورية تنتظر الموافقة
                            {userType !== userTypesEnum.normalOfficer ? (
                              <span className="bg-danger">
                                {pendingErrandsCount}
                              </span>
                            ) : (
                              <></>
                            )}
                          </Link>
                        </li>
                      )}
                    {userType !== userTypesEnum.normalOfficer && (
                      <li className="nav-item">
                        <Link
                          to="/errands/officerserrand"
                          className="nav-link active "
                        >
                          جمع مأموريات الضباط
                        </Link>
                      </li>
                    )}
                    {userType !== userTypesEnum.normalOfficer && (
                      <li className="nav-item">
                        <Link
                          to="/errands/officerserrandsreports"
                          className="nav-link active "
                        >
                          تقارير مأموريات الضباط
                        </Link>
                      </li>
                    )}
                    {userType == userTypesEnum.officersAffairs && (
                      <li className="nav-item">
                        <Link
                          to="/errands/errandsrequestsforprint"
                          className="nav-link active "
                        >
                          طباعة طلبات الماموريات مجمعة
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
                <li className="nav-item dropdown text-right ">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    النوبتجيات
                  </a>
                  <ul
                    className="dropdown-menu fs-3"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li className="nav-item">
                      <Link to="/shifts/show" className="nav-link active ">
                        عرض النوبتجيات{" "}
                      </Link>
                    </li>
                    {userType === userTypesEnum.officersAffairs && (
                      <li className="nav-item">
                        <Link
                          to="/shifts/createorupdate"
                          className="nav-link active "
                        >
                          اضافة او تعديل النوبتجيات{" "}
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>

                {(userType === userTypesEnum.officersAffairs ||
                  userType === userTypesEnum.admin ||
                  userType === userTypesEnum.viceManager ||
                  userType === userTypesEnum.manager) && (
                  <li className="nav-item">
                    <Link
                      to="/dailyattendance"
                      className="nav-link active text-white"
                    >
                      تمام الضـبــاط{" "}
                    </Link>
                  </li>
                )}
              </>
            )}

            {!token && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link active text-white">
                    تسجيل الدخول
                  </Link>
                </li>
              </>
            )}
            {token && (
              <li className="nav-item dropdown  ">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {officerRank + " : " + officerName}
                </a>
                <ul
                  className="dropdown-menu fs-3"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li className="nav-item">
                    <Link to="/logout" className="nav-link active ">
                      تسجيل الخروج
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light" dir="">
        <div className="container">
          <a className="navbar-brand" href="#">
            شئون ضباط
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown link
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
    </>
  );
}
export default Header;
