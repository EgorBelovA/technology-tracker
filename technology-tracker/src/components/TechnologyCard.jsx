import { useState, useEffect, useRef } from 'react';
import './TechnologyCard.css';

function TechnologyCard({
  technology,
  onStatusChange,
  selectCards,
  selectCard,
}) {
  const { id, title, description, links, status } = technology;
  const [currentStatus, setCurrentStatus] = useState(status);
  const [showModal, setShowModal] = useState(false);
  const [deadline, setDeadline] = useState(technology.deadline || '');
  const [progressNote, setProgressNote] = useState(
    technology.progressNote || ''
  );
  const markedRef = useRef(null);

  const statuses = ['not-started', 'in-progress', 'completed'];

  const handleStatusCycle = () => {
    const currentIndex = statuses.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    const nextStatus = statuses[nextIndex];
    setCurrentStatus(nextStatus);
    onStatusChange(id, nextStatus, deadline, progressNote);
  };

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    onStatusChange(id, newStatus, deadline, progressNote);
  };

  useEffect(() => {
    setCurrentStatus(status);
    setDeadline(technology.deadline || '');
  }, [technology]);

  const isUnchanged =
    currentStatus === status &&
    (deadline || '') === (technology.deadline || '') &&
    (progressNote || '') === (technology.progressNote || '');

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

  const saveButtonClicked = () => {
    if (!isUnchanged) {
      onStatusChange(id, currentStatus, deadline, progressNote);
      markedRef.current.beginElement();
    }
  };

  const technologyContainerRef = useRef(null);
  const selectedRef = useRef(null);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const container = technologyContainerRef.current;
    if (!container || !selectCards) return;

    const handleSelect = (e) => {
      e.stopPropagation();

      setSelected((prevSelected) => {
        const newSelected = !prevSelected;

        if (newSelected && selectedRef.current) {
          selectedRef.current.beginElement();
        }

        return newSelected;
      });
    };

    container.addEventListener('mousedown', handleSelect);
    container.addEventListener('touchstart', handleSelect);

    return () => {
      container.removeEventListener('mousedown', handleSelect);
      container.removeEventListener('touchstart', handleSelect);
    };
  }, [selectCards]);

  useEffect(() => {
    setSelected(false);
  }, [selectCards]);

  useEffect(() => {
    if (selectCards && selected) {
      selectCard(selected);
    }
  }, [selected, selectCards]);

  const cardRef = useRef(null);
  useEffect(() => {
    if (showModal && cardRef.current) {
      const headerHeight = 130;
      const elementTop =
        cardRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementTop - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      cardRef.current.focus();
    }
  }, [showModal]);

  return (
    <div
      className={`technology-card-container ${selected ? 'selected' : ''}`}
      ref={technologyContainerRef}
    >
      <div
        className={`checkmark ${selected ? 'visible' : ''} ${
          selectCards ? '' : 'hidden'
        }`}
      >
        <svg viewBox='0 0 52 52'>
          <path
            d='M14 27 L22 35 L38 15'
            fill='none'
            stroke='#ffffffff'
            strokeWidth='4'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeDasharray='40'
            strokeDashoffset='40'
          >
            <animate
              ref={selectedRef}
              attributeName='stroke-dashoffset'
              from='43'
              to='0'
              dur='0.3s'
              fill='freeze'
              repeatCount='1'
            />
          </path>
        </svg>
      </div>
      <div
        className={`technology-card ${getStatusClass(currentStatus)} ${
          showModal ? 'full-size' : ''
        } ${selectCards ? 'narrow' : ''}`}
        id={id}
        onClick={() => setShowModal(true)}
        style={{ cursor: `${showModal ? '' : 'pointer'}` }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !selectCards) {
            setShowModal(true);
          }
          if (e.key === 'Enter' && selectCards) {
            setSelected(!selected);
          }
          if (e.key === 'Escape') {
            setShowModal(false);
          }
        }}
        ref={cardRef}
      >
        <div className='card-header'>
          {showModal && (
            <div
              className='close-button'
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(false);
              }}
            >
              &#x2715;
            </div>
          )}
          <div className='card-title'>{title || 'No Title'}</div>
          <div
            className={`status-badge ${getStatusClass(currentStatus)}`}
            onClick={(e) => {
              e.stopPropagation();
              handleStatusCycle();
            }}
          >
            {currentStatus.replace('-', ' ')}
          </div>
        </div>

        {showModal && (
          <div className='modal-overlay' onClick={() => setShowModal(false)}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
              {description && (
                <div className='modal-description'>
                  <div className='description-header'>Description</div>
                  <div className='description-text'>{description}</div>
                </div>
              )}
              {links && links.length > 0 && (
                <div className='modal-links'>
                  <div className='link-header'>Resources</div>
                  <div className='links-list'>
                    {links.map((link, index) => (
                      <div key={index} className='link-item'>
                        <a href={link.url} target='_blank'>
                          {link.title}
                        </a>
                        {/* <span className='link-type-badge'>{link.type}</span> */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* <TechnologyForm
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              /> */}
              <div className='modal-form'>
                <div className='modal-form-header'>Deadline & Notes</div>
                <div className='form-container'>
                  <div className='deadline-container'>
                    <input
                      type='date'
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className='input-deadline'
                    />
                  </div>
                  <div className='notes-container'>
                    <textarea
                      value={progressNote}
                      onChange={(e) => setProgressNote(e.target.value)}
                      placeholder='Notes...'
                      className='textarea-notes'
                    />
                  </div>

                  <div
                    className='save-button'
                    onClick={saveButtonClicked}
                    data-disabled={isUnchanged}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        saveButtonClicked();
                      }
                    }}
                  >
                    <svg width='52' height='52' viewBox='0 0 52 52'>
                      <path
                        d='M14 27 L22 35 L38 15'
                        fill='none'
                        stroke='#ffffffff'
                        strokeWidth='4'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeDasharray='40'
                        strokeDashoffset='40'
                      >
                        <animate
                          ref={markedRef}
                          attributeName='stroke-dashoffset'
                          from='43'
                          to='0'
                          dur='0.3s'
                          fill='freeze'
                          repeatCount='1'
                        />
                      </path>
                    </svg>
                    Save
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnologyCard;
