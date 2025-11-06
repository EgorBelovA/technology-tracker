import { useState } from 'react';
import './InputJson.css';

function InputJson({ onJsonLoad }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const jsonData = JSON.parse(e.target.result);
      onJsonLoad(jsonData);
    };

    reader.readAsText(file);
  };

  return (
    <div className='input-json'>
      <label className='file-input-label'>
        <span>Upload RoadMap File (JSON)</span>
        <input
          type='file'
          accept='.json'
          onChange={handleFileChange}
          className='file-input'
        />
      </label>
    </div>
  );
}

export default InputJson;
