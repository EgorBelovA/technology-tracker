import { useState, useEffect, useRef } from 'react';
import './TechnologyCard.css';

function TechnologyCard({
  technology,
  onStatusChange,
  selectMode,
  isSelected,
  onSelect,
}) {
  const {
    id,
    title,
    description,
    links: initialLinks = [],
    status,
  } = technology;
  const [currentStatus, setCurrentStatus] = useState(status);
  const [showModal, setShowModal] = useState(false);
  const [deadline, setDeadline] = useState(technology.deadline || '');
  const [progressNote, setProgressNote] = useState(
    technology.progressNote || ''
  );
  const [links, setLinks] = useState(initialLinks);

  const markedRef = useRef(null);

  const statuses = ['not-started', 'in-progress', 'completed'];

  const handleStatusCycle = () => {
    const currentIndex = statuses.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    const nextStatus = statuses[nextIndex];
    setCurrentStatus(nextStatus);
    onStatusChange(id, nextStatus, deadline, progressNote, links);
  };

  useEffect(() => {
    setCurrentStatus(status);
    setDeadline(technology.deadline || '');
    setProgressNote(technology.progressNote || '');
    setLinks(initialLinks);
  }, [technology, initialLinks, status]);

  const isUnchanged =
    currentStatus === status &&
    (deadline || '') === (technology.deadline || '') &&
    (progressNote || '') === (technology.progressNote || '') &&
    JSON.stringify(links) === JSON.stringify(initialLinks);

  const saveButtonClicked = () => {
    if (!isUnchanged) {
      const validLinks = links.filter(
        (link) => link.title.trim() && link.url.trim()
      );

      onStatusChange(id, currentStatus, deadline, progressNote, validLinks);
      markedRef.current.beginElement();
    }
  };

  const handleAddLink = () => {
    const newLink = { title: '', url: '' };
    setLinks((prev) => [...prev, newLink]);
  };

  const handleLinkChange = (index, field, value) => {
    setLinks((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
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

  const technologyContainerRef = useRef(null);
  const selectedRef = useRef(null);

  const cardRef = useRef(null);
  useEffect(() => {
    if (showModal && cardRef.current) {
      const headerHeight = 70;
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

  const handleRemoveLink = (index) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCardClick = (e) => {
    if (selectMode) {
      e.stopPropagation();
      onSelect(technology, !isSelected);
    }
  };

  const [showResourcesEdit, setShowResourcesEdit] = useState(false);

  return (
    <div
      className={`technology-card-container ${isSelected ? 'selected' : ''}`}
      ref={technologyContainerRef}
      onClick={handleCardClick}
    >
      <div
        className={`checkmark ${isSelected ? 'visible' : ''} ${
          selectMode ? '' : 'hidden'
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
        } ${selectMode ? 'narrow' : ''}`}
        id={id}
        onClick={() => setShowModal(true)}
        style={{ cursor: `${showModal ? '' : 'pointer'}` }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !selectMode) {
            setShowModal(true);
          }
          if (e.key === 'Enter' && selectMode) {
            setSelected(!isSelected);
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
          <div className='card-title'>
            <span>{title || 'No Title'}</span>
          </div>
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
                  <div className='link-header'>
                    Resources
                    {showResourcesEdit ? (
                      <span
                        className='resources-isedit-icon done'
                        onClick={() => setShowResourcesEdit(!showResourcesEdit)}
                      >
                        Done
                      </span>
                    ) : (
                      <span
                        className='resources-isedit-icon'
                        onClick={() => setShowResourcesEdit(!showResourcesEdit)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                        >
                          <title>Edit SVG Icon</title>
                          <g
                            fill='none'
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                          >
                            <path d='m16.475 5.408l2.117 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621' />
                            <path d='M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3' />
                          </g>
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className='links-list'>
                    {links.map((link, index) => (
                      <>
                        {showResourcesEdit ? (
                          <div key={index} className='link-item'>
                            <div className='link-input-container'>
                              <input
                                className='link-input link-title'
                                type='text'
                                placeholder='Title (required)'
                                value={link.title}
                                onChange={(e) =>
                                  handleLinkChange(
                                    index,
                                    'title',
                                    e.target.value
                                  )
                                }
                              />
                            </div>

                            <div className='link-divider'></div>
                            <div className='link-input-container'>
                              <input
                                className='link-input link-url'
                                type='text'
                                placeholder='URL (required)'
                                value={link.url}
                                onChange={(e) =>
                                  handleLinkChange(index, 'url', e.target.value)
                                }
                              />
                            </div>
                            <span
                              onClick={() => handleRemoveLink(index)}
                              className='remove-button'
                            >
                              {/* <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='20'
                                height='20'
                                viewBox='0 0 20 20'
                              >
                                <title>Remove SVG Icon</title>
                                <path
                                  fill='#dc3545'
                                  d='M10 1c-5 0-9 4-9 9s4 9 9 9s9-4 9-9s-4-9-9-9m0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7s7 3.1 7 7s-3.1 7-7 7M6 9v2h8V9z'
                                  class='st0'
                                />
                              </svg> */}
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='256'
                                height='256'
                                viewBox='0 0 256 256'
                              >
                                <title>Remove SVG Icon</title>
                                <g
                                  fill='none'
                                  stroke='#dc3545'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='16'
                                >
                                  <circle cx='128' cy='128' r='112' />
                                  <path d='M 80.000004,128 H 176.00001' />
                                </g>
                              </svg>
                            </span>
                          </div>
                        ) : (
                          <a href={link.url} target='_blank' rel='noreferrer'>
                            {link.title}
                          </a>
                        )}
                      </>
                    ))}
                  </div>
                  {showResourcesEdit && (
                    <div onClick={handleAddLink} className='add-link-button'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                      >
                        <title>Add-outline SVG Icon</title>
                        <path
                          fill='currentColor'
                          d='M7.007 12a.75.75 0 0 1 .75-.75h3.493V7.757a.75.75 0 0 1 1.5 0v3.493h3.493a.75.75 0 1 1 0 1.5H12.75v3.493a.75.75 0 0 1-1.5 0V12.75H7.757a.75.75 0 0 1-.75-.75'
                        />
                        <path
                          fill='currentColor'
                          fill-rule='evenodd'
                          d='M7.317 3.769a42.502 42.502 0 0 1 9.366 0c1.827.204 3.302 1.643 3.516 3.48c.37 3.157.37 6.346 0 9.503c-.215 1.837-1.69 3.275-3.516 3.48a42.5 42.5 0 0 1-9.366 0c-1.827-.205-3.302-1.643-3.516-3.48a40.903 40.903 0 0 1 0-9.503c.214-1.837 1.69-3.276 3.516-3.48m9.2 1.49a41.001 41.001 0 0 0-9.034 0A2.486 2.486 0 0 0 5.29 7.424a39.402 39.402 0 0 0 0 9.154a2.486 2.486 0 0 0 2.193 2.164c2.977.332 6.057.332 9.034 0a2.486 2.486 0 0 0 2.192-2.164a39.401 39.401 0 0 0 0-9.154a2.486 2.486 0 0 0-2.192-2.163'
                          clip-rule='evenodd'
                        />
                      </svg>
                    </div>
                  )}
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
