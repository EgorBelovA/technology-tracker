import { useState } from 'react';
import TechnologyCard from './components/TechnologyCard';
import InputJson from './components/InputJson';
import './App.css';

function App() {
  const [technologies, setTechnologies] = useState([]);

  const handleJsonLoad = (data) => {
    const technologiesArray = Object.entries(data).map(([id, techData]) => ({
      id,
      ...techData,
      status: 'not-started',
    }));

    setTechnologies(technologiesArray);
  };

  const updateTechnologyStatus = (id, newStatus) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  return (
    <div className='app'>
      <h1>RoadMap Tracker</h1>

      <InputJson onJsonLoad={handleJsonLoad} />

      <div className='technologies-list'>
        {technologies.map((technology) => (
          <TechnologyCard
            key={technology.id}
            technology={technology}
            onStatusChange={updateTechnologyStatus}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
