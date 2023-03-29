import "../../assets/style.css";
import { postloginData } from "../../services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthData } from "../../stores/userSlice";
import { useDispatch } from "react-redux";
export function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="login-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            postloginData({
              userName,
              password,
            })
              .then((res: any) => {
                let data = res.data;
                const token = data.token;
                const officerName = data.user.officer.name;
                const officerId = data.user.officer._id;
                const officerRank = data.user.officer.rank.rank;
                const userType = data.user.userType.userType;
                const dataToStore = {
                  officerName,
                  officerId,
                  officerRank,
                  userType,
                  token,
                };

                dispatch(setAuthData(dataToStore));
                //@ts-ignore
                window.bc.postMessage({ type: "loggedin" });
                navigate("/");
              })
              .catch((err) => {
                console.log({ err });
                alert("خطأ في اسم المستخدم او كلمة المرور");
              });
          }}
        >
          <h1>تسجيل الدخول</h1>
          <div className="content">
            <div className="input-field">
              <input
                type="text"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="userName"
                autoComplete="nope"
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="d-flex  justify-content-center">
            <button className="btn btn-primary fs-4 mb-4">تسجيل الدخول</button>
          </div>

          {/* <div className="action">
            <button>Register</button>
            <button>Sign in</button>
          </div> */}
        </form>
      </div>
    </>
  );
}
