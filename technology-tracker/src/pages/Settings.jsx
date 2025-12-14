import { useThemeMode } from '../context/ThemeModeContext';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

export default function Settings() {
  const { toggleMode, mode } = useThemeMode();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <div className='settings-info'>
        <div
          className='settings-button'
          onClick={toggleMode}
          style={{
            cursor: 'pointer',
          }}
          role='button'
          tabIndex={0}
        >
          Switch to {mode === 'light' ? 'dark' : 'light'} mode
        </div>
        <div
          className='settings-button'
          role='button'
          tabIndex={0}
          onClick={() => localStorage.clear()}
        >
          Clear all data
        </div>
        <div
          className='settings-button logout'
          role='button'
          tabIndex={0}
          onClick={handleLogout}
        >
          Lot Out
        </div>
      </div>
    </div>
  );
}
