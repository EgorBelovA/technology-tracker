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
  selectMode,
  setSelectMode,
  selectedCardsAmount,
  setSelectedCardsStatus,
}: any) => {
  const [visible, setVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLDivElement>(null);

  const statuses = ['not-started', 'in-progress', 'completed'];
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  const handleStatusCycle = () => {
    const nextIndex = (currentStatusIndex + 1) % statuses.length;
    setCurrentStatusIndex(nextIndex);

    const nextStatus = statuses[nextIndex];
    setSelectedCardsStatus(nextStatus);
  };

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

  const [confirmMarkAll, setConfirmMarkAll] = useState(false);
  const [confirmResetAll, setConfirmResetAll] = useState(false);

  return (
    <div className='quick-actions-wrapper'>
      <div className='quick-actions backgroundLiquid' ref={menuRef}>
        <div className='actions-grid' onClick={handleMenuClick}>
          <div
            className='action-btn completed'
            onClick={() => {
              setConfirmMarkAll(true);
            }}
            data-disabled={
              technologies.length === 0 || completedCount === totalCount
            }
          >
            <span className='action-text'>
              Mark All Completed
              {confirmMarkAll && (
                <span className='confirmation'>
                  <div>Are you sure?</div>
                  <div className='confirmation-buttons'>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmMarkAll(false);
                        handleMarkAllCompleted();
                      }}
                      className='confirm'
                    >
                      Yes
                    </span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmMarkAll(false);
                      }}
                      className='cancel'
                    >
                      No
                    </span>
                  </div>
                </span>
              )}
              {technologies.length > 0 && (
                <span className='action-count'>
                  ({completedCount}/{totalCount})
                </span>
              )}
            </span>
          </div>

          <div
            className='action-btn reset'
            onClick={() => {
              setConfirmResetAll(true);
            }}
            data-disabled={technologies.length === 0}
          >
            <span className='action-text'>
              Reset All
              {confirmResetAll && (
                <span className='confirmation'>
                  <div>Are you sure?</div>
                  <div className='confirmation-buttons'>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmResetAll(false);
                        handleResetAll();
                      }}
                      className='confirm'
                    >
                      Yes
                    </span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmResetAll(false);
                      }}
                      className='cancel'
                    >
                      No
                    </span>
                  </div>
                </span>
              )}
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
              selectMode ? 'selected' : ''
            }`}
            onClick={() => setSelectMode(!selectMode)}
            data-disabled={technologies.length === 0}
          >
            <span className='action-text'>
              {selectMode ? 'Clear Selection' : 'Select Cards'}
              {selectMode && (
                <div>
                  Mark Selected as
                  <div
                    className={`status-badge statusForSelect`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusCycle();
                    }}
                  >
                    {statuses[currentStatusIndex].replace('-', ' ')}
                  </div>
                </div>
              )}
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
          width='512'
          height='512'
          viewBox='0 0 512 512'
        >
          <title>Quick-slash SVG Icon</title>
          <path
            fill='currentColor'
            d='M270.877 444.542C576.857 496.618 318.44 29.007 23.097 25.68C447.57-7.506 696.864 640.745 270.878 444.54z'
          />
        </svg>
      </div>
    </div>
  );
};

export default QuickActions;
