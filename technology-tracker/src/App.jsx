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
import Login from './pages/Login';
import { NotificationProvider } from './components/NotificationProvider';
import PageSwitcher from './components/PageSwitcher';
import { TechnologiesProvider } from './context/TechnologiesContext';
import { useThemeMode } from './context/ThemeModeContext';
import RequireAuth from './components/RequireAuth';

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
  const { theme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <TechnologiesProvider>
          <Router basename='/technology-tracker/'>
            <div className='app'>
              <HeaderTitle />
              <PageSwitcher />
              <Routes>
                <Route path='/login' element={<Login />} />
                <Route
                  path='/'
                  element={
                    <RequireAuth>
                      <HomePage />
                    </RequireAuth>
                  }
                />
                <Route
                  path='/settings'
                  element={
                    <RequireAuth>
                      <Settings />
                    </RequireAuth>
                  }
                />
                <Route
                  path='/statistics'
                  element={
                    <RequireAuth>
                      <Statistics />
                    </RequireAuth>
                  }
                />
              </Routes>
            </div>
          </Router>
        </TechnologiesProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
