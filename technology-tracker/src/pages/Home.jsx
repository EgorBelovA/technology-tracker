import TechnologyCard from '../components/TechnologyCard';
import InputJson from '../components/InputJson';
import ExportJson from '../components/ExportJson';
import QuickActions from '../components/QuickActions';
import Search from '../components/Search';
import '../Home.css';
import { useLoadRoadmap } from '../hooks/useLoadRoadmap';

import { useTech } from '../context/TechnologiesContext';
import { useState } from 'react';
import { useEffect } from 'react';

export default function HomePage() {
  const {
    technologies,
    showExport,
    scrollUpVisible,
    selectedCards,
    selectCards,

    handleJsonLoad,
    updateTechnologyStatus,
    updateAllStatuses,
    handleRandomSelect,
    scrollToTop,
    toggleCardSelection,
    toggleSelectMode,
  } = useTech();

  const { ROADMAPS, loadRoadmap } = useLoadRoadmap();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechnologies = technologies.filter((t) => {
    const q = searchQuery.toLowerCase();
    return (
      t.title?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q)
    );
  });

  const [isApi, setIsApi] = useState(false);

  const [searchPlaceholder, setSearchPlaceholder] = useState(
    'Search Technologies by title or description '
  );

  useEffect(() => {
    if (isApi) {
      setSearchPlaceholder('Search RoadMap • API');
    } else {
      setSearchPlaceholder('Search Technologies by title or description');
    }
  }, [isApi]);

  return (
    <>
      <QuickActions
        technologies={technologies}
        onUpdateAllStatuses={updateAllStatuses}
        onRandomSelect={handleRandomSelect}
        scrollUpVisible={scrollUpVisible}
        scrollToTop={scrollToTop}
        handleSelectCards={toggleSelectMode}
        selectCards={selectCards}
        selectedCardsAmount={selectedCards.length}
        setSelectedCardsStatus={updateTechnologyStatus}
      />

      <div className='sticky-container'>
        <div className='data-controls'>
          <InputJson
            onJsonLoad={handleJsonLoad}
            showExport={showExport}
            setIsApi={setIsApi}
          />
          <ExportJson jsonData={technologies} />
        </div>

        <Search
          technologies={technologies}
          query={searchQuery}
          setQuery={setSearchQuery}
          placeholder={searchPlaceholder}
        />
      </div>

      <div className='content-wrapper'>
        <div className={`roadmaps ${isApi ? 'visible' : ''}`}>
          {ROADMAPS.map((r) => (
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
          {filteredTechnologies.length === 0 ? (
            <div className='no-technologies'>
              <h4>No technologies found</h4>
              <div className='sad-emoji'>😞</div>
            </div>
          ) : (
            filteredTechnologies.map((technology) => (
              <TechnologyCard
                key={technology.id}
                technology={technology}
                onStatusChange={updateTechnologyStatus}
                selectCards={selectCards}
                selectCard={(isSelected) =>
                  toggleCardSelection(technology, isSelected)
                }
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
