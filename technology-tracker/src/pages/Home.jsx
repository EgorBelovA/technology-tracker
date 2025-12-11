import { useState, useEffect } from 'react';
import TechnologyCard from '../components/TechnologyCard';
import InputJson from '../components/InputJson';
import ExportJson from '../components/ExportJson';
import Statistics from '../components/Statistics';
import QuickActions from '../components/QuickActions';
import Search from '../components/Search';
import '../Home.css';
import BottomBar from '../components/BottomBar';
import NotificationSnackbar from '../components/NotificationSnackbar';

export default function HomePage() {
  const [technologies, setTechnologies] = useState([]);
  const [showExport, setShowExport] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollUpVisible, setScrollUpVisible] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    const savedTechnologies = localStorage.getItem('roadmap-technologies');
    if (savedTechnologies) {
      try {
        setTechnologies(JSON.parse(savedTechnologies));
      } catch (error) {
        console.error('Ошибка при загрузке данных из localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (technologies.length > 0) setShowExport(true);
    localStorage.setItem('roadmap-technologies', JSON.stringify(technologies));
  }, [technologies]);

  const handleJsonLoad = (data) => {
    const technologiesArray = Object.entries(data).map(([id, techData]) => ({
      id,
      ...techData,
      status: techData.status || 'not-started',
    }));
    setTechnologies(technologiesArray);
  };

  const updateTechnologyStatus = (id, newStatus, deadline, progressNote) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === id
          ? { ...tech, status: newStatus, deadline, progressNote }
          : tech
      )
    );
  };

  const clearStorage = () => {
    localStorage.removeItem('roadmap-technologies');
    setTechnologies([]);
  };

  const updateAllStatuses = (newStatus) => {
    setTechnologies((prev) =>
      prev.map((tech) => ({ ...tech, status: newStatus }))
    );
  };

  const handleRandomSelect = (techId) => {
    setSelectedTech(techId);

    const element = document.getElementById(techId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      element.classList.add('highlighted');
      setTimeout(() => element.classList.remove('highlighted'), 500);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollUpVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: Math.min(document.documentElement.scrollTop, 500) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredTechnologies = technologies.filter((t) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = t.title?.toLowerCase().includes(query);
    const descriptionMatch = t.description?.toLowerCase().includes(query);
    return titleMatch || descriptionMatch;
  });

  const message = 'No technologies found';

  const [selectCards, setSelectCards] = useState(false);

  useEffect(() => {
    console.log(selectedCards);
  }, [selectedCards]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setSelectCards(false);
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const toggleCardSelection = (technology, isSelected) => {
    setSelectedCards((prev) => {
      if (isSelected) {
        return [...prev, technology];
      } else {
        return prev.filter((t) => t.id !== technology.id);
      }
    });
  };

  useEffect(() => {
    setSelectedCards([]);
  }, [selectCards]);

  return (
    <div className='app'>
      <h1>RoadMap Tracker</h1>
      <QuickActions
        technologies={technologies}
        onUpdateAllStatuses={updateAllStatuses}
        onRandomSelect={handleRandomSelect}
        scrollUpVisible={scrollUpVisible}
        scrollToTop={scrollToTop}
        handleSelectCards={() => setSelectCards(!selectCards)}
        selectCards={selectCards}
        selectedCardsAmount={selectedCards.length}
      />
      <div className='sticky-container'>
        <div className='data-controls'>
          <InputJson onJsonLoad={handleJsonLoad} showExport={showExport} />
          <ExportJson jsonData={technologies} />
        </div>

        {/* <Statistics technologies={technologies} /> */}

        <Search
          technologies={technologies}
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>

      <div className='technologies-list'>
        {filteredTechnologies.length === 0 ? (
          <div className='no-technologies'>
            <h4 style={{ textAlign: 'center' }}>{message}</h4>
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
        <NotificationSnackbar />
        {/* <BottomBar /> */}
      </div>
    </div>
  );
}
