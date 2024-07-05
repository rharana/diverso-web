import { useState } from 'react'
import { StyleEditorBlock, TextEditorBlock} from 'react-web-editor'

function App() {

  return (
    <>
      <TextEditorBlock
        width={200}
        height={300}
        left={0}
        top={0}
        parentStyle={{ width: 600, height: 800 }}
        unit={"px"}
      />
      <TextEditorBlock
        width={200}
        height={300}
        left={0}
        top={0}
        parentStyle={{ width: 600, height: 800 }}
        unit={"px"}
      />

    </>

    

  );
}

export default App
