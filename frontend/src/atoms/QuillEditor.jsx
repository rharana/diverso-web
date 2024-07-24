import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import './QuillEditor.css';

// Register the image resize module
Quill.register('modules/imageResize', ImageResize);

class QuillEditor extends Component {
  constructor(props) {
    super(props);
    this.reactQuillRef = React.createRef();
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleVideoUpload = this.handleVideoUpload.bind(this);
  }

  handleImageUpload() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      // Llamada al backend para subir la imagen
      const res = await fetch('http://localhost:8080/api/upload/image', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      const imageUrl = data.url;

      // Insertar la imagen en Quill
      const quill = this.reactQuillRef.current.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, 'image', imageUrl);
    };
  }

  handleVideoUpload() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      // Llamada al backend para subir el video
      const res = await fetch('http://localhost:8080/api/upload/video', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      const videoUrl = data.url;

      // Insertar el video en Quill
      const quill = this.reactQuillRef.current.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, 'video', videoUrl);
    };
  }

  render() {
    return (
      <ReactQuill
        ref={this.reactQuillRef}
        theme="snow"
        onChange={this.props.onChange}
        value={this.props.editorHtml}
        modules={QuillEditor.modules(this.handleImageUpload, this.handleVideoUpload)}
        formats={QuillEditor.formats}
        bounds={'#root'}
        placeholder={this.props.placeholder}
      />
    );
  }
}

// Quill modules to attach to editor
QuillEditor.modules = (handleImageUpload, handleVideoUpload) => ({
  toolbar: {
    container: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image', 'video'],
      ['clean']
    ],
    handlers: {
      'image': handleImageUpload,
      'video': handleVideoUpload,
    }
  },
  clipboard: {
    matchVisual: false
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
});

// Quill editor formats
QuillEditor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
];

export default QuillEditor;
