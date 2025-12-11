import './Search.css';

function filterTechnologies(list, query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return list.filter(
    (t) =>
      t.title?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q)
  );
}

export default function Search({ technologies, query, setQuery }) {
  const filtered = filterTechnologies(technologies, query);
  return (
    <div className='search-container'>
      <input
        className='search-input'
        type='text'
        placeholder='Search...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && <span className='search-count'>{filtered.length}</span>}
    </div>
  );
}
