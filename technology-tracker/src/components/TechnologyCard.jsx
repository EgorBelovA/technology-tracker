import { useState } from 'react';
import './TechnologyCard.css';

function TechnologyCard({ technology, onStatusChange }) {
  const { id, title, description, links, status } = technology;
  const [currentStatus, setCurrentStatus] = useState(status);
  const [showDetails, setShowDetails] = useState(false);

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    onStatusChange(id, newStatus);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'not-started':
        return 'Not Started';
      case 'in-progress':
        return 'In Process';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'not-started':
        return 'status-not-started';
      case 'in-progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  return (
    <div className={`technology-card ${getStatusClass(currentStatus)}`}>
      <div className='card-header'>
        <h3 className='card-title'>{title}</h3>
        <span className={`status-badge ${getStatusClass(currentStatus)}`}>
          {getStatusText(currentStatus)}
        </span>
      </div>

      <p className='card-description'>{description}</p>

      <div className='card-actions'>
        <select
          name='status-select'
          value={currentStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          className='status-select'
        >
          <option class='status' value='not-started'>
            Not Started
          </option>
          <option class='status' value='in-progress'>
            In Progress
          </option>
          <option class='status' value='completed'>
            Completed
          </option>
        </select>

        {links && links.length > 0 && (
          <div className='links-count'>
            <strong>{links.length} </strong>more
          </div>
        )}

        <div
          className='details-button'
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide' : 'Show'}
        </div>
      </div>

      {showDetails && links && links.length > 0 && (
        <div className='links-details'>
          <h4>Additional Info</h4>
          <div className='links-list'>
            {links.map((link, index) => (
              <div key={index} className='link-item'>
                <a href={link.url} target='_blank' className='link-url'>
                  {link.title}
                </a>
                <span> </span>
                <span className='link-type-badge'>{link.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnologyCard;
