import './DataControls.css';
import { useEffect, useRef, useState } from 'react';

function InputJson({ onJsonLoad, showExport, setIsApi }) {
  const fileInputRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleDivClick = (e) => {
    e.stopPropagation();
    setShowOptions(false);
    fileInputRef.current.click();
  };

  useEffect(() => {
    const fileExportDiv = document.querySelector('.export-json');
    if (showExport) {
      fileExportDiv.classList.remove('hidden');
      fileExportDiv.classList.add('animRight');
    }
  }, [showExport]);

  const handleFileChange = (event) => {
    event.stopPropagation();
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        onJsonLoad(e.target.result);

        event.target.value = '';
      } catch (error) {
        console.error('Error parsing JSON:', error);

        event.target.value = '';
      }
    };

    reader.readAsText(file);
  };

  return (
    <div
      className={`input-json ${showExport ? 'hidden animLeft' : ''} ${
        showOptions ? 'hideBackground' : 'hideBackground'
      }`}
      onClick={() => setShowOptions(true)}
    >
      <div
        className={`input-json-option left ${
          showOptions ? 'visible' : 'visible'
        }`}
        onClick={handleDivClick}
      >
        <div>
          <span>Upload File</span>
        </div>
      </div>
      <div
        className={`input-json-option right ${
          showOptions ? 'visible' : 'visible'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions(false);
          setIsApi(true);
        }}
      >
        <div>
          <span>API</span>
        </div>
      </div>
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
