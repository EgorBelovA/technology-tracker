import './DataControls.css';
import { useEffect, useRef } from 'react';

function InputJson({ onJsonLoad, showExport }) {
  const fileInputRef = useRef(null);

  const handleDivClick = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  useEffect(() => {
    const fileInputDiv = document.querySelector('.input-json');
    const fileExportDiv = document.querySelector('.export-json');
    if (showExport) {
      fileInputDiv.classList.remove('hidden');
      fileExportDiv.classList.remove('hidden');
      fileInputDiv.classList.add('animLeft');
      fileExportDiv.classList.add('animRight');
    }
  }, [showExport]);

  const handleFileChange = (event) => {
    // const fileInputDiv = document.querySelector('.input-json');
    // const fileExportDiv = document.querySelector('.export-json');

    // fileInputDiv.classList.remove('hidden');
    // fileExportDiv.classList.remove('hidden');
    // fileInputDiv.classList.add('animLeft');
    // fileExportDiv.classList.add('animRight');
    event.stopPropagation();
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        onJsonLoad(jsonData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className='input-json hidden' onClick={handleDivClick}>
      <span>Upload RoadMap File (JSON)</span>
      <input
        type='file'
        accept='.json'
        onChange={handleFileChange}
        className='file-input'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default InputJson;
