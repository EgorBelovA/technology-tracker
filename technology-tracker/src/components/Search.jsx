import { useState } from 'react';
import FilterButton from './FilterButton';
import './Search.css';
import { useEffect } from 'react';

export default function Search({
  query,
  setQuery,
  isApi,
  count,
  setShowOptions = () => {},
  showFilterButton = false,
}) {
  useEffect(() => {
    setQuery('');
  }, [isApi]);
  return (
    <div className='search-container'>
      <input
        className='search-input'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={
          isApi
            ? 'Search RoadMap • API'
            : 'Search Technologies by title or description'
        }
      />
      <span className='search-count-filter-container'>
        {query && <span className='search-count'>{count}</span>}
        {showFilterButton && <FilterButton setShowOptions={setShowOptions} />}
      </span>
    </div>
  );
}
