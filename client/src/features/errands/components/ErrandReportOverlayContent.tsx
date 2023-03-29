import { useMutation, useQuery } from "react-query";
import getOneErrand from "../serverApis/getOne";
import updateErrand from "../serverApis/update";
import { CKEditor } from "ckeditor4-react";

import { useState, useRef } from "react";
import HorizontalSpinner from "../../../components/HorizontalSpinner";
import CustomCkeEditor from "./CustomCkeEditor";
interface IProps {
  errandId: any;
}
function ErrandReportOverlayContent(props: IProps) {
  const [editorContent, setEditorContent] = useState<any>();
  const {
    data: storedErrandData,
    isLoading: isErrandDataLoading,
    error: errandError,
    refetch: refetchErrand,
  } = useQuery("getOneVacation", () => getOneErrand(props.errandId), {
    staleTime: Infinity,
    cacheTime: 0,
    enabled: !!props.errandId,
  });
  const mutation = useMutation(updateErrand, {
    onSuccess: (data, variables, context) => {
      alert("تم الحفظ");
    },
    onError: () => {
      alert("الرجاء التحقق من البيانات المدخلة");
    },
  });
  return (
    <div style={{ height: "150vh" }} className="bg-white ">
      <div className="bg-white container d-flex flex-column justify-center">
        <hr />
        <h1>تقرير المأمورية</h1>

        <>
          {isErrandDataLoading ? (
            <HorizontalSpinner></HorizontalSpinner>
          ) : (
            <>
              <hr />
              <div id="vacation-data" className="fs-3 p-3">
                <div className="row">
                  الضابط:
                  {storedErrandData.officer.rank.rank +
                    "/" +
                    storedErrandData.officer.name}
                </div>
                <br />
                <div className="row">
                  الجهة:
                  {storedErrandData.destination}
                </div>
                <br />
                <div className="row">
                  السبب:
                  {storedErrandData.reason}
                </div>
                <br />
                <div className="row">
                  من:
                  {storedErrandData.fromDate}
                </div>
                <br />
                <div className="row">
                  الى:
                  {storedErrandData.toDate}
                </div>
              </div>
              <hr />
              <CustomCkeEditor
                setEditorContent={setEditorContent}
                edtiorContent={storedErrandData && storedErrandData.report}
              />
              {/* <CKEditor
                initData={storedErrandData && storedErrandData.report}
                config={{
                  //   toolbar: [{ items: ["Underline", "Italic", "Bold"] }],
                  extraPlugins: ["justify", "font"],
                  removeButtons: [],
                }}
                onChange={(e) => {
                  setEditorContent(e.editor.getData());
                }}
              /> */}
            </>
          )}
        </>
      </div>
      <button
        className="btn btn-lg btn-primary"
        onClick={() => {
          if (!editorContent) {
            alert("الرجاء الاختيار بالموافقة او الرفض");
          } else {
            const dataToStore: any = {};

            dataToStore["_id"] = props.errandId;
            dataToStore["report"] = editorContent;
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
export default ErrandReportOverlayContent;
