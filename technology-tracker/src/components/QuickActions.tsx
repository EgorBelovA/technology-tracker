import './QuickActions.css';
import ScrollUp from './ScrollUp';
import { useEffect, useState, useRef } from 'react';

const QuickActions = ({
  technologies,
  onUpdateAllStatuses,
  onRandomSelect,
  scrollUpVisible,
  scrollToTop,
  handleSelectCards,
  selectCards,
  selectedCardsAmount,
}: any) => {
  const [visible, setVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLDivElement>(null);

  const handleMarkAllCompleted = () => {
    onUpdateAllStatuses('completed');
  };

  const handleResetAll = () => {
    onUpdateAllStatuses('not-started');
  };

  const handleRandomSelect = () => {
    const notCompleted = technologies.filter(
      (tech: any) => tech.status !== 'completed'
    );

    if (notCompleted.length === 0) {
      return;
    }

    const randomTech =
      notCompleted[Math.floor(Math.random() * notCompleted.length)];
    onRandomSelect(randomTech.id);
  };

  useEffect(() => {
    if (selectedCardsAmount) return;
    const handleClickOutside = () => setVisible(false);
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [selectedCardsAmount]);

  useEffect(() => {
    if (visible && menuRef.current) {
      menuRef.current.classList.add('visible');
      filterButtonRef.current?.classList.remove('visible');
    }

    return () => {
      if (menuRef.current) {
        menuRef.current.classList.remove('visible');
        filterButtonRef.current?.classList.add('visible');
      }
    };
  }, [visible]);

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(true);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const completedCount = technologies.filter(
    (tech: any) => tech.status === 'completed'
  ).length;
  const totalCount = technologies.length;

  return (
    <div className='quick-actions-wrapper'>
      <div className='quick-actions backgroundLiquid' ref={menuRef}>
        <div className='actions-grid' onClick={handleMenuClick}>
          <div
            className='action-btn completed'
            onClick={handleMarkAllCompleted}
            data-disabled={
              technologies.length === 0 || completedCount === totalCount
            }
          >
            <span className='action-text'>
              Mark All Completed
              {technologies.length > 0 && (
                <span className='action-count'>
                  ({completedCount}/{totalCount})
                </span>
              )}
            </span>
          </div>

          <div
            className='action-btn reset'
            onClick={handleResetAll}
            data-disabled={technologies.length === 0}
          >
            <span className='action-text'>
              Reset All
              {technologies.length > 0 && (
                <span className='action-count'>
                  ({totalCount - completedCount} active)
                </span>
              )}
            </span>
          </div>

          <div
            className='action-btn random'
            onClick={handleRandomSelect}
            data-disabled={technologies.length === 0}
          >
            <span className='action-text'>
              Random Select
              {technologies.length > 0 && (
                <span className='action-count'>
                  ({totalCount - completedCount} available)
                </span>
              )}
            </span>
          </div>
          <div
            className={`action-btn select-cards ${
              selectCards ? 'selected' : ''
            }`}
            onClick={handleSelectCards}
            data-disabled={technologies.length === 0}
          >
            <span className='action-text'>
              {selectCards ? 'Clear Selection' : 'Select Cards'}
              {technologies.length > 0 && (
                <span className='action-count'>
                  ({selectedCardsAmount} selected)
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
      <ScrollUp visible={scrollUpVisible} handleClick={scrollToTop} />

      <div
        className='filter-container backgroundLiquid visible'
        onClick={handleIconClick}
        ref={filterButtonRef}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='12'
          height='12'
          viewBox='0 0 12 12'
        >
          <path d='M1 2.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m2 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z' />
        </svg>
      </div>
    </div>
  );
};

export default QuickActions;
