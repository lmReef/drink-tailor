import theme from 'styled-theming';

interface themes {
  dark: colorTheme;
  light: colorTheme;
}

export const colors: colorTheme = {
  primary: theme('mode', {
    dark: '#efefef',
    light: '#457B9D',
  }),
  secondary: theme('mode', {
    dark: '#8e8e8e',
    light: '#1D3557',
  }),
  accent: theme('mode', {
    dark: '#E63946',
    light: '#E63946',
  }),
  background1: theme('mode', {
    dark: '#191919',
    light: '#F1FAEE',
  }),
  background2: theme('mode', {
    dark: '#111111',
    light: '#A8DADC',
  }),
  text: theme('mode', {
    dark: '#8e8e8e',
    light: '#191919',
  }),
};

export const breakpoints_max = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1200,
};

export const breakpoints_min = {
  xs: 0,
  sm: 481,
  md: 769,
  lg: 1025,
  xl: 1201,
};
