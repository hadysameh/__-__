import { useEffect } from "react";
interface IProps {
  edtiorContent?: string;
  setEditorContent: (editorContet: string) => void;
}
function CustomCkeEditor(props: IProps) {
  useEffect(() => {
    //@ts-ignore
    const editor = CKEDITOR.replace("editor1");
    editor.on("change", function (evt: any) {
      // getData() returns CKEditor's HTML content.
      props.setEditorContent(evt.editor.getData());
    });
    editor.setData(props.edtiorContent && props.edtiorContent);
    return () => {};
  }, []);

  return (
    <>
      <div>
        <textarea name="editor1"></textarea>
      </div>
    </>
  );
}
export default CustomCkeEditor;
