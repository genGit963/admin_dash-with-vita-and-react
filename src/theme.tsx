import { createTheme } from '@mui/material/styles';

// Create a Material-UI theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#002349',
    },
    secondary: {
      main: '#FF595A',
    },
    tertiary: {
      main: '#ffffff',
    },
    error: {
      main: '#f50057',
    },
    warning: {
      main: '#ffa000',
    },
    info: {
      main: '#0277bd',
    },
    success: {
      main: '#286f2c',
    },
  },

  typography: {
    fontFamily: 'roboto',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      marginBottom: '1rem',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      marginBottom: '0.75rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 600,
    },
  },
});

export default theme;
