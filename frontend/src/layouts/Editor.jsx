import React, { Component } from 'react';
import QuillEditor from '../atoms/QuillEditor';
import PreviewEditor from '../atoms/PreviewEditor';
import './Editor.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  render() {
    return (
      <div className='mainframe'>
        <QuillEditor
          onChange={this.handleChange}
          editorHtml={this.state.editorHtml}
        />
        <PreviewEditor
          htmlContent={this.state.editorHtml}
        />
      </div>
    );
  }
}

export default App;