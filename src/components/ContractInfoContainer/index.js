import React from 'react';
import { withStyles } from '../JUSDContract/node_modules/@material-ui/core';

import styles from './styles';

const ContractInfoContainer = ({ classes, children }) => (
  <div className={classes.root}>
    {children}
  </div>
);

export default withStyles(styles)(ContractInfoContainer);
