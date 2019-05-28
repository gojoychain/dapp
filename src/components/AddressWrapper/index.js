import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  address: {
    backgroundColor: 'rgb(247, 247, 249)',
    color: 'rgb(208, 63, 100)',
  },
});

const AddressWrapper = ({ children, classes }) => (
  <span className={classes.address}>
    {children}
  </span>
);

export default withStyles(styles)(AddressWrapper);
