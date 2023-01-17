import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectUserType } from "../../auth";

interface IProps {
  title: string;
  enabled: boolean;
  // storeLink: string;
  // allowedUserType: string;
}
function ApprovalBlock(props: IProps) {
  return (
    <div id="approvals" style={{ margin: "20px 50px" }}>
      <div className="d-flex justify-content-around">
        <div className="fs-2" style={{ width: "50%" }}>
          {props.title}
        </div>
        <div className="" style={{ width: "50%" }}>
          <div
            className="d-flex justify-content-around fs-2"
            style={{ width: "100%" }}
          >
            <div>
              <div> اوافق</div>
              <div>
                <input
                  type="radio"
                  className="form-check-input"
                  name={"approval" + props.title}
                  disabled={!props.enabled}
                />
              </div>
            </div>
            <div>
              <div> لا اوافق</div>
              <div>
                <input
                  type="radio"
                  className="form-check-input"
                  name={"approval" + props.title}
                  disabled={!props.enabled}
                />
              </div>
            </div>
          </div>
          <br />
          <div>
            <div className="fs-3">ملاجظات</div>
            <textarea
              className="form-control fs-3"
              disabled={!props.enabled}
            ></textarea>
          </div>
        </div>
      </div>
      <br />
      <button className="btn btn-lg btn-primary">حفظ</button>
    </div>
  );
}
export default ApprovalBlock;
