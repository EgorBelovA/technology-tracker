import { useState, useEffect, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

export const useThemeMode = () => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode === 'light' || savedMode === 'dark') setMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme(
    {
      palette: {
        mode,
        background: {
          default: mode === 'light' ? '#e8e8e9' : '#1e1e1e',
        },
        text: {
          primary: mode === 'light' ? '#333333' : '#ffffff',
          secondary: mode === 'light' ? '#555555' : 'rgba(187, 187, 187, 1)',
        },
      },
    },
    [mode]
  );

  return { theme, mode, toggleMode };
};
