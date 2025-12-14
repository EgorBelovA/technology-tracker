import { ThemeProvider, CssBaseline } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import HomePage from './pages/Home';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';
import { NotificationProvider } from './components/NotificationProvider';
import { useThemeMode } from './components/useThemeMode';
import PageSwitcher from './components/PageSwitcher';
import { TechnologiesProvider } from './context/TechnologiesContext';

function HeaderTitle() {
  const location = useLocation();

  let pageName;
  switch (location.pathname) {
    case '/':
      pageName = 'Tracker';
      break;
    case '/settings':
      pageName = 'Settings';
      break;
    case '/statistics':
      pageName = 'Statistics';
      break;
    default:
      pageName = '';
  }

  return <h1>RoadMap {pageName}</h1>;
}

function App() {
  const { theme, toggleMode, mode } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <TechnologiesProvider>
          <Router basename='/technology-tracker/'>
            <div className='app'>
              <HeaderTitle />
              <PageSwitcher />

              <div
                onClick={toggleMode}
                style={{
                  position: 'fixed',
                  top: 10,
                  right: 10,
                  zIndex: 999,
                  cursor: 'pointer',
                }}
                role='button'
                tabIndex={0}
              >
                Switch to {mode === 'light' ? 'dark' : 'light'} mode
              </div>

              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/statistics' element={<Statistics />} />
              </Routes>
            </div>
          </Router>
        </TechnologiesProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
