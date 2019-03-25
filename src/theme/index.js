import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    // primary: 'red',
    // secondary: 'blue',
  },
  typography: {
    fontFamily: 'Roboto',
  },
  spacing: {
    unit: 8,
    twoX: 16,
    threeX: 24,
    fourX: 32,
  },
  overrides: {
    // MuiInputBase: {
    //   input: {
    //     padding: 16,
    //   },
    // },
  },
});
