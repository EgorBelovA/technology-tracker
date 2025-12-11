import './DataControls.css';

function ExportJson({ jsonData, fileName = 'roadmap.json' }) {
  const handleExport = () => {
    if (!jsonData) {
      alert('No data to export');
      return;
    }

    try {
      const jsonString = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting JSON:', error);
      alert('Error exporting JSON file');
    }
  };

  return (
    <div className='export-json hidden' onClick={handleExport}>
      <span>Export RoadMap File (JSON)</span>
    </div>
  );
}

export default ExportJson;
