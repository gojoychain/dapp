import React from 'react';
import { withStyles, Paper } from '../JUSDContract/node_modules/@material-ui/core';

import styles from './styles';

const TabContentContainer = ({ classes, children }) => (
  <Paper className={classes.root}>
    {children}
  </Paper>
);

export default withStyles(styles)(TabContentContainer);
