import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import './QuillEditor.css';

// Register the image resize module
Quill.register('modules/imageResize', ImageResize);

class QuillEditor extends Component {
  render() {
    return (
      <ReactQuill
        theme="snow" // set the theme as snow
        onChange={this.props.onChange} // use onChange from props
        value={this.props.editorHtml} // use editorHtml from props
        modules={QuillEditor.modules}
        formats={QuillEditor.formats}
        bounds={'#root'}
        placeholder={this.props.placeholder}
      />
    );
  }
}

// Quill modules to attach to editor
QuillEditor.modules = {
  toolbar: [
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
  clipboard: {
    matchVisual: false // toggle to add extra line breaks when pasting HTML
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
};

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
