import './PreviewEditor.css'
function PreviewEditor({ htmlContent }) {
    return (
      <div className="ql-editor" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}

export default PreviewEditor;
  