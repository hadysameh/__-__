import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectUserType } from "../features/auth";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userTypesEnum } from "../types";
interface IProps {
  title: string;
  enabled: boolean;
  updateLink: string;
  allowedUserType: string;
  approvalPropertyName: string;
  noticePropertyName: string;
  id: string;
  storedData?: any;
}

function ApprovalBlock(props: IProps) {
  const navigate = useNavigate();
  const [approved, setApproved] = useState<boolean | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const userType = useSelector(selectUserType);
  const update = useCallback(async (params: any) => {
    const { data } = await axios.put(props.updateLink, {
      ...params,
    });
    return data;
  }, []);
  const mutation = useMutation(update, {
    onSuccess: (data, variables, context) => {
      alert("تم الحفظ");
    },
    onError: () => {
      alert("الرجاء التحقق من البيانات المدخلة");
    },
  });

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
                  id="approved"
                  type="radio"
                  className="form-check-input"
                  checked={
                    props.storedData[props.approvalPropertyName] ||
                    approved === true
                  }
                  name={"approval" + props.title}
                  onChange={(e) => {
                    setApproved(true);
                  }}
                  disabled={
                    !props.enabled || userType !== props.allowedUserType
                  }
                />
              </div>
            </div>
            <div>
              <div> لا اوافق</div>
              <div>
                <input
                  id="disapproved"
                  type="radio"
                  className="form-check-input"
                  checked={
                    props.storedData[props.approvalPropertyName] === false ||
                    approved === false
                  }
                  name={"disapproval" + props.title}
                  onChange={(e) => {
                    setApproved(false);
                  }}
                  disabled={
                    !props.enabled || userType !== props.allowedUserType
                  }
                />
              </div>
            </div>
          </div>
          <br />
          <div>
            <div className="fs-3">ملاجظات</div>
            <textarea
              className="form-control fs-3"
              disabled={!props.enabled || userType !== props.allowedUserType}
              onChange={(e) => setNotice(e.target.value)}
              defaultValue={props.storedData[`${props.allowedUserType}Notice`]}
            ></textarea>
          </div>
        </div>
      </div>
      <br />
      <button
        className="btn btn-lg btn-primary"
        disabled={!props.enabled || userType !== props.allowedUserType}
        onClick={() => {
          if (approved == null) {
            alert("الرجاء الاختيار بالموافقة او الرفض");
          } else {
            const dataToStore: any = {};

            dataToStore["_id"] = props.id;
            dataToStore[props.approvalPropertyName] = !!approved;
            dataToStore[props.noticePropertyName] = notice;
            mutation.mutate({
              ...dataToStore,
            });
          }
        }}
      >
        حفظ
      </button>
    </div>
  );
}
export default ApprovalBlock;
