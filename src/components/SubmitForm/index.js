import React from 'react';
import { withStyles } from '@material-ui/core';

import styles from './styles';

const SubmitForm = ({ classes, children }) => (
  <div className={classes.root}>
    {children}
  </div>
);

export default withStyles(styles)(SubmitForm);
