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
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  async handleSave() {
    const response = await fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: this.state.editorHtml })
    });

    if (response.ok) {
      console.log('Post saved successfully!');
      // Aquí puedes añadir lógica adicional después de guardar exitosamente el post, por ejemplo, limpiar el editor o mostrar una notificación.
    } else {
      console.error('Failed to save post');
      // Manejo de errores, por ejemplo, mostrar un mensaje de error.
    }
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
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}

export default App;