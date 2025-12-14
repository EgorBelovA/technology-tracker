import TechnologyCard from '../components/TechnologyCard';
import InputJson from '../components/InputJson';
import ExportJson from '../components/ExportJson';
import QuickActions from '../components/QuickActions';
import Search from '../components/Search';
import '../Home.css';
import { useLoadRoadmap } from '../hooks/useLoadRoadmap';
import FilterOptions from '../components/FilterOptions';

import { useTech } from '../context/TechnologiesContext';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';

export default function HomePage() {
  const {
    technologies,
    showExport,
    scrollUpVisible,
    selectedCards,
    toggleCardSelection,
    selectCards,
    setSelectCards,

    handleJsonLoad,
    updateTechnologyStatus,
    updateAllStatuses,
    handleRandomSelect,
    scrollToTop,
    updateSelectedCardsStatus,
  } = useTech();

  const { ROADMAPS, loadRoadmap, userUrlRoadmap } = useLoadRoadmap();
  const [isApi, setIsApi] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  function filterByFields(list, query, fields) {
    if (!query.trim()) return list;

    const q = query.toLowerCase();

    return list.filter((item) =>
      fields.some((field) => item[field]?.toString().toLowerCase().includes(q))
    );
  }

  const filteredTechnologies = useMemo(
    () =>
      filterByFields(technologies, searchQuery, ['title', 'description', 'id']),
    [technologies, searchQuery]
  );

  useEffect(() => {
    if (isApi) {
      userUrlRoadmap(searchQuery);
    }
  }, [isApi, searchQuery]);

  const filteredAPIs = useMemo(
    () => filterByFields(ROADMAPS, searchQuery, ['label']),
    [ROADMAPS, searchQuery]
  );

  const filteredList = useMemo(() => {
    if (filterStatus === 'all') return filteredTechnologies;
    return filteredTechnologies.filter((tech) => tech.status === filterStatus);
  }, [isApi, filterStatus, filteredTechnologies, filteredAPIs]);

  const handleFilterSelect = (value) => {
    setFilterStatus(value);
    setShowFilterOptions(false);
  };

  return (
    <>
      <QuickActions
        technologies={technologies}
        onUpdateAllStatuses={updateAllStatuses}
        onRandomSelect={handleRandomSelect}
        scrollUpVisible={scrollUpVisible}
        scrollToTop={scrollToTop}
        selectMode={selectCards}
        setSelectMode={setSelectCards}
        selectedCardsAmount={selectedCards.length}
        setSelectedCardsStatus={updateSelectedCardsStatus}
      />

      <div className='sticky-container'>
        <div className='data-controls'>
          <InputJson
            onJsonLoad={handleJsonLoad}
            showExport={showExport}
            setIsApi={setIsApi}
            isApi={isApi}
          />
          <ExportJson jsonData={technologies} />
        </div>
      </div>

      <Search
        query={searchQuery}
        setQuery={setSearchQuery}
        isApi={isApi}
        count={isApi ? filteredAPIs.length : filteredList.length}
        setShowOptions={setShowFilterOptions}
        showFilterButton={!isApi}
      />

      <div className='content-wrapper'>
        <FilterOptions
          showOptions={showFilterOptions}
          setShowOptions={setShowFilterOptions}
          status={filterStatus}
          handleSelect={handleFilterSelect}
        />
        <div className={`roadmaps ${isApi ? 'visible' : ''}`}>
          {filteredAPIs.map((r) => (
            <div
              key={r.id}
              className='roadmap-card'
              onClick={() => {
                loadRoadmap(r.id);
                setIsApi(false);
              }}
            >
              {r.label}
            </div>
          ))}
        </div>
        <div className={`technologies-list ${isApi ? '' : 'visible'}`}>
          {filteredList.length === 0 ? (
            <div className='no-technologies'>
              <h4>No technologies found</h4>
              <div className='sad-emoji'>😞</div>
            </div>
          ) : (
            filteredList.map((technology) => (
              <TechnologyCard
                key={technology.id}
                technology={technology}
                onStatusChange={updateTechnologyStatus}
                selectMode={selectCards}
                isSelected={selectedCards.some((t) => t.id === technology.id)}
                onSelect={toggleCardSelection}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
