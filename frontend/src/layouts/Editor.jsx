import QuillEditor from '../atoms/QuillEditor';
import PreviewEditor from '../atoms/PreviewEditor';
import './Editor.css'

function App() {

  return (
    <div className='mainframe'>
      <QuillEditor/>
      <PreviewEditor/>
    </div>
  );
}

export default App

