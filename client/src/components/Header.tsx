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
function Header() {
  const token = useSelector(selectToken);
  const officerName = useSelector(selectOfficerName);
  const userType = useSelector(selectUserType);
  const officerRank = useSelector(selectOfficerRank);
  const audioRef = useRef<any>();
  useEffect(() => {
    console.log({ userType });
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
                  </a>
                  <ul
                    className="dropdown-menu fs-3"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li className="nav-item">
                      <Link
                        to="/vacations/"
                        className="nav-link active "
                      >
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
                    {userType !== "normalOfficer" && (
                      <li className="nav-item">
                        <Link
                          to="/vacations/pendingvacations"
                          className="nav-link active "
                        >
                          طلبات اجازة تنتظر الموافقة
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
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
