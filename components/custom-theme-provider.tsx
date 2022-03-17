import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { selectTheme } from '../styles/themeSlice';

const CustomThemeProvider = ({ children }) => {
  const t = useSelector(selectTheme);
  return <ThemeProvider theme={{ mode: t }}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
