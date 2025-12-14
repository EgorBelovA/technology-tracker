import './DataControls.css';

function ExportJson({ jsonData, fileName = 'roadmap.json' }) {
  const handleExport = () => {
    if (!jsonData) return alert('No data to export');

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className='export-json hidden'
      onClick={handleExport}
      role='button'
      tabIndex={0}
    >
      <span>Export RoadMap File (JSON)</span>
    </div>
  );
}

export default ExportJson;
