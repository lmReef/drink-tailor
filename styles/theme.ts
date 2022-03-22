import theme from 'styled-theming';

interface themes {
  dark: colorTheme;
  light: colorTheme;
}

export const colors: colorTheme = {
  primary: theme('mode', {
    dark: '#efefef',
    light: '#17c3b2',
  }),
  secondary: theme('mode', {
    dark: '#8e8e8e',
    light: '#E4E0D7',
  }),
  accent: theme('mode', {
    dark: '#E63946',
    light: '#227c9d',
  }),
  background1: theme('mode', {
    dark: '#191919',
    light: '#fef9ef',
  }),
  background2: theme('mode', {
    dark: '#111111',
    light: '#fef9ef',
  }),
  text1: theme('mode', {
    dark: '#8e8e8e',
    light: '#191919',
  }),
  text2: theme('mode', {
    dark: 'black',
    light: 'black',
  }),
};

export const breakpoints_max = {
  xs: '480px',
  sm: '768px',
  md: '1024px',
  lg: '1200px',
};

export const breakpoints_min = {
  xs: '0px',
  sm: '481px',
  md: '769px',
  lg: '1025px',
  xl: '1201px',
};
