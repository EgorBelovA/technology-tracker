import './PageSwitcher.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PageSwitcher = () => {
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className='page-switcher-container' ref={containerRef}>
      <div
        className={`page-switcher-more page-switcher-button ${
          isHovered ? '' : 'visible'
        }`}
        onClick={() => setIsHovered(!isHovered)}
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <title>More-horizontal SVG Icon</title>
          <path
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M17 12a1 1 0 1 0 2 0a1 1 0 0 0-2 0m-6 0a1 1 0 1 0 2 0a1 1 0 0 0-2 0m-6 0a1 1 0 1 0 2 0a1 1 0 0 0-2 0'
          />
        </svg>
      </div>
      <div className={`${isHovered ? 'visible' : ''} page-switcher-pages`}>
        <div
          className='page-switcher-button'
          onClick={() => {
            navigate('/');
            setIsHovered(false);
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <title>Home SVG Icon</title>
            <path
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 19v-6.733a4 4 0 0 0-1.245-2.9L13.378 3.31a2 2 0 0 0-2.755 0L4.245 9.367A4 4 0 0 0 3 12.267V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2'
            />
          </svg>
        </div>

        <div
          className='page-switcher-button'
          onClick={() => {
            navigate('/statistics');
            setIsHovered(false);
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <title>Graph-filled SVG Icon</title>
            <path
              fill='currentColor'
              fillRule='evenodd'
              d='M5.5 18a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5'
              clipRule='evenodd'
            />
            <rect
              width='3'
              height='7'
              x='6.5'
              y='11.5'
              fill='currentColor'
              rx='.5'
            />
            <rect
              width='3'
              height='13'
              x='10.5'
              y='5.5'
              fill='currentColor'
              rx='.5'
            />
            <rect
              width='3'
              height='10'
              x='14.5'
              y='8.5'
              fill='currentColor'
              rx='.5'
            />
          </svg>
        </div>
        <div
          className='page-switcher-button'
          onClick={() => {
            navigate('/settings');
            setIsHovered(false);
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <title>Settings-adjust-solid SVG Icon</title>
            <path
              fill='currentColor'
              d='M13.878 8.75H4a.75.75 0 0 1 0-1.5h9.878a2.251 2.251 0 0 1 4.244 0H20a.75.75 0 0 1 0 1.5h-1.878a2.251 2.251 0 0 1-4.244 0m6.122 8a.75.75 0 0 0 0-1.5h-9.878a2.251 2.251 0 0 0-4.244 0H4a.75.75 0 0 0 0 1.5h1.878a2.25 2.25 0 0 0 4.244 0z'
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PageSwitcher;
