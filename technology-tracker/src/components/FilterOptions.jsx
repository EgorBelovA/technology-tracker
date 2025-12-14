import { useRef, useEffect } from 'react';

export default function FilterOptions({
  showOptions,
  setShowOptions,
  handleSelect,
  status,
}) {
  const containerRef = useRef(null);
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };
  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  });
  return (
    <>
      <div
        className={`search-dropdown ${showOptions ? 'visible' : ''}`}
        ref={containerRef}
      >
        <div
          className={status === 'all' ? 'selected' : ''}
          onClick={() => handleSelect('all')}
        >
          All
        </div>
        <div
          className={status === 'not-started' ? 'selected' : ''}
          onClick={() => handleSelect('not-started')}
        >
          Not Started
        </div>
        <div
          className={status === 'in-progress' ? 'selected' : ''}
          onClick={() => handleSelect('in-progress')}
        >
          In Progress
        </div>
        <div
          className={status === 'completed' ? 'selected' : ''}
          onClick={() => handleSelect('completed')}
        >
          Completed
        </div>
      </div>
    </>
  );
}
