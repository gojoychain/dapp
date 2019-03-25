import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#e43323',
    },
    secondary: {
      main: '#23d4e4',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
  spacing: {
    unit: 8,
    twoX: 16,
    threeX: 24,
    fourX: 32,
    fiveX: 40,
  },
  overrides: {
  },
});
