import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import SettingsPage from './pages/Settings';
// import Header from './features/header/Header.js';
// import StatisticsPage from './pages/statistics.js';
import HomePage from './pages/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router basename='/technology-tracker/'>
        {/* <Header /> */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* <Route path='/settings' element={<SettingsPage />} /> */}
          {/* <Route path='/statistics' element={<StatisticsPage />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
