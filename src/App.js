import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import MainContainer from './components/MainContainer';
import theme from './theme';

export default () => (
  <MuiThemeProvider theme={theme}>
    <MainContainer />
  </MuiThemeProvider>
);
